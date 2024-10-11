import type { Id } from '$convex/_generated/dataModel';
import { handleLoginRedirect } from '$lib/helpers.svelte';
import { error } from '@sveltejs/kit';
import { api } from '../../../convex/_generated/api';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const { locals: { convex, stripe }, params, parent } = event;
	const { session } = await parent();
	if (!session) return handleLoginRedirect(event);

	const teamId = params.uid as Id<'teams'>;

	const isMember = await convex.query(api.team.checkMembership, {
		teamId,
		userId: session.user.user_metadata._id
	});
	if (!isMember) return error(401, 'You are not a member of this team');

	let team = await convex.query(api.team.get, { id: teamId });
	if (!team) return error(404, 'This team was not found in our database');

	const isAdmin = team.admin === session.user.user_metadata._id;

	if (!team.stripeCustomer) {
		const stripeCustomer = await stripe.customers.create({
			name: teamId,
			email: session.user.email
		});

		await convex.mutation(api.team.updateStripeCustomer, {
			stripeCustomer: stripeCustomer.id,
			teamId
		});

		team = await convex.query(api.team.get, { id: teamId });
		if (!team) return error(404, 'This team was not found in our database');
	}

	const customer = await stripe.customers.retrieve(team.stripeCustomer, {
		expand: ['subscriptions']
	});

	if (customer.subscriptions.total_count === 0) {
		return error(402, {
			data: { isAdmin, teamId: params.uid },
			message: 'This teams subscription has not been setup.'
		});
	}

	const subscription = customer.subscriptions.data[0];

	if (subscription.status === 'trialing' || subscription.status === 'active') {
		return { isAdmin, team };
	}

	return error(402, {
		data: { isAdmin },
		message: 'The subscription for this team is inactive'
	});
};
