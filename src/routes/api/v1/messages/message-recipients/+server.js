/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	console.log(await request.json());
	return new Response();
}
