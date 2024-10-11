import { api } from '$convex/_generated/api';
import type { Id } from '$convex/_generated/dataModel';
import { handleLoginRedirect } from '$lib/helpers.svelte';
import { Stripe } from '$stores/stripe.svelte';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	activate: async (event) => {
		const { locals: { convex, safeGetSession, stripe }, request, url } = event;
		const {session} = await safeGetSession();
		if(!session) return redirect(302, handleLoginRedirect(event))

		const form = await request.formData();
		let id = form.get('teamId')as Id<"teams">;

		if (!id) return fail(400, { message: "Team id is missing" });

		let team = await convex.query(api.team.get, { id });
		if(!team) return fail(400, { message: "Could not find team" });
		if(!team.stripeCustomer) {
			const stripeCustomer = await stripe.customers.create({
				name: team._id,
				email: session.user.email
			});

			await convex.mutation(api.team.updateStripeCustomer, {
				stripeCustomer: stripeCustomer.id,
				teamId: team._id
			});

			team = await convex.query(api.team.get, { id: team._id });
			if (!team) return fail(404, { message: 'This team was not found in our database' });
			if(!team.stripeCustomer) return fail(400, { message: "Unable to process subscription" })
		}

		const checkoutSession = await Stripe.checkoutSession({
			origin: url.origin,
			teamId: id,
			stripeCustomerId: team.stripeCustomer
		});
		if(!checkoutSession.url) return fail(400, { message: "Unable to redirect to subscription page" })

		return redirect(307, checkoutSession.url);
	}
};
