<script lang="ts">
	/** Logo image source URL */
	export let src = '';
	/** Alt text for the image */
	export let alt = '';
	/** Size in pixels for the logo image (container is larger for effects) */
	export let logoSize = 20;
	/** Extra CSS class for the root container */
	export let className = '';

	const uid = `ai-logo-${Math.random().toString(36).slice(2, 9)}`;
	const box = logoSize + 16; // container allows room for neural lines
	const center = box / 2;
	const logoR = logoSize / 2;
	// Neural line endpoints: from container edge toward logo edge
	const nodes = [
		{ x: 4, y: center, toX: center - logoR - 2, toY: center },
		{ x: box - 4, y: center, toX: center + logoR + 2, toY: center },
		{ x: center, y: 4, toX: center, toY: center - logoR - 2 },
		{ x: center, y: box - 4, toX: center, toY: center + logoR + 2 },
		{ x: 6, y: 8, toX: center - logoR * 0.7, toY: center - logoR * 0.7 },
		{ x: box - 6, y: 8, toX: center + logoR * 0.7, toY: center - logoR * 0.7 },
		{ x: box - 6, y: box - 8, toX: center + logoR * 0.7, toY: center + logoR * 0.7 },
		{ x: 6, y: box - 8, toX: center - logoR * 0.7, toY: center + logoR * 0.7 }
	];
</script>

<div class="ai-logo-enhance {className}" style="--logo-size: {logoSize}px; --box: {box}px;">
	<div class="ai-logo-enhance__bg"></div>
	<svg
		class="ai-logo-enhance__neural"
		width={box}
		height={box}
		viewBox="0 0 {box} {box}"
		aria-hidden="true"
	>
		<defs>
			<linearGradient id="grad-{uid}" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stop-color="#6366f1" />
				<stop offset="50%" stop-color="#8b5cf6" />
				<stop offset="100%" stop-color="#06b6d4" />
			</linearGradient>
			<filter id="glow-{uid}">
				<feGaussianBlur stdDeviation="0.8" result="blur" />
				<feMerge>
					<feMergeNode in="blur" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</defs>
		{#each nodes as node}
			<line
				x1={node.x}
				y1={node.y}
				x2={node.toX}
				y2={node.toY}
				class="ai-logo-enhance__line"
				stroke="url(#grad-{uid})"
				filter="url(#glow-{uid})"
				vector-effect="non-scaling-stroke"
			/>
			<circle cx={node.toX} cy={node.toY} r="1.2" class="ai-logo-enhance__node" filter="url(#glow-{uid})" />
		{/each}
	</svg>
	<div class="ai-logo-enhance__hologram" aria-hidden="true"></div>
	<div class="ai-logo-enhance__logo-wrap">
		<img class="ai-logo-enhance__img" {src} {alt} width={logoSize} height={logoSize} />
	</div>
</div>

<style lang="scss">
	.ai-logo-enhance {
		position: relative;
		width: var(--box);
		height: var(--box);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.ai-logo-enhance__bg {
		position: absolute;
		inset: 0;
		background: #0a0a0b;
		border-radius: 12px;
		box-shadow:
			inset 0 1px 0 rgba(99, 102, 241, 0.15),
			0 0 0 1px rgba(139, 92, 246, 0.25),
			0 0 20px rgba(99, 102, 241, 0.12);
	}

	.ai-logo-enhance__neural {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.ai-logo-enhance__line {
		stroke-width: 0.5;
		stroke-opacity: 0.7;
		transition: stroke-opacity 0.2s ease;
	}

	.ai-logo-enhance:hover .ai-logo-enhance__line {
		stroke-opacity: 1;
	}

	.ai-logo-enhance__node {
		fill: #8b5cf6;
		filter: url(#ai-logo-glow);
		animation: ai-logo-node-pulse 2s ease-in-out infinite;
		opacity: 0.9;
	}

	.ai-logo-enhance__node:nth-child(2) {
		animation-delay: 0.15s;
	}
	.ai-logo-enhance__node:nth-child(4) {
		animation-delay: 0.3s;
	}
	.ai-logo-enhance__node:nth-child(6) {
		animation-delay: 0.45s;
	}
	.ai-logo-enhance__node:nth-child(8) {
		animation-delay: 0.6s;
	}
	.ai-logo-enhance__node:nth-child(10) {
		animation-delay: 0.75s;
	}
	.ai-logo-enhance__node:nth-child(12) {
		animation-delay: 0.9s;
	}
	.ai-logo-enhance__node:nth-child(14) {
		animation-delay: 1.05s;
	}
	.ai-logo-enhance__node:nth-child(16) {
		animation-delay: 1.2s;
	}

	@keyframes ai-logo-node-pulse {
		0%,
		100% {
			opacity: 0.55;
		}
		50% {
			opacity: 1;
		}
	}

	.ai-logo-enhance__hologram {
		position: absolute;
		inset: 2px;
		border-radius: 10px;
		background: conic-gradient(
			from 180deg at 50% 50%,
			rgba(99, 102, 241, 0.12) 0deg,
			rgba(139, 92, 246, 0.18) 120deg,
			rgba(6, 182, 212, 0.1) 240deg,
			rgba(99, 102, 241, 0.12) 360deg
		);
		pointer-events: none;
		mix-blend-mode: screen;
		opacity: 0.9;
	}

	.ai-logo-enhance__logo-wrap {
		position: relative;
		z-index: 2;
		width: var(--logo-size);
		height: var(--logo-size);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.06),
			0 0 12px rgba(99, 102, 241, 0.2);
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(4px);
	}

	.ai-logo-enhance__img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		border-radius: 4px;
	}
</style>
