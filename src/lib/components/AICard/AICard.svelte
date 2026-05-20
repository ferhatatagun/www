<script lang="ts">
	/** AI-themed card with gradient border and optional glow. Use for highlighting AI/LLM content. */
	export let href: string | undefined = undefined;
	export let compact = false;
</script>

<svelte:element
	this={href ? 'a' : 'div'}
	{href}
	class="ai-card"
	class:ai-card--compact={compact}
>
	<div class="ai-card__glow" aria-hidden="true"></div>
	<div class="ai-card__border">
		<div class="ai-card__inner">
			<slot />
		</div>
	</div>
</svelte:element>

<style lang="scss">
	.ai-card {
		position: relative;
		display: block;
		text-decoration: none;
		color: inherit;
		border-radius: 12px;

		&--compact .ai-card__inner {
			padding: 0.75rem 1rem;
		}
	}

	.ai-card__glow {
		position: absolute;
		inset: -1px;
		border-radius: 13px;
		background: var(--ai-gradient);
		opacity: 0;
		filter: blur(12px);
		transition: opacity 0.3s ease;
		pointer-events: none;
		z-index: 0;
	}

	.ai-card__border {
		position: relative;
		z-index: 1;
		padding: 2px;
		border-radius: 12px;
		background: var(--ai-border);
		transition: box-shadow 0.3s ease;
	}

	.ai-card__inner {
		padding: 1.25rem 1.5rem;
		background: var(--main);
		border-radius: 10px;
		background-clip: padding-box;
	}

	a.ai-card:hover .ai-card__glow {
		opacity: 0.4;
	}

	a.ai-card:hover .ai-card__border {
		box-shadow: 0 0 24px var(--ai-glow);
	}
</style>
