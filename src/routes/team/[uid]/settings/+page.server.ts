import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent, params }) => {
	const { isAdmin } = await parent();
	if (!isAdmin) return redirect(307, `/team/${params.uid}`);
	return {};
}) satisfies PageServerLoad;
