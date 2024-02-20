import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, parent }) {
	const { isAdmin } = await parent();
	if (!isAdmin) return redirect(307, `/team/${params.uid}`);
	return {};
}

/** @type { import("./$types").Actions } */
export const actions = {
	default: async ({ locals: { getSession, mail }, request }) => {
		const session = await getSession();
		if (!session)
			return fail(401, { error: true, message: 'You must be logged in to perform this action.' });

		const form = await request.formData();
		let addresses = form.get('addresses');
		let team = form.get('team');

		const message = {
			to: addresses,
			from: 'invite@simplelineup.com',
			subject: `Invite to Join ${team}`,
			text: `You have been invited to join ${team}.`,
			html: `<p>You have been invited to join ${team}.</p>`
		};

		try {
			await mail.send(message);
		} catch (error) {
			console.error(error);
			return fail(500, { error: true, message: 'There was an error sending the invites.' });
		}

		return { success: true, message: 'Email invites sent successfully.' };
	}
};
