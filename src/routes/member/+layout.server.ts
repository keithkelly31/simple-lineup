import { api } from '$convex/_generated/api';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { convex }, parent }) => {
	const { session, user } = await parent();
	if (!session) return redirect(307, '/auth/signin');

	return {
		events: await convex.query(api.user.getUpcomingEvents, {}),
		messages: await convex.query(api.user.getUnreadMessages, {}),
		teams: await convex.query(api.user.getTeams, {
			userId: user!._id
		})
	};
}) satisfies LayoutServerLoad;
