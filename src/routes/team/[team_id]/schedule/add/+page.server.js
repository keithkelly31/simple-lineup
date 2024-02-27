import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, parent }) {
	const { isAdmin } = await parent();
	if (!isAdmin) return redirect(301, `/team/${params.team_id}`);
	return {};
}
