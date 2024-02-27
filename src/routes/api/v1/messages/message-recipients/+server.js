/** @type {import('./$types').RequestHandler} */
export async function POST(event) {
	console.log('made it');
	console.log(event);
	return new Response();
}
