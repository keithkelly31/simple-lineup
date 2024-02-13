import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
	const { session } = await parent();
	if (!session) throw redirect(307, '/');
	return {};
}
