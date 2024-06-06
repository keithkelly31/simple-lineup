import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ locals: { supabase, supabase_admin }, request }) => {
		const form = await request.formData();
		const email = form.get('email');

		const { count, error: checkErr } = await supabase_admin
			.from('email_list')
			.select('*', { count: 'exact', head: true })
			.eq('email', email);
		if (checkErr)
			return fail(500, {
				message: 'There was an error checking the email address. Please try again'
			});

		if (count > 0)
			return fail(400, { message: 'The email address entered is already on our list.' });

		const { error } = await supabase.from('email_list').insert({ email });
		if (error)
			return fail(500, { message: `There was an error saving to the database. ${error.message}` });

		return { message: 'You have been added to our email list. Thank you for subscribing!' };
	}
};
