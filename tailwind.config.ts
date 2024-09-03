import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				error: colors.rose,
				primary: colors.amber,
				secondary: colors.slate,
				success: colors.emerald
			},
			fontFamily: {
				sans: ['Nunito Variable', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: []
} satisfies Config;
