import { fail } from '@sveltejs/kit';
import { api } from '../../../convex/_generated/api';
import type { Actions } from './$types';

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

		const dbId = await convex.mutation(api.user.add, { email, firstName, lastName });
		console.log('dbId: ', dbId);
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: { data: { dbId } }
		});
		if (error) console.error(error);
		console.log('data: ', data);
		await convex.mutation(api.user.updateId, { authId: data.user!.id, id: dbId });

		return {};
	}
};
