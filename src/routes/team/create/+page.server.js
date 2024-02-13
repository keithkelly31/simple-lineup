import { fail, redirect } from '@sveltejs/kit';

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
		if (!session)
			return fail(401, { error: true, message: 'You must be logged in to create a team' });

		const form = await request.formData();
		const name = form.get('name');

		// Create team in db
		const { error } = await supabase
			.from('teams')
			.insert({ name, admin: session.user.id })
			.select()
			.single();
		if (error) return fail(400, { error: true, message: error.message });
		return { success: true, message: 'Your team has been created successfully.' };

		// Add user to team members
		// const { error: memberErr } = await supabase
		// 	.from('team_members')
		// 	.insert({ member: session.user.id, team: team.id });
		// if (memberErr) return fail(400, { error: true, message: memberErr.message });

		// Create customer in Stripe
		// try {
		// 	/** @type { import("stripe").Stripe.Customer } */
		// 	const customer = await stripe.customers.create({ name, email: session.user.email });

		// 	const { error: stripeCustErr } = await supabase
		// 		.from('teams')
		// 		.update({ stripe_customer: customer.id })
		// 		.eq('id', team.id);
		// 	if (stripeCustErr) return fail(400, { error: true, message: stripeCustErr.message });

		// 	/** @type { import("stripe").Stripe.Checkout.Session } */
		// 	const checkout_session = await stripe.checkout.sessions.create({
		// 		cancel_url: `${url.origin}/team/${team.id}`,
		// 		client_reference_id: team.id,
		// 		customer: customer.id,
		// 		line_items: [
		// 			{
		// 				price: 'price_1NaLJtLwQmlymcKgBZl6z2bC',
		// 				quantity: 1
		// 			}
		// 		],
		// 		mode: 'subscription',
		// 		success_url: `${url.origin}/team/${team.id}/activate`
		// 	});

		// 	return {
		// 		success: true,
		// 		url: checkout_session.url
		// 	};
		// } catch (error) {
		// 	if (error) return fail(400, { error: true, message: error.message });
		// }
	}
};
