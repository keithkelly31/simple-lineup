import { STRIPE_SECRET_KEY } from '$env/static/private';

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals: { stripe }, request }) {
	const signature = request.headers.get('stripe-signature');

	let event;

	try {
		event = stripe.webhooks.constructEvent(request.body, signature, STRIPE_SECRET_KEY);
	} catch (error) {
		// @ts-ignore
		return new Response(`Webhook Error: ${error.message}`, { status: 400 });
	}

	console.log(event);

	return new Response();
}
