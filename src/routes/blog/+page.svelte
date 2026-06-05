<script lang="ts">
	import {
		getReadingMinutes,
		sortedItems,
		title,
		hasPostContent,
		getPostTitle,
		getPostExcerpt,
		type BlogPost,
		type ContentLang
	} from '@data/blog';
	import { base } from '$app/paths';
	import CommonPage from '$lib/components/CommonPage.svelte';
	import { titleSuffix } from '@data/app';
	import { useTitle } from '$lib/utils/helpers';
	import { siteOrigin } from '$lib/data/site';

	const pageTitle = useTitle(title, titleSuffix);
	const canonical = `${siteOrigin}/blog`;
	const description = 'AI dev-tools, the Claude API, agent design, and frontend notes — by Ferhat Atagün.';

	/** Curated topic chips — hand-picked from the high-volume tags, in display order */
	const curatedTopics = [
		{ key: 'AI', label: 'AI' },
		{ key: 'Claude', label: 'Claude' },
		{ key: 'Agents', label: 'Agents' },
		{ key: 'Prompt Engineering', label: 'Prompt' },
		{ key: 'Observability', label: 'Observability' },
		{ key: 'Cursor', label: 'Cursor' },
		{ key: 'Open Source', label: 'Open source' }
	];

	/** Posts I want pinned at the top, in order */
	const featuredSlugs = [
		'four-tools-in-two-weekends',
		'browser-only-claude-streaming',
		'prompt-caching-nobody-measures'
	];

	type Lang = 'all' | 'en' | 'tr';
	let selectedLang: Lang = 'all';
	let selectedTopic: string | null = null;

	/** Determine the primary language of a post by which content map it lives in */
	function postLang(p: BlogPost): 'en' | 'tr' {
		// EN-only posts have content only in the EN map; same for TR
		const hasEn = hasPostContent(p.slug, 'en');
		const hasTr = hasPostContent(p.slug, 'tr');
		if (hasEn && !hasTr) return 'en';
		if (hasTr && !hasEn) return 'tr';
		// Dual-language posts: classify by whether title contains TR-specific characters
		return /[şçğıöüŞÇĞİÖÜ]/.test(p.title) ? 'tr' : 'en';
	}

	$: featuredPosts = featuredSlugs
		.map((s) => sortedItems.find((p) => p.slug === s))
		.filter((p): p is BlogPost => !!p);

	$: filteredPosts = sortedItems
		.filter((p) => !featuredSlugs.includes(p.slug))
		.filter((p) => {
			if (selectedLang === 'all') return true;
			return postLang(p) === selectedLang;
		})
		.filter((p) => {
			if (!selectedTopic) return true;
			return p.tags.some((t) => t.toLowerCase() === selectedTopic!.toLowerCase());
		});

	function resetFilters() {
		selectedLang = 'all';
		selectedTopic = null;
	}

	function goRandom() {
		const pool = [...featuredPosts, ...filteredPosts];
		if (pool.length === 0) return;
		const random = pool[Math.floor(Math.random() * pool.length)];
		window.location.href = `${base}/blog/${random.slug}`;
	}

	function langOf(p: BlogPost): 'en' | 'tr' {
		return postLang(p);
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
	<meta property="og:image" content={`${siteOrigin}/og-cards/_blog-index.png`} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:site_name" content="Ferhat Atagün" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={`${siteOrigin}/og-cards/_blog-index.png`} />
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
	<div class="blog-page col gap-8">
		<!-- HERO -->
		<header class="blog-hero">
			<div class="blog-hero__eyebrow">
				{sortedItems.length} posts · EN + TR · RSS available
			</div>
			<h2 class="blog-hero__title">
				Notes on shipping <span class="accent">AI dev-tools</span>, the Claude API,
				agent design, and the frontend craft underneath.
			</h2>
			<p class="blog-hero__sub">
				Written while building <a class="hero-link" href={`${base}/tools`}>a four-tool open-source suite</a>
				for the Anthropic Messages API. Each post is the long-form behind a decision.
			</p>
		</header>

		<!-- FEATURED -->
		{#if featuredPosts.length > 0}
			<section class="col gap-3">
				<div class="section-label">
					<span class="section-dot"></span>
					Start here
				</div>
				<div class="featured-grid">
					{#each featuredPosts as post (post.slug)}
						{@const lang = langOf(post)}
						{@const minutes = getReadingMinutes(post.slug)}
						<a
							href={`${base}/blog/${post.slug}`}
							class="featured-card decoration-none"
							data-lang={lang}
						>
							<div class="featured-card__meta">
								<span class="lang-pill" data-lang={lang}>{lang.toUpperCase()}</span>
								<time datetime={post.date}>
									{new Date(post.date).toLocaleDateString('en-GB', {
										year: 'numeric',
										month: 'short',
										day: 'numeric'
									})}
								</time>
								{#if minutes > 0}
									<span class="dot">·</span>
									<span>{minutes} min</span>
								{/if}
							</div>
							<h3 class="featured-card__title">{post.title}</h3>
							<p class="featured-card__excerpt">{post.excerpt}</p>
							<div class="featured-card__arrow">Read →</div>
						</a>
					{/each}
				</div>
			</section>
		{/if}

		<!-- FILTERS -->
		<section class="filters col gap-3">
			<div class="section-label">
				<span class="section-dot"></span>
				All posts
			</div>

			<div class="filters__row">
				<!-- Language tabs -->
				<div class="lang-tabs" role="tablist" aria-label="Language">
					<button
						type="button"
						role="tab"
						aria-selected={selectedLang === 'all'}
						class="lang-tab"
						class:lang-tab--active={selectedLang === 'all'}
						on:click={() => (selectedLang = 'all')}
					>
						All
					</button>
					<button
						type="button"
						role="tab"
						aria-selected={selectedLang === 'en'}
						class="lang-tab"
						class:lang-tab--active={selectedLang === 'en'}
						on:click={() => (selectedLang = 'en')}
					>
						EN
					</button>
					<button
						type="button"
						role="tab"
						aria-selected={selectedLang === 'tr'}
						class="lang-tab"
						class:lang-tab--active={selectedLang === 'tr'}
						on:click={() => (selectedLang = 'tr')}
					>
						TR
					</button>
				</div>

				<button type="button" class="random-btn" on:click={goRandom} aria-label="Random post">
					<span class="random-btn__icon">⤳</span>
					Random
				</button>
			</div>

			<!-- Curated topic chips -->
			<div class="topics">
				<button
					type="button"
					class="topic-chip"
					class:topic-chip--active={!selectedTopic}
					on:click={() => (selectedTopic = null)}
				>
					Everything
				</button>
				{#each curatedTopics as t}
					<button
						type="button"
						class="topic-chip"
						class:topic-chip--active={selectedTopic?.toLowerCase() === t.key.toLowerCase()}
						on:click={() =>
							(selectedTopic = selectedTopic?.toLowerCase() === t.key.toLowerCase() ? null : t.key)}
					>
						{t.label}
					</button>
				{/each}
			</div>

			{#if selectedLang !== 'all' || selectedTopic}
				<div class="active-filters">
					<span>Filtering:</span>
					{#if selectedLang !== 'all'}
						<span class="active-chip">{selectedLang.toUpperCase()}</span>
					{/if}
					{#if selectedTopic}
						<span class="active-chip">{selectedTopic}</span>
					{/if}
					<button type="button" class="reset-btn" on:click={resetFilters}>Reset</button>
					<span class="result-count">· {filteredPosts.length} of {sortedItems.length - featuredSlugs.length}</span>
				</div>
			{/if}
		</section>

		<!-- POSTS GRID -->
		{#if filteredPosts.length === 0}
			<div class="empty-state">
				<p class="empty-state__msg">No posts match this combination.</p>
				<button type="button" class="reset-btn" on:click={resetFilters}>Reset filters</button>
			</div>
		{:else}
			<div class="posts-grid">
				{#each filteredPosts as post (post.slug)}
					{@const lang = langOf(post)}
					{@const minutes = getReadingMinutes(post.slug)}
					<a href={`${base}/blog/${post.slug}`} class="post-card decoration-none" data-lang={lang}>
						<div class="post-card__meta">
							<span class="lang-pill" data-lang={lang}>{lang.toUpperCase()}</span>
							<time datetime={post.date}>
								{new Date(post.date).toLocaleDateString('en-GB', {
									year: 'numeric',
									month: 'short',
									day: 'numeric'
								})}
							</time>
							{#if minutes > 0}
								<span class="dot">·</span>
								<span>{minutes} min</span>
							{/if}
						</div>
						<h3 class="post-card__title">{post.title}</h3>
						<p class="post-card__excerpt">{post.excerpt}</p>
						<div class="post-card__tags">
							{#each post.tags.slice(0, 4) as tag}
								<span class="tag-mini">{tag}</span>
							{/each}
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</CommonPage>

<style lang="scss">
	.blog-page {
		max-width: 1100px;
		margin: 0 auto;
	}

	/* --- HERO --- */
	.blog-hero {
		padding: 28px 0 8px;
	}
	.blog-hero__eyebrow {
		font-family: ui-monospace, 'SF Mono', Monaco, monospace;
		font-size: 0.75rem;
		letter-spacing: 0.06em;
		color: var(--tertiary-text);
		margin-bottom: 14px;
		text-transform: uppercase;
	}
	.blog-hero__title {
		font-size: clamp(1.5rem, 2.6vw, 2rem);
		font-weight: 700;
		line-height: 1.2;
		color: var(--main-text);
		margin: 0 0 12px 0;
		max-width: 820px;
		letter-spacing: -0.01em;
	}
	.accent {
		background: linear-gradient(135deg, #a78bfa 0%, #f472b6 100%);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}
	.blog-hero__sub {
		font-size: 1rem;
		color: var(--secondary-text);
		font-weight: 300;
		max-width: 720px;
		margin: 0;
		line-height: 1.55;
	}
	.hero-link {
		color: #a78bfa;
		text-decoration: none;
		border-bottom: 1px solid rgba(167, 139, 250, 0.4);
		transition: border-color 0.2s;
	}
	.hero-link:hover {
		border-bottom-color: #a78bfa;
	}

	/* --- SECTION LABEL --- */
	.section-label {
		display: flex;
		align-items: center;
		gap: 8px;
		font-family: ui-monospace, 'SF Mono', Monaco, monospace;
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--tertiary-text);
		font-weight: 500;
	}
	.section-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #8b5cf6;
		box-shadow: 0 0 8px rgba(139, 92, 246, 0.6);
	}

	/* --- FEATURED --- */
	.featured-grid {
		display: grid;
		gap: 14px;
		grid-template-columns: 1.5fr 1fr 1fr;

		@media (max-width: 900px) {
			grid-template-columns: 1fr;
		}
	}
	.featured-card {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 20px 22px;
		border-radius: 12px;
		border: 1px solid var(--border);
		background: var(--main);
		color: var(--main-text);
		transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
		position: relative;
		overflow: hidden;
	}
	.featured-card:hover {
		border-color: #8b5cf6;
		transform: translateY(-2px);
		box-shadow: 0 0 24px rgba(139, 92, 246, 0.15);
	}
	.featured-card:first-child {
		grid-row: span 1;
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.06) 0%, rgba(244, 114, 182, 0.04) 100%);
	}
	.featured-card__meta {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.8rem;
		color: var(--tertiary-text);
		font-weight: 300;
	}
	.featured-card__title {
		font-size: 1.1rem;
		font-weight: 600;
		line-height: 1.3;
		color: var(--main-text);
		margin: 4px 0 4px 0;
	}
	.featured-card:first-child .featured-card__title {
		font-size: 1.25rem;
	}
	.featured-card__excerpt {
		color: var(--secondary-text);
		font-size: 0.92rem;
		font-weight: 300;
		line-height: 1.5;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.featured-card__arrow {
		margin-top: auto;
		padding-top: 8px;
		font-size: 0.85rem;
		font-weight: 500;
		color: #a78bfa;
	}

	/* --- LANG PILL --- */
	.lang-pill {
		font-family: ui-monospace, 'SF Mono', Monaco, monospace;
		font-size: 0.62rem;
		font-weight: 600;
		padding: 2px 6px;
		border-radius: 3px;
		letter-spacing: 0.06em;
	}
	.lang-pill[data-lang='en'] {
		background: rgba(139, 92, 246, 0.18);
		color: #a78bfa;
	}
	.lang-pill[data-lang='tr'] {
		background: rgba(244, 114, 182, 0.18);
		color: #f472b6;
	}
	.dot {
		opacity: 0.5;
	}

	/* --- FILTERS --- */
	.filters {
		padding-top: 8px;
	}
	.filters__row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 12px;
	}
	.lang-tabs {
		display: inline-flex;
		padding: 3px;
		gap: 2px;
		border-radius: 8px;
		background: var(--main-hover);
		border: 1px solid var(--border);
	}
	.lang-tab {
		padding: 5px 14px;
		border: none;
		background: transparent;
		color: var(--tertiary-text);
		font-size: 0.8rem;
		font-weight: 500;
		font-family: ui-monospace, 'SF Mono', Monaco, monospace;
		letter-spacing: 0.04em;
		border-radius: 5px;
		cursor: pointer;
		transition: background 0.2s, color 0.2s;
	}
	.lang-tab:hover {
		color: var(--main-text);
	}
	.lang-tab--active {
		background: var(--main);
		color: var(--main-text);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}
	.random-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 7px 14px;
		font-size: 0.82rem;
		font-weight: 500;
		border-radius: 8px;
		border: 1px solid var(--border);
		background: var(--main);
		color: var(--secondary-text);
		cursor: pointer;
		transition: border-color 0.2s, color 0.2s;
	}
	.random-btn:hover {
		border-color: #8b5cf6;
		color: #a78bfa;
	}
	.random-btn__icon {
		font-size: 1.1rem;
		display: inline-block;
		transform: translateY(-1px);
	}

	.topics {
		display: flex;
		flex-wrap: wrap;
		gap: 7px;
	}
	.topic-chip {
		padding: 5px 12px;
		font-size: 0.78rem;
		font-weight: 500;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: transparent;
		color: var(--secondary-text);
		cursor: pointer;
		transition: border-color 0.2s, background 0.2s, color 0.2s;
	}
	.topic-chip:hover {
		border-color: var(--border-hover);
		color: var(--main-text);
	}
	.topic-chip--active {
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(244, 114, 182, 0.08) 100%);
		border-color: #8b5cf6;
		color: #a78bfa;
	}

	.active-filters {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 8px;
		font-size: 0.78rem;
		color: var(--tertiary-text);
		font-weight: 300;
	}
	.active-chip {
		background: rgba(139, 92, 246, 0.12);
		color: #a78bfa;
		padding: 2px 8px;
		border-radius: 4px;
		font-family: ui-monospace, monospace;
		font-size: 0.72rem;
	}
	.reset-btn {
		background: none;
		border: none;
		color: #a78bfa;
		font-size: 0.78rem;
		font-weight: 500;
		cursor: pointer;
		padding: 2px 0;
		text-decoration: underline;
		text-underline-offset: 2px;
		text-decoration-color: rgba(167, 139, 250, 0.4);
	}
	.reset-btn:hover {
		text-decoration-color: #a78bfa;
	}
	.result-count {
		color: var(--tertiary-text);
		font-family: ui-monospace, monospace;
		font-size: 0.72rem;
	}

	/* --- POSTS GRID --- */
	.posts-grid {
		display: grid;
		gap: 14px;
		grid-template-columns: repeat(2, minmax(0, 1fr));

		@media (max-width: 900px) {
			grid-template-columns: 1fr;
		}
	}
	.post-card {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 18px 20px;
		border-radius: 10px;
		border: 1px solid var(--border);
		background: var(--main);
		color: var(--main-text);
		transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
	}
	.post-card:hover {
		border-color: var(--border-hover);
		transform: translateY(-1px);
	}
	.post-card[data-lang='en']:hover {
		border-color: #8b5cf6;
		box-shadow: 0 0 16px rgba(139, 92, 246, 0.1);
	}
	.post-card[data-lang='tr']:hover {
		border-color: #f472b6;
		box-shadow: 0 0 16px rgba(244, 114, 182, 0.1);
	}
	.post-card__meta {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.78rem;
		color: var(--tertiary-text);
		font-weight: 300;
	}
	.post-card__title {
		font-size: 1.05rem;
		font-weight: 600;
		line-height: 1.3;
		color: var(--main-text);
		margin: 4px 0 0 0;
	}
	.post-card__excerpt {
		color: var(--secondary-text);
		font-size: 0.88rem;
		font-weight: 300;
		line-height: 1.5;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.post-card__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
		margin-top: auto;
		padding-top: 4px;
	}
	.tag-mini {
		font-size: 0.7rem;
		padding: 2px 7px;
		border-radius: 3px;
		background: var(--main-hover);
		color: var(--tertiary-text);
		font-family: ui-monospace, monospace;
		font-weight: 400;
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		padding: 40px 0;
	}
	.empty-state__msg {
		color: var(--tertiary-text);
		font-size: 0.92rem;
		margin: 0;
	}
</style>
