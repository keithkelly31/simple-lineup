import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {};
}

/** @type { import("./$types").Actions } */
export const actions = {
	default: async ({ locals: { getSession, supabase }, request }) => {
		const session = await getSession();
		if (!session) return redirect(307, '/auth/signin');

		const form = await request.formData();
		const id = form.get('id');
		const password = form.get('password');

		const { data: team, error: teamErr } = await supabase
			.from('teams')
			.select('password')
			.eq('id', id)
			.single();
		if (teamErr)
			return fail(500, {
				error: true,
				message: "There was an error retrieving the team's information."
			});

		if (team.password !== password)
			return fail(401, {
				error: true,
				message:
					"The password provided does not match the team's password. Please double check the password entered."
			});

		const { count, error: checkErr } = await supabase
			.from('team_members')
			.select('*', { count: 'exact', head: true })
			.eq('member', session.user.id)
			.eq('team', id);
		if (checkErr)
			return fail(400, {
				error: true,
				message: 'There was an error verifying member eligibility.'
			});
		if (count !== 0)
			return fail(400, { error: true, message: 'You are already a member of the team.' });

		const { error: addErr } = await supabase
			.from('team_members')
			.insert({ member: session.user.id, team: id });
		if (addErr)
			return fail(400, {
				error: true,
				message: 'There was an error adding you to the team. Please try again.'
			});

		return {
			success: true,
			message: 'You have been added to the team. This team will now show up in your teams list.'
		};
	}
};
