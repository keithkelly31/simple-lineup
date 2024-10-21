import { handleLoginRedirect } from '$lib/helpers.svelte';
import { error as handleError } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const { locals: { stripe, supabase, supabaseAdmin }, params, parent } = event;
	const { session } = await parent();
	if (!session) return handleLoginRedirect(event);

	const { count, error: memberErr } = await supabase.from("team_members").select().eq("member", session.user.id).eq("team", params.uid).eq("active", true);
	if(memberErr) return handleError(500, memberErr.message);
	if(count === 0) return handleError(401, "You are not an active member of this team");

	let team;
	const { data, error: teamErr } = await supabase.from("teams").select().eq("id", params.uid).maybeSingle();
	if(teamErr) return handleError(500, teamErr.message);
	if(data === null) return handleError(404, 'This team was not found in our database');
	team = data;

	const isAdmin = team.admin === session.user.id;

	if (team.stripe_customer === null) {
		const stripe_customer = await stripe.customers.create({
			name: team.id,
			email: session.user.email
		});

		const { data, error } = await supabaseAdmin.from("teams").update({ stripe_customer: stripe_customer.id }).eq("id", team.id).select();
		if(error) return handleError(500, error.message);
		team = data;
	}

	const customer = await stripe.customers.retrieve(team.stripe_customer, {
		expand: ['subscriptions']
	});

	if (customer.subscriptions.total_count === 0) {
		return handleError(402, {
			data: { isAdmin, teamId: params.uid },
			message: 'This teams subscription has not been setup.'
		});
	}

	const subscription = customer.subscriptions.data[0];

	if (subscription.status === 'trialing' || subscription.status === 'active') {
		return { isAdmin, team };
	}

	return handleError(402, {
		data: { isAdmin },
		message: 'The subscription for this team is inactive'
	});
};
