import { STRIPE_PRICE, STRIPE_SECRET_KEY } from '$env/static/private';
import Stripe from 'stripe';

export const stripe = new Stripe(STRIPE_SECRET_KEY);

export const stripeCheckoutSession = async ({
	origin,
	stripeCustomerId,
	teamId
}: {
	origin: string;
	stripeCustomerId: string;
	teamId: string;
}) =>
	await stripe.checkout.sessions.create({
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
