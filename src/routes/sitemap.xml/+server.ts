import type { RequestHandler } from '@sveltejs/kit';
import { items as projectItems } from '@data/projects';
import { items as skillItems } from '@data/skills';
import { items as experienceItems } from '@data/experience';
import { items as blogItems, latestPostDate, translationPairs } from '@data/blog';

const normalizePath = (path: string): string => {
	const normalized = path.startsWith('/') ? path : `/${path}`;
	return normalized.replace(/\/+$/, '') || '/';
};

interface Entry {
	path: string;
	/** YYYY-MM-DD. Real content dates, not build time. */
	lastmod: string;
	priority: string;
	changefreq: string;
	/** hreflang siblings, emitted as xhtml:link alternates. */
	alternates?: Array<{ lang: string; path: string }>;
}

export const GET: RequestHandler = async ({ url }) => {
	const origin = url.origin.includes('sveltekit-prerender')
		? 'https://ferhatatagun.com'
		: url.origin.replace(/\/$/, '');

	const buildDate = new Date().toISOString().slice(0, 10);
	const newestPost = latestPostDate();

	// Blog posts carry their own publication date. Everything else falls back to
	// the build date — but the listing pages track the newest post so their
	// freshness signal is real rather than "whenever CI last ran".
	const entries: Entry[] = [
		{ path: '/', lastmod: newestPost, priority: '1.0', changefreq: 'weekly' },
		{ path: '/tools', lastmod: newestPost, priority: '0.9', changefreq: 'weekly' },
		{ path: '/blog', lastmod: newestPost, priority: '0.9', changefreq: 'daily' },
		{ path: '/resume', lastmod: buildDate, priority: '0.8', changefreq: 'monthly' },
		{ path: '/experience', lastmod: buildDate, priority: '0.7', changefreq: 'monthly' },
		{ path: '/projects', lastmod: buildDate, priority: '0.7', changefreq: 'monthly' },
		{ path: '/skills', lastmod: buildDate, priority: '0.6', changefreq: 'monthly' },
		{ path: '/education', lastmod: buildDate, priority: '0.5', changefreq: 'yearly' },
		{ path: '/play', lastmod: buildDate, priority: '0.6', changefreq: 'monthly' },
		{ path: '/play/shell-quiz', lastmod: buildDate, priority: '0.6', changefreq: 'monthly' },
		{ path: '/blog/feed.xml', lastmod: newestPost, priority: '0.4', changefreq: 'daily' },
		{ path: '/search', lastmod: buildDate, priority: '0.3', changefreq: 'monthly' }
	];

	const pairFor = (slug: string) => translationPairs.find(([en, tr]) => slug === en || slug === tr);

	for (const post of blogItems) {
		const pair = pairFor(post.slug);
		entries.push({
			path: `/blog/${post.slug}`,
			lastmod: post.date,
			priority: '0.8',
			changefreq: 'monthly',
			alternates: pair
				? [
						{ lang: 'en', path: `/blog/${pair[0]}` },
						{ lang: 'tr', path: `/blog/${pair[1]}` }
					]
				: undefined
		});
	}

	for (const p of projectItems) {
		entries.push({
			path: `/projects/${p.slug}`,
			lastmod: buildDate,
			priority: '0.6',
			changefreq: 'monthly'
		});
	}
	for (const s of skillItems) {
		entries.push({
			path: `/skills/${s.slug}`,
			lastmod: buildDate,
			priority: '0.5',
			changefreq: 'monthly'
		});
	}
	for (const e of experienceItems) {
		entries.push({
			path: `/experience/${e.slug}`,
			lastmod: buildDate,
			priority: '0.5',
			changefreq: 'yearly'
		});
	}

	const body =
		`<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">` +
		entries
			.map((e) => {
				const alts = (e.alternates ?? [])
					.map(
						(a) =>
							`\n    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${origin}${normalizePath(a.path)}" />`
					)
					.join('');
				return (
					`\n  <url>` +
					`\n    <loc>${origin}${normalizePath(e.path)}</loc>` +
					`\n    <lastmod>${e.lastmod}</lastmod>` +
					`\n    <changefreq>${e.changefreq}</changefreq>` +
					`\n    <priority>${e.priority}</priority>` +
					alts +
					`\n  </url>`
				);
			})
			.join('') +
		`\n</urlset>`;

	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};

export const prerender = true;
