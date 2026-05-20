<script lang="ts">
	/** Extra CSS class for positioning */
	export let className = '';
</script>

<div class="gradient-mesh {className}" aria-hidden="true">
	<div class="gradient-mesh__blob gradient-mesh__blob--1"></div>
	<div class="gradient-mesh__blob gradient-mesh__blob--2"></div>
	<div class="gradient-mesh__blob gradient-mesh__blob--3"></div>
</div>

<style>
	.gradient-mesh {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.gradient-mesh__blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.4;
		will-change: transform;
	}

	/* Light: soft warm/cool blobs */
	:global(.theme-light) .gradient-mesh__blob--1 {
		width: 70vmax;
		height: 70vmax;
		background: radial-gradient(circle, rgba(251, 207, 232, 0.5) 0%, transparent 70%);
		top: -20%;
		right: -10%;
		animation: blob-float-1 22s ease-in-out infinite;
	}

	:global(.theme-light) .gradient-mesh__blob--2 {
		width: 55vmax;
		height: 55vmax;
		background: radial-gradient(circle, rgba(191, 219, 254, 0.45) 0%, transparent 70%);
		bottom: -15%;
		left: -5%;
		animation: blob-float-2 26s ease-in-out infinite;
	}

	:global(.theme-light) .gradient-mesh__blob--3 {
		width: 45vmax;
		height: 45vmax;
		background: radial-gradient(circle, rgba(254, 215, 170, 0.4) 0%, transparent 70%);
		top: 40%;
		left: 30%;
		animation: blob-float-3 24s ease-in-out infinite;
	}

	/* Dark: subtle violet/blue blobs */
	:global(.theme-dark) .gradient-mesh__blob--1 {
		width: 70vmax;
		height: 70vmax;
		background: radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, transparent 70%);
		top: -20%;
		right: -10%;
		animation: blob-float-1 22s ease-in-out infinite;
	}

	:global(.theme-dark) .gradient-mesh__blob--2 {
		width: 55vmax;
		height: 55vmax;
		background: radial-gradient(circle, rgba(139, 92, 246, 0.14) 0%, transparent 70%);
		bottom: -15%;
		left: -5%;
		animation: blob-float-2 26s ease-in-out infinite;
	}

	:global(.theme-dark) .gradient-mesh__blob--3 {
		width: 45vmax;
		height: 45vmax;
		background: radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%);
		top: 40%;
		left: 30%;
		animation: blob-float-3 24s ease-in-out infinite;
	}

	@keyframes blob-float-1 {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(3%, -4%) scale(1.02);
		}
		66% {
			transform: translate(-2%, 2%) scale(0.98);
		}
	}

	@keyframes blob-float-2 {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(-3%, 3%) scale(1.01);
		}
		66% {
			transform: translate(2%, -2%) scale(0.99);
		}
	}

	@keyframes blob-float-3 {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		50% {
			transform: translate(2%, 2%) scale(1.03);
		}
	}
</style>
