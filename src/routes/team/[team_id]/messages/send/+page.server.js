import { error, fail } from '@sveltejs/kit';

/** @type {import('../$types').PageServerLoad} */
export async function load({ locals: { supabase }, params, url }) {
	const { data: roster, error: err } = await supabase
		.from('team_members')
		.select('*, members(id, first_name, last_name)')
		.eq('team', params.team_id);
	if (err)
		return error(500, {
			message: 'There was an error retrieving the roster.',
			redirect: url.pathname
		});

	return { roster };
}

/** @type { import("../$types").Actions } */
export const actions = {
	default: async ({ locals: { getSession, supabase }, params, request }) => {
		const session = await getSession();
		if (!session)
			return fail(401, { error: true, message: 'You must be signed in to send a message.' });

		const form = await request.formData();
		const recipients = form.get('recipients');
		const subject = form.get('subject');
		const text = form.get('text');

		if (!recipients)
			return fail(400, {
				error: true,
				message: 'Please select at least one member to send the message.'
			});

		const { error } = await supabase
			.from('messages')
			.insert({ recipients, subject, text, member: session.user.id, team: params.team_id });
		if (error)
			return fail(500, {
				error: true,
				message: `There was an error saving the message.\n\nDetails: ${error.message}`
			});

		return { success: true, message: 'Your message has been posted.' };
	}
};
