import { handleLoginRedirect } from '$lib/helpers.svelte';
import { Stripe } from '$stores/stripe.svelte';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	activate: async (event) => {
		const { locals: { safeGetSession, stripe, supabase, supabaseAdmin }, request, url } = event;
		const {session} = await safeGetSession();
		if(session === null) return redirect(302, handleLoginRedirect(event))

		const form = await request.formData();
		let id = form.get('teamId');

		if (id === null) return fail(400, { message: "Team id is missing" });
		id = id.toString();

		let team;
		const { data, error } = await supabase.from("teams").select().eq("id", id).maybeSingle();
		if(error) return fail(500, { message: error.message });

		team = data;
		if(team === null) return fail(400, { message: "Could not find team" });

		if(team.stripe_customer === null) {
			const stripe_customer = await stripe.customers.create({
				name: team._id,
				email: session.user.email
			});

			const { data, error } = await supabaseAdmin.from("teams").update({ stripe_customer: stripe_customer.id }).eq("id", team.id).select().maybeSingle();
			if(error) return fail(500, { message: error.message });

			team = data;
			if(team === null) return fail(400, { message: "Could not find team" });
			if(team.stripe_customer === null) return fail(400, { message: "Unable to process subscription" });
		}

		const checkoutSession = await Stripe.checkoutSession({
			origin: url.origin,
			team_id: id,
			stripe_customer_id: team.stripe_customer
		});
		if(checkoutSession.url === null) return fail(400, { message: "Unable to redirect to subscription page" })

		return redirect(307, checkoutSession.url);
	}
};
