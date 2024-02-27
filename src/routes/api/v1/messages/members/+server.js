/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies, locals: { supabase_admin }, request }) {
	const body = await request.json();
	const record = body.record;

	if (record.message) return new Response();

	await supabase_admin
		.from('message_members')
		.insert({ message: record.id, member: record.member, read: true });

	async () => {
		const promises = record.ids
			.split(',')
			.map(
				async (/** @type {string} */ id) =>
					await supabase_admin.from('message_members').insert({ message: record.id, member: id })
			);
		await Promise.all(promises);
	};

	return new Response();
}
