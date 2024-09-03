import { stripeCheckoutSession } from '$lib/stripe.svelte';
import { fail, redirect } from '@sveltejs/kit';
import { api } from '../../../convex/_generated/api';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals: { convex, safeGetSession, stripe, supabase }, url }) => {
		const session = await safeGetSession();
		const form = await request.formData();
		let name = form.get('name');

		if (!name) return fail(400, { error: "Please enter your team's name" });

		name = name.toString();

		const teamId = await convex.mutation(api.team.createTeam, {
			admin: session.user.user_metadata.dbId,
			name
		});
		await convex.mutation(api.team.addTeamMember, {
			member: session.user.user_metadata.dbId,
			team: teamId
		});

		const stripeCustomer = await stripe.customers.create({
			name: teamId,
			email: session.user.email
		});

		await convex.mutation(api.team.updateStripeCustomer, {
			stripeCustomer: stripeCustomer.id,
			teamId
		});

		const checkoutSession = await stripeCheckoutSession({
			origin: url.origin,
			stripeCustomerId: stripeCustomer.id,
			teamId
		});

		return redirect(307, checkoutSession.url!);
	}
};
