/** @type {import('./$types').RequestHandler} */
export async function POST({ locals: { supabase }, request }) {
	const body = await request.json();
	const { id, ids: _ids, member, message } = body.record;

	if (message) return new Response();

	const ids = _ids.split(',');

	ids.forEach(
		async (/** @type {string} */ id) =>
			await supabase.from('message_recipients').insert({ message: body.record.id, members: id })
	);

	return new Response();
}
