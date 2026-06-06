<script lang="ts">
	import { data, title } from '@data/resume';
	import { name, lastName, links } from '@data/home';
	import { siteOrigin } from '$lib/data/site';
	import { Platform } from '$lib/types';
	import CommonPage from '$lib/components/CommonPage.svelte';

	const fullName = `${name} ${lastName}`;
	const linkedin = links.find((l) => l.platform === Platform.Linkedin)?.link;
	const github = links.find((l) => l.platform === Platform.GitHub)?.link;
	const description =
		'Ferhat Atagün — Frontend Team Lead & AI-Native Frontend Engineer. Resume / CV (PDF).';
</script>

<svelte:head>
	<title>{title} · {fullName}</title>
	<link rel="canonical" href={`${siteOrigin}/resume`} />
	<meta name="description" content={description} />
	<meta name="robots" content="index, follow" />
	<meta property="og:type" content="profile" />
	<meta property="og:url" content={`${siteOrigin}/resume`} />
	<meta property="og:title" content={`${title} · ${fullName}`} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content="Ferhat Atagün" />
</svelte:head>

<CommonPage {title}>
	<div class="resume-wrap col gap-6">
		<!-- Premium hero with gradient accent + 3 actions -->
		<header class="resume-hero">
			<div class="hero-eyebrow">Curriculum vitae · June 2026</div>
			<h2 class="hero-title">
				<span class="hero-name">{fullName}</span>
				<span class="hero-sub">Frontend Team Lead · AI-Native Frontend Engineer · Istanbul</span>
			</h2>
			<p class="hero-pitch">
				I lead the frontend team at <strong>HangiKredi</strong> and ship a five-tool
				open-source suite that makes the Claude API legible. The PDF below is the
				short version; the long version lives in the
				<a href="/blog">blog</a> and the <a href="/tools">tools</a>.
			</p>
			<div class="hero-actions">
				{#if data}
					<a class="action action--primary" href={data} download>
						<span class="action__icon">↓</span>
						<span>Download PDF</span>
						<span class="action__hint">2 pages · 350 KB</span>
					</a>
				{/if}
				{#if linkedin}
					<a class="action" href={linkedin} target="_blank" rel="noreferrer">
						<span class="action__icon">in</span>
						<span>View on LinkedIn</span>
						<span class="action__hint">↗</span>
					</a>
				{/if}
				{#if github}
					<a class="action" href={github} target="_blank" rel="noreferrer">
						<span class="action__icon">gh</span>
						<span>GitHub</span>
						<span class="action__hint">↗</span>
					</a>
				{/if}
			</div>
		</header>

		<!-- Embedded PDF -->
		{#if data}
			<div class="pdf-wrap">
				<object
					data={`${data}#toolbar=0&navpanes=0`}
					type="application/pdf"
					aria-label={`${fullName} — CV (PDF)`}
				>
					<p class="pdf-fallback">
						Your browser can't embed the PDF preview.
						<a href={data} download>Download it directly →</a>
					</p>
				</object>
			</div>
		{:else}
			<p class="empty">No CV at the moment.</p>
		{/if}
	</div>
</CommonPage>

<style lang="scss">
	.resume-wrap {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 0.5rem;
	}

	.resume-hero {
		position: relative;
		padding: 1.6rem 1.8rem 1.4rem;
		border-radius: 12px;
		background: linear-gradient(
			135deg,
			rgba(139, 92, 246, 0.08) 0%,
			rgba(244, 114, 182, 0.05) 100%
		);
		border: 1px solid var(--border);
		overflow: hidden;
	}
	.resume-hero::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, #8b5cf6, #f472b6);
	}

	.hero-eyebrow {
		font-family: ui-monospace, 'SF Mono', Monaco, monospace;
		font-size: 0.72rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #a78bfa;
		margin-bottom: 0.6rem;
	}

	.hero-title {
		font-size: 1.5rem;
		font-weight: 700;
		line-height: 1.2;
		color: var(--main-text);
		margin: 0 0 0.5rem 0;
		letter-spacing: -0.01em;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.hero-name {
		background: linear-gradient(135deg, #a78bfa, #f472b6);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}
	.hero-sub {
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--secondary-text);
		font-family: ui-monospace, 'SF Mono', Monaco, monospace;
		letter-spacing: 0.02em;
	}

	.hero-pitch {
		font-size: 0.92rem;
		color: var(--secondary-text);
		max-width: 640px;
		line-height: 1.55;
		margin: 0.6rem 0 1.1rem 0;
		font-weight: 300;
	}
	.hero-pitch :global(a) {
		color: #a78bfa;
		text-decoration: none;
		border-bottom: 1px solid rgba(167, 139, 250, 0.35);
		transition: border-color 0.2s;
	}
	.hero-pitch :global(a:hover) {
		border-bottom-color: #a78bfa;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
	}

	.action {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.55rem 0.95rem;
		border-radius: 8px;
		border: 1px solid var(--border);
		background: var(--main);
		color: var(--main-text);
		font-size: 0.85rem;
		font-weight: 500;
		text-decoration: none;
		transition: border-color 0.2s, transform 0.15s, box-shadow 0.2s;
	}
	.action:hover {
		border-color: #8b5cf6;
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(139, 92, 246, 0.12);
	}
	.action--primary {
		background: linear-gradient(135deg, #8b5cf6, #a78bfa);
		border-color: #8b5cf6;
		color: white;
	}
	.action--primary:hover {
		background: linear-gradient(135deg, #7c3aed, #8b5cf6);
		box-shadow: 0 4px 14px rgba(139, 92, 246, 0.4);
		border-color: #7c3aed;
	}
	.action__icon {
		font-family: ui-monospace, 'SF Mono', Monaco, monospace;
		font-size: 0.78rem;
		font-weight: 700;
		opacity: 0.9;
	}
	.action__hint {
		font-family: ui-monospace, 'SF Mono', Monaco, monospace;
		font-size: 0.68rem;
		opacity: 0.6;
		margin-left: 0.15rem;
	}

	.pdf-wrap {
		border-radius: 12px;
		border: 1px solid var(--border);
		overflow: hidden;
		background: var(--main);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
	}
	.pdf-wrap object {
		display: block;
		width: 100%;
		min-height: 1280px;
		border: none;
	}
	.pdf-fallback {
		padding: 2rem;
		text-align: center;
		color: var(--tertiary-text);
	}
	.pdf-fallback a {
		color: #a78bfa;
		text-decoration: none;
		border-bottom: 1px solid rgba(167, 139, 250, 0.35);
	}

	.empty {
		text-align: center;
		color: var(--tertiary-text);
		padding: 2rem;
	}
</style>
