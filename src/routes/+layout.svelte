<script lang="ts">
	import 'uno.css';
	import NavMenu from '$lib/components/NavMenu/NavMenu.svelte';
	import AILab from '$lib/components/AILab/AILab.svelte';
	import '$lib/index.scss';
	import { onHydrated, theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	onMount(() => onHydrated());
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
		<a href="https://github.com/ferhatatagun" target="_blank" rel="noopener noreferrer" class="site-footer__link">GitHub</a>
		<span class="site-footer__sep">·</span>
		<a href="https://svelte.dev" target="_blank" rel="noopener noreferrer" class="site-footer__link">Built with SvelteKit</a>
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
