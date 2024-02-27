import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { supabase }, parent }) {
	const { session } = await parent();
	if (!session) return redirect(307, '/auth/signin');

	const { data: teams, error: err } = await supabase
		.from('team_members')
		.select('teams(id, name)')
		.eq('member', session.user.id)
		.eq('active', true);
	if (err) throw error(err.code, err.message);
	return { teams };
}
