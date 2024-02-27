import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { supabase }, params }) {
	const { data: roster, error: err } = await supabase
		.from('team_members')
		.select('active, members (first_name, id, last_name)')
		.eq('team', params.team_id);
	if (err) {
		console.error(err);
		return error(500, {
			message: 'There was an error retrieving members',
			redirect: `/team/${params.team_id}`
		});
	}

	return { roster };
}
