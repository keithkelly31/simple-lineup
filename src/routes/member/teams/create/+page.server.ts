// import { Stripe } from '$stores/stripe.svelte';
import type { Actions } from './$types';

export const actions: Actions = {
	add: async ({ locals: { supabase, safeGetSession } }) => {
		const session = await safeGetSession();
		await supabase.from("teams").insert({ name: "Testing", admin: session.session?.user.id });
		// let checkoutSession;
		// const {
		// 	locals: { convex, safeGetSession, stripe }, request,
		// 	url
		// } = event;
		// const session = await safeGetSession();

		// const form = await request.formData();
    // let name = form.get("name");

    // if(!name) return fail(400, { message: "Please enter you team's name" });
    // name = name.toString().trim().toLowerCase();
		// const userId = session.user._id as Id<"users">;

		// try {
		// 	const teamId = await convex.mutation(api.teams.createTeam, {
		// 		admin: userId,
		// 		name
		// 	});

		// 	await convex.mutation(api.team.addMember, {
		// 		team: teamId,
		// 		user: userId
		// 	});

		// 	const stripeCustomer = await stripe.customers.create({
		// 		name: teamId,
		// 		email: session.user.email
		// 	});

		// 	await convex.mutation(api.team.updateStripeCustomer, {
		// 		stripeCustomer: stripeCustomer.id,
		// 		teamId
		// 	});

		// 	checkoutSession = await Stripe.checkoutSession({
		// 		origin: url.origin,
		// 		stripeCustomerId: stripeCustomer.id,
		// 		teamId
		// 	});
		// } catch (error) {
    //   return fail(400, { message: error instanceof Error ? error.message : 'There was and error creating the team' })
		// }

		// if (checkoutSession.url) return redirect(307, checkoutSession.url);
	}
};