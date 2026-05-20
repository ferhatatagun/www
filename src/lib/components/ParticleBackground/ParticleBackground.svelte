<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { theme } from '$lib/stores/theme';

	interface Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		color: string;
		size: number;
		type: 'dot' | 'line';
		opacity: number;
		phaseX: number;
		phaseY: number;
	}

	export let particleCount = 1000;
	export let mouseRadius = 180;
	export let mouseStrength = 0.08;
	/** 'attract' = particles move toward cursor; 'repel' = particles flee from cursor */
	export let mouseMode: 'attract' | 'repel' = 'attract';
	/** Draw lines between nearby particles (max distance in px) */
	export let connectRadius = 0;
	/** Smoothing: 0 = instant, 1 = very slow follow (lerp per frame) */
	export let mouseSmooth = 0.12;
	/** Subtle radial glow at cursor position (radius in px, 0 = off) */
	export let cursorGlowRadius = 0;
	/** Scale force by cursor speed (0 = off, ~0.5 = noticeable) */
	export let velocityInfluence = 0.3;
	/** Gentle random drift when cursor is idle (0 = off) */
	export let idleDrift = 0.015;
	/** Wavy motion when idle: amplitude and speed (0 = off). Gives a gentle wave to the field */
	export let waveAmplitude = 0;
	export let waveSpeed = 0.02;
	/** Click/tap pulse: radius and strength (0 = off). Strength ~0.15–0.3 */
	export let pulseRadius = 0;
	export let pulseStrength = 0;
	/** Scatter when cursor leaves or goes idle: strength and radius (0 = off) */
	export let scatterStrength = 0.14;
	export let scatterRadius = 0;
	export let scatterRandomAngle = 0.5;
	/** Subtle upward drift (antigravity-style lift). Negative = upward */
	export let upwardDrift = 0;
	export let className = '';

	// Antigravity: orange, yellow, red + subtle purple/blue hints on white
	const PALETTE_LIGHT = [
		'#e65100',
		'#ef6c00',
		'#ff8f00',
		'#ffa726',
		'#f9a825',
		'#fbc02d',
		'#c62828',
		'rgba(156,39,176,0.35)',
		'rgba(33,150,243,0.28)',
		'rgba(100,80,60,0.22)'
	];
	const PALETTE_DARK = [
		'#ef5350',
		'#ff7043',
		'#ffab91',
		'#ffcc80',
		'#ffe082',
		'#fff176',
		'#a1887f',
		'rgba(255,220,200,0.22)',
		'rgba(255,255,255,0.15)'
	];

	const CONNECT_MAX = 4;
	const LERP = 0.18;
	const DAMPING = 0.98;
	const MAX_SPEED = 0.72;

	let canvasEl: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;
	let particles: Particle[] = [];
	let rafId = 0;
	let width = 0;
	let height = 0;
	let mouseX = -1e4;
	let mouseY = -1e4;
	let smoothMouseX = -1e4;
	let smoothMouseY = -1e4;
	let lastMouseTime = 0;
	let prevMouseX = -1e4;
	let prevMouseY = -1e4;
	let mouseSpeed = 0; // 0..1 range, used to scale force
	let pulseX = 0;
	let pulseY = 0;
	let pulseT = 0;
	let cursorInView = false;
	let framesSinceMouseMove = 999;
	let wasGathering = false;
	let scatterX = 0;
	let scatterY = 0;
	let scatterT = 0;
	let waveTime = 0;
	let reducedMotion = false;
	let destroyed = false;
	let themeUnsubscribe: (() => void) | null = null;
	const THROTTLE_MS = 50;
	const PULSE_DURATION = 18;
	const IDLE_FRAMES_BEFORE_SCATTER = 20;
	const SCATTER_DURATION = 42;

	function getPalette(): string[] {
		return $theme ? PALETTE_DARK : PALETTE_LIGHT;
	}

	function randomInRange(min: number, max: number): number {
		return min + Math.random() * (max - min);
	}

	function createParticles(): Particle[] {
		const palette = getPalette();
		const list: Particle[] = [];
		for (let i = 0; i < particleCount; i++) {
			let x: number;
			let y: number;
			if (Math.random() < 0.4) {
				// Higher density toward center (Antigravity-style)
				x = width * (0.25 + Math.random() * 0.5);
				y = height * (0.25 + Math.random() * 0.5);
			} else {
				const biasRight = Math.random() < 0.6 ? 0.4 : 0;
				const biasTop = Math.random() < 0.5 ? 0 : 0.35;
				x = width * (biasRight + Math.random() * (1 - biasRight * 0.6));
				y = height * (biasTop + Math.random() * (1 - biasTop));
			}
			const angle = Math.random() * Math.PI * 2;
			const speed = randomInRange(0.12, 0.28);
			list.push({
				x,
				y,
				vx: Math.cos(angle) * speed,
				vy: Math.sin(angle) * speed,
				color: palette[Math.floor(Math.random() * palette.length)]!,
				size: randomInRange(0.85, 1.7),
				type: Math.random() < 0.75 ? 'dot' : 'line',
				opacity: randomInRange(0.5, 0.92),
				phaseX: Math.random() * Math.PI * 2,
				phaseY: Math.random() * Math.PI * 2
			});
		}
		return list;
	}

	function resizeCanvas() {
		if (!canvasEl || !ctx) return;
		const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
		width = window.innerWidth;
		height = window.innerHeight;
		canvasEl.width = width * dpr;
		canvasEl.height = height * dpr;
		canvasEl.style.width = `${width}px`;
		canvasEl.style.height = `${height}px`;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		particles = createParticles();
	}

	function handleMouse(e: MouseEvent) {
		cursorInView = true;
		framesSinceMouseMove = 0;
		const now = Date.now();
		if (now - lastMouseTime < THROTTLE_MS) return;
		lastMouseTime = now;
		prevMouseX = mouseX;
		prevMouseY = mouseY;
		mouseX = e.clientX;
		mouseY = e.clientY;
		if (prevMouseX > -1e3 && prevMouseY > -1e3) {
			const dx = mouseX - prevMouseX;
			const dy = mouseY - prevMouseY;
			mouseSpeed = Math.min(1, Math.hypot(dx, dy) / 80);
		} else {
			mouseSpeed = 0;
		}
	}

	function handleMouseLeave() {
		cursorInView = false;
	}

	function handleTouch(e: TouchEvent) {
		if (e.touches.length > 0) {
			cursorInView = true;
			framesSinceMouseMove = 0;
			mouseX = e.touches[0]!.clientX;
			mouseY = e.touches[0]!.clientY;
		}
	}

	function handleTouchEnd() {
		cursorInView = false;
	}

	function handleClick(e: MouseEvent) {
		if (pulseRadius <= 0 || pulseStrength <= 0) return;
		pulseX = e.clientX;
		pulseY = e.clientY;
		pulseT = PULSE_DURATION;
	}

	function tick() {
		if (!ctx || width <= 0 || height <= 0) return;

		// Smooth mouse follow (lerp); snap on first valid position
		const t = typeof mouseSmooth === 'number' && mouseSmooth > 0 ? Math.min(mouseSmooth, 1) : LERP;
		// Slower wave time increment for calmer wave
		waveTime += (typeof waveSpeed === 'number' ? waveSpeed : 0.01) * 0.6;
		if (mouseX > -1e3 && mouseY > -1e3) {
			if (smoothMouseX < -1e3) {
				smoothMouseX = mouseX;
				smoothMouseY = mouseY;
			} else {
				smoothMouseX += (mouseX - smoothMouseX) * t;
				smoothMouseY += (mouseY - smoothMouseY) * t;
			}
		}
		mouseSpeed *= 0.92;
		if (pulseT > 0) pulseT -= 1;

		const useSmooth = smoothMouseX > -1e3 && smoothMouseY > -1e3;
		const cx = useSmooth ? smoothMouseX : mouseX;
		const cy = useSmooth ? smoothMouseY : mouseY;

		// Cursor active = in view and moved recently; then "release" triggers scatter
		const cursorActive = cursorInView && framesSinceMouseMove < IDLE_FRAMES_BEFORE_SCATTER;
		if (cursorActive && useSmooth) wasGathering = true;

		const scatterRadiusUse = scatterRadius > 0 ? scatterRadius : mouseRadius;
		if (wasGathering && !cursorActive && scatterT === 0 && scatterStrength > 0 && scatterRadiusUse > 0) {
			scatterX = cx;
			scatterY = cy;
			scatterT = SCATTER_DURATION;
			wasGathering = false;
		}
		if (scatterT > 0) scatterT -= 1;
		framesSinceMouseMove += 1;

		ctx.clearRect(0, 0, width, height);

		const radiusSq = mouseRadius * mouseRadius;

		// Optional: subtle cursor glow
		if (cursorGlowRadius > 0 && cx > 0 && cy > 0) {
			const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, cursorGlowRadius);
			gradient.addColorStop(0, $theme ? 'rgba(255,200,150,0.08)' : 'rgba(255,100,50,0.06)');
			gradient.addColorStop(1, 'transparent');
			ctx.fillStyle = gradient;
			ctx.fillRect(cx - cursorGlowRadius, cy - cursorGlowRadius, cursorGlowRadius * 2, cursorGlowRadius * 2);
		}

		// Connection lines (before particles so they sit behind)
		if (connectRadius > 0 && particles.length > 0) {
			const connSq = connectRadius * connectRadius;
			for (let i = 0; i < particles.length; i++) {
				const a = particles[i]!;
				let drawn = 0;
				for (let j = i + 1; j < particles.length && drawn < CONNECT_MAX; j++) {
					const b = particles[j]!;
					const dx = b.x - a.x;
					const dy = b.y - a.y;
					if (dx * dx + dy * dy < connSq) {
						const dist = Math.sqrt(dx * dx + dy * dy);
						const alpha = (1 - dist / connectRadius) * 0.18 * Math.min(a.opacity, b.opacity);
						ctx.strokeStyle = $theme ? `rgba(255,230,200,${alpha})` : `rgba(180,100,60,${alpha})`;
						ctx.lineWidth = 0.6;
						ctx.beginPath();
						ctx.moveTo(a.x, a.y);
						ctx.lineTo(b.x, b.y);
						ctx.stroke();
						drawn++;
					}
				}
			}
		}

		const velocityMult = 1 + (velocityInfluence > 0 ? mouseSpeed * velocityInfluence : 0);
		const pulseRadiusSq = pulseRadius * pulseRadius;

		const noMotion = reducedMotion;
		const wave = noMotion ? 0 : waveAmplitude;
		const drift = noMotion ? 0 : idleDrift;
		const lift = noMotion ? 0 : upwardDrift;
		const scatterStr = noMotion ? 0 : scatterStrength;

		for (let i = 0; i < particles.length; i++) {
			const p = particles[i]!;
			if (drift > 0) {
				p.vx += (Math.random() - 0.5) * drift;
				p.vy += (Math.random() - 0.5) * drift;
			}
			if (wave > 0) {
				p.vx += Math.sin(waveTime + p.phaseX) * wave;
				p.vy += Math.cos(waveTime * 0.7 + p.phaseY) * wave;
			}
			if (lift !== 0) p.vy -= lift;

			const dx = cx - p.x;
			const dy = cy - p.y;
			const distSq = dx * dx + dy * dy;
			if (distSq < radiusSq && distSq > 0) {
				const dist = Math.sqrt(distSq);
				const t = dist / mouseRadius;
				const falloff = 1 - t * t * (3 - 2 * t); // smoothstep for soft edge transition
				const force = falloff * mouseStrength * velocityMult;
				const nx = dx / dist;
				const ny = dy / dist;
				const sign = mouseMode === 'repel' ? -1 : 1;
				p.vx += nx * force * sign;
				p.vy += ny * force * sign;
			}

			// Click pulse: one-time burst from pulse position
			if (pulseT > 0 && pulseRadius > 0 && pulseStrength > 0) {
				const pdx = pulseX - p.x;
				const pdy = pulseY - p.y;
				const pdistSq = pdx * pdx + pdy * pdy;
				if (pdistSq < pulseRadiusSq && pdistSq > 0) {
					const pdist = Math.sqrt(pdistSq);
					const pfalloff = (1 - pdist / pulseRadius) * (pulseT / PULSE_DURATION);
					const pforce = pfalloff * pulseStrength;
					const pnx = pdx / pdist;
					const pny = pdy / pdist;
					const psign = mouseMode === 'repel' ? 1 : -1;
					p.vx += pnx * pforce * psign;
					p.vy += pny * pforce * psign;
				}
			}

			if (scatterT > 0 && scatterStr > 0 && scatterRadiusUse > 0) {
				const sdx = p.x - scatterX;
				const sdy = p.y - scatterY;
				const sdistSq = sdx * sdx + sdy * sdy;
				const scatterRadiusSq = scatterRadiusUse * scatterRadiusUse;
				if (sdistSq < scatterRadiusSq && sdistSq > 1) {
					const sdist = Math.sqrt(sdistSq);
					const t = sdist / scatterRadiusUse;
					const falloff = 1 - t * t * (3 - 2 * t);
					const u = scatterT / SCATTER_DURATION;
					const fade = 4 * u * (1 - u); // smooth ramp up and down
					const force = falloff * fade * scatterStr;
					// Base direction: away from scatter center; add random angle for variety
					let angle = Math.atan2(sdy, sdx);
					angle += (Math.random() - 0.5) * 2 * scatterRandomAngle;
					const nx = Math.cos(angle);
					const ny = Math.sin(angle);
					p.vx += nx * force;
					p.vy += ny * force;
				}
			}

			p.vx *= DAMPING;
			p.vy *= DAMPING;
			const speed = Math.hypot(p.vx, p.vy);
			if (speed > MAX_SPEED) {
				const s = MAX_SPEED / speed;
				p.vx *= s;
				p.vy *= s;
			}
			p.x += p.vx;
			p.y += p.vy;
			if (p.x < 0) p.x = width;
			if (p.x > width) p.x = 0;
			if (p.y < 0) p.y = height;
			if (p.y > height) p.y = 0;

			ctx.globalAlpha = p.opacity;
			ctx.fillStyle = p.color;
			if (p.type === 'line') {
				const len = p.size * 2.5;
				ctx.beginPath();
				ctx.moveTo(p.x, p.y);
				ctx.lineTo(p.x + p.vx * len, p.y + p.vy * len);
				ctx.strokeStyle = p.color;
				ctx.lineWidth = p.size;
				ctx.lineCap = 'round';
				ctx.lineJoin = 'round';
				ctx.stroke();
			} else {
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
				ctx.fill();
			}
		}
		ctx.globalAlpha = 1;

		if (destroyed) return;
		if (typeof document !== 'undefined' && document.hidden) {
			rafId = 0;
			return;
		}
		rafId = requestAnimationFrame(tick);
	}

	function onVisibilityChange() {
		if (document.hidden || destroyed || !canvasEl) return;
		if (rafId === 0) tick();
	}

	onMount(() => {
		if (!canvasEl) return;
		reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		ctx = canvasEl.getContext('2d');
		resizeCanvas();

		let themeFirst = true;
		themeUnsubscribe = theme.subscribe(() => {
			if (themeFirst) {
				themeFirst = false;
				return;
			}
			if (!destroyed && width > 0 && ctx) particles = createParticles();
		});

		window.addEventListener('resize', resizeCanvas);
		window.addEventListener('mousemove', handleMouse);
		window.addEventListener('mouseleave', handleMouseLeave);
		window.addEventListener('click', handleClick);
		window.addEventListener('touchstart', handleTouch, { passive: true });
		window.addEventListener('touchmove', handleTouch, { passive: true });
		window.addEventListener('touchend', handleTouchEnd, { passive: true });
		window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
		document.addEventListener('visibilitychange', onVisibilityChange);
		tick();
	});

	onDestroy(() => {
		destroyed = true;
		if (themeUnsubscribe) themeUnsubscribe();
		if (!browser) return;
		if (rafId) cancelAnimationFrame(rafId);
		window.removeEventListener('resize', resizeCanvas);
		window.removeEventListener('mousemove', handleMouse);
		window.removeEventListener('mouseleave', handleMouseLeave);
		window.removeEventListener('click', handleClick);
		window.removeEventListener('touchstart', handleTouch);
		window.removeEventListener('touchmove', handleTouch);
		window.removeEventListener('touchend', handleTouchEnd);
		window.removeEventListener('touchcancel', handleTouchEnd);
		document.removeEventListener('visibilitychange', onVisibilityChange);
	});
</script>

{#if browser}
	<canvas
		bind:this={canvasEl}
		class={className}
		style="display: block; width: 100%; height: 100%;"
		aria-hidden="true"
	></canvas>
{/if}
