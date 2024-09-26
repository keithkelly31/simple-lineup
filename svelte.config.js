import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/components',
			$convex: 'src/convex',
			$stores: 'src/stores'
		},
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
