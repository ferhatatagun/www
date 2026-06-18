<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { siteOrigin } from '$lib/data/site';
	import { questions } from '@data/shell-quiz';

	type Phase = 'intro' | 'playing' | 'done';

	let phase: Phase = 'intro';
	let order: number[] = [];
	let cursor = 0;
	let score = 0;
	/** picked index per question, by `order[cursor]`; null until answered */
	let picks: (number | null)[] = [];

	$: q = phase === 'playing' && order.length ? questions[order[cursor]] : null;
	$: chosen = picks[cursor];
	$: answered = chosen !== null && chosen !== undefined;

	function shuffle<T>(arr: T[]): T[] {
		const a = [...arr];
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	function start() {
		order = shuffle(questions.map((_, i) => i));
		cursor = 0;
		score = 0;
		picks = new Array(order.length).fill(null);
		phase = 'playing';
	}

	function pick(i: number) {
		if (answered) return;
		picks[cursor] = i;
		picks = picks; // svelte reactivity nudge
		if (i === questions[order[cursor]].correct) score++;
	}

	function next() {
		if (cursor < order.length - 1) {
			cursor++;
		} else {
			phase = 'done';
		}
	}

	function rank(s: number, total: number): { title: string; sub: string } {
		const pct = s / total;
		if (pct === 1) return { title: 'wizard', sub: 'You probably wrote half of GNU coreutils.' };
		if (pct >= 0.85) return { title: 'sysadmin', sub: 'Production runs on muscle memory like this.' };
		if (pct >= 0.65) return { title: 'senior dev', sub: 'Solid. A few less-common ones tripped you up.' };
		if (pct >= 0.45) return { title: 'mid dev', sub: 'You know the basics. Time to read `man find`.' };
		if (pct >= 0.25) return { title: 'junior dev', sub: "Welcome to the shell. It's a journey." };
		return { title: 'n00b', sub: 'Honest result. Bookmark this page; come back in a month.' };
	}

	let shareUrl = '';
	$: if (phase === 'done') {
		const r = rank(score, order.length);
		const text = `I scored ${score}/${order.length} (${r.title}) on the shell-quiz at ferhatatagun.com/play/shell-quiz`;
		shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
	}

	function restart() {
		start();
	}

	// Keyboard: 1-4 picks, Enter advances.
	function onkey(e: KeyboardEvent) {
		if (phase !== 'playing' || !q) return;
		if (!answered && ['1', '2', '3', '4'].includes(e.key)) {
			pick(parseInt(e.key, 10) - 1);
		} else if (answered && (e.key === 'Enter' || e.key === ' ')) {
			next();
		}
	}

	onMount(() => {
		window.addEventListener('keydown', onkey);
		return () => window.removeEventListener('keydown', onkey);
	});
</script>

<svelte:head>
	<title>shell-quiz · ferhat@atagun:~$</title>
	<link rel="canonical" href={`${siteOrigin}/play/shell-quiz`} />
	<meta name="description" content="A 20-question terminal-styled quiz on real shell commands — find, grep, sed, awk, ssh tunnels, signal numbers, and the ones you wish you'd known sooner." />
	<meta name="robots" content="index, follow" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="shell-quiz · ferhatatagun" />
	<meta property="og:description" content="20 real shell commands. Pick what each one does. See if you're a n00b or a wizard." />
	<meta property="og:url" content={`${siteOrigin}/play/shell-quiz`} />
</svelte:head>

<section class="page">
	<div class="term">
		<header class="term__bar">
			<span class="term__dot term__dot--r" aria-hidden="true"></span>
			<span class="term__dot term__dot--y" aria-hidden="true"></span>
			<span class="term__dot term__dot--g" aria-hidden="true"></span>
			<span class="term__title">ferhat@atagun: ~/play — shell-quiz</span>
		</header>
		<div class="term__body">
			{#if phase === 'intro'}
				<p class="line">
					<span class="prompt">ferhat@atagun</span><span class="sep">:</span><span class="cwd">~/play</span><span class="sep">$ </span><span class="cmd">cat README.md</span>
				</p>
				<h1 class="intro__h1"># shell-quiz</h1>
				<p class="intro__p">
					Twenty real shell commands. Pick what each one actually does.
					No tricks — wrong answers are plausible commands, not typos.
				</p>
				<p class="intro__p intro__p--meta">
					<span class="kbd">1</span>–<span class="kbd">4</span> to pick · <span class="kbd">Enter</span> to advance · ~5 min
				</p>
				<p class="line line--spaced">
					<span class="prompt">ferhat@atagun</span><span class="sep">:</span><span class="cwd">~/play</span><span class="sep">$ </span><button class="run-btn" on:click={start}>./shell-quiz start<span class="cursor">_</span></button>
				</p>
			{:else if phase === 'playing' && q}
				<p class="line">
					<span class="prompt">ferhat@atagun</span><span class="sep">:</span><span class="cwd">~/play</span><span class="sep">$ </span><span class="cmd">echo "{cursor + 1} / {order.length}"</span>
				</p>
				<p class="progress">
					<span class="progress__bar" style="--p:{((cursor + 1) / order.length) * 100}%"></span>
					<span class="progress__label">question {cursor + 1} of {order.length} · score {score}</span>
				</p>

				<p class="line line--spaced">
					<span class="prompt">$</span> <span class="cmd cmd--big">{q.cmd}</span>
				</p>
				<p class="qprompt"># {q.prompt}</p>

				<ul class="opts">
					{#each q.options as opt, i}
						{@const isCorrect = i === q.correct}
						{@const isPicked = chosen === i}
						<li>
							<button
								class="opt"
								class:opt--correct={answered && isCorrect}
								class:opt--wrong={answered && isPicked && !isCorrect}
								class:opt--dim={answered && !isPicked && !isCorrect}
								disabled={answered}
								on:click={() => pick(i)}
							>
								<span class="opt__key">{i + 1}</span>
								<span class="opt__text">{opt}</span>
								{#if answered && isCorrect}
									<span class="opt__mark opt__mark--ok">✓</span>
								{:else if answered && isPicked && !isCorrect}
									<span class="opt__mark opt__mark--err">✗</span>
								{/if}
							</button>
						</li>
					{/each}
				</ul>

				{#if answered}
					<p class="explain">
						<span class="explain__label">man:</span>
						{q.explain}
					</p>
					<p class="line line--spaced">
						<button class="run-btn" on:click={next}>
							{cursor < order.length - 1 ? './next' : './finish'}<span class="cursor">_</span>
						</button>
						<span class="hint">(or press <span class="kbd">Enter</span>)</span>
					</p>
				{/if}
			{:else if phase === 'done'}
				{@const r = rank(score, order.length)}
				<p class="line">
					<span class="prompt">ferhat@atagun</span><span class="sep">:</span><span class="cwd">~/play</span><span class="sep">$ </span><span class="cmd">cat result.json</span>
				</p>
				<pre class="result">{`{
  "score":  ${score}/${order.length},
  "rank":   "${r.title}",
  "verdict": "${r.sub}"
}`}</pre>
				<p class="line line--spaced">
					<a href={shareUrl} target="_blank" rel="noreferrer" class="run-btn run-btn--link">share to twitter ↗</a>
					<button class="run-btn run-btn--ghost" on:click={restart}>./play again<span class="cursor">_</span></button>
				</p>
				<p class="line line--spaced">
					<a href={`${base}/blog`} class="back">cd /blog</a>
					<span class="hint">— more dev notes</span>
				</p>
			{/if}
		</div>
	</div>
</section>

<style lang="scss">
	.page {
		min-height: 100vh;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding: 2.5rem 1rem;
	}
	.term {
		width: 100%;
		max-width: 760px;
		border: 1px solid var(--border);
		border-radius: 10px;
		overflow: hidden;
		background: rgba(15, 15, 18, 0.92);
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
		color: #d4d4d8;
	}
	.term__bar {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.6rem 0.9rem;
		background: rgba(0, 0, 0, 0.3);
		border-bottom: 1px solid #2a2a2e;
	}
	.term__dot {
		width: 0.7rem; height: 0.7rem; border-radius: 50%; display: inline-block;
	}
	.term__dot--r { background: #ff5f56; }
	.term__dot--y { background: #ffbd2e; }
	.term__dot--g { background: #27c93f; }
	.term__title {
		margin-left: 0.7rem;
		font-family: ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace;
		font-size: 0.78rem;
		color: #71717a;
		letter-spacing: 0.02em;
	}
	.term__body {
		padding: 1.4rem 1.5rem 1.6rem;
		font-family: ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace;
		font-size: 0.92rem;
		line-height: 1.7;
	}

	.line { margin: 0; word-break: break-word; }
	.line--spaced { margin-top: 1.1rem; }
	.prompt { color: #a78bfa; font-weight: 600; }
	.sep { color: #71717a; }
	.cwd { color: #38bdf8; }
	.cmd { color: #f4f4f5; }
	.cmd--big {
		font-size: 1.1rem;
		background: rgba(167, 139, 250, 0.08);
		padding: 0.2rem 0.45rem;
		border-radius: 4px;
		border: 1px solid rgba(167, 139, 250, 0.15);
	}
	.cursor {
		display: inline-block;
		width: 0.5em;
		color: #a78bfa;
		animation: blink 1.1s steps(2, jump-none) infinite;
	}
	@keyframes blink { 50% { opacity: 0; } }
	@media (prefers-reduced-motion: reduce) {
		.cursor { animation: none; opacity: 0.6; }
	}

	.intro__h1 {
		font-size: 1.4rem;
		margin: 0.8rem 0 0.6rem;
		color: #f4f4f5;
		font-weight: 700;
	}
	.intro__p {
		color: #d4d4d8;
		margin: 0.4rem 0 0;
		max-width: 56ch;
	}
	.intro__p--meta { color: #71717a; font-size: 0.85rem; margin-top: 0.9rem; }
	.kbd {
		display: inline-block;
		padding: 0 0.4em;
		border: 1px solid #3a3a3e;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.04);
		color: #d4d4d8;
		font-size: 0.78rem;
	}

	.run-btn {
		background: none;
		border: none;
		font: inherit;
		color: #a78bfa;
		cursor: pointer;
		padding: 0;
		text-decoration: none;
	}
	.run-btn:hover { color: #c4b5fd; text-decoration: underline; }
	.run-btn--link { color: #38bdf8; }
	.run-btn--link:hover { color: #7dd3fc; }
	.run-btn--ghost { color: #71717a; margin-left: 1rem; }
	.run-btn--ghost:hover { color: #d4d4d8; }
	.hint { color: #71717a; font-size: 0.82rem; margin-left: 0.55rem; }

	.progress {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		margin: 0.5rem 0 1.2rem;
	}
	.progress__bar {
		position: relative;
		display: block;
		height: 3px;
		background: #2a2a2e;
		border-radius: 2px;
		overflow: hidden;
	}
	.progress__bar::before {
		content: '';
		position: absolute;
		inset: 0;
		width: var(--p);
		background: linear-gradient(90deg, #8b5cf6, #38bdf8);
		transition: width 0.25s ease;
	}
	.progress__label {
		font-size: 0.78rem;
		color: #71717a;
	}

	.qprompt {
		margin: 0.3rem 0 0.9rem;
		color: #d4d4d8;
		font-size: 0.95rem;
	}

	.opts {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.opt {
		display: flex;
		width: 100%;
		align-items: flex-start;
		gap: 0.7rem;
		padding: 0.55rem 0.8rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid #2a2a2e;
		border-radius: 6px;
		color: #d4d4d8;
		font: inherit;
		text-align: left;
		cursor: pointer;
		transition: border-color 0.12s, background 0.12s, color 0.12s;
	}
	.opt:hover:not([disabled]) {
		border-color: #a78bfa;
		background: rgba(167, 139, 250, 0.06);
		color: #f4f4f5;
	}
	.opt[disabled] { cursor: default; }
	.opt__key {
		flex-shrink: 0;
		display: inline-block;
		min-width: 1.4em;
		text-align: center;
		color: #71717a;
		font-size: 0.85rem;
	}
	.opt__text { flex: 1; }
	.opt__mark { flex-shrink: 0; font-weight: 700; }
	.opt__mark--ok { color: #34d399; }
	.opt__mark--err { color: #f87171; }
	.opt--correct {
		border-color: #34d399 !important;
		background: rgba(52, 211, 153, 0.08);
		color: #ecfdf5;
	}
	.opt--wrong {
		border-color: #f87171 !important;
		background: rgba(248, 113, 113, 0.08);
		color: #fef2f2;
	}
	.opt--dim { opacity: 0.45; }

	.explain {
		margin: 1rem 0 0;
		padding: 0.7rem 0.9rem;
		background: rgba(167, 139, 250, 0.05);
		border-left: 2px solid #a78bfa;
		border-radius: 0 4px 4px 0;
		color: #d4d4d8;
		font-size: 0.9rem;
	}
	.explain__label {
		display: inline-block;
		padding: 0 0.45em;
		margin-right: 0.4em;
		background: rgba(167, 139, 250, 0.18);
		border-radius: 3px;
		color: #c4b5fd;
		font-size: 0.78rem;
		font-weight: 600;
	}

	.result {
		margin: 0.8rem 0 0;
		padding: 1rem 1.1rem;
		background: rgba(167, 139, 250, 0.06);
		border: 1px solid rgba(167, 139, 250, 0.2);
		border-radius: 6px;
		color: #f4f4f5;
		font-size: 1rem;
		line-height: 1.6;
		overflow-x: auto;
		white-space: pre;
	}
	.back {
		color: #a78bfa;
		text-decoration: none;
	}
	.back:hover { text-decoration: underline; color: #c4b5fd; }
</style>
