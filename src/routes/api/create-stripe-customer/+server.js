/** @type {import('./$types').RequestHandler} */
export async function POST({ locals: { stripe, supabase }, request }) {
	const customer = await stripe.customers.create({
		name: request.body?.record.id
	});

	await supabase
		.from('teams')
		.update({ stripe_customer: customer.id })
		.eq('id', request.body?.record.id);
	return new Response();
}
