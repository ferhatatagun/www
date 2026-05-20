<script lang="ts">
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	/** Optional icon for AICard, with gradient-style treatment */
	export let icon = 'i-carbon-machine-learning-model';
</script>

<span class="ai-card-icon">
	<UIcon icon={icon} classes="text-1.5em" />
</span>

<style lang="scss">
	.ai-card-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: #8b5cf6;
	}
</style>
