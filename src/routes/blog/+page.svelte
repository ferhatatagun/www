<script lang="ts">
	import { getAllTags, getReadingMinutes, sortedItems, title } from '@data/blog';
	import type { BlogPost } from '@data/blog';
	import { base } from '$app/paths';
	import Card from '$lib/components/Card/Card.svelte';
	import CommonPage from '$lib/components/CommonPage.svelte';
	import { titleSuffix } from '@data/app';
	import { useTitle } from '$lib/utils/helpers';
	import { siteOrigin } from '$lib/data/site';

	const pageTitle = useTitle(title, titleSuffix);
	const canonical = `${siteOrigin}/blog`;
	const description =
		'Software, AI tools (MCP, GPT, Cursor) and frontend notes.';

	const allTags = getAllTags();
	let selectedTag: string | null = null;
	$: filteredPosts = selectedTag
		? sortedItems.filter((p) => p.tags.includes(selectedTag!))
		: sortedItems;

	function goRandom() {
		if (filteredPosts.length === 0) return;
		const random = filteredPosts[Math.floor(Math.random() * filteredPosts.length)];
		window.location.href = `${base}/blog/${random.slug}`;
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<link rel="canonical" href={canonical} />
	<meta name="description" content={description} />
	<meta name="robots" content="index, follow" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content="Ferhat Atagün" />
	<link rel="alternate" type="application/rss+xml" title={pageTitle} href={`${siteOrigin}${base}/blog/feed.xml`} />
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: title,
		description,
		numberOfItems: sortedItems.length,
		itemListElement: sortedItems.map((post, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			url: `${siteOrigin}${base}/blog/${post.slug}`,
			name: post.title,
			description: post.excerpt,
			datePublished: post.date
		}))
	})}</script>`}
</svelte:head>

<CommonPage title={title}>
	<div class="blog-list col gap-6">
		<div class="blog-hero">
			<p class="text-[var(--tertiary-text)] font-light text-[1em] max-w-600px">
				Software development, <strong class="text-[var(--accent-text)]">AI tools</strong> (MCP, GPT, Cursor) and frontend notes.
			</p>
		</div>
		{#if allTags.length > 0}
			<div class="row flex-wrap gap-2 items-center">
				<button
					type="button"
					class="blog-tag-pill"
					class:blog-tag-pill--active={!selectedTag}
					on:click={() => (selectedTag = null)}
				>
					All
				</button>
				{#each allTags as tag}
					<button
						type="button"
						class="blog-tag-pill"
						class:blog-tag-pill--active={selectedTag === tag}
						on:click={() => (selectedTag = tag)}
					>
						{tag}
					</button>
				{/each}
			</div>
		{/if}
		{#if filteredPosts.length > 1}
			<button
				type="button"
				class="blog-random-btn"
				on:click={goRandom}
			>
				Random post
			</button>
		{/if}
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
			{#each filteredPosts as post (post.slug)}
				<a
					href={`${base}/blog/${post.slug}`}
					class="blog-card-link decoration-none text-inherit"
				>
					<Card
						classes={['blog-card cursor-pointer h-full']}
						tiltDegree={2}
						color="#6366f1"
					>
						<div class="col gap-2">
							<div class="text-[var(--tertiary-text)] text-[0.85em] font-300 row flex-wrap gap-x-1">
								<time datetime={post.date}>
									{new Date(post.date).toLocaleDateString('tr-TR', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</time>
								{#if getReadingMinutes(post.slug) > 0}
									<span>· {getReadingMinutes(post.slug)} dk</span>
								{/if}
							</div>
							<h2 class="text-[1.1em] font-600 m-0 text-[var(--main-text)]">
								{post.title}
							</h2>
							<p class="text-[var(--tertiary-text)] text-[0.95em] font-300 m-0 line-clamp-3">
								{post.excerpt}
							</p>
							<div class="row flex-wrap gap-2 mt-2">
								{#each post.tags as tag}
									<span
										class="text-[0.75em] px-2 py-0.5 rounded bg-[var(--main-hover)] text-[var(--secondary-text)]"
									>
										{tag}
									</span>
								{/each}
							</div>
						</div>
					</Card>
				</a>
			{/each}
		</div>
		{#if filteredPosts.length === 0}
			<p class="text-[var(--tertiary-text)] font-300 text-[0.95em]">No posts found for this tag.</p>
		{/if}
	</div>
</CommonPage>

<style lang="scss">
	.blog-hero {
		padding: 0.75rem 1rem;
		border-left: 4px solid #8b5cf6;
		background: var(--ai-gradient-subtle);
		border-radius: 0 8px 8px 0;
	}
	.blog-list {
		.line-clamp-3 {
			display: -webkit-box;
			-webkit-line-clamp: 3;
			line-clamp: 3;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
	}
	.blog-tag-pill {
		padding: 0.35rem 0.75rem;
		font-size: 0.8rem;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: var(--main);
		color: var(--secondary-text);
		cursor: pointer;
		transition: border-color 0.2s, background 0.2s;
	}
	.blog-tag-pill:hover {
		background: var(--main-hover);
		border-color: var(--border-hover);
	}
	.blog-tag-pill--active {
		background: var(--ai-gradient-subtle);
		border-color: #8b5cf6;
		color: #a78bfa;
	}
	.blog-random-btn {
		padding: 0.4rem 0.75rem;
		font-size: 0.8rem;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: var(--main);
		color: var(--tertiary-text);
		cursor: pointer;
		transition: border-color 0.2s, color 0.2s;
	}
	.blog-random-btn:hover {
		border-color: #8b5cf6;
		color: #a78bfa;
	}
	.blog-card-link:hover :global(.blog-card) {
		border-color: var(--border-hover);
		box-shadow: 0 0 24px var(--ai-glow), 0 0 40px var(--ai-glow-strong);
	}
</style>
