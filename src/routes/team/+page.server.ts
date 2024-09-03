import { stripeCheckoutSession } from '$lib/stripe.svelte';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	activate: async ({ request, url }) => {
		const form = await request.formData();
		let stripeCustomerId = form.get('stripeCustomerId');
		let teamId = form.get('teamId');

		if (!stripeCustomerId || !teamId) return;

		stripeCustomerId = stripeCustomerId.toString();
		teamId = teamId.toString();

		const checkoutSession = await stripeCheckoutSession({
			origin: url.origin,
			teamId,
			stripeCustomerId
		});

		return redirect(307, checkoutSession.url!);
	}
};
