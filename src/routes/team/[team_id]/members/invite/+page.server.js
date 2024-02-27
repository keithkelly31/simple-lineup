import { MAILGUN_DOMAIN } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, parent }) {
	const { isAdmin } = await parent();
	if (!isAdmin) return redirect(307, `/team/${params.team_id}`);
	return {};
}

/** @type { import("./$types").Actions } */
export const actions = {
	default: async ({ locals: { getSession, mail }, request, url }) => {
		const session = await getSession();
		if (!session)
			return fail(401, { error: true, message: 'You must be logged in to perform this action.' });

		const form = await request.formData();
		let addresses = form.get('addresses')?.toString();
		let id = form.get('id');
		let password = form.get('password');
		let team = form.get('team');

		if (!addresses)
			return fail(400, { error: true, message: 'Please enter at least one email address.' });

		try {
			const to = addresses.split(',').map((a) => a.trim());

			to.forEach(async (address) => {
				const message = {
					to: [address],
					from: 'Simple Lineup Invites <noreply@simplelineup.com>',
					subject: `Invite to Join ${team}`,
					text: `You have been invited to join ${team} on Simple Lineup.\n\nTo join this team, please sign up or sign in to Simple Lineup (${url.origin}).\n\nOn your homepage click the join team button. In the form enter the team id and password below.\n\nTeam id: ${id}\n\nPassword: ${password}`,
					html: `<h1>Simple Lineup</h1><h2>${team} Invitation</h2><p>You have been invited to join the team. Follow these steps to join:</p><p><ul><li><a href="${url.origin}/auth/signup">Sign up</a> or <a href="${url.origin}/auth/signin">sign in</a> to Simple Lineup</li><li>On your homepage click the join team button</li><li>In the form enter the team id and password below</li></ul></p><p>Team id: ${id}</p><p>Password: ${password}</p>`
				};

				await mail.messages.create(MAILGUN_DOMAIN, message);
			});
		} catch (error) {
			return fail(500, { error: true, message: 'There was an error sending the invites.' });
		}

		return { success: true, message: 'Email invites sent successfully.' };
	}
};
