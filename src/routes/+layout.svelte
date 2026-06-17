<script lang="ts">
	import 'uno.css';
	import NavMenu from '$lib/components/NavMenu/NavMenu.svelte';
	import AILab from '$lib/components/AILab/AILab.svelte';
	import '$lib/index.scss';
	import { onHydrated, theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	onMount(() => onHydrated());

	// Vite injects these via `define` from the git HEAD at build time.
	const sha = typeof __BUILD_SHA__ !== 'undefined' ? __BUILD_SHA__ : 'dev';
	const date = typeof __BUILD_DATE__ !== 'undefined' ? __BUILD_DATE__ : '';
	const shaUrl = `https://github.com/ferhatatagun/www/commit/${sha}`;
</script>

<div class={`body contents ${$theme ? 'theme-dark' : 'theme-light'}`}>
	<a href="#main-content" class="skip-link">Skip to content</a>
	<NavMenu />
	<main id="main-content" class="content container" tabindex="-1"><slot /></main>
	<AILab />
	<footer class="site-footer">
		<span>© {new Date().getFullYear()} Ferhat Atagün</span>
		<span class="site-footer__sep">·</span>
		<a href="/resume" class="site-footer__link">Resume</a>
		<span class="site-footer__sep">·</span>
		<a href="/tools" class="site-footer__link">Tools</a>
		<span class="site-footer__sep">·</span>
		<a href="/blog" class="site-footer__link">Blog</a>
		<span class="site-footer__sep">·</span>
		<a href="https://dev.to/ferhatatagun" target="_blank" rel="noopener noreferrer" class="site-footer__link">dev.to</a>
		<span class="site-footer__sep">·</span>
		<a href="https://github.com/ferhatatagun" target="_blank" rel="noopener noreferrer" class="site-footer__link">GitHub</a>
		<span class="site-footer__sep">·</span>
		<a href="https://svelte.dev" target="_blank" rel="noopener noreferrer" class="site-footer__link">Built with SvelteKit</a>
		<div class="site-footer__build">
			<span class="site-footer__build-prompt">$</span>
			<a href={shaUrl} target="_blank" rel="noopener noreferrer" class="site-footer__build-sha" title="View this build on GitHub">
				build <span class="site-footer__build-hash">{sha}</span>
			</a>
			{#if date}
				<span class="site-footer__build-sep">·</span>
				<time datetime={date}>{date}</time>
			{/if}
		</div>
	</footer>
</div>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 0px 0px;
	}

	.body {
		margin: 0px;
		background-color: var(--main);
		color: var(--main-text);
		font-family: var(--text-f);
		display: flex;
		flex-direction: column;
		transition-duration: 200ms;
		letter-spacing: 1px;
		min-height: 100vh;
	}

	.site-footer {
		padding: 0.75rem 1rem;
		text-align: center;
		font-size: 0.8rem;
		color: var(--tertiary-text);
		border-top: 1px solid var(--border);
	}
	.site-footer__link {
		color: var(--accent-text);
		text-decoration: none;
	}
	.site-footer__link:hover {
		text-decoration: underline;
	}
	.site-footer__sep {
		margin: 0 0.35rem;
		opacity: 0.7;
	}

	.site-footer__build {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.45rem;
		margin-top: 0.5rem;
		font-family: ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace;
		font-size: 0.7rem;
		color: var(--tertiary-text);
		opacity: 0.7;
		letter-spacing: 0.02em;
	}
	.site-footer__build-prompt {
		color: #a78bfa;
	}
	.site-footer__build-sha {
		text-decoration: none;
		color: inherit;
		transition: color 0.15s;
	}
	.site-footer__build-sha:hover {
		color: #a78bfa;
	}
	.site-footer__build-hash {
		color: var(--main-text);
	}
	.site-footer__build-sep {
		color: #71717a;
	}

	.skip-link {
		position: absolute;
		top: -100px;
		left: 0.5rem;
		padding: 0.5rem 1rem;
		background: var(--accent-text);
		color: var(--main);
		text-decoration: none;
		font-size: 0.9rem;
		z-index: 100;
		border-radius: 0 0 6px 6px;
		transition: top 0.2s;
	}
	.skip-link:focus {
		top: 0;
		outline: 2px solid var(--main-text);
		outline-offset: 2px;
	}

	:global(p) {
		margin: 0px;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		margin: 5px 0px;
	}
</style>
