import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		csp: {
			directives: {
				'script-src': ['self', 'unsafe-inline', 'https://plausible.io/js/script.js'],
				'object-src': ['none'],
				'base-uri': ['self']
			}
		}
	},
	preprocess: vitePreprocess()
};

export default config;
