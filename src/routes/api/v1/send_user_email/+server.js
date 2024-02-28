import { MAILGUN_DOMAIN } from '$env/static/private';

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals: { mail, supabase }, request }) {
	const body = await request.json();
	const record = body.record;

	const { data } = await supabase.from('members').select('email').eq('id', record.member).single();
	if (!data) return new Response(null, { status: 500 });

	const message = {
		to: data.email,
		from: `${record.from || 'Simple Lineup Notifications'} <noreply@mg.simplelineup.com>`,
		html: record.html,
		subject: record.subject,
		text: record.text
	};

	await mail.messages.create(MAILGUN_DOMAIN, message);

	return new Response();
}
