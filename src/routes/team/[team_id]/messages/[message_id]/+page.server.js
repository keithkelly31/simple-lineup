import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { supabase }, params, parent }) {
	const { session } = await parent();
	const { data, error: err } = await supabase
		.from('message_members')
		.select('messages(*)')
		.eq('message', params.message_id)
		.eq('member', session?.user.id)
		.single();
	if (err)
		return error(500, {
			details: err,
			message: 'There was en error fetching the message data',
			redirect: `/team/${params.team_id}`
		});
	return { message: data.messages };
}
