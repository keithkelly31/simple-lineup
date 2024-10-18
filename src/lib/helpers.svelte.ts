import { redirect, type LoadEvent, type RequestEvent } from '@sveltejs/kit';

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
