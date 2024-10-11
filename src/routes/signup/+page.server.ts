import { api } from '$convex/_generated/api';
import { handleLoggedInRedirect } from '$lib/helpers.svelte';
import type { RequestEvent } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { session } = await event.parent();
	if (session) return handleLoggedInRedirect(event);
	return {};
};

export const actions: Actions = {
	default: async (event: RequestEvent) => {
		const { locals: { convex, supabase }, request } = event;
		const form = await request.formData();

		let email = form.get("email");
		let firstName = form.get("firstName");
		let lastName = form.get("lastName");
		let password = form.get("password");

		if(!email || !firstName || !lastName || !password) return fail(400, { message: "Please complete all fields" });

		email = email.toString().trim();
		firstName = firstName.toString().trim().toLowerCase();
		lastName = lastName.toString().trim().toLowerCase();
		password = password.toString().trim();

		const _id = await convex.mutation(api.users.add, { email, firstName, lastName });
		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: { data: { _id } }
		});
		if (error) return fail(400, { message: error.message });

		return { message: "You have successfully signed up. You should receive an email at the address provided to confirm your sign up. You can safely close this window." };
	}
};