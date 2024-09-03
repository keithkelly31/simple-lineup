import { api } from '../../../convex/_generated/api';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { convex }, parent }) => {
	const { session } = await parent();
	return {
		teams: await convex.query(api.user.teams, { userId: session?.user.user_metadata.dbId })
	};
}) satisfies PageServerLoad;
