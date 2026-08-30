<script lang="ts">
	import { SITE, clampDescription } from '$lib/seo/schema';

	/** Full <title> text. Should already include the site name where appropriate. */
	export let title: string;
	/** Raw description — clamped to ~155 chars automatically. */
	export let description: string;
	/** Absolute canonical URL. */
	export let canonical: string;
	/** Absolute og:image URL. Falls back to the site icon. */
	export let image: string = SITE.defaultImage;
	export let type: 'website' | 'article' | 'profile' = 'website';
	/** JSON-LD objects to emit. Every page should ship at least one. */
	export let schemas: Array<Record<string, unknown>> = [];
	/** Alternate language versions: [{ lang: 'tr', href }, …]. */
	export let alternates: Array<{ lang: string; href: string }> = [];
	export let noindex = false;
	export let publishedTime: string | undefined = undefined;
	export let modifiedTime: string | undefined = undefined;

	$: desc = clampDescription(description);

	/* x-default has to be the same URL on every page in a translation cluster.
	   Pointing it at each page's own canonical makes the two versions disagree
	   about which one is the fallback, which is the one thing the annotation
	   exists to settle. English is the sensible default for a reader whose
	   language we don't publish in. */
	$: xDefault = alternates.find((a) => a.lang === 'en')?.href ?? canonical;
</script>

<svelte:head>
	<title>{title}</title>
	<link rel="canonical" href={canonical} />
	<meta name="description" content={desc} />
	<meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={desc} />
	<meta property="og:site_name" content={SITE.name} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={desc} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:creator" content={SITE.twitter} />

	{#if publishedTime}
		<meta property="article:published_time" content={publishedTime} />
	{/if}
	{#if modifiedTime}
		<meta property="article:modified_time" content={modifiedTime} />
	{/if}

	{#each alternates as alt}
		<link rel="alternate" hreflang={alt.lang} href={alt.href} />
	{/each}
	{#if alternates.length}
		<link rel="alternate" hreflang="x-default" href={xDefault} />
	{/if}

	{#each schemas as schema}
		{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
	{/each}
</svelte:head>
