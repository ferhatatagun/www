import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	// Prerender sırasında doğru domain'i almak için
	const origin = url.origin.includes('sveltekit-prerender')
		? 'https://ferhatatagun.com'
		: url.origin.replace(/\/$/, '');
	const sitemap = `${origin}/sitemap.xml`;
	const body = `User-agent: *\nAllow: /\nSitemap: ${sitemap}\n`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain'
		}
	});
};

export const prerender = true;
