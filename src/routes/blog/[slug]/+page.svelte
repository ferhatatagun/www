<script lang="ts">
	import Markdown from '$lib/components/Markdown.svelte';
	import CommonPage from '$lib/components/CommonPage.svelte';
	import { titleSuffix } from '@data/app';
	import { useTitle } from '$lib/utils/helpers';
	import { siteOrigin } from '$lib/data/site';
	import { base } from '$app/paths';
	import { getPostTitle, getPostExcerpt } from '@data/blog';
	import type { ContentLang } from '@data/blog';

	export let data: {
		post: import('@data/blog').BlogPost | null;
		contentTr: string | null;
		contentEn: string | null;
		readingMinutes: number;
		relatedPosts: import('@data/blog').BlogPost[];
		prevPost: import('@data/blog').BlogPost | null;
		nextPost: import('@data/blog').BlogPost | null;
	};

	const post = data.post!;
	const contentTr = data.contentTr;
	const contentEn = data.contentEn;
	const readingMinutes = data.readingMinutes;
	const relatedPosts = data.relatedPosts;
	const prevPost = data.prevPost;
	const nextPost = data.nextPost;

	const hasTr = contentTr != null && contentTr.trim().length > 0;
	const hasEn = contentEn != null && contentEn.trim().length > 0;
	const hasBothLangs = hasTr && hasEn;
	let lang: ContentLang = !hasTr && hasEn ? 'en' : 'tr';

	$: displayTitle = getPostTitle(post, lang);
	$: displayExcerpt = getPostExcerpt(post, lang);
	$: currentContent = (lang === 'en' && contentEn) ? contentEn : (contentTr ?? contentEn);

	$: pageTitle = useTitle(displayTitle, titleSuffix);
	const canonical = `${siteOrigin}/blog/${post.slug}`;
	const ogImage = `${siteOrigin}/og-cards/${post.slug}.png`;

	$: shareText = encodeURIComponent(`${displayTitle} — Ferhat Atagün`);
	const shareUrl = encodeURIComponent(canonical);
	$: twitterShare = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
	const linkedInShare = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<link rel="canonical" href={canonical} />
	<meta name="description" content={displayExcerpt} />
	<meta name="robots" content="index, follow" />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={displayTitle} />
	<meta property="og:description" content={displayExcerpt} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:site_name" content="Ferhat Atagün" />
	<meta property="article:published_time" content={post.date} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={displayTitle} />
	<meta name="twitter:description" content={displayExcerpt} />
	<meta name="twitter:image" content={ogImage} />
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: displayTitle,
		description: displayExcerpt,
		datePublished: post.date,
		author: { '@type': 'Person', name: 'Ferhat Atagün', url: siteOrigin },
		publisher: { '@type': 'Organization', name: 'Ferhat Atagün', url: siteOrigin },
		mainEntityOfPage: { '@type': 'WebPage', '@id': canonical }
	})}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: siteOrigin },
			{ '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteOrigin}/blog` },
			{ '@type': 'ListItem', position: 3, name: displayTitle, item: canonical }
		]
	})}</script>`}
</svelte:head>

<CommonPage title={displayTitle}>
	<article class="blog-article blog-article--ai col gap-6">
		<header class="col gap-2">
			<div class="row flex-wrap items-center gap-3">
				<a
					href={`${base}/blog`}
					class="blog-article__back text-[0.9em] decoration-none hover:underline"
				>
					← Blog
				</a>
				{#if hasBothLangs}
					<nav class="blog-lang-switch row gap-0 rounded-lg overflow-hidden border border-[var(--border)]" aria-label="Content language">
						<button
							type="button"
							class="blog-lang-btn"
							class:blog-lang-btn--active={lang === 'tr'}
							on:click={() => (lang = 'tr')}
						>
							TR
						</button>
						<button
							type="button"
							class="blog-lang-btn"
							class:blog-lang-btn--active={lang === 'en'}
							on:click={() => (lang = 'en')}
						>
							EN
						</button>
					</nav>
				{/if}
				{#if post.sourceUrl}
					<a
						href={post.sourceUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="blog-source-link text-[0.85em] decoration-none"
						title="Source / original"
					>
						Source
					</a>
				{/if}
			</div>
			<div class="row flex-wrap items-center gap-2 text-[var(--tertiary-text)] text-[0.9em] font-300">
				<time datetime={post.date}>
					{new Date(post.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'tr-TR', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</time>
				{#if readingMinutes > 0}
					<span class="blog-meta-sep" aria-hidden="true">·</span>
					<span>{readingMinutes} min read</span>
				{/if}
			</div>
			<div class="row flex-wrap gap-2">
				{#each post.tags as tag}
					<span
						class="text-[0.8em] px-2 py-0.5 rounded bg-[var(--main-hover)] text-[var(--secondary-text)]"
					>
						{tag}
					</span>
				{/each}
			</div>
		</header>
		{#if currentContent}
			<div class="blog-article-body">
				{#key lang}
					<Markdown content={currentContent} />
				{/key}
			</div>
		{:else}
			<p class="text-[var(--tertiary-text)]">Content could not be loaded.</p>
		{/if}
		<section class="blog-share row flex-wrap gap-3 items-center pt-4" aria-label="Share">
			<span class="text-[var(--tertiary-text)] text-[0.9em]">Share:</span>
			<a
				href={twitterShare}
				target="_blank"
				rel="noopener noreferrer"
				class="blog-share__link text-[0.9em] decoration-none"
			>Twitter</a>
			<a
				href={linkedInShare}
				target="_blank"
				rel="noopener noreferrer"
				class="blog-share__link text-[0.9em] decoration-none"
			>LinkedIn</a>
		</section>
		{#if relatedPosts.length > 0}
			<section class="blog-related pt-6 mt-6" aria-label="Related posts">
				<h2 class="text-[0.95em] font-600 m-0 mb-3 text-[var(--tertiary-text)]">Related posts</h2>
				<ul class="list-none p-0 m-0 col gap-2">
					{#each relatedPosts as related (related.slug)}
						<li>
							<a href={`${base}/blog/${related.slug}`} class="blog-nav__link text-[0.9em] decoration-none hover:underline">
								{related.title}
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/if}
		<nav class="blog-nav row flex-wrap gap-4 pt-6 mt-6" aria-label="Post navigation">
			{#if nextPost}
				<a href={`${base}/blog/${nextPost.slug}`} class="blog-nav__link text-[0.9em] decoration-none hover:underline">
					← {nextPost.title}
				</a>
			{/if}
			{#if prevPost}
				<a href={`${base}/blog/${prevPost.slug}`} class="blog-nav__link text-[0.9em] decoration-none hover:underline ml-auto">
					{prevPost.title} →
				</a>
			{/if}
		</nav>
	</article>
</CommonPage>

<style lang="scss">
	.blog-article--ai {
		position: relative;
		padding-top: 1rem;
	}
	.blog-article--ai::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		border-radius: 2px;
		background: var(--ai-gradient);
	}
	.blog-article__back,
	.blog-nav__link {
		color: #8b5cf6;
	}
	.blog-lang-switch {
		background: var(--main-hover);
	}
	.blog-lang-btn {
		padding: 0.35rem 0.65rem;
		font-size: 0.8rem;
		font-weight: 500;
		border: none;
		background: transparent;
		color: var(--tertiary-text);
		cursor: pointer;
		transition: color 0.15s, background 0.15s;
	}
	.blog-lang-btn:hover {
		color: var(--main-text);
	}
	.blog-lang-btn--active {
		background: var(--ai-gradient);
		color: var(--main);
	}
	.blog-source-link {
		color: var(--tertiary-text);
	}
	.blog-source-link:hover {
		color: #06b6d4;
		text-decoration: underline;
	}
	.blog-article__back:hover,
	.blog-nav__link:hover {
		color: #06b6d4;
	}
	.blog-share__link {
		color: #8b5cf6;
	}
	.blog-share__link:hover {
		text-decoration: underline;
	}
	.blog-related {
		border-top: 1px solid var(--border);
	}
	.blog-nav {
		border-top: 1px solid var(--border);
	}
	.blog-article-body :global(.markdown-container) {
		line-height: 1.7;
	}
	.blog-article-body :global(.markdown-container h1) {
		font-size: 1.5em;
		margin-top: 1.5em;
		margin-bottom: 0.5em;
	}
	.blog-article-body :global(.markdown-container h2) {
		font-size: 1.25em;
		margin-top: 1.25em;
		margin-bottom: 0.4em;
	}
	.blog-article-body :global(.markdown-container p) {
		margin-bottom: 1em;
	}
	.blog-article-body :global(.markdown-container ul),
	.blog-article-body :global(.markdown-container ol) {
		margin-bottom: 1em;
		padding-left: 1.5em;
	}
</style>
