import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return { messages: [] };
};