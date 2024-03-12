/** @type {import('./$types').RequestHandler} */
export async function POST({ locals: { stripe }, request }) {
	const data = await request.json();
	console.log(data);

	return new Response();
}
