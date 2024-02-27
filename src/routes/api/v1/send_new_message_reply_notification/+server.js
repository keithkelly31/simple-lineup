/** @type {import('./$types').RequestHandler} */
export async function POST({ locals: { supabase_admin }, request, url }) {
	const body = await request.json();
	const record = body.record;

	const { data: reply } = await supabase_admin
		.from('message_replies')
		.select('text, members(first_name, last_name), messages(subject, teams(id, name))')
		.eq('id', record.id)
		.single();
	if (!reply)
		return new Response(null, { status: 500, statusText: 'Problems getting the message reply' });

	const { data: recipients } = await supabase_admin
		.from('message_members')
		.select('id')
		.eq('message', record.message)
		.neq('member', record.member);
	if (!recipients)
		return new Response(null, { status: 500, statusText: 'Problems getting the recipients' });

	const sendNotifications = async () => {
		const from = reply.messages.teams.name;
		const html = `
		<p>${reply.members.first_name} ${reply.members.last_name} has replied to the message <strong>${reply.messages.subject}</strong>.</p>
		<hr />
		<pre>${reply.text}</pre>
		<hr />
		<p>
			<a href="${url.origin}/team/${reply.messages.teams.id}/messages/${record.message}">View and respond at SimpleLineup.com</a>
		</p>`;
		const subject = `New ${reply.messages.teams.name} Message Reply`;
		const text = `${reply.members.first_name} ${reply.members.last_name} has replied to the message ${reply.messages.subject}.\n\n${reply.text}\n\nView and respond at ${url.origin}/team/${reply.messages.teams.id}/messages/${record.message}.`;

		const promises = recipients.map(
			async (/** @type {any} */ r) =>
				await supabase_admin
					.from('notifications')
					.insert({ from, html, member: r.id, subject, text })
		);
		await Promise.all(promises);
	};

	await sendNotifications();

	return new Response();
}
