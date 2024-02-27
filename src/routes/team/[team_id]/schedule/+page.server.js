/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const events = [
		{ date: '2024-02-09', id: '1', time: '20:00', title: 'Game vs. Opponent 1' },
		{ date: '2024-02-16', id: '2', time: '22:30', title: 'Game vs. Opponent 2' }
	];

	return { events };
}
