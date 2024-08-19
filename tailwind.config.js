
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {
			colors: {
				primary: colors.amber,
				secondary: colors.slate
			},
			fontFamily: {
				sans: 'Inter Variable',
				...defaultTheme.fontFamily.sans
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
