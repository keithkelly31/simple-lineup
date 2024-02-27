import { MAILGUN_DOMAIN } from '$env/static/private';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ locals: { mail }, request }) => {
		const form = await request.formData();
		const email = form.get('email');
		const message = form.get('message');
		const name = form.get('name');

		try {
			const _mail = {
				to: 'keith@simplelineup.com',
				from: 'Simple Lineup Contact <noreply@simplelineup.com>',
				subject: `New Website Contact From ${name}`,
				text: `Name: ${name}\n\nEmail: ${email}\n\n${message}`,
				html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>${message}</p>`
			};

			await mail.messages.create(MAILGUN_DOMAIN, _mail);
		} catch (error) {
			return fail(500, { error: true, message: 'There was an error sending the message.' });
		}

		return {
			success: true,
			message: 'Message sent successfully. I will reply as soon as I can. Thank you.'
		};
	}
};
