/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies, locals: { supabase }, request }) {
	const body = await request.json();
	const record = body.record;

	console.log(cookies.getAll());

	if (record.message) return new Response();

	const { error } = await supabase
		.from('message_members')
		.insert({ message: record.id, member: record.member, read: true });
	if (error) console.error(error);

	record.ids
		.split(',')
		.forEach(
			async (/** @type {string} */ id) =>
				await supabase.from('message_members').insert({ message: record.id, member: id })
		);

	return new Response();
}
