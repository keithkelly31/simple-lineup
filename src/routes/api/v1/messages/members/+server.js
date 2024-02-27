/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies, locals: { supabase_admin }, request }) {
	const body = await request.json();
	const record = body.record;

	if (record.message) return new Response();

	const { error } = await supabase_admin
		.from('message_members')
		.insert({ message: record.id, member: record.member, read: true });
	if (error) console.error(error);

	record.ids
		.split(',')
		.forEach(
			async (/** @type {string} */ id) =>
				await supabase_admin.from('message_members').insert({ message: record.id, member: id })
		);

	return new Response();
}
