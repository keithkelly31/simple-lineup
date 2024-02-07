import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	return redirect(301, `/member/${params.uid}/settings/email`);
}
