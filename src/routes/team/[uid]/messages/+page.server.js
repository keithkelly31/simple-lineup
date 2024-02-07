import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	return redirect(301, `/team/${params.uid}/messages/unread`);
}
