<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';
</script>

<section class="error-page">
	<div class="error-page-inner">
		{#if $page?.error}
			<div class="error-page-content">
				{#if $page?.status}
					<p class="error-page-status">{$page.status} error</p>
				{/if}
				<h1 class="error-page-title">Page not found</h1>
				{#if $page?.status === 404}
					<p class="error-page-desc">
						The page you are looking for does not exist. Here are some helpful links:
					</p>
				{/if}
				{#if $page?.error?.message}
					{#if $page?.status !== 404}
						<p class="error-page-desc">{$page.error.message}</p>
					{/if}
				{/if}

				<div class="error-page-actions">
					<button
						type="button"
						on:click={() => history.back()}
						class="error-page-btn error-page-btn-secondary"
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="error-page-btn-icon" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
						</svg>
						Go back
					</button>
					<a href={base || '/'} class="error-page-btn error-page-btn-primary">Home</a>
					<a href={`${base}/blog`} class="error-page-btn error-page-btn-primary">Blog</a>
					<a href={`${base}/skills`} class="error-page-btn error-page-btn-primary">Skills</a>
				</div>
			</div>
		{/if}

		<div class="error-page-visual">
			<img src={`${base}/icons/404.svg`} alt="" width="320" height="240" />
		</div>
	</div>
</section>

<style>
	.error-page {
		background-color: var(--main);
		color: var(--main-text);
		min-height: 100vh;
		display: flex;
		align-items: center;
		padding: 2rem 1.5rem;
	}
	.error-page-inner {
		max-width: 900px;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 2rem;
	}
	.error-page-content {
		flex: 1;
		min-width: 280px;
	}
	.error-page-status {
		font-size: 0.875rem;
		color: var(--accent-text);
		margin: 0 0 0.5rem 0;
	}
	.error-page-title {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0 0 1rem 0;
		color: var(--main-text);
	}
	.error-page-desc {
		color: var(--tertiary-text);
		margin: 0 0 1.5rem 0;
		line-height: 1.5;
	}
	.error-page-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		align-items: center;
	}
	.error-page-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		border-radius: 8px;
		text-decoration: none;
		border: 1px solid var(--border);
		background: var(--main-hover);
		color: var(--main-text);
		cursor: pointer;
	}
	.error-page-btn-primary {
		background: var(--accent-text);
		color: var(--main);
		border-color: transparent;
	}
	.error-page-btn-primary:hover {
		opacity: 0.9;
	}
	.error-page-btn-icon {
		width: 1.25rem;
		height: 1.25rem;
	}
	.error-page-visual {
		flex: 0 0 auto;
	}
	.error-page-visual img {
		max-width: 100%;
		height: auto;
	}
</style>
