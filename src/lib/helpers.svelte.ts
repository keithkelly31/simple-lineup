import type { Doc, TableNames } from '$convex/_generated/dataModel';
import { redirect, type LoadEvent, type RequestEvent } from '@sveltejs/kit';
import { useQuery } from 'convex-svelte';
import type { FunctionReference } from 'convex/server';

export function handleLoggedInRedirect(event: LoadEvent | RequestEvent) {
	return redirect(302, event.url.searchParams.get('redirectTo') ?? '/member') ;
}

export function handleLoginRedirect(
	event: LoadEvent | RequestEvent,
	message: string = 'You must be logged in to view this page'
) {
	const redirectTo = event.url.pathname + event.url.search;
	return redirect(302, `/signin/?redirectTo=${redirectTo}&message=${message}`);
}

export function loadData(
	serverData: Doc<TableNames> | Doc<TableNames>[],
	api: FunctionReference<'query', 'public'>,
	args: { [key: string]: string } = {}
) {
	const q = useQuery(api, args);
	const data = $derived(q.data || serverData);

	return {
		get data() {
			return data;
		}
	};
}

export function randomId() {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
