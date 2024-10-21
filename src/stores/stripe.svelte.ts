import { STRIPE_PRICE, STRIPE_SECRET_KEY } from '$env/static/private';
import StripeClient from 'stripe';

function stripe() {
	let stripe: StripeClient = new StripeClient(STRIPE_SECRET_KEY);

	return {
		get client() {
			return stripe;
		},

		async checkoutSession({
			origin,
			stripe_customer_id,
			team_id
		}: {
			origin: string;
			stripe_customer_id: string;
			team_id: string;
		}) {
			return await stripe.checkout.sessions.create({
				cancel_url: `${origin}/team/${team_id}`,
				customer: stripe_customer_id,
				line_items: [
					{
						price: STRIPE_PRICE,
						quantity: 1
					}
				],
				mode: 'subscription',
				subscription_data: {
					trial_period_days: 30,
					trial_settings: {
						end_behavior: {
							missing_payment_method: 'pause'
						}
					}
				},
				success_url: `${origin}/team/${team_id}`
			});
		}
	};
}

export const Stripe = stripe();
