import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	vitePlugin: {
		inspector: {
			showToggleButton: 'always'
		}
	},
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			// Use 200.html (not index.html) so the SPA fallback doesn't
			// overwrite the prerendered home page. With `fallback: 'index.html'`
			// the static adapter writes the fallback shell to index.html *after*
			// prerendering `/`, leaving a content-less SPA shell at the root
			// — invisible to Google and OG scrapers. 200.html keeps the SPA
			// safety net for unknown paths without clobbering /.
			fallback: '200.html',
			precompress: false,
			strict: true
		}),
		prerender: {
			// Markdown sources sometimes embed relative .md links (README
			// translations, /contributing.md, etc.) that don't exist as site
			// routes. Now that SSR actually parses the markdown into <a> tags,
			// the prerender crawler tries to fetch them and treats 404s as
			// build failures. Demote both to warnings so the prerender keeps
			// going — they're cosmetic links inside post bodies, not site
			// routes we own.
			handleHttpError: 'warn',
			handleMissingId: 'warn'
		},
		alias: {
			$lib: './src/lib',
			'@data': './src/lib/data',
			'@components': './src/lib/components',
			'@md': './src/lib/md',
			'@stores': './src/lib/stores',
			'@utils': './src/lib/utils'
		}
	}
};

export default config;
