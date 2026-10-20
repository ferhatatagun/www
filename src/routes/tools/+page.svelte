<script lang="ts">
	import { tools, suiteId, suiteName, suiteDescription, toolSchemaNodes } from '@data/tools';
	import { siteOrigin } from '$lib/data/site';
	import { base } from '$app/paths';
	import AICard from '$lib/components/AICard/AICard.svelte';
	import MainTitle from '$lib/components/MainTitle/MainTitle.svelte';
	import { breadcrumbSchema, clampDescription } from '$lib/seo/schema';

	const pageTitle = 'Open-source browser-only dev-tools — Ferhat Atagün';
	const description =
		'Seven open-source tools built for rooms where you can’t install anything and the data can’t leave — pre-flight a prompt, x-ray an API call, replay an agent trace, A/B test prompts, sandbox a tool-use loop, stress a JSON contract, and simulate a performance budget. Browser-only, no backend.';
	const canonical = `${siteOrigin}/tools`;
	/* PNG on purpose: it is the og:image, and some social scrapers still won't
	   render WebP. It is a composed 1200x630 card, not a screenshot. */
	const image = `${siteOrigin}/imgs/projects/tools-og.png`;

	/** ItemList schema that links the tools as a connected suite, all
	    authored by the canonical Person entity at /#person. Each tool's
	    layout JSON-LD references this CollectionPage by @id, closing the
	    graph: tool ↔ suite ↔ person. */
	const breadcrumb = breadcrumbSchema([
		{ name: 'Home', url: siteOrigin },
		{ name: 'Tools', url: `${siteOrigin}/tools` }
	]);

	const suiteJsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'CollectionPage',
				'@id': suiteId,
				name: suiteName,
				url: canonical,
				description: suiteDescription,
				author: { '@id': `${siteOrigin}/#person` },
				creator: { '@id': `${siteOrigin}/#person` }
			},
			{
				'@type': 'ItemList',
				name: `${tools.length} browser-only dev-tools`,
				numberOfItems: tools.length,
				itemListElement: toolSchemaNodes().map((item, i) => ({
					'@type': 'ListItem',
					position: i + 1,
					item
				}))
			}
		]
	};

	/** `guard-lab.vercel.app` for the faux address bar; the tool name if there is no live URL. */
	function hostOf(url: string | undefined, fallback: string): string {
		try {
			return url ? new URL(url).host : fallback;
		} catch {
			return fallback;
		}
	}

	function kindOf(t: (typeof tools)[number]): string {
		return t.type === 'AI Developer Tool' ? 'Claude API' : 'Web performance';
	}

	function linkTo(t: (typeof tools)[number], label: 'Live' | 'GitHub'): string | undefined {
		return t.links.find((l) => l.label === label)?.to;
	}

	/** Tool ↔ writing map. Each tool has at least one long-form post that explains
	    why it exists. Curated, not auto-derived. */
	const writingByTool: Record<
		string,
		Array<{ title: string; slug: string; lang: 'EN' | 'TR' }>
	> = {
		'guard-lab': [
			{
				title: "The failures that don't throw",
				slug: 'the-failures-that-dont-throw',
				lang: 'EN'
			},
			{
				title: 'Patlamayan hatalar',
				slug: 'patlamayan-hatalar',
				lang: 'TR'
			},
			{
				title: 'Two AI vulnerabilities that never throw an exception',
				slug: 'two-ai-vulnerabilities-that-never-throw',
				lang: 'EN'
			},
			{
				title: 'Hiç exception fırlatmayan iki yapay zeka açığı',
				slug: 'hic-exception-firlatmayan-iki-yapay-zeka-acigi',
				lang: 'TR'
			}
		],
		'perf-lab': [
			{
				title: '“That library will hurt performance” is not a number',
				slug: 'that-library-will-hurt-performance',
				lang: 'EN'
			},
			{
				title: '“Performansı bozar” dediğin şey bir sayı değil',
				slug: 'performansi-bozar-dedigin-sayi-degil',
				lang: 'TR'
			}
		],
		claudoscope: [
			{
				title: 'Building a streaming Claude client in the browser — without the SDK',
				slug: 'browser-only-claude-streaming',
				lang: 'EN'
			},
			{
				title: 'Prompt caching is the cheapest Claude optimization. Nobody measures it.',
				slug: 'prompt-caching-nobody-measures',
				lang: 'EN'
			},
			{
				title: 'Tarayıcıda Claude’a streaming çağrı — SDK olmadan',
				slug: 'tarayicida-claude-streaming-sdk-siz',
				lang: 'TR'
			},
			{
				title: "Prompt caching, Claude'un en ucuz optimizasyonu. Kimse ölçmüyor.",
				slug: 'prompt-caching-kimsenin-olcmedigi',
				lang: 'TR'
			}
		],
		'prompt-lab': [
			{
				title: "Your prompt isn't better. You just remember it being better.",
				slug: 'stop-choosing-prompts-by-vibes',
				lang: 'EN'
			},
			{
				title: "Prompt'un daha iyi değil. Sadece daha iyi hatırlıyorsun.",
				slug: 'prompt-secimi-his-degil-olcum',
				lang: 'TR'
			}
		],
		'tool-lab': [
			{
				title: 'Build the sandbox before you write a single tool',
				slug: 'build-the-sandbox-first',
				lang: 'EN'
			},
			{
				title: "Tek bir tool yazmadan önce sandbox'ı kur",
				slug: 'tek-bir-tool-yazmadan-once-sandbox',
				lang: 'TR'
			},
			{
				title: 'Two AI vulnerabilities that never throw an exception',
				slug: 'two-ai-vulnerabilities-that-never-throw',
				lang: 'EN'
			},
			{
				title: 'Hiç exception fırlatmayan iki yapay zeka açığı',
				slug: 'hic-exception-firlatmayan-iki-yapay-zeka-acigi',
				lang: 'TR'
			}
		],
		'agent-replay': [
			{
				title: 'How I debug Claude agents by replaying their trace',
				slug: 'debug-claude-agents-by-replaying-traces',
				lang: 'EN'
			},
			{
				title: "Claude agent'larını trace replay ile debug ediyorum",
				slug: 'claude-agent-debug-trace-replay',
				lang: 'TR'
			}
		],
		'context-lens': [
			{
				title: 'See the prompt before you ship it',
				slug: 'see-the-prompt-before-you-ship-it',
				lang: 'EN'
			},
			{
				title: "Prompt'u shiplemeden önce gör",
				slug: 'prompt-shipping-once-onunu-gor',
				lang: 'TR'
			}
		]
	};
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<link rel="canonical" href={canonical} />
	<meta name="description" content={clampDescription(description)} />
	<meta name="robots" content="index, follow" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={clampDescription(description)} />
	<meta property="og:image" content={image} />
	<meta property="og:site_name" content="Ferhat Atagün" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={clampDescription(description)} />
	<meta name="twitter:image" content={image} />
	{@html `<script type="application/ld+json">${JSON.stringify(suiteJsonLd)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>`}
</svelte:head>

<div class="tools-page p-x-6 md:p-x-10 p-y-8 max-w-1200px mx-auto w-full">
	<header class="text-center md:text-left">
		<MainTitle classes="md:text-left">Open-source dev-tools</MainTitle>
		<p
			class="text-[var(--tertiary-text)] text-[1.15em] font-300 max-w-720px mt-3 mx-auto md:mx-0 leading-relaxed"
		>
			{tools.length} small tools, one constraint: they have to work in a room where you can't
			install anything and the data can't leave. Browser-only, BYOK, no backend — not a stylistic
			choice, just what's left when the environment isn't yours.
		</p>
		<p
			class="tools-constraint text-[var(--secondary-text)] text-[0.95em] font-300 max-w-720px mt-4 mx-auto md:mx-0 leading-relaxed"
		>
			Six of them make the Claude API legible —
			<span class="text-[var(--accent-text)]">observe</span> a single call,
			<span class="text-[var(--accent-text)]">replay</span> an agent trace,
			<span class="text-[var(--accent-text)]">compare</span> prompts side by side,
			<span class="text-[var(--accent-text)]">build</span> a tool-use loop interactively,
			<span class="text-[var(--accent-text)]">pre-flight</span> a prompt before you send it,
			<span class="text-[var(--accent-text)]">stress</span> a structured-output contract until it
			breaks. The seventh does the same for a page's performance budget:
			<span class="text-[var(--accent-text)]">simulate</span> what removing a script would actually
			cost, before you spend a sprint finding out.
		</p>
	</header>

	<div class="tools-grid mt-8">
		{#each tools as t, i}
			{@const live = linkTo(t, 'Live')}
			{@const shot = t.screenshots?.[0]}
			<article class="tool-card" style:--tool-color={t.color}>
				<AICard>
					<div class="tool-card__body">
						{#if shot}
							<!-- One shared 16:10 slot for every tool: the frame reserves the box before
							     the image downloads (no layout shift) and keeps the grid aligned no
							     matter what shape the source screenshot was.

							     The first card is the LCP element on mobile (confirmed by a Lighthouse
							     run against the live page), so it loads eagerly at high priority; the
							     rest stay lazy. -->
							<a
								href={live ?? '#'}
								target="_blank"
								rel="noreferrer"
								class="tool-frame"
								aria-label={`Open ${t.name} live`}
							>
								<span class="tool-frame__bar" aria-hidden="true">
									<span class="tool-frame__dots"><i></i><i></i><i></i></span>
									<span class="tool-frame__url">{hostOf(live, t.name)}</span>
								</span>
								<span class="tool-frame__view">
									<img
										src={shot.src}
										alt={`${t.name} screenshot`}
										class="tool-frame__img"
										width={shot.width ?? 1600}
										height={shot.height ?? 1000}
										loading={i === 0 ? 'eager' : 'lazy'}
										decoding="async"
										fetchpriority={i === 0 ? 'high' : 'auto'}
									/>
									<span class="tool-frame__cta" aria-hidden="true">Open live →</span>
								</span>
							</a>
						{/if}
						<div class="tool-card__meta">
							<h2 class="tool-name" style:color={t.color}>{t.name}</h2>
							<span class="tool-kind">{kindOf(t)}</span>
						</div>
						<p class="tool-desc">{t.shortDescription}</p>
						<div class="tool-actions">
							{#each t.links as link}
								<a
									href={link.to}
									target="_blank"
									rel="noreferrer"
									class="tool-link"
									class:tool-link--primary={link.label === 'Live'}
								>
									{link.label} →
								</a>
							{/each}
						</div>
					</div>
				</AICard>
			</article>
		{/each}
	</div>

	<section class="writing-section mt-14">
		<h2 class="m-0 text-[1.5em] font-700 text-[var(--main-text)]">Read the writing</h2>
		<p class="text-[var(--tertiary-text)] text-[0.95em] font-300 mt-2 max-w-680px">
			Each tool has one or two long-form posts explaining the engineering decision
			behind it — the protocol-level details, the failure modes it surfaces, and what
			it changes about how you ship.
		</p>

		<div class="writing-grid mt-6">
			{#each tools as t}
				{@const posts = writingByTool[t.slug] ?? []}
				{#if posts.length}
					<div class="writing-card">
						<div class="writing-card__tool" style:color={t.color}>{t.name}</div>
						<ul class="writing-card__list">
							{#each posts as p}
								<li>
									<a class="writing-link" href={`${base}/blog/${p.slug}`}>
										<span class="writing-lang" data-lang={p.lang}>{p.lang}</span>
										<span>{p.title}</span>
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			{/each}
		</div>
	</section>

	<footer class="text-center md:text-left mt-12 text-[var(--tertiary-text)] text-[0.95em]">
		All {tools.length} are open source, MIT licensed, and BYOK where a key is needed. Source on
		<a
			href="https://github.com/ferhatatagun"
			target="_blank"
			rel="noreferrer"
			class="text-[var(--accent-text)] decoration-none hover:underline"
		>
			github.com/ferhatatagun
		</a>.
	</footer>
</div>

<style lang="scss">
	.tools-grid {
		display: grid;
		gap: 22px;
		grid-template-columns: repeat(2, minmax(0, 1fr));

		@media (max-width: 850px) {
			grid-template-columns: 1fr;
		}
	}

	/* Cards stretch to the row's height so Live/GitHub always sit on one line. */
	.tool-card {
		display: flex;
	}
	.tool-card :global(.ai-card) {
		flex: 1;
		display: flex;
		min-width: 0;
	}
	.tool-card :global(.ai-card__border) {
		flex: 1;
		display: flex;
		min-width: 0;
	}
	.tool-card :global(.ai-card__inner) {
		flex: 1;
		min-width: 0;
		padding: 1rem;
	}
	.tool-card__body {
		display: flex;
		flex-direction: column;
		gap: 14px;
		height: 100%;
	}

	/* Faux browser window. Screenshots are dark UI, so the frame stays dark in
	   both themes and the page doesn't need two sets of images. */
	.tool-frame {
		display: block;
		overflow: hidden;
		border: 1px solid var(--border);
		border-radius: 10px;
		background: #0b0b10;
		text-decoration: none;
		box-shadow: 0 14px 32px -22px rgba(0, 0, 0, 0.7);
		transition:
			transform 0.3s ease,
			border-color 0.3s ease,
			box-shadow 0.3s ease;
	}
	.tool-frame:hover,
	.tool-frame:focus-visible {
		transform: translateY(-2px);
		border-color: color-mix(in srgb, var(--tool-color) 65%, var(--border));
		box-shadow: 0 18px 38px -20px color-mix(in srgb, var(--tool-color) 55%, transparent);
	}
	.tool-frame__bar {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 8px 12px;
		background: #14141b;
		border-bottom: 1px solid rgba(255, 255, 255, 0.07);
	}
	.tool-frame__dots {
		display: inline-flex;
		gap: 6px;
		flex-shrink: 0;
	}
	.tool-frame__dots i {
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: #3a3a46;
	}
	.tool-frame:hover .tool-frame__dots i:nth-child(1) {
		background: #ff5f57;
	}
	.tool-frame:hover .tool-frame__dots i:nth-child(2) {
		background: #febc2e;
	}
	.tool-frame:hover .tool-frame__dots i:nth-child(3) {
		background: #28c840;
	}
	.tool-frame__url {
		flex: 1;
		min-width: 0;
		padding: 2px 10px;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.06);
		color: #9a9aa8;
		font-family: ui-monospace, 'SF Mono', Monaco, monospace;
		font-size: 0.72em;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.tool-frame__view {
		position: relative;
		display: block;
		aspect-ratio: 16 / 10;
		overflow: hidden;
	}
	.tool-frame__img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top left;
		transition: transform 0.5s ease;
	}
	.tool-frame:hover .tool-frame__img {
		transform: scale(1.03);
	}
	.tool-frame__cta {
		position: absolute;
		right: 12px;
		bottom: 12px;
		padding: 5px 12px;
		border-radius: 999px;
		background: var(--tool-color);
		color: #0b0b10;
		font-size: 0.8em;
		font-weight: 600;
		opacity: 0;
		transform: translateY(6px);
		transition:
			opacity 0.25s ease,
			transform 0.25s ease;
	}
	.tool-frame:hover .tool-frame__cta,
	.tool-frame:focus-visible .tool-frame__cta {
		opacity: 1;
		transform: none;
	}

	.tool-card__meta {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 10px;
		flex-wrap: wrap;
	}
	.tool-name {
		margin: 0;
		font-size: 1.45em;
		font-weight: 700;
	}
	.tool-kind {
		padding: 2px 9px;
		border: 1px solid var(--border);
		border-radius: 999px;
		color: var(--tertiary-text);
		font-family: ui-monospace, 'SF Mono', Monaco, monospace;
		font-size: 0.72em;
		letter-spacing: 0.02em;
	}
	.tool-desc {
		flex: 1;
		margin: 0;
		color: var(--secondary-text);
		font-size: 0.95em;
		font-weight: 300;
		line-height: 1.6;
	}
	.tool-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.tool-link {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 6px 14px;
		border: 1px solid var(--border);
		border-radius: 8px;
		color: var(--secondary-text);
		font-size: 0.85em;
		text-decoration: none;
		transition:
			border-color 0.2s ease,
			color 0.2s ease,
			background 0.2s ease;
	}
	.tool-link:hover {
		border-color: var(--accent-text);
		color: var(--main-text);
	}
	.tool-link--primary {
		border-color: color-mix(in srgb, var(--tool-color) 55%, var(--border));
		background: color-mix(in srgb, var(--tool-color) 14%, transparent);
		color: var(--main-text);
	}
	.tool-link--primary:hover {
		border-color: var(--tool-color);
		background: color-mix(in srgb, var(--tool-color) 24%, transparent);
	}

	.writing-grid {
		display: grid;
		gap: 18px;
		grid-template-columns: repeat(2, minmax(0, 1fr));

		@media (max-width: 850px) {
			grid-template-columns: 1fr;
		}
	}

	.writing-card {
		padding: 16px 18px;
		border: 1px solid var(--border);
		border-radius: 10px;
		background: var(--main);
		transition: border-color 0.2s ease;
	}
	.writing-card:hover {
		border-color: var(--accent-text);
	}
	.writing-card__tool {
		font-family: ui-monospace, 'SF Mono', Monaco, monospace;
		font-size: 0.85em;
		font-weight: 600;
		letter-spacing: 0.02em;
		margin-bottom: 10px;
	}
	.writing-card__list {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.writing-card__list li {
		margin: 6px 0;
	}
	.writing-link {
		display: flex;
		gap: 8px;
		align-items: baseline;
		color: var(--secondary-text);
		text-decoration: none;
		font-size: 0.94em;
		line-height: 1.4;
		transition: color 0.2s ease;
	}
	.writing-link:hover {
		color: var(--main-text);
	}
	.writing-link:hover span:last-child {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.writing-lang {
		display: inline-block;
		font-family: ui-monospace, 'SF Mono', Monaco, monospace;
		font-size: 0.7em;
		font-weight: 600;
		padding: 2px 5px;
		border-radius: 3px;
		flex-shrink: 0;
		letter-spacing: 0.05em;
	}
	.writing-lang[data-lang='EN'] {
		background: rgba(139, 92, 246, 0.18);
		color: #a78bfa;
	}
	.writing-lang[data-lang='TR'] {
		background: rgba(244, 114, 182, 0.18);
		color: #f472b6;
	}
</style>
