import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params, parent }) {
	const { isAdmin } = await parent();
	if (!isAdmin) return redirect(307, `/team/${params.team_id}`);
	return {};
}
