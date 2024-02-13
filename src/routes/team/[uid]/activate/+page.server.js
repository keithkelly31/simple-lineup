import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { stripe }, parent }) {
	const { isAdmin, team } = await parent();
	if (!isAdmin) return redirect(307, `/team/${team.id}`);

	const customer = await stripe.customers.retrieve(team.stripe_customer, {
		expand: ['subscriptions']
	});

	if (customer.subscriptions.data.length === 0) {
	}

	const subscription = customer.subscriptions.data.filter(
		(s) => s.customer === team.stripe_customer
	)[0];

	console.log(customer.subscriptions.data.filter((s) => s.customer === team.stripe_customer)[0]);

	return {};
}
