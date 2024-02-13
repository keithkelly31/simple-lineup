import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {};
}

/** @type {import("./$types").Actions} */
export const actions = {
	default: async ({ locals: { supabase }, request }) => {
		const form = await request.formData();
		const password = form.get('password');

		const { error } = await supabase.auth.updateUser({ password });
		if (error) return fail(500, { error: true, message: error.message });
		return {
			success: true,
			message: 'Your password has been reset.'
		};
	}
};
