import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { supabase }, params }) {
	await new Promise((resolve) => {
		supabase
			.channel('team')
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'teams', filter: `id=eq.${params.uid}` },
				async (/** @type {any} */ payload) => {
					if (payload.new.active) resolve(null);
				}
			)
			.subscribe();
	});
	return redirect(307, `/teams/${params.uid}`);
}
