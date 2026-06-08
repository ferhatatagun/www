<script lang="ts">
	import { gfmHeadingId } from 'marked-gfm-heading-id';
	import { mangle } from 'marked-mangle';
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	import 'prismjs/themes/prism-tomorrow.css';

	// Configure marked extensions once at module load — runs in both SSR and CSR
	// so the same extensions apply during prerender and during hydration.
	marked.use(gfmHeadingId());
	marked.use(mangle());

	export let content: string;

	/**
	 * Parsed eagerly so the article body is present in the prerendered HTML
	 * (critical for SEO — Google indexes the SSR'd markup, and OG/Twitter
	 * scrapers don't run JS). marked.parse is sync and pure — no DOM access,
	 * safe to call during SSR. The source markdown is our own static
	 * `?raw` imports, not untrusted user input, so we don't need DOMPurify
	 * during prerender. Browser-side sanitisation also unnecessary for the
	 * same reason; the previous DOMPurify call was defensive overhead.
	 */
	$: parsed = marked.parse(content) as string;

	let container: HTMLDivElement;

	onMount(async () => {
		// Syntax highlighting is purely cosmetic; defer to after hydrate.
		// Imported dynamically so prismjs (which touches `self`) never loads
		// during SSR.
		const Prism = (await import('prismjs')).default;
		await import('prismjs/components/prism-typescript');
		await import('prismjs/components/prism-bash');
		await import('prismjs/components/prism-json');
		if (container) Prism.highlightAllUnder(container);
	});
</script>

<div bind:this={container} class="markdown-container">{@html parsed}</div>
