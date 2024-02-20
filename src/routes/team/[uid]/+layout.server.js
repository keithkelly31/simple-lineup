import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals: { stripe, supabase }, params, parent }) {
	const { session } = await parent();
	if (!session) return redirect(307, '/auth/signin');

	let customer = null;
	let subscription = null;

	const { error: err, count } = await supabase
		.from('team_members')
		.select('*', { count: 'exact', head: true })
		.eq('member', session.user.id)
		.eq('team', params.uid);
	if (err)
		return error(500, {
			message: 'There was an error retrieving your team membership status from the database.',
			redirect: `/team/${params.uid}`
		});

	if (count === 0)
		return error(401, {
			message:
				"You are not a member of this team. If you believe this is a mistake, please contact your team's administrator."
		});

	const { data: team, error: dbErr } = await supabase
		.from('teams')
		.select('*')
		.eq('id', params.uid)
		.single();
	if (dbErr)
		return error(500, {
			message: "There was an error retrieving this team's information from the database.",
			redirect: `/team/${params.uid}`
		});

	try {
		customer = await stripe.customers.retrieve(team.stripe_customer, {
			expand: ['subscriptions']
		});
	} catch (err) {
		return error(500, {
			message: "There was an error retrieving this team's subscription information.",
			redirect: `/team/${params.uid}`
		});
	}

	return {
		isAdmin: session.user.id === team.admin,
		subscription: customer.subscriptions.total_count === 1 ? customer.subscriptions.data[0] : null,
		team
	};
}
