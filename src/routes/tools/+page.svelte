<script lang="ts">
	import { items as projects } from '@data/projects';
	import { siteOrigin } from '$lib/data/site';
	import { base } from '$app/paths';
	import AICard from '$lib/components/AICard/AICard.svelte';
	import MainTitle from '$lib/components/MainTitle/MainTitle.svelte';

	const tools = projects.filter((p) => p.type === 'AI Developer Tool');
	const pageTitle = 'Open-source AI dev-tools — Ferhat Atagün';
	const description =
		'Four open-source tools that make the Claude API legible — observe API calls, replay agent traces, A/B test prompts, and sandbox tool-use loops. Same design language, distinct angle each.';
	const canonical = `${siteOrigin}/tools`;
	const image = `${siteOrigin}/imgs/projects/claudoscope.png`;

	function linkTo(t: (typeof tools)[number], label: 'Live' | 'GitHub'): string | undefined {
		return t.links.find((l) => l.label === label)?.to;
	}

	/** Tool ↔ writing map. Each tool has at least one long-form post that explains
	    why it exists. Curated, not auto-derived. */
	const writingByTool: Record<
		string,
		Array<{ title: string; slug: string; lang: 'EN' | 'TR' }>
	> = {
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
	<meta name="description" content={description} />
	<meta name="robots" content="index, follow" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:site_name" content="Ferhat Atagün" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>

<div class="tools-page p-x-6 md:p-x-10 p-y-8 max-w-1200px mx-auto w-full">
	<header class="text-center md:text-left">
		<MainTitle classes="md:text-left">Open-source AI dev-tools</MainTitle>
		<p
			class="text-[var(--tertiary-text)] text-[1.15em] font-300 max-w-720px mt-3 mx-auto md:mx-0 leading-relaxed"
		>
			Four small tools for making the Claude API legible —
			<span class="text-[var(--accent-text)]">observe</span> a single call,
			<span class="text-[var(--accent-text)]">replay</span> an agent trace,
			<span class="text-[var(--accent-text)]">compare</span> prompts side by side,
			<span class="text-[var(--accent-text)]">build</span> a tool-use loop interactively. Same design
			language, distinct angle each.
		</p>
	</header>

	<div class="tools-grid mt-8">
		{#each tools as t}
			<article class="tool-card">
				<AICard>
					<div class="col gap-4">
						{#if t.screenshots && t.screenshots.length > 0}
							<a
								href={linkTo(t, 'Live') ?? '#'}
								target="_blank"
								rel="noreferrer"
								class="tool-shot decoration-none"
							>
								<img
									src={t.screenshots[0].src}
									alt={t.name}
									class="w-full rounded-lg border border-[var(--border)] block"
									loading="lazy"
								/>
							</a>
						{/if}
						<div>
							<h3 class="m-0 font-700 text-[1.45em] tool-name" style:color={t.color}>
								{t.name}
							</h3>
							<p
								class="text-[var(--secondary-text)] m-t-2 text-[0.95em] font-300 leading-relaxed"
							>
								{t.shortDescription}
							</p>
						</div>
						<div class="row gap-2 flex-wrap">
							{#each t.links as link}
								<a
									href={link.to}
									target="_blank"
									rel="noreferrer"
									class="tool-link row-center gap-1 decoration-none px-3 py-1.5 rounded-lg border border-[var(--border)] text-[0.85em] text-[var(--secondary-text)] hover:border-[var(--accent-text)] hover:text-[var(--main-text)] transition-colors"
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
		All four are open source, MIT licensed, and BYOK where a key is needed. Source on
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

	.tool-shot {
		display: block;
		overflow: hidden;
		border-radius: 8px;
		transition: transform 0.3s ease;
	}
	.tool-shot:hover {
		transform: translateY(-2px);
	}
	.tool-shot img {
		transition: filter 0.3s ease;
	}
	.tool-shot:hover img {
		filter: brightness(1.05);
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
