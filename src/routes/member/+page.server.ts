import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
		return redirect(
			302,
			"/member/schedule"
		);
};
