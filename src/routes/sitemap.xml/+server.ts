import type { RequestHandler } from '@sveltejs/kit';
import { items as projectItems } from '@data/projects';
import { items as skillItems } from '@data/skills';
import { items as experienceItems } from '@data/experience';
import { items as blogItems } from '@data/blog';

const normalizePath = (path: string): string => {
	const normalized = path.startsWith('/') ? path : `/${path}`;
	return normalized.replace(/\/+$/, '') || '/';
};

export const GET: RequestHandler = async ({ url }) => {
	// Prerender sırasında doğru domain'i almak için
	const origin = url.origin.includes('sveltekit-prerender')
		? 'https://ferhatatagun.com'
		: url.origin.replace(/\/$/, '');

	const staticPages = [
		'/',
		'/blog',
		'/blog/feed.xml',
		'/projects',
		'/education',
		'/experience',
		'/skills',
		'/resume',
		'/search'
	];

	const projectPages = projectItems.map((p) => `/projects/${p.slug}`);
	const skillPages = skillItems.map((s) => `/skills/${s.slug}`);
	const experiencePages = experienceItems.map((e) => `/experience/${e.slug}`);
	const blogPages = blogItems.map((b) => `/blog/${b.slug}`);

	const pages = [...staticPages, ...projectPages, ...skillPages, ...experiencePages, ...blogPages];

	const lastMod = new Date().toISOString();

	const body =
		`<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
		pages
			.map((p) => {
				return `\n  <url>\n    <loc>${origin}${normalizePath(
					p
				)}</loc>\n    <lastmod>${lastMod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${
					p === '/' ? '1.0' : '0.6'
				}</priority>\n  </url>`;
			})
			.join('') +
		`\n</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};

export const prerender = true;
