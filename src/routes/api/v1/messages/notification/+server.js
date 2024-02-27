/** @type {import('./$types').RequestHandler} */
export async function POST({ locals: { supabase, supabase_admin }, request }) {
	const body = await request.json();
	const record = body.record;

	const { data } = await supabase
		.from('messages')
		.select(`subject, text, teams(name))`)
		.eq('id', record.message)
		.single();
	if (!data) return new Response(null, { status: 500 });

	console.log(data);

	// const html = ``;
	// const subject = `New ${data.messages.teams.name} Message`;
	// const text = `You have received a new message.\n\n`;

	// await supabase_admin.from('notifications').insert({ html, member: record.member, subject, text });

	return new Response();
}
