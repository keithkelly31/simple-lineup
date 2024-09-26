import { fail, redirect } from '@sveltejs/kit';
import { api } from '../../../convex/_generated/api';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();
	if (session) return redirect(307, '/');
	return {};
};

export const actions: Actions = {
	default: async ({ request, locals: { convex, supabase } }) => {
		const form = await request.formData();
		let email = form.get('email');
		let firstName = form.get('firstName');
		let lastName = form.get('lastName');
		let password = form.get('password');

		if (!email || !firstName || !lastName || !password)
			return fail(400, { error: 'Please enter all of the required information' });

		email = email.toString();
		firstName = firstName.toString();
		lastName = lastName.toString();
		password = password.toString();

		const _id = await convex.mutation(api.user.add, { email, firstName, lastName });
		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: { data: _id }
		});
		if (error) return fail(400, { error: error.message });

		return {};
	}
};
