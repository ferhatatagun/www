<script lang="ts">
	import ExperienceCard from '$lib/components/ExperienceCard/ExperienceCard.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import SearchPage from '$lib/components/SearchPage.svelte';
	import { items, title } from '@data/experience';
	import { data as cvData } from '@data/resume';
	import { base } from '$app/paths';
	import type { Experience } from '$lib/types';
	import { isBlank } from '@riadh-adrani/utils';

	let result: Array<Experience> = [...items];

	const sortByPeriod = (a: Experience, b: Experience) => {
		const dateA = a.period.to || a.period.from;
		const dateB = b.period.to || b.period.from;
		return dateB.getTime() - dateA.getTime();
	};

	result.sort(sortByPeriod);

	const onSearch = (e: CustomEvent<{ search: string }>) => {
		const query = e.detail.search;

		if (isBlank(query)) {
			result = [...items].sort(sortByPeriod);
			return;
		}

		result = items.filter(
			(it) =>
				it.name.toLowerCase().includes(query) ||
				it.company.toLowerCase().includes(query) ||
				it.description.toLowerCase().includes(query)
		).sort(sortByPeriod);
	};
</script>

<svelte:head>
    <title>{title}</title>
    <link rel="canonical" href={`https://ferhatatagun.com/experience`} />
    <meta name="description" content="Work experience and roles: past positions and responsibilities." />
    <meta name="robots" content="index, follow" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`https://ferhatatagun.com/experience`} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content="Work experience and roles: past positions and responsibilities." />
    <meta property="og:site_name" content="Ferhat Atagün" />
</svelte:head>
<SearchPage {title} on:search={onSearch}>
	<div class="xp-cta-bar">
		<span class="xp-cta-bar__label">Prefer a single page?</span>
		<div class="xp-cta-bar__actions">
			<a href={`${base}/resume`} class="xp-cta-bar__link">View resume →</a>
			<a href={cvData} download class="xp-cta-bar__btn">Download CV (PDF) ↓</a>
		</div>
	</div>
	<div class="col items-center relative mt-10 flex-1">
		{#if result.length === 0}
			<div class="p-5 col-center gap-3 m-y-auto text-[var(--accent-text)] flex-1">
				<UIcon icon="i-carbon-development" classes="text-3.5em" />
				<p class="font-300">Could not find anything...</p>
			</div>
		{:else}
			<div
				class="w-[0.5px] hidden lg:flex top-0 bottom-0 py-50px bg-[var(--border)] absolute rounded"
			/>
			{#each result as job, index (job.slug)}
				<div
					class={`flex ${
						(index % 2 !== 0) ? 'flex-row' : 'flex-row-reverse'
					} relative items-center w-full my-[10px]`}
				>
					<div class="flex-1 hidden lg:flex" />
					<div class="hidden lg:inline p-15px bg-[var(--main)] rounded">
						<UIcon icon="i-carbon-condition-point" classes="" />
					</div>
					<div class="flex-1 col items-stretch">
						<ExperienceCard experience={job} />
					</div>
				</div>
			{/each}
		{/if}
	</div>
</SearchPage>

<style lang="scss">
	.xp-cta-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.75rem;
		padding: 0.65rem 1rem;
		margin: 0.4rem 0 0;
		border: 1px solid var(--border);
		border-left: 3px solid #8b5cf6;
		border-radius: 6px;
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.04), transparent);
		font-size: 0.85rem;
	}
	.xp-cta-bar__label {
		color: var(--tertiary-text);
		font-weight: 300;
	}
	.xp-cta-bar__actions {
		display: flex;
		align-items: center;
		gap: 0.9rem;
	}
	.xp-cta-bar__link {
		color: var(--secondary-text);
		text-decoration: none;
		font-size: 0.82rem;
		font-weight: 500;
		font-family: ui-monospace, 'SF Mono', Monaco, monospace;
	}
	.xp-cta-bar__link:hover {
		color: #a78bfa;
	}
	.xp-cta-bar__btn {
		color: #a78bfa;
		text-decoration: none;
		font-family: ui-monospace, 'SF Mono', Monaco, monospace;
		font-weight: 500;
		padding: 0.3rem 0.7rem;
		border: 1px solid rgba(139, 92, 246, 0.4);
		border-radius: 5px;
		font-size: 0.82rem;
		transition: background 0.2s, border-color 0.2s;
	}
	.xp-cta-bar__btn:hover {
		background: rgba(139, 92, 246, 0.1);
		border-color: #8b5cf6;
	}
</style>
