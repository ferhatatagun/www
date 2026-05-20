<script lang="ts">
	import { onMount } from 'svelte';
	import type { Skill } from '$lib/types';
	import { getAssetURL } from '$lib/data/assets';
	import UIcon from '../Icon/UIcon.svelte';

	export let items: Array<Skill> = [];
	const delay = 2600;

	let element: HTMLElement;
	let index = 0;
	let timer: ReturnType<typeof setInterval> | undefined;

	/** Scroll to the active item using its real measured width — robust to padding. */
	function scrollToIndex() {
		if (!element || element.children.length === 0) return;
		const first = element.children[0] as HTMLElement;
		element.scrollTo({ left: index * first.offsetWidth, behavior: 'smooth' });
	}

	$: {
		index;
		if (element) scrollToIndex();
	}

	/** Move by `delta`, wrapping around — a clean rotation in either direction. */
	function go(delta: number) {
		if (items.length === 0) return;
		index = (index + delta + items.length) % items.length;
	}

	function startAuto() {
		stopAuto();
		if (items.length > 1) timer = setInterval(() => go(1), delay);
	}

	function stopAuto() {
		if (timer) clearInterval(timer);
		timer = undefined;
	}

	/** Manual step: move, then restart the auto timer so it doesn't fight the user. */
	function step(delta: number) {
		go(delta);
		startAuto();
	}

	onMount(() => {
		startAuto();
		return stopAuto;
	});
</script>

<style lang="scss">
	.carrousel-item {
		transition: transform 0.25s ease, filter 0.25s ease;
		cursor: default;

		&:hover {
			transform: scale(1.06);
		}

		&:hover .carrousel-item__img {
			filter: drop-shadow(0 0 12px rgba(99, 102, 241, 0.35));
		}
	}

	.carrousel-item__img {
		transition: filter 0.25s ease, transform 0.25s ease;
	}

	.carrousel-item:hover .carrousel-item__img {
		transform: rotate(5deg);
	}
</style>

<div
	class="carrousel flex-[0.5] row-center"
	on:mouseenter={stopAuto}
	on:mouseleave={startAuto}
	role="group"
	aria-label="Skills carousel"
>
	<button
		type="button"
		aria-label="Previous skill"
		class="row-center font-500 p-5px m-y-0px m-x-10px cursor-pointer border-1px border-solid border-[var(--border)] bg-transparent rounded-[50%] hover:border-[var(--border-hover)]"
		on:click={() => step(-1)}
	>
		<UIcon icon="i-carbon-chevron-left" />
	</button>

	<div bind:this={element} class="row overflow-hidden box-content w-180px">
		{#each items as item}
			<div class="carrousel-item box-content w-150px p-15px col-center">
				<img
					class="carrousel-item__img w-120px h-120px aspect-square"
					src={getAssetURL(item.logo)}
					alt={item.name}
				/>
				<span class="text-center m-t-20px">{item.name}</span>
			</div>
		{/each}
	</div>

	<button
		type="button"
		aria-label="Next skill"
		class="row-center font-500 p-5px m-y-0px m-x-10px cursor-pointer border-1px border-solid border-[var(--border)] bg-transparent rounded-[50%] hover:border-[var(--border-hover)]"
		on:click={() => step(1)}
	>
		<UIcon icon="i-carbon-chevron-right" />
	</button>
</div>
