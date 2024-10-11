import { api } from '$convex/_generated/api';
import type { Id } from '$convex/_generated/dataModel';
import { Stripe } from '$stores/stripe.svelte';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { convex }, parent }) => {
  const {session} = await parent();
  const userId = session?.user.user_metadata._id as Id<"users">;

  return {
    teams: await convex.query(api.users.getTeams, { userId })
  };
};

export const actions: Actions = {
	add: async (event) => {
		let checkoutSession;
		const {
			locals: { convex, safeGetSession, stripe }, request,
			url
		} = event;
		const session = await safeGetSession();

		const form = await request.formData();
    let name = form.get("name");

    if(!name) return fail(400, { message: "Please enter you team's name" });
    name = name.toString().trim().toLowerCase();

		try {
			const teamId = await convex.mutation(api.teams.createTeam, {
				admin: session.user._id,
				name
			});

			await convex.mutation(api.team.addMember, {
				team: teamId,
				user: session.user._id
			});

			const stripeCustomer = await stripe.customers.create({
				name: teamId,
				email: session.user.email
			});

			await convex.mutation(api.team.updateStripeCustomer, {
				stripeCustomer: stripeCustomer.id,
				teamId
			});

			checkoutSession = await Stripe.checkoutSession({
				origin: url.origin,
				stripeCustomerId: stripeCustomer.id,
				teamId
			});
		} catch (error) {
      return fail(400, { message: error instanceof Error ? error.message : 'There was and error creating the team' })
		}

		if (checkoutSession.url) return redirect(307, checkoutSession.url);
	}
};