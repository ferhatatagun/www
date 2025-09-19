import extractorSvelte from '@unocss/extractor-svelte';
import { defineConfig, presetUno, presetWebFonts, presetIcons } from 'unocss';

export default defineConfig({
	extractors: [extractorSvelte()],
	content: {
		pipeline: {
			include: [
				/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
				// include js/ts files
				'src/**/*.{js,ts}'
			]
		}
	},
	cli: {
		entry: {
			patterns: ['src/**/*.{html,js,ts,svelte}'],
			outFile: 'static/uno.css'
		}
	},
	safelist: [
		// Navigation icons
		'i-carbon-code',
		'i-carbon-search',
		'i-carbon-moon',
		'i-carbon-sun',
		// Navbar icons
		'i-carbon-software-resource-cluster',
		'i-carbon-cube',
		'i-carbon-development',
		'i-carbon-education',
		'i-carbon-result',
		// Content icons
		'i-carbon-link',
		'i-carbon-text-font',
		'i-carbon-image',
		'i-carbon-search-locate-mirror'
	],
	presets: [
		presetUno(),
		presetWebFonts({
			fonts: {
				sans: {
					name: 'Inter',
					weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
					italic: true,
					provider: 'google'
				}
			}
		}),
		presetIcons({
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle'
			}
		})
	],
	shortcuts: [
		{
			col: 'flex flex-col',
			row: 'flex flex-row',

			'col-center': 'col justify-center items-center',
			'row-center': 'row justify-center items-center'
		}
	]
});
