import { error } from '@sveltejs/kit';
import { api } from '../../../convex/_generated/api';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { convex, stripe }, params, parent }) => {
	const { user } = await parent();

	const isMember = await convex.query(api.team.checkMembership, {
		teamId: params.uid,
		userId: user.id
	});
	if (!isMember) return error(401, 'You are not a member of this team');

	const team = await convex.query(api.team.get, { id: params.uid });
	const isAdmin = team?.admin === user.id;

	const customer = await stripe.customers.retrieve(team?.stripeCustomer, {
		expand: ['subscriptions']
	});

	if (customer.subscriptions.total_count === 0) {
		return error(402, {
			data: { isAdmin, teamId: params.uid, stripeCustomerId: team?.stripeCustomer },
			message: 'This teams subscription has not been setup.'
		});
	}

	const subscription = customer.subscriptions.data[0];

	if (subscription.status === 'trialing' || subscription.status === 'active') {
		return { isAdmin, team };
	}

	// TODO: Handle subscription states that are not trialing or active
	return error(400, 'There is an error with your subscription');
}) satisfies LayoutServerLoad;
