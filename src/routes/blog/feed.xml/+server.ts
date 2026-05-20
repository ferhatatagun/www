import type { RequestHandler } from '@sveltejs/kit';
import { sortedItems, title as blogTitle } from '@data/blog';
import { siteOrigin } from '$lib/data/site';

export const prerender = true;

const description =
	'Software, AI tools (MCP, GPT, Cursor) and frontend notes.';

function rfc822Date(iso: string): string {
	const d = new Date(iso);
	return d.toUTCString();
}

export const GET: RequestHandler = async ({ url }) => {
	const origin = url.origin.includes('sveltekit-prerender')
		? siteOrigin
		: url.origin.replace(/\/$/, '');

	const itemsXml = sortedItems
		.map(
			(post) =>
				`  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${origin}/blog/${post.slug}</link>
    <description>${escapeXml(post.excerpt)}</description>
    <pubDate>${rfc822Date(post.date)}</pubDate>
    <guid isPermaLink="true">${origin}/blog/${post.slug}</guid>
  </item>`
		)
		.join('\n');

	const xml =
		`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(blogTitle)} | Ferhat Atagün</title>
    <link>${origin}/blog</link>
    <description>${escapeXml(description)}</description>
    <language>en</language>
    <lastBuildDate>${rfc822Date(new Date().toISOString())}</lastBuildDate>
    <atom:link href="${origin}/blog/feed.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`.trim();

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};

function escapeXml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}
