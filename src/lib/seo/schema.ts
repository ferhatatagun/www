import { siteOrigin } from '$lib/data/site';

/**
 * Central SEO helpers.
 *
 * Every page used to hand-roll its own meta tags and JSON-LD, which is why
 * half of them had no structured data at all and several shipped 300-character
 * meta descriptions. This module is the single source of truth: entity @ids,
 * description clamping, and typed schema builders.
 */

export const SITE = {
	origin: siteOrigin,
	name: 'Ferhat Atagün',
	/** Stable @id every schema on the site points at, so Google resolves one entity. */
	personId: `${siteOrigin}/#person`,
	websiteId: `${siteOrigin}/#website`,
	defaultImage: `${siteOrigin}/icons/fa-fav-icon.png`,
	twitter: '@ferhatatagun'
} as const;

/**
 * Google truncates meta descriptions around 155-160 characters. Anything longer
 * is wasted, and a mid-word cut looks careless in the SERP, so clamp on a word
 * boundary and add an ellipsis.
 */
export function clampDescription(text: string, max = 155): string {
	// Several `description` fields are raw README content, so they arrive with
	// markup and entities in them. A meta description containing `<h1 align=
	// "center">` is worse than no description at all — strip to plain text
	// before measuring.
	const plain = text
		.replace(/<[^>]*>/g, ' ')
		.replace(/&(?:nbsp|amp|quot|#39|lt|gt);/g, (m) =>
			m === '&amp;' ? '&' : m === '&lt;' ? '<' : m === '&gt;' ? '>' : m === '&quot;' ? '"' : m === '&#39;' ? "'" : ' '
		)
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '')  // markdown images
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // markdown links → their text
		.replace(/[*_`>#]/g, '')
		.replace(/\s+/g, ' ')
		.trim();

	if (plain.length <= max) return plain;
	const cut = plain.slice(0, max - 1);
	const lastSpace = cut.lastIndexOf(' ');
	return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\-–—]$/, '')}…`;
}

/** The one Person node. Everything else references it by @id rather than repeating it. */
export function personRef() {
	return { '@type': 'Person', '@id': SITE.personId, name: SITE.name, url: SITE.origin };
}

export function breadcrumbSchema(trail: Array<{ name: string; url: string }>) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: trail.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			item: item.url
		}))
	};
}

export interface BlogPostingInput {
	title: string;
	description: string;
	slug: string;
	datePublished: string;
	dateModified?: string;
	tags?: string[];
	/** Body text, used to derive wordCount — a quality signal for article results. */
	body?: string;
	lang?: 'tr' | 'en';
}

export function blogPostingSchema(p: BlogPostingInput) {
	const url = `${SITE.origin}/blog/${p.slug}`;
	const image = `${SITE.origin}/og-cards/${p.slug}.png`;
	const words = p.body ? p.body.trim().split(/\s+/).length : undefined;

	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		'@id': `${url}#article`,
		headline: p.title.slice(0, 110), // Google ignores headlines over ~110 chars
		description: clampDescription(p.description, 300),
		url,
		// image is required for article rich results — without it the post is
		// eligible for nothing beyond a plain blue link.
		image: {
			'@type': 'ImageObject',
			url: image,
			width: 1200,
			height: 630
		},
		datePublished: p.datePublished,
		dateModified: p.dateModified ?? p.datePublished,
		author: personRef(),
		publisher: personRef(),
		mainEntityOfPage: { '@type': 'WebPage', '@id': url },
		inLanguage: p.lang === 'tr' ? 'tr-TR' : 'en',
		isPartOf: { '@id': SITE.websiteId },
		...(p.tags?.length ? { keywords: p.tags.join(', '), articleSection: p.tags[0] } : {}),
		...(words ? { wordCount: words } : {})
	};
}

export interface SoftwareAppInput {
	name: string;
	description: string;
	slug: string;
	liveUrl?: string;
	repoUrl?: string;
	image?: string;
}

export function softwareApplicationSchema(a: SoftwareAppInput) {
	const url = `${SITE.origin}/projects/${a.slug}`;
	return {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		'@id': `${url}#software`,
		name: a.name,
		description: clampDescription(a.description, 300),
		url: a.liveUrl ?? url,
		applicationCategory: 'DeveloperApplication',
		operatingSystem: 'Any (browser-based)',
		author: personRef(),
		// Free + open source. Google surfaces the price line in software results.
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
		isPartOf: { '@id': SITE.websiteId },
		...(a.image ? { image: a.image } : {}),
		...(a.repoUrl ? { codeRepository: a.repoUrl } : {})
	};
}

export function profilePageSchema(opts: { description: string; url: string }) {
	return {
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		'@id': `${opts.url}#profilepage`,
		url: opts.url,
		description: clampDescription(opts.description, 300),
		mainEntity: { '@id': SITE.personId },
		isPartOf: { '@id': SITE.websiteId }
	};
}

export function webApplicationSchema(opts: {
	name: string;
	description: string;
	url: string;
	category?: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		'@id': `${opts.url}#webapp`,
		name: opts.name,
		description: clampDescription(opts.description, 300),
		url: opts.url,
		applicationCategory: opts.category ?? 'GameApplication',
		operatingSystem: 'Any (browser-based)',
		browserRequirements: 'Requires JavaScript',
		author: personRef(),
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
		isPartOf: { '@id': SITE.websiteId }
	};
}

export function collectionPageSchema(opts: {
	name: string;
	description: string;
	url: string;
	items?: Array<{ name: string; url: string }>;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		'@id': `${opts.url}#collection`,
		name: opts.name,
		description: clampDescription(opts.description, 300),
		url: opts.url,
		author: personRef(),
		isPartOf: { '@id': SITE.websiteId },
		...(opts.items?.length
			? {
					mainEntity: {
						'@type': 'ItemList',
						itemListElement: opts.items.map((it, i) => ({
							'@type': 'ListItem',
							position: i + 1,
							name: it.name,
							url: it.url
						}))
					}
				}
			: {})
	};
}

/** Generic fallback so no page ships with zero structured data. */
export function webPageSchema(opts: { name: string; description: string; url: string }) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': `${opts.url}#webpage`,
		name: opts.name,
		description: clampDescription(opts.description, 300),
		url: opts.url,
		isPartOf: { '@id': SITE.websiteId },
		about: { '@id': SITE.personId }
	};
}
