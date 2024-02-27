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
		const ids = form.get('ids');
		const subject = form.get('subject');
		const text = form.get('text');

		if (!ids)
			return fail(400, {
				error: true,
				message: 'Please select at least one member to send the message.'
			});

		const { error } = await supabase
			.from('messages')
			.insert({ ids, subject, text, member: session.user.id, team: params.team_id });
		if (error)
			return fail(500, {
				error: true,
				message: `There was an error saving the message.\n\nDetails: ${error.message}`
			});

		// const ids = _ids.toString().split(',');

		// ids.forEach(async (id) => {
		// 	const { data, error } = await supabase
		// 		.from('message_recipients')
		// 		.insert({ message: message.id, member: id })
		// 		.select('*, members(email, first_name, last_name)')
		// 		.single();
		// 	if (error)
		// 		return fail(500, {
		// 			error: true,
		// 			message: `There was an error notifying the message recipients.\n\nDetails: ${error.message}`
		// 		});

		// 	try {
		// 		const message = {
		// 			to: [data.email],
		// 			from: 'Simple Lineup Invites <noreply@simplelineup.com>',
		// 			subject: 'You Have A New Message',
		// 			text: ``,
		// 			html: ``
		// 		};

		// 		await mail.messages.create(MAILGUN_DOMAIN, message);
		// 	} catch (error) {
		// 		return fail(500, {
		// 			error: true,
		// 			message: `There was an error sending the notification to ${data.members.first_name} ${data.members.last_name}`
		// 		});
		// 	}
		// });

		return { success: true, message: 'Your message has been posted.' };
	}
};
