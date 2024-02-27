/** @type {import('./$types').RequestHandler} */
export async function POST({ locals: { supabase }, request }) {
	const body = await request.json();
	const record = body.record;

	if (record.message) return new Response();

	await supabase.from('message_members').insert({ message: record.id, member: record.member });

	record.ids
		.split(',')
		.forEach(
			async (/** @type {string} */ id) =>
				await supabase.from('message_members').insert({ message: record.id, member: id })
		);

	return new Response();
}
