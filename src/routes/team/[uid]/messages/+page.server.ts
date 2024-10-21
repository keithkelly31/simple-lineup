import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    return redirect(302, `/team/${params.uid}/messages/unread`);
};