/** @type {import('./$types').RequestHandler} */
export async function POST({ locals: { supabase_admin }, request, url }) {
	const body = await request.json();
	const record = body.record;

	if (body.record.read) return new Response();

	const { data } = await supabase_admin
		.from('messages')
		.select('subject, text, members(first_name, last_name), teams(id, name)')
		.eq('id', record.message)
		.single();
	if (!data) return new Response(null, { status: 500 });

	const from = data.teams.name;
	const html = `
		<p>You have received a new message from ${data.members.first_name} ${data.members.last_name}.</p>
		<hr />
		<p><strong>${data.subject}</strong></p>
		<pre>${data.text}</pre>
		<hr />
		<p>
			<a href="${url.origin}/team/${data.teams.id}/messages/${record.message}">View and respond at SimpleLineup.com</a>
		</p>`;
	const subject = `New ${data.teams.name} Message`;
	const text = `You have received a new message from ${data.members.first_name} ${data.members.last_name}.\n\n${data.subject}\n\n${data.text}\n\nView and respond at ${url.origin}/team/${data.teams.id}/messages/${record.message}.`;

	await supabase_admin
		.from('notifications')
		.insert({ from, html, member: record.member, subject, text });

	return new Response();
}
