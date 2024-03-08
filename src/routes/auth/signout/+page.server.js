import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { supabase }, parent }) {
	const { session } = await parent();
	if (!session) redirect(307, '/');
	return {};
}
