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
			stripeCustomerId,
			teamId
		}: {
			origin: string;
			stripeCustomerId: string;
			teamId: string;
		}) {
			return await stripe.checkout.sessions.create({
				cancel_url: `${origin}/team/${teamId}`,
				customer: stripeCustomerId,
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
				success_url: `${origin}/team/${teamId}`
			});
		}
	};
}

export const Stripe = stripe();
