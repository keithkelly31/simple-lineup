/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const roster = [
		{ active: false, member: { id: 3, first_name: 'Ed', last_name: 'Bernot' } },
		{ active: true, member: { id: 1, first_name: 'Keith', last_name: 'Kelly' } },
		{ active: true, member: { id: 2, first_name: 'Russ', last_name: 'Shine' } }
	];
	return { roster };
}
