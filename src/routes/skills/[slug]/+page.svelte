<script lang="ts">
	import { title } from '@data/skills';
	import * as projects from '@data/projects';
	import * as experiences from '@data/experience';

	import { getAssetURL } from '$lib/data/assets';

	import type { Skill } from '$lib/types';

	import MainTitle from '$lib/components/MainTitle/MainTitle.svelte';
	import CardDivider from '$lib/components/Card/CardDivider.svelte';
	import CardLogo from '$lib/components/Card/CardLogo.svelte';
	import Markdown from '$lib/components/Markdown.svelte';
	import TabTitle from '$lib/components/TabTitle.svelte';
	import Chip from '$lib/components/Chip/Chip.svelte';
	import Banner from '$lib/components/Banner/Banner.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import { siteOrigin } from '$lib/data/site';

	type Related = {
		display: string;
		name: string;
		img: string;
		type: 'projects' | 'experience';
		url: string;
	};

	export let data: { skill?: Skill };

	const getRelatedProjects = (): Array<Related> => {
		const out: Array<Related> = [];

		const skill = data.skill;

		if (!skill) {
			return [];
		}

		projects.items.forEach((item) => {
			if (item.skills.some((tech) => tech.slug === skill.slug)) {
				out.push({
					img: getAssetURL(item.logo),
					display: `${item.name} (${item.type})`,
					name: item.name,
					type: 'projects',
					url: `/projects/${item.slug}`
				});
			}
		});

		experiences.items.forEach((item) => {
			if (item.skills.some((tech) => tech.slug === skill.slug)) {
				out.push({
					img: getAssetURL(item.logo),
					display: `${item.name} @ ${item.company}`,
					name: item.name,
					type: 'experience',
					url: `/experience/${item.slug}`
				});
			}
		});

		return out;
	};

	$: computedTitle = data.skill ? `${data.skill.name} - ${title}` : title;

	$: related = data.skill ? getRelatedProjects() : [];

	$: isAISkill = data.skill?.slug === 'ai-llm-tools';
</script>

<TabTitle title={computedTitle} />

<svelte:head>
    {#if data.skill}
        <link rel="canonical" href={`${siteOrigin}/skills/${data.skill.slug}`} />
        <meta name="description" content={data.skill.description ?? `Notes on ${data.skill.name}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${siteOrigin}/skills/${data.skill.slug}`} />
        <meta property="og:title" content={computedTitle} />
        <meta property="og:description" content={data.skill.description ?? `Notes on ${data.skill.name}`} />
        <meta property="og:image" content={getAssetURL(data.skill.logo)} />
    {/if}
</svelte:head>

<div class="pb-10 overflow-x-hidden col flex-1" class:skill-page--ai={isAISkill}>
	{#if data.skill === undefined}
		<div class="p-5 col-center gap-3 m-y-auto text-[var(--accent-text)]">
			<UIcon icon="i-carbon-software-resource-cluster" classes="text-3.5em" />
			<p class="font-300">Could not load skill data.</p>
		</div>
	{:else}
		<div class="flex flex-col items-center overflow-x-hidden">
			<Banner img={getAssetURL(data.skill.logo)} classes={isAISkill ? 'skill-banner--ai' : ''}>
				<MainTitle>{data.skill.name}</MainTitle>
			</Banner>
			<div class="pt-3 pb-1 overflow-x-hidden w-full">
				<div class="px-10px m-y-5">
					{#if data.skill.description}
						<Markdown content={data.skill.description ?? 'This place is yet to be filled...'} />
					{:else}
						<div class="p-5 col-center gap-3 m-y-auto text-[var(--border)]">
							<UIcon icon="i-carbon-text-font" classes="text-3.5em" />
							<p class="font-300">No description</p>
						</div>
					{/if}
				</div>
			</div>
			<div class="self-stretch mb-2">
				<CardDivider />
			</div>
			<div class="flex flex-row gap-1 self-stretch flex-wrap ">
				<div class="px-10px">
					{#each related as item}
						<Chip
							classes="inline-flex flex-row items-center justify-center"
							href={item.url}
						>
							<CardLogo src={item.img} alt={item.name} radius={'0px'} size={15} classes="mr-2" />
							<span class="text-[0.9em]">{item.display}</span>
						</Chip>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.skill-page--ai {
		position: relative;
	}
	.skill-page--ai::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: var(--ai-gradient);
		border-radius: 0 0 4px 4px;
	}
	:global(.skill-banner--ai) {
		border-color: rgba(139, 92, 246, 0.4) !important;
		box-shadow: 0 0 20px var(--ai-glow);
	}
</style>
