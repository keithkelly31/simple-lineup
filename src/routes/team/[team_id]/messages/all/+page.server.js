/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { supabase }, params }) {
	const { data } = await supabase
		.from('view_all_messages_list')
		.select('*')
		.eq('team_id', params.team_id)
		.limit(20);
	return { messages: data || [] };
}
