
import * as defaultTheme from 'tailwindcss/defaultTheme';


export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {

			fontFamily: {
				sans: ['Roboto', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};

