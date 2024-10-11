import { handleLoggedInRedirect } from '$lib/helpers.svelte';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const { session } = await event.parent();
	if (session) return handleLoggedInRedirect(event);
	return {};
};
