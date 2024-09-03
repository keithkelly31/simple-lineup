import { api } from '../../../../convex/_generated/api';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { convex }, params }) => {
	return { roster: await convex.query(api.team.getRoster, { id: params.uid }) };
}) satisfies PageServerLoad;
