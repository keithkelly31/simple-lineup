/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	console.log(request.body);
	return new Response();
}
