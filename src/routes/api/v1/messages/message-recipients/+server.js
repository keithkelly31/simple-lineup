/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	console.log(request.body.record);
	return new Response();
}
