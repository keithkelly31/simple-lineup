import { MAILGUN_DOMAIN, STRIPE_PRICE } from '$env/static/private';
import { error, fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { stripe, supabase }, params, parent }) {
	const { session } = await parent();
	if (!session) return redirect(307, '/auth/signin');

	let customer = null;

	const { error: err, count } = await supabase
		.from('team_members')
		.select('*', { count: 'exact', head: true })
		.eq('member', session.user.id)
		.eq('team', params.uid);
	if (err)
		return error(500, {
			message: 'There was an error retrieving your team membership status from the database.',
			redirect: `/team/${params.uid}`
		});

	if (count === 0)
		return error(401, {
			message:
				"You are not a member of this team. If you believe this is a mistake, please contact your team's administrator."
		});

	const { data: team, error: dbErr } = await supabase
		.from('teams')
		.select('*')
		.eq('id', params.uid)
		.single();
	if (dbErr)
		return error(500, {
			message: "There was an error retrieving this team's information from the database.",
			redirect: `/team/${params.uid}`
		});

	try {
		customer = await stripe.customers.retrieve(team.stripe_customer, {
			expand: ['subscriptions']
		});
	} catch (err) {
		return error(500, {
			message: "There was an error retrieving this team's subscription information.",
			redirect: `/team/${params.uid}`
		});
	}

	return {
		isAdmin: session.user.id === team.admin,
		subscription: customer.subscriptions.total_count === 1 ? customer.subscriptions.data[0] : null,
		team
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	activate: async ({ locals: { stripe }, params, request, url }) => {
		const form = await request.formData();
		const stripe_customer = form.get('stripe_customer');

		let checkout_session = null;

		try {
			const customer = await stripe.customers.retrieve(stripe_customer, {
				expand: ['subscriptions']
			});

			/** @type { import("stripe").Stripe.Checkout.Session } */
			if (customer.subscriptions.total_count === 1) {
				checkout_session = await stripe.checkout.sessions.create({
					cancel_url: `${url.origin}/team/${params.uid}`,
					subscription: customer.subscriptions.data[0].id,
					success_url: `${url.origin}/team/${params.uid}`
				});
			} else {
				checkout_session = await stripe.checkout.sessions.create({
					cancel_url: `${url.origin}/team/${params.uid}`,
					customer: customer.id,
					line_items: [
						{
							price: STRIPE_PRICE,
							quantity: 1
						}
					],
					mode: 'subscription',
					success_url: `${url.origin}/team/${params.uid}`
				});
			}

			return {
				success: true,
				url: checkout_session.url
			};
		} catch (err) {
			return fail(500, { error: true, message: `There was an error setting up the subscription.` });
		}
	},
	event: async () => {},
	invite: async ({ locals: { getSession, mail }, request, url }) => {
		const session = await getSession();
		if (!session)
			return fail(401, { error: true, message: 'You must be logged in to perform this action.' });

		const form = await request.formData();
		let addresses = form.get('addresses')?.toString();
		let id = form.get('id');
		let password = form.get('password');
		let team = form.get('team');

		if (!addresses)
			return fail(400, { error: true, message: 'Please enter at least one email address.' });

		try {
			const to = addresses.split(',').map((a) => a.trim());

			to.forEach(async (address) => {
				const message = {
					to: [address],
					from: 'Simple Lineup Invites <noreply@simplelineup.com>',
					subject: `Invite to Join ${team}`,
					text: `You have been invited to join ${team} on Simple Lineup.\n\nTo join this team, please sign up or sign in to Simple Lineup (${url.origin}).\n\nOn your homepage click the join team button. In the form enter the team id and password below.\n\nTeam id: ${id}\n\nPassword: ${password}`,
					html: `<h1>Simple Lineup</h1><h2>${team} Invitation</h2><p>You have been invited to join the team. Follow these steps to join:</p><p><ul><li><a href="${url.origin}/auth/signup">Sign up</a> or <a href="${url.origin}/auth/signin">sign in</a> to Simple Lineup</li><li>On your homepage click the join team button</li><li>In the form enter the team id and password below</li></ul></p><p>Team id: ${id}</p><p>Password: ${password}</p>`
				};

				await mail.messages.create(MAILGUN_DOMAIN, message);
			});
		} catch (error) {
			return fail(500, { error: true, message: 'There was an error sending the invites.' });
		}

		return { success: true, message: 'Email invites sent successfully.' };
	},

	name: async ({ locals: { supabase }, params, request }) => {
		const form = await request.formData();
		const name = form.get('name');

		const { error } = await supabase.from('teams').update({ name }).eq('id', params.uid);
		if (error)
			return fail(500, { error: true, message: "There was an error updating the team's name." });

		return { success: true, message: 'Name updated successfully.' };
	},

	password: async ({ locals: { supabase }, params, request }) => {
		const form = await request.formData();
		const password = form.get('password');

		const { error } = await supabase.from('teams').update({ password }).eq('id', params.uid);
		if (error)
			return fail(500, {
				error: true,
				message: "There was an error updating the team's password."
			});

		return { success: true, message: 'Password updated successfully.' };
	},

	send: async ({ locals: { getSession, supabase }, params, request }) => {
		const session = await getSession();
		if (!session)
			return fail(401, { error: true, message: 'You must be signed in to send a message.' });

		const form = await request.formData();
		const recipients = form.get('recipients');
		const subject = form.get('subject');
		const text = form.get('text');

		if (!recipients)
			return fail(400, {
				error: true,
				message: 'Please select at least one member to send the message.'
			});

		const { error } = await supabase
			.from('messages')
			.insert({ recipients, subject, text, member: session.user.id, team: params.uid });
		if (error)
			return fail(500, {
				error: true,
				message: `There was an error saving the message.\n\nDetails: ${error.message}`
			});

		return { success: true, message: 'Your message has been posted.' };
	},

	subscription: async ({ locals: { stripe }, params, request, url }) => {
		const form = await request.formData();
		const customer = form.get('customer');

		let session;

		try {
			session = await stripe.billingPortal.sessions.create({
				customer,
				return_url: `${url.origin}/team/${params.uid}`
			});
		} catch (error) {
			return fail(500, {
				error: true,
				message: 'There was an error retreiving your subscription.'
			});
		}

		return {
			success: true,
			message: 'You will be redirected to Stripe to manage your account.',
			url: session.url
		};
	}
};
