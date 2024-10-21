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
		const { locals: { supabase }, request } = event;
		const form = await request.formData();

		let email = form.get("email");
		let first_name = form.get("first_name");
		let last_name = form.get("last_name");
		let password = form.get("password");

		if(!email || !first_name || !last_name || !password) return fail(400, { message: "Please complete all fields" });

		email = email.toString().trim();
		first_name = first_name.toString().trim().toLowerCase();
		last_name = last_name.toString().trim().toLowerCase();
		password = password.toString().trim();

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: { data: { first_name, last_name } }
		});
		if (error) return fail(400, { message: error.message });

		return { message: "You have successfully signed up. You should receive an email at the address provided to confirm your sign up. You can safely close this window." };
	}
};