import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { session } = await parent();
	if (session) return redirect(307, '/');
	return {};
}) satisfies LayoutServerLoad;
