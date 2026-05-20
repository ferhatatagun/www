<script lang="ts">
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import { tick } from 'svelte';

	let open = false;
	let triggerEl: HTMLButtonElement;
	let closeBtnEl: HTMLButtonElement;

	// Per-column 0/1 streams for the "data synthesis" effect.
	const columns = 5;
	const streamCols = Array.from({ length: columns }, () =>
		Array.from({ length: 50 }, () => (Math.random() > 0.5 ? '1' : '0'))
	);

	const tools = [
		{ name: 'claudoscope', desc: 'x-ray your Claude API calls', href: 'https://claudoscope-labs.vercel.app' },
		{ name: 'agent-replay', desc: 'replay an agent tool-loop', href: 'https://agentreplay.vercel.app' },
		{ name: 'prompt-lab', desc: 'A/B test prompts', href: 'https://prompt-lab-promptly.vercel.app' }
	];

	function handleKeydown(e: KeyboardEvent) {
		if (open && e.key === 'Escape') closeModal();
	}

	function openModal() {
		open = true;
	}

	function closeModal() {
		open = false;
		tick().then(() => triggerEl?.focus());
	}

	$: if (open) {
		tick().then(() => closeBtnEl?.focus());
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="lab-egg-wrap">
	<span class="lab-egg-tooltip" aria-hidden="true">AI tools</span>
	<button
		type="button"
		class="lab-egg"
		title="Open-source AI tools"
		aria-label="Open-source AI tools"
		bind:this={triggerEl}
		on:click={openModal}
		on:keydown={(e) => e.key === 'Enter' && openModal()}
	>
		<span class="lab-egg__icon-wrap">
			<UIcon icon="i-carbon-machine-learning-model" classes="text-1.4em" />
		</span>
	</button>
</div>

{#if open}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<div
		class="lab-egg-modal-backdrop"
		role="dialog"
		aria-modal="true"
		aria-labelledby="lab-egg-title"
		on:click={closeModal}
	>
		<div class="lab-egg-modal" on:click|stopPropagation on:keydown|stopPropagation>
			<div class="lab-egg-modal__stream" aria-hidden="true">
				{#each streamCols as colDigits, col}
					<div class="lab-egg-modal__col" style="animation-delay: {-col * 0.7}s">
						{#each colDigits as d}
							<span>{d}</span>
						{/each}
					</div>
				{/each}
			</div>
			<div class="lab-egg-modal__content">
				<h2 id="lab-egg-title" class="lab-egg-modal__title">Open-source AI tools</h2>
				<p class="lab-egg-modal__desc">
					A small suite I built for working with the Claude API — open, no backend.
				</p>
				<ul class="lab-egg-modal__list">
					{#each tools as tool}
						<li>
							<a href={tool.href} target="_blank" rel="noopener noreferrer">
								<span class="lab-egg-modal__tool-name">{tool.name}</span>
								<span class="lab-egg-modal__tool-desc">{tool.desc}</span>
							</a>
						</li>
					{/each}
				</ul>
				<a
					href="https://github.com/ferhatatagun"
					target="_blank"
					rel="noopener noreferrer"
					class="lab-egg-modal__link"
				>
					github.com/ferhatatagun →
				</a>
			</div>
			<button
				type="button"
				class="lab-egg-modal__close"
				aria-label="Close"
				bind:this={closeBtnEl}
				on:click={closeModal}
			>
				×
			</button>
		</div>
	</div>
{/if}

<style lang="scss">
	.lab-egg-wrap {
		position: fixed;
		bottom: 1.25rem;
		right: 1.25rem;
		z-index: 50;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.lab-egg-tooltip {
		font-size: 0.75rem;
		color: var(--tertiary-text);
		opacity: 0;
		transform: translateX(4px);
		transition: opacity 0.2s, transform 0.2s;
		pointer-events: none;
	}
	.lab-egg-wrap:hover .lab-egg-tooltip {
		opacity: 1;
		transform: translateX(0);
	}
	.lab-egg {
		position: relative;
		z-index: 1;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		border: 2px solid transparent;
		background: var(--main);
		background-clip: padding-box;
		box-shadow: 0 0 0 2px var(--ai-border), 0 4px 12px var(--ai-glow);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #8b5cf6;
		transition: transform 0.2s, box-shadow 0.2s;
	}
	.lab-egg:hover {
		transform: scale(1.08);
		box-shadow: 0 0 20px var(--ai-glow-strong);
	}
	.lab-egg__icon-wrap {
		display: inline-flex;
		animation: lab-egg-spin 25s linear infinite;
	}
	.lab-egg:hover .lab-egg__icon-wrap {
		animation-duration: 8s;
	}
	@keyframes lab-egg-spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	.lab-egg-modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 100;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		animation: lab-egg-fade 0.2s ease;
	}
	@keyframes lab-egg-fade {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.lab-egg-modal {
		position: relative;
		width: 100%;
		max-width: 360px;
		border-radius: 16px;
		padding: 2px;
		background: var(--ai-border);
		box-shadow: 0 0 40px var(--ai-glow-strong);
		animation: lab-egg-scale 0.25s ease;
	}
	@keyframes lab-egg-scale {
		from { transform: scale(0.9); opacity: 0; }
		to { transform: scale(1); opacity: 1; }
	}

	.lab-egg-modal__stream {
		position: relative;
		height: 72px;
		border-radius: 14px 14px 0 0;
		background: var(--main);
		overflow: hidden;
		display: flex;
		justify-content: space-around;
		gap: 2px;
		padding: 4px 0;
	}
	.lab-egg-modal__col {
		display: flex;
		flex-direction: column;
		align-items: center;
		animation: lab-egg-fall 4s linear infinite;
		font-size: 10px;
		font-family: ui-monospace, monospace;
		color: rgba(139, 92, 246, 0.6);
		line-height: 1.4;
	}
	.lab-egg-modal__col:nth-child(odd) {
		animation-duration: 5s;
		color: rgba(6, 182, 212, 0.5);
	}
	@keyframes lab-egg-fall {
		from { transform: translateY(-100%); }
		to { transform: translateY(100%); }
	}

	.lab-egg-modal__content {
		background: var(--main);
		padding: 1.25rem 1.5rem;
		border-radius: 0 0 14px 14px;
	}
	.lab-egg-modal__title {
		margin: 0 0 0.4rem 0;
		font-size: 1.1rem;
		font-weight: 600;
		background: var(--ai-gradient);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		@supports not (background-clip: text) {
			-webkit-text-fill-color: unset;
			color: #a78bfa;
		}
	}
	.lab-egg-modal__desc {
		margin: 0 0 0.85rem 0;
		font-size: 0.85rem;
		color: var(--tertiary-text);
		line-height: 1.45;
	}
	.lab-egg-modal__list {
		list-style: none;
		margin: 0 0 0.85rem 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}
	.lab-egg-modal__list a {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		padding: 0.4rem 0.6rem;
		border-radius: 8px;
		border: 1px solid var(--border);
		text-decoration: none;
		transition: border-color 0.2s, background 0.2s;
	}
	.lab-egg-modal__list a:hover {
		border-color: #8b5cf6;
		background: var(--main-hover);
	}
	.lab-egg-modal__tool-name {
		font-family: ui-monospace, monospace;
		font-size: 0.82rem;
		color: var(--main-text);
	}
	.lab-egg-modal__tool-desc {
		font-size: 0.72rem;
		color: var(--tertiary-text);
	}
	.lab-egg-modal__link {
		display: inline-block;
		font-size: 0.82rem;
		color: #8b5cf6;
		text-decoration: none;
	}
	.lab-egg-modal__link:hover {
		text-decoration: underline;
	}
	.lab-egg-modal__close {
		position: absolute;
		top: -8px;
		right: -8px;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		border: 1px solid var(--border);
		background: var(--main);
		color: var(--secondary-text);
		font-size: 1.25rem;
		line-height: 1;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.2s, color 0.2s;
	}
	.lab-egg-modal__close:hover {
		background: var(--main-hover);
		color: var(--main-text);
	}
</style>
