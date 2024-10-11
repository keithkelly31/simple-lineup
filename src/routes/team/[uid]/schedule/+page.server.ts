import { api } from '$convex/_generated/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { convex } }) => {
    return {
        schedule: await convex.query(api.team.schedule)
    };
};