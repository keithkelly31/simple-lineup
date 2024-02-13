import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals: { supabase }, params, parent }) {
	const { session } = await parent();
	if (!session) return redirect(307, '/auth/signin');

	const { error: err, count } = await supabase
		.from('team_members')
		.select('*', { count: 'exact', head: true })
		.eq('member', session.user.id)
		.eq('team', params.uid);
	if (err) error(err.status, err.message);
	if (count === 0) error(401, 'You are not a member of this team');

	const { data: team, error: dbErr } = await supabase
		.from('teams')
		.select('*')
		.eq('id', params.uid)
		.single();
	if (dbErr) error(dbErr.status, dbErr.message);

	const isAdmin = session.user.id === team.admin;

	// const unreadMessages = 10; // Get count from Supabase for unread team messages

	return { isAdmin, team };
}
