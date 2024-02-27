/** @type {import('./$types').RequestHandler} */
export async function POST({ locals: { supabase_admin }, request, url }) {
	const body = await request.json();
	const record = body.record;

	await supabase_admin
		.from('message_members')
		.update({ unread_replies: true })
		.eq('message', record.message)
		.neq('member', record.member);

	return new Response();
}
