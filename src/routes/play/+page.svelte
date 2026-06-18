<script lang="ts">
	import { base } from '$app/paths';
	import { siteOrigin } from '$lib/data/site';

	// Mini directory for browser-based, no-backend toys that fit the
	// dev-tool aesthetic. New entries get added here; each game is a
	// `/play/<slug>` route.
	const games = [
		{
			slug: 'shell-quiz',
			name: 'shell-quiz',
			tagline: 'Twenty real commands. Pick what each one does.',
			tag: 'quiz · 5 min'
		}
	];
</script>

<svelte:head>
	<title>/play · ferhat@atagun</title>
	<link rel="canonical" href={`${siteOrigin}/play`} />
	<meta name="description" content="Small browser-only dev toys — quizzes and puzzles in terminal style. No backend, no signup, just open and play." />
	<meta name="robots" content="index, follow" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="/play — small dev toys by ferhatatagun" />
	<meta property="og:description" content="Browser-only quizzes and puzzles for developers. Terminal-styled, no signup." />
	<meta property="og:url" content={`${siteOrigin}/play`} />
</svelte:head>

<section class="page">
	<div class="term">
		<header class="bar">
			<span class="dot dot--r" aria-hidden="true"></span>
			<span class="dot dot--y" aria-hidden="true"></span>
			<span class="dot dot--g" aria-hidden="true"></span>
			<span class="title">ferhat@atagun: ~/play — zsh</span>
		</header>
		<div class="body">
			<p class="line">
				<span class="prompt">ferhat@atagun</span><span class="sep">:</span><span class="cwd">~/play</span><span class="sep">$ </span><span class="cmd">ls</span>
			</p>

			<ul class="games">
				{#each games as g}
					<li>
						<a href={`${base}/play/${g.slug}`} class="game">
							<span class="game__perm">-rwxr-xr-x</span>
							<span class="game__name">{g.name}</span>
							<span class="game__tag">{g.tag}</span>
							<span class="game__tag game__tag--sub">{g.tagline}</span>
						</a>
					</li>
				{/each}
			</ul>

			<p class="line line--spaced meta">
				More toys later. The constraint is the same as the dev tools:
				browser-only, no backend, no signup.
			</p>

			<p class="line line--spaced">
				<a href={`${base}/`} class="back">cd /</a>
				<span class="hint">— back home</span>
			</p>
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
	.bar {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.6rem 0.9rem;
		background: rgba(0, 0, 0, 0.3);
		border-bottom: 1px solid #2a2a2e;
	}
	.dot {
		width: 0.7rem; height: 0.7rem; border-radius: 50%; display: inline-block;
	}
	.dot--r { background: #ff5f56; }
	.dot--y { background: #ffbd2e; }
	.dot--g { background: #27c93f; }
	.title {
		margin-left: 0.7rem;
		font-family: ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace;
		font-size: 0.78rem;
		color: #71717a;
		letter-spacing: 0.02em;
	}
	.body {
		padding: 1.4rem 1.5rem 1.6rem;
		font-family: ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace;
		font-size: 0.92rem;
		line-height: 1.7;
	}
	.line { margin: 0; }
	.line--spaced { margin-top: 1.2rem; }
	.prompt { color: #a78bfa; font-weight: 600; }
	.sep { color: #71717a; }
	.cwd { color: #38bdf8; }
	.cmd { color: #f4f4f5; }
	.meta { color: #71717a; max-width: 60ch; }
	.hint { color: #71717a; font-size: 0.82rem; margin-left: 0.5rem; }
	.back {
		color: #a78bfa;
		text-decoration: none;
	}
	.back:hover { text-decoration: underline; color: #c4b5fd; }

	.games {
		list-style: none;
		margin: 0.4rem 0 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}
	.game {
		display: grid;
		grid-template-columns: auto auto auto 1fr;
		align-items: baseline;
		gap: 0.9rem;
		padding: 0.45rem 0.55rem;
		border-radius: 4px;
		text-decoration: none;
		transition: background 0.12s;
	}
	.game:hover { background: rgba(167, 139, 250, 0.08); }
	.game__perm { color: #71717a; font-size: 0.85rem; }
	.game__name {
		color: #a78bfa;
		font-weight: 600;
	}
	.game:hover .game__name { color: #c4b5fd; text-decoration: underline; }
	.game__tag { color: #71717a; font-size: 0.82rem; }
	.game__tag--sub {
		color: #d4d4d8;
		font-size: 0.85rem;
		grid-column: 4 / -1;
	}
	@media (max-width: 560px) {
		.game {
			grid-template-columns: auto 1fr;
			row-gap: 0.15rem;
		}
		.game__perm { display: none; }
		.game__tag { grid-column: 1 / -1; }
		.game__tag--sub { grid-column: 1 / -1; }
	}
</style>
