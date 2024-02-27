import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ locals: { supabase }, params, request }) => {
		const form = await request.formData();
		const name = form.get('name');

		const { error } = await supabase.from('teams').update({ name }).eq('id', params.team_id);
		if (error)
			return fail(500, { error: true, message: "There was an error updating the team's name." });

		return { success: true, message: 'Name updated successfully.' };
	}
};
