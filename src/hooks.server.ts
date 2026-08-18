import type { Handle } from '@sveltejs/kit';
import { items as blogItems } from '@data/blog';

/**
 * Set `<html lang>` per page.
 *
 * app.html hard-codes `lang="en"`, so every Turkish post was served claiming
 * to be English. That's a wrong signal in two places: search engines use it to
 * decide which locale a result belongs in, and screen readers use it to pick a
 * speech synthesiser — a Turkish article read with English phonemes is
 * unintelligible.
 *
 * Turkish posts are identified from the blog data rather than a URL heuristic,
 * so a Turkish slug that happens to look English still resolves correctly.
 */

/** Slugs whose primary content is Turkish. */
const TR_SLUGS = new Set(
	blogItems
		.filter((p) => /[çğıöşüÇĞİÖŞÜ]/.test(p.title) || /[çğıöşüÇĞİÖŞÜ]/.test(p.excerpt))
		.map((p) => p.slug)
);

/** Non-blog routes that are Turkish-first. */
const TR_PATHS = new Set<string>();

function langFor(pathname: string): 'tr' | 'en' {
	const clean = pathname.replace(/\/+$/, '') || '/';
	if (TR_PATHS.has(clean)) return 'tr';
	const blogMatch = clean.match(/^\/blog\/(.+)$/);
	if (blogMatch && TR_SLUGS.has(blogMatch[1])) return 'tr';
	return 'en';
}

export const handle: Handle = async ({ event, resolve }) => {
	const lang = langFor(event.url.pathname);
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('<html lang="en">', `<html lang="${lang}">`)
	});
};
