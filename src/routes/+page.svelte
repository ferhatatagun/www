<script lang="ts">
	import Carrousel from '$lib/components/Carrousel/Carrousel.svelte';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import MainTitle from '$lib/components/MainTitle/MainTitle.svelte';
	import ParticleBackground from '$lib/components/ParticleBackground/ParticleBackground.svelte';
	import { titleSuffix } from '@data/app';
	import { links, description, lastName, name, title, skills } from '@data/home';
	import { items as skillsItems } from '@data/skills';
	import { useTitle } from '$lib/utils/helpers';
	import { isBlank } from '@riadh-adrani/utils';
	import { getPlatfromIcon } from '$lib/utils';
	import { siteOrigin } from '$lib/data/site';
	import { base } from '$app/paths';
	import { sortedItems as blogPosts } from '@data/blog';
	import { name as homeName, lastName as homeLastName, description as homeDescription, links as homeLinks } from '@data/home';
	import AICard from '$lib/components/AICard/AICard.svelte';
	import AICardIcon from '$lib/components/AICard/AICardIcon.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	// Particle count adapts to viewport — 950 looks rich on desktop, melts a
	// phone's GPU. Start with the desktop value (matches the SSR snapshot)
	// then trim on mount if the screen is small.
	let particleCount = 950;
	onMount(() => {
		if (browser && window.matchMedia('(max-width: 640px)').matches) {
			particleCount = 420;
		}
	});

	const isEmail = (email: string): boolean => {
		const reg =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		return !isBlank(email) && reg.test(email);
	};
	// The home page is the most important URL on the site, so its <title>
	// carries the name + role + the keywords people actually search, instead
	// of the generic "Home | Ferhat Atagün" that useTitle() would produce.
	const pageTitle = 'Ferhat Atagün — Frontend Team Lead & AI-Native Frontend Engineer';
	const canonical = `${siteOrigin}/`;
	const summary = description;
	const image = `${siteOrigin}/icons/fa-fav-icon.png`;
	const siteName = 'Ferhat Atagün';
	const fullName = `${homeName} ${homeLastName}`;
	const sameAs = homeLinks.filter((l) => !isEmail(l.link)).map((l) => l.link);
	const personSchema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': `${siteOrigin}/#person`,
		name: fullName,
		url: siteOrigin,
		jobTitle: 'Frontend Team Lead',
		worksFor: { '@type': 'Organization', name: 'HangiKredi', url: 'https://www.hangikredi.com' },
		description: homeDescription,
		image,
		sameAs,
		knowsAbout: [
			'Anthropic Claude API',
			'Model Context Protocol',
			'prompt engineering',
			'frontend architecture',
			'React',
			'Next.js',
			'TypeScript',
			'SvelteKit'
		]
	};
	const websiteSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${siteOrigin}/#website`,
		name: siteName,
		url: siteOrigin,
		description: homeDescription,
		author: { '@id': `${siteOrigin}/#person` },
		publisher: { '@id': `${siteOrigin}/#person` },
		inLanguage: ['en', 'tr']
	};
	/** Suite as a CollectionPage that the tool deploys reference via their
	    own JSON-LD isPartOf field. Closes the entity graph: tool → suite → person. */
	const suiteSchema = {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		'@id': `${siteOrigin}/tools#suite`,
		name: 'Open-source Claude dev-tools',
		url: `${siteOrigin}/tools`,
		description:
			'Five browser-only developer tools for the Anthropic Claude API: claudoscope, agent-replay, prompt-lab, tool-lab, context-lens. All BYOK, no backend.',
		author: { '@id': `${siteOrigin}/#person` },
		creator: { '@id': `${siteOrigin}/#person` },
		hasPart: [
			{ '@type': 'SoftwareApplication', name: 'claudoscope', url: 'https://claudoscope-labs.vercel.app' },
			{ '@type': 'SoftwareApplication', name: 'agent-replay', url: 'https://agentreplay.vercel.app' },
			{ '@type': 'SoftwareApplication', name: 'prompt-lab', url: 'https://prompt-lab-promptly.vercel.app' },
			{ '@type': 'SoftwareApplication', name: 'tool-lab', url: 'https://tool-lab-bice.vercel.app' },
			{ '@type': 'SoftwareApplication', name: 'context-lens', url: 'https://context-lens-sigma.vercel.app' }
		]
	};

	const featuredTools = [
		{ name: 'claudoscope', href: 'https://claudoscope-labs.vercel.app' },
		{ name: 'agent-replay', href: 'https://agentreplay.vercel.app' },
		{ name: 'prompt-lab', href: 'https://prompt-lab-promptly.vercel.app' },
		{ name: 'tool-lab', href: 'https://tool-lab-bice.vercel.app' },
		{ name: 'context-lens', href: 'https://context-lens-sigma.vercel.app' }
	];
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<link rel="canonical" href={canonical} />
	<meta name="description" content={summary} />
	<meta name="robots" content="index, follow" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={summary} />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:image" content={image} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={summary} />
	<meta name="twitter:image" content={image} />
	{@html `<script type="application/ld+json">${JSON.stringify(personSchema)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(suiteSchema)}</script>`}
</svelte:head>
<div class="home-page-wrapper relative min-h-screen flex flex-col overflow-x-hidden">
	<ParticleBackground
		className="fixed inset-0 w-full h-full pointer-events-none z-0"
		{particleCount}
		mouseRadius={260}
		mouseStrength={0.11}
		mouseMode="attract"
		mouseSmooth={0.14}
		connectRadius={0}
		cursorGlowRadius={0}
		velocityInfluence={0.28}
		idleDrift={0.006}
		waveAmplitude={0.055}
		waveSpeed={0.015}
		upwardDrift={0.01}
		pulseRadius={0}
		pulseStrength={0}
		scatterStrength={0.1}
		scatterRandomAngle={0.4}
	/>
	<div
		class="col flex-1 md:flex-row md:self-stretch justify-center lg:justify-between items-center gap-8 md:gap-12 lg:gap-16 p-y-6 px-4 sm:px-6 md:px-10 relative z-1 w-full max-w-1200px mx-auto min-w-0"
	>
	<div class="md:flex-1 gap-10px w-full min-w-0 max-w-full">
		<MainTitle classes="md:text-left ">{name} {lastName},</MainTitle>
		<p class="text-[var(--tertiary-text)]  text-center md:text-left text-[1.2em] font-extralight">
			{description}
		</p>
		<div class="row justify-center md:justify-start p-y-15px p-x-0px gap-2 items-center flex-wrap">
			{#each links as link}
				<a
					class="decoration-none"
					href={`${isEmail(link.link) ? 'mailto:' : ''}${link.link}`}
					target="_blank"
					rel="noreferrer"
				>
					<Icon icon={getPlatfromIcon(link.platform)} color={'var(--accent-text)'} size={'20px'} />
				</a>
			{/each}
			<a href={`${base}/resume`} class="home-cv-chip decoration-none ml-1" title="Resume / CV (PDF)">
				CV ↗
			</a>
		</div>
		{#if blogPosts.length > 0}
			<div class="text-center md:text-left home-chip-row">
				<a
					href={`${base}/blog`}
					class="home-blog-chip decoration-none"
					title="AI & dev notes — blog"
				>
					<span class="home-blog-chip__prompt">$</span>
					<span>cat /blog</span>
					<span class="home-blog-chip__arrow">→</span>
				</a>
				<a
					href={`${base}/play/shell-quiz`}
					class="home-blog-chip decoration-none"
					title="Shell-quiz — 20 commands, 5 minutes"
				>
					<span class="home-blog-chip__prompt">$</span>
					<span>./shell-quiz</span>
					<span class="home-blog-chip__arrow">→</span>
				</a>
			</div>
		{/if}
		<div class="home-ai-strip home-ai-strip--pulse mt-6">
			<AICard>
				<div class="row items-center gap-3 flex-wrap">
					<AICardIcon icon="i-carbon-machine-learning-model" />
					<a href={`${base}/blog`} class="home-ai-strip__main col gap-0.5 decoration-none text-inherit flex-1 min-w-0">
						<span class="home-ai-strip__title m-0 font-600 text-[1em]">
							AI & LLM development
						</span>
						<span class="home-ai-strip__desc m-0 text-[0.85em] text-[var(--tertiary-text)] font-300">
							MCP, Claude, prompt engineering · Blog posts
						</span>
					</a>
					<a
						href={`${base}/skills/ai-llm-tools`}
						class="home-ai-strip__skill-link text-[0.85em] decoration-none font-400"
					>
						Skills →
					</a>
				</div>
			</AICard>
		</div>
		<div class="home-gh-strip mt-3">
			<AICard>
				<div class="col gap-3">
					<div class="row items-center gap-3">
						<AICardIcon icon="i-carbon-logo-github" />
						<div class="col gap-0.5 flex-1 min-w-0">
							<span class="font-600 text-[1em]">Open-source AI dev-tools</span>
							<span class="text-[0.85em] text-[var(--tertiary-text)] font-300">
								A small suite that makes the Claude API legible
							</span>
						</div>
						<a
							href="https://github.com/ferhatatagun"
							target="_blank"
							rel="noreferrer"
							class="home-gh-strip__cta text-[0.85em] decoration-none font-500"
						>
							GitHub →
						</a>
					</div>
					<div class="row gap-2 flex-wrap">
						{#each featuredTools as tool}
							<a
								href={tool.href}
								target="_blank"
								rel="noreferrer"
								class="home-gh-strip__tool decoration-none font-mono text-[0.8em]"
							>
								{tool.name}
							</a>
						{/each}
					</div>
				</div>
			</AICard>
		</div>
	</div>
	<Carrousel items={skills ?? skillsItems} />
	</div>
</div>

<style>
	.home-cv-chip {
		display: inline-flex;
		align-items: center;
		padding: 3px 9px;
		font-family: ui-monospace, 'SF Mono', Monaco, monospace;
		font-size: 0.72em;
		font-weight: 500;
		letter-spacing: 0.04em;
		color: var(--tertiary-text);
		border: 1px solid var(--border);
		border-radius: 5px;
		transition: border-color 0.2s, color 0.2s, background 0.2s;
	}
	.home-cv-chip:hover {
		border-color: #8b5cf6;
		color: #a78bfa;
		background: rgba(139, 92, 246, 0.06);
	}
	.home-chip-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		justify-content: center;
		margin-top: 0.5rem;
	}
	@media (min-width: 768px) {
		.home-chip-row { justify-content: flex-start; }
	}
	.home-blog-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.3rem 0.7rem;
		font-family: ui-monospace, 'JetBrains Mono', 'SF Mono', Monaco, monospace;
		font-size: 0.78rem;
		font-weight: 500;
		letter-spacing: 0.02em;
		color: var(--secondary-text);
		border: 1px solid var(--border);
		border-radius: 6px;
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.04), transparent 60%);
		transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.15s;
	}
	.home-blog-chip__prompt {
		color: #a78bfa;
	}
	.home-blog-chip__arrow {
		color: var(--tertiary-text);
		transition: transform 0.18s ease, color 0.18s ease;
	}
	.home-blog-chip:hover {
		border-color: #8b5cf6;
		color: var(--main-text);
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), transparent 60%);
	}
	.home-blog-chip:hover .home-blog-chip__arrow {
		color: #a78bfa;
		transform: translateX(2px);
	}
	.home-ai-strip__main:hover .home-ai-strip__title {
		text-decoration: underline;
	}
	.home-ai-strip__skill-link {
		color: #8b5cf6;
	}
	.home-ai-strip__skill-link:hover {
		text-decoration: underline;
	}
	.home-ai-strip--pulse :global(.ai-card__border) {
		animation: home-ai-pulse 4s ease-in-out infinite;
	}
	@keyframes home-ai-pulse {
		0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.15); }
		50% { opacity: 0.95; box-shadow: 0 0 12px 2px rgba(139, 92, 246, 0.2); }
	}
	.home-gh-strip__cta {
		color: #8b5cf6;
		white-space: nowrap;
	}
	.home-gh-strip__cta:hover {
		text-decoration: underline;
	}
	.home-gh-strip__tool {
		padding: 0.25rem 0.7rem;
		border-radius: 999px;
		border: 1px solid var(--border);
		color: var(--secondary-text);
		background: var(--main);
		transition: border-color 0.2s, color 0.2s, transform 0.2s;
	}
	.home-gh-strip__tool:hover {
		border-color: #8b5cf6;
		color: var(--main-text);
		transform: translateY(-1px);
	}
	/* The GitHub mark breathes — a quiet glow that draws the eye to it. */
	.home-gh-strip :global(.ai-card-icon) {
		animation: gh-icon-pulse 3s ease-in-out infinite;
	}
	.home-gh-strip:hover :global(.ai-card-icon) {
		animation-duration: 1.1s;
	}
	@keyframes gh-icon-pulse {
		0%, 100% {
			transform: scale(1);
			filter: drop-shadow(0 0 0 rgba(139, 92, 246, 0));
		}
		50% {
			transform: scale(1.14);
			filter: drop-shadow(0 0 7px rgba(139, 92, 246, 0.6));
		}
	}
</style>
