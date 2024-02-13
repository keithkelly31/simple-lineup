import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
	const { session } = await parent();
	if (session) return redirect(307, `/member/${session.user.id}`);
	return {};
}

/** @type {import("./$types").Actions} */
export const actions = {
	default: async ({ locals: { supabase }, request }) => {
		const form = await request.formData();
		const email = form.get('email');
		const password = form.get('password');

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) return fail(500, { error: true, message: error.message });
		return { success: true };
	}
};
