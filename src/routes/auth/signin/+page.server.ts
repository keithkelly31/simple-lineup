import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const form = await request.formData();
		let email = form.get('email');
		let password = form.get('password');

		if (!email || !password) return fail(400, { error: 'Please enter your email and password' });

		email = email.toString();
		password = password.toString();

		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) return fail(400, { error: error.message });

		return {};
	}
};
