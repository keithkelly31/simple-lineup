import { STRIPE_PRICE } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
	const { session } = await parent();
	if (!session) return redirect(307, '/auth/signin');
	return {};
}

/** @type { import("./$types").Actions } */
export const actions = {
	default: async ({ locals: { getSession, stripe, supabase }, request, url }) => {
		const session = await getSession();
		if (!session) redirect(307, '/auth/signin');

		const form = await request.formData();
		const name = form.get('name');

		const { data: team, error: err } = await supabase
			.from('teams')
			.insert({ name, admin: session.user.id })
			.select()
			.single();

		if (err)
			return error(500, {
				message:
					'There was an error saving the team to the database. Please try creating your team again.',
				redirect: '/team/create'
			});

		const { error: memberErr } = await supabase
			.from('team_members')
			.insert({ member: session.user.id, team: team.id });
		if (memberErr)
			return error(500, {
				message: 'There was an error adding you as member to this team.',
				redirect: `/team/${team.id}`
			});

		try {
			/** @type { import("stripe").Stripe.Customer } */
			const customer = await stripe.customers.create({ name: team.id, email: session.user.email });

			const { error: custErr } = await supabase
				.from('teams')
				.update({ stripe_customer: customer.id })
				.eq('id', team.id);
			if (custErr)
				return error(500, {
					message: 'There was an error saving supscription customer information.',
					redirect: `/team/${team.id}`
				});

			/** @type { import("stripe").Stripe.Checkout.Session } */
			const checkout_session = await stripe.checkout.sessions.create({
				cancel_url: `${url.origin}/team/${team.id}`,
				customer: customer.id,
				line_items: [
					{
						price: STRIPE_PRICE,
						quantity: 1
					}
				],
				mode: 'subscription',
				success_url: `${url.origin}/team/${team.id}`
			});

			return {
				success: true,
				url: checkout_session.url
			};
		} catch (err) {
			console.error(err);
			return error(500, {
				message: "An error occurred while setting up the team's subscription.",
				redirect: `/team/${team.id}`
			});
		}
	}
};
