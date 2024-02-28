/** @type {import('./$types').RequestHandler} */
export async function POST({ locals: { supabase_admin }, request, url }) {
	const body = await request.json();
	const record = body.record;
	const old_record = body.old_record;

	console.log(body);

	if (old_record.unread_reply === record.unread_reply) return new Response();

	const { data: reply } = await supabase_admin
		.from('send_new_message_reply_notification')
		.select()
		.eq('id', record.id)
		.single();
	console.log(reply);
	if (!reply)
		return new Response(null, { status: 500, statusText: 'Problems getting the message reply' });

	// const from = reply.messages.teams.name;
	// const html = `
	// 		<p>${reply.members.first_name} ${reply.members.last_name} has replied to the message <strong>${reply.messages.subject}</strong>.</p>
	// 		<hr />
	// 		<pre>${record.text}</pre>
	// 		<hr />
	// 		<p>
	// 			<a href="${url.origin}/team/${reply.messages.teams.id}/messages/${record.message}">View and respond at SimpleLineup.com</a>
	// 		</p>`;
	// const subject = `New ${reply.messages.teams.name} Message Reply`;
	// const text = `${reply.members.first_name} ${reply.members.last_name} has replied to the message ${reply.messages.subject}.\n\n${record.text}\n\nView and respond at ${url.origin}/team/${reply.messages.teams.id}/messages/${record.message}.`;

	// await supabase_admin.from('emails').insert({ from, html, member: record.member, subject, text });

	return new Response();
}
