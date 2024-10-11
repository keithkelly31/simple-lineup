import { api } from '$convex/_generated/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { convex } }) => {
    return {
      messages: await convex.query(api.users.getUnreadMessages, { })
    };
};