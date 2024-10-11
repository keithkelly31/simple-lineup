import { handleLoginRedirect } from '$lib/helpers.svelte';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad= async (event) => {
    const {
		parent
	} = event;
	const { session } = await parent();
	if (!session) return handleLoginRedirect(event, 'You must be signed in to access your member page');

	return { };
};