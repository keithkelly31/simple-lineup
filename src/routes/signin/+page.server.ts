import { handleLoggedInRedirect } from '$lib/helpers.svelte';
import type { RequestEvent } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../signin/$types';

export const load: PageServerLoad = async (event) => {
	const { session } = await event.parent();
	if (session) return handleLoggedInRedirect(event);
	return {};
};

export const actions: Actions = {
	default: async (event: RequestEvent) => {
		const { locals: { supabase }, request } = event;
		const form = await request.formData();

		const redirectTo = form.get("redirectTo");
		let email = form.get("email");
		let password = form.get("password");
		
		if(!email || !password) return fail(400, { message: "Please complete all required fields" });

		email = email.toString().trim();
		password = password.toString().trim();

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) return fail(400, { message: error.message });
		
		if(redirectTo) {
			return redirect(302, `/${redirectTo.toString().slice(1)}`);
		}

		return redirect(302, handleLoggedInRedirect(event));
	}
};