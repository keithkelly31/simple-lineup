import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, parent }) {
	const { isAdmin } = await parent();
	if (!isAdmin) return redirect(307, `/team/${params.team_id}`);
	return {};
}

/** @type { import("./$types").Actions } */
export const actions = {
	default: async ({ locals: { stripe }, params, request, url }) => {
		const form = await request.formData();
		const customer = form.get('customer');

		let session;

		try {
			session = await stripe.billingPortal.sessions.create({
				customer,
				return_url: `${url.origin}/team/${params.team_id}`
			});
		} catch (error) {
			console.error(error);
			return fail(500, {
				error: true,
				message: 'There was an error retreiving your subscription.'
			});
		}

		return { url: session.url };
	}
};
