/** @type {import('./$types').RequestHandler} */
export async function GET() {
	console.log('testing');
	return new Response();
}

/** @type {import('./$types').RequestHandler} */
export async function POST(event) {
	console.log(event);
	return new Response();
}
