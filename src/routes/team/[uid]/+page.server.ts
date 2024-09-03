import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	return redirect(307, `/team/${params.uid}/schedule`);
}) satisfies PageServerLoad;
