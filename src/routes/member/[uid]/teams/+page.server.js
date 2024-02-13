import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { supabase }, parent }) {
	const { session } = await parent();
	const { data: teams, error: err } = await supabase
		.from('team_members')
		.select('teams(id, name)')
		.eq('member', session.user.id);
	if (err) throw error(err.code, err.message);
	return { teams };
}
