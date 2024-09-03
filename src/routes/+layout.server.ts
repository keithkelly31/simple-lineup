import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
	const { session, user } = await safeGetSession();

	return {
		session,
		user: { ...user, id: user.user_metadata.dbId },
		cookies: cookies.getAll()
	};
};
