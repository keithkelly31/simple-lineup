import { STRIPE_PRICE } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { supabase }, parent }) {
	const { session } = await parent();
	if (!session) return redirect(307, '/auth/signin');

	const { data } = await supabase
		.from('team_members')
		.select('teams(id, name)')
		.eq('member', session.user.id)
		.eq('active', true);
	return { teams: data || [] };
}

import { fail } from '@sveltejs/kit';

/** @type { import("./$types").Actions } */
export const actions = {
	create: async ({ locals: { getSession, stripe, supabase }, request, url }) => {
		const session = await getSession();

		const form = await request.formData();
		const name = form.get('name');

		let checkout_url = null;

		if (!name) return fail(400, { error: true, message: "Please enter your team's name." });

		const { data: team, error: err } = await supabase
			.from('teams')
			.insert({ name, admin: session.user.id })
			.select()
			.single();

		if (err)
			return error(500, {
				message:
					'There was an error saving the team to the database. Please try creating your team again.'
			});

		await new Promise((resolve) => {
			supabase
				.channel('team')
				.on(
					'postgres_changes',
					{ event: 'UPDATE', schema: 'public', table: 'teams', filter: `id=eq.${team.id}` },
					async (/** @type {any} */ payload) => {
						const checkout_session = await stripe.checkout.sessions.create({
							cancel_url: `${url.origin}/team/${payload.new.id}`,
							customer: payload.new.stripe_customer,
							line_items: [
								{
									price: STRIPE_PRICE,
									quantity: 1
								}
							],
							mode: 'subscription',
							subscription_data: {
								trial_period_days: 7,
								trial_settings: {
									end_behavior: {
										missing_payment_method: 'pause'
									}
								}
							},
							success_url: `${url.origin}/teams/${payload.new.id}`
						});
						resolve((checkout_url = checkout_session.url));
					}
				)
				.subscribe();
		});

		return {
			success: true,
			message:
				"Your team has been created successfully and should show up in your teams list. Go to your team to complete it's activation.",
			url: checkout_url
		};
	},

	email: async ({ locals: { supabase }, request }) => {
		const form = await request.formData();
		const email = form.get('email');

		const { error } = await supabase.auth.updateUser({ email });
		if (error)
			return fail(500, {
				error: true,
				message: `There was an error updating your email. ERROR: ${error.message}`
			});

		return {
			success: true,
			message:
				'An email has been sent to your old and new email addresses to confirm these changes.'
		};
	},

	join: async ({ locals: { getSession, supabase }, request }) => {
		const session = await getSession();
		if (!session) return redirect(307, '/auth/signin');

		const form = await request.formData();
		const id = form.get('id');
		const password = form.get('password');

		const { data: team, error: teamErr } = await supabase
			.from('teams')
			.select('password')
			.eq('id', id)
			.single();
		if (teamErr)
			return fail(500, {
				error: true,
				message: "There was an error retrieving the team's information."
			});

		if (team.password !== password)
			return fail(401, {
				error: true,
				message:
					"The password provided does not match the team's password. Please double check the password entered."
			});

		const { count, error: checkErr } = await supabase
			.from('team_members')
			.select('*', { count: 'exact', head: true })
			.eq('member', session.user.id)
			.eq('team', id);
		if (checkErr)
			return fail(400, {
				error: true,
				message: 'There was an error verifying member eligibility.'
			});
		if (count !== 0)
			return fail(400, { error: true, message: 'You are already a member of the team.' });

		const { error: addErr } = await supabase
			.from('team_members')
			.insert({ member: session.user.id, team: id });
		if (addErr)
			return fail(400, {
				error: true,
				message: 'There was an error adding you to the team. Please try again.'
			});

		return {
			success: true,
			message: 'You have been added to the team. This team will now show up in your teams list.'
		};
	},

	password: async () => {}
};
