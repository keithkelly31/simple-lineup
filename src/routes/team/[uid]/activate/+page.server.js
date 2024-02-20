import { STRIPE_PRICE } from '$env/static/private';
import { fail } from '@sveltejs/kit';

/** @type { import("./$types").Actions } */
export const actions = {
	default: async ({ locals: { stripe }, request, url }) => {
		const form = await request.formData();
		const stripe_customer = form.get('stripe_customer');
		const id = form.get('id');

		let checkout_session = null;

		try {
			const customer = await stripe.customers.retrieve(stripe_customer, {
				expand: ['subscriptions']
			});

			/** @type { import("stripe").Stripe.Checkout.Session } */
			if (customer.subscriptions.total_count === 1) {
				checkout_session = await stripe.checkout.sessions.create({
					cancel_url: `${url.origin}/team/${id}`,
					subscription: customer.subscriptions.data[0].id,
					success_url: `${url.origin}/team/${id}`
				});
			} else {
				checkout_session = await stripe.checkout.sessions.create({
					cancel_url: `${url.origin}/team/${id}`,
					customer: customer.id,
					line_items: [
						{
							price: STRIPE_PRICE,
							quantity: 1
						}
					],
					mode: 'subscription',
					success_url: `${url.origin}/team/${id}`
				});
			}

			return {
				success: true,
				url: checkout_session.url
			};
		} catch (err) {
			return fail(500, { error: true, message: `There was an error setting up the subscription.` });
		}
	}
};
