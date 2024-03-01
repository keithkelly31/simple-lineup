import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { supabase }, params, parent }) {
	const { session } = await parent();
	const { data } = await supabase
		.from('message_members')
		.select('members(first_name, last_name), messages(created_at, subject, text)')
		.eq('message', params.message_id)
		.eq('member', session?.user.id)
		.single();

	let replies = [];

	if (data) {
		const { data: _replies } = await supabase
			.from('message_replies')
			.select('created_at, id, text, members(first_name, last_name)')
			.eq('message', params.message_id)
			.order('created_at', { ascending: false });
		replies = _replies;
	}

	return { message: data, replies };
}

/** @type { import("./$types").Actions } */
export const actions = {
	default: async ({ locals: { getSession, supabase }, params, request }) => {
		const session = await getSession();
		if (!session)
			return fail(401, {
				error: true,
				message: 'UNAUTHORIZED: You must be logged into send a message'
			});

		const form = await request.formData();
		const message = form.get('message');

		const { error } = await supabase
			.from('message_replies')
			.insert({ message: params.message_id, member: session.user.id, text: message });
		if (error)
			return fail(500, {
				error: true,
				details: error,
				message: 'There was an error saving the reply to the database.'
			});

		return { success: true, message: 'Reply posted' };
	}
};
