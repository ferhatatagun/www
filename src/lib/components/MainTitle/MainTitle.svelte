<script lang="ts">
	export let classes = '';
</script>

<h1
	class={`main-title font-[var(--title-f)] font-black tracking-[4px] text-center text-[2em] sm:text-[3em] md:text-[3.5em] lg:text-[4em] ${classes}`}
>
	<span class="main-title__name"><slot /></span><span class="main-title__cursor" aria-hidden="true">_</span>
</h1>

<style>
	.main-title {
		/* h1 stays block so long names wrap on narrow viewports — the previous
		   inline-flex pinned width to content and pushed past the viewport on
		   mobile. The cursor is now an inline span that flows with text. */
		display: block;
		max-width: 100%;
		word-break: break-word;
	}
	.main-title__name {
		/* Slow horizontal shimmer over a 3-stop gradient — the name now subtly
		   breathes instead of sitting flat. Cycle is long enough (12s) that
		   it reads as "alive" rather than animated. */
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
	@keyframes main-title-shimmer {
		0%   { background-position: 0% 50%; }
		50%  { background-position: 100% 50%; }
		100% { background-position: 0% 50%; }
	}
	@media (prefers-reduced-motion: reduce) {
		.main-title__name { animation: none; }
	}
	.main-title__cursor {
		display: inline-block;
		margin-left: 0.05em;
		color: #a78bfa;
		-webkit-text-fill-color: #a78bfa;
		font-weight: 400;
		animation: main-title-blink 1.1s steps(2, jump-none) infinite;
	}
	@keyframes main-title-blink {
		50% { opacity: 0; }
	}
	@media (prefers-reduced-motion: reduce) {
		.main-title__cursor { animation: none; opacity: 0.6; }
	}
</style>
