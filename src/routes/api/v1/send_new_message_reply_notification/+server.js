/** @type {import('./$types').RequestHandler} */
export async function POST({ locals: { supabase_admin }, request, url }) {
	const body = await request.json();
	const record = body.record;
	const old_record = body.old_record;

	if (old_record.unread_reply === record.unread_reply) return new Response();

	const { data: reply } = await supabase_admin
		.from('send_new_message_reply_notification')
		.select('*')
		.eq('id', record.unread_reply)
		.single();

	if (!reply)
		return new Response(null, { status: 500, statusText: 'Problems getting the message reply' });

	const {
		member_first_name,
		member_last_name,
		message,
		message_id,
		message_subject,
		team_id,
		team_name
	} = reply;

	const from = team_name;
	const html = `
			<p>${member_first_name} ${member_last_name} has replied to the message <strong>${message_subject}</strong>.</p>
			<hr />
			<pre>${message}</pre>
			<hr />
			<p>
				<a href="${url.origin}/team/${team_id}/messages/${message_id}">View and respond at SimpleLineup.com</a>
			</p>`;
	const subject = `New ${team_name} Message Reply`;
	const text = `${member_first_name} ${member_last_name} has replied to the message ${message_subject}.\n\n${message}\n\nView and respond at ${url.origin}/team/${team_id}/messages/${message_id}.`;

	await supabase_admin.from('emails').insert({ from, html, member: record.member, subject, text });

	return new Response();
}
