/** @type {import('./$types').RequestHandler} */
export async function POST({ locals: { stripe, supabase_admin }, request }) {
	const body = await request.json();
	const record = body.record;

	const admin = await supabase_admin.from('members').select('email').eq('id', record.admin);
	const customer = await stripe.customers.create({ name: record.id, email: admin.email });
	await supabase_admin.from('teams').update({ stripe_customer: customer.id }).eq('id', record.id);

	return new Response();
}
