<script lang="ts">
	import { gfmHeadingId } from 'marked-gfm-heading-id';
	import { mangle } from 'marked-mangle';
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	import 'prismjs/themes/prism-tomorrow.css';

	// Configure marked extensions once at module load — runs in both SSR and
	// CSR so the same extensions apply during prerender and during hydration.
	// Guarded so prerendering many routes doesn't accumulate handlers and
	// blow the worker heap (Vite SSR re-imports the module per route).
	const __markedKey = '__omni_marked_configured__';
	const __markedScope: Record<string, boolean> = (globalThis as unknown) as Record<string, boolean>;
	if (!__markedScope[__markedKey]) {
		marked.use(gfmHeadingId());
		marked.use(mangle());
		__markedScope[__markedKey] = true;
	}

	export let content: string;

	/**
	 * Re-base the content's heading hierarchy so its shallowest heading lands
	 * at this level. Set to 0 to leave headings untouched.
	 *
	 * Each page already renders its own <h1> (the page title), so embedded
	 * content must start at h2. A fixed offset isn't enough: project READMEs
	 * open with `#`, some skill docs open with `##`, and a couple start at
	 * `###`. Shifting everything by +1 fixed the first group and left the
	 * others skipping straight from the page h1 to an h3. Normalising against
	 * the *actual* minimum handles all three, and preserves relative depth.
	 */
	export let headingBase = 0;

	function rebaseHeadings(html: string, base: number): string {
		if (base <= 0) return html;
		const levels = [...html.matchAll(/<h([1-6])[^>]*>/gi)].map((m) => Number(m[1]));
		if (!levels.length) return html;
		const shift = base - Math.min(...levels);
		if (shift === 0) return html;
		return html.replace(/<(\/?)h([1-6])([^>]*)>/gi, (_m, slash, level, rest) => {
			const next = Math.min(6, Math.max(1, Number(level) + shift));
			return `<${slash}h${next}${rest}>`;
		});
	}

	/**
	 * Parsed eagerly so the article body is present in the prerendered HTML
	 * (critical for SEO — Google indexes the SSR'd markup, and OG/Twitter
	 * scrapers don't run JS). marked.parse is sync and pure — no DOM access,
	 * safe to call during SSR. The source markdown is our own static
	 * `?raw` imports, not untrusted user input, so we don't need DOMPurify
	 * during prerender. Browser-side sanitisation also unnecessary for the
	 * same reason; the previous DOMPurify call was defensive overhead.
	 */
	$: parsed = rebaseHeadings(marked.parse(content) as string, headingBase);

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
