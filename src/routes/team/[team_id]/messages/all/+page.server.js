import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { supabase }, params, url }) {
	const { data: messages, error: err } = await supabase
		.from('messages')
		.select('created_at, id, subject, text, members(first_name, last_name)')
		.eq('team', params.team_id)
		.order('created_at');
	if (err)
		return error(500, {
			message: `There was an error fetching the messages from the database.\n\n${JSON.stringify(err)}`,
			redirect: url.pathname
		});
	return { messages };
}
