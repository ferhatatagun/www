<script lang="ts">
	import { title, groupByCategory } from '@data/skills';
	import { getAssetURL } from '$lib/data/assets';
	import { siteOrigin } from '$lib/data/site';

	import SearchPage from '$lib/components/SearchPage.svelte';
	import Card from '$lib/components/Card/Card.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import { base } from '$app/paths';

	let result = groupByCategory('');
	const isAICategory = (slug: string) => slug === 'ai-llm';

	const onSearch = (e: CustomEvent<{ search: string }>) => {
		const query = e.detail.search;

		result = groupByCategory(query.trim().toLowerCase());
	};
</script>

<svelte:head>
	<title>{title}</title>
	<link rel="canonical" href={`${siteOrigin}/skills`} />
	<meta name="description" content="Technologies, languages and tools: skills and details." />
	<meta name="robots" content="index, follow" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={`${siteOrigin}/skills`} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content="Technologies, languages and tools: skills and details." />
	<meta property="og:site_name" content="Ferhat Atagün" />
</svelte:head>

<SearchPage {title} on:search={onSearch}>
	{#if result.length === 0}
		<div class="p-5 col-center gap-3 m-y-auto text-[var(--accent-text)] flex-1">
			<UIcon icon="i-carbon-cube" classes="text-3.5em" />
			<p class="font-300">Could not find anything...</p>
		</div>
	{:else}
		<div class="col mt-5 gap-7">
			{#each result as group (group.category.slug)}
				<div class="col gap-5 mb-7" class:skills-category--ai={isAICategory(group.category.slug)}>
					<div class="row items-center gap-5 skills-category-header">
						<div class="skills-category-line h-[1px] w-[20px]" class:skills-category-line--ai={isAICategory(group.category.slug)}></div>
						{#if isAICategory(group.category.slug)}
							<UIcon icon="i-carbon-machine-learning-model" classes="text-1.2em skills-category-icon--ai" />
						{/if}
						<p class="text-[var(--main-close)] skills-category-name" class:skills-category-name--ai={isAICategory(group.category.slug)}>{group.category.name}</p>
						<div class="flex-1 h-[1px] skills-category-line-right" class:skills-category-line-right--ai={isAICategory(group.category.slug)}></div>
					</div>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-5 " class:skills-grid--ai={isAICategory(group.category.slug)}>
						{#each group.items as skill (skill.slug)}
							<Card
								classes={['cursor-pointer decoration-none']}
								tiltDegree={1}
								href={`${base}/skills/${skill.slug}`}
								bgImg={getAssetURL(skill.logo)}
								color={skill.color}
							>
								<p class="text-[var(--tertiary-text)]">{skill.name}</p>
							</Card>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</SearchPage>

<style lang="scss">
	.skills-category-line {
		background: var(--main-hover);
		&--ai {
			background: var(--ai-gradient);
			width: 28px;
			height: 3px;
			border-radius: 2px;
		}
	}
	.skills-category-line-right {
		background: var(--main-hover);
		&--ai {
			background: linear-gradient(90deg, var(--ai-glow-strong), transparent);
			height: 1px;
		}
	}
	:global(.skills-category-icon--ai) {
		color: #8b5cf6;
	}
	.skills-category-name--ai {
		color: #a78bfa !important;
		font-weight: 600;
	}
	.skills-category--ai {
		padding: 1rem;
		border-radius: 12px;
		background: var(--ai-gradient-subtle);
	}
	.skills-grid--ai {
		position: relative;
	}
</style>
