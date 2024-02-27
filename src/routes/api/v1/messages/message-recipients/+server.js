/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	console.log(request.json());
	return new Response();
}
