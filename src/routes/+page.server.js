// import { STRIPE_PRICE } from '$env/static/private';
// import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { stripe }, parent }) {
	// const { session } = await parent();
	// if (session) return redirect(301, `/member/${session.user.id}`);

	// let price;

	// try {
	// 	const _price = await stripe.prices.retrieve(STRIPE_PRICE);
	// 	price = _price.unit_amount / 100;
	// } catch (err) {
	// 	console.error(err);
	// }

	return { price: 0 };
}
