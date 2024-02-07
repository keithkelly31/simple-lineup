/** @type {import('./$types').PageServerLoad} */
export async function load() {
	// let teams = [];
	let teams = [
		{ id: 1, name: 'Team 1' },
		{ id: 2, name: 'Team 2' }
	];
	return { teams };
}
