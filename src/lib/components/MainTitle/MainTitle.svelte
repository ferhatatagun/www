<script lang="ts">
	export let classes = '';
</script>

<h1
	class={`main-title font-[var(--title-f)] font-black tracking-[4px] text-center text-[2em] sm:text-[3em] md:text-[3.5em] lg:text-[4em] ${classes}`}
>
	<span class="main-title__name"><slot /></span>
</h1>

<style>
	.main-title {
		/* Block so long names wrap on narrow viewports — inline-flex used to pin
		   the h1 to content width and push past the viewport on mobile. */
		display: block;
		max-width: 100%;
		word-break: break-word;
	}
	.main-title__name {
		/* Slow horizontal shimmer over a 3-stop gradient — the name breathes
		   instead of sitting flat. 12s is long enough to read as "alive". */
		background: linear-gradient(
			90deg,
			var(--main-text) 0%,
			var(--accent-text-hover) 35%,
			#a78bfa 50%,
			var(--accent-text-hover) 65%,
			var(--main-text) 100%
		);
		background-size: 220% 100%;
		background-position: 0% 50%;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
		animation: main-title-shimmer 12s ease-in-out infinite;
	}
	/* The terminal cursor is generated content, not a DOM node.
	   A <span>_</span> inside the h1 ends up in the heading's text content —
	   which means Google, screen readers and every SERP preview read the H1 as
	   "Ferhat Atagün,_". CSS ::after keeps the effect and keeps the heading clean. */
	.main-title__name::after {
		content: '_';
		display: inline-block;
		margin-left: 0.05em;
		color: #a78bfa;
		-webkit-text-fill-color: #a78bfa;
		font-weight: 400;
		animation: main-title-blink 1.1s steps(2, jump-none) infinite;
	}
	@keyframes main-title-shimmer {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
	}
	@keyframes main-title-blink {
		50% { opacity: 0; }
	}
	@media (prefers-reduced-motion: reduce) {
		.main-title__name { animation: none; }
		.main-title__name::after { animation: none; opacity: 0.6; }
	}
</style>
