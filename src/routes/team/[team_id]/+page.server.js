import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	return redirect(301, `${url.pathname}/schedule`);
}
