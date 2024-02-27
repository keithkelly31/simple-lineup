import { error } from '@sveltejs/kit';

/** @type {import('../$types').PageServerLoad} */
export async function load({ locals: { supabase }, params, url }) {
	const { data: roster, error: err } = await supabase
		.from('team_members')
		.select('*, members(id, first_name, last_name)')
		.eq('team', params.team_id);
	if (err)
		return error(500, {
			message: 'There was an error retrieving the roster.',
			redirect: url.pathname
		});

	return { roster };
}
