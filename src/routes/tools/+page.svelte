<script lang="ts">
	import { items as projects } from '@data/projects';
	import { siteOrigin } from '$lib/data/site';
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

	<footer class="text-center md:text-left mt-10 text-[var(--tertiary-text)] text-[0.95em]">
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
</style>
