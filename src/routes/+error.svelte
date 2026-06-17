<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	$: status = $page?.status ?? 404;
	$: message = $page?.error?.message ?? 'Not found';
	$: path = (typeof window !== 'undefined' && window.location.pathname) || '/';

	let typed = '';
	$: command = `cat ${path}`;

	onMount(() => {
		let i = 0;
		const tick = () => {
			if (i <= command.length) {
				typed = command.slice(0, i);
				i++;
				setTimeout(tick, 35);
			}
		};
		tick();
	});

	const links: Array<{ cmd: string; href: string }> = [
		{ cmd: 'cd /', href: base || '/' },
		{ cmd: 'cd /blog', href: `${base}/blog` },
		{ cmd: 'cd /tools', href: `${base}/tools` },
		{ cmd: 'cd /resume', href: `${base}/resume` }
	];
</script>

<svelte:head>
	<title>{status} · ferhat@atagun:~$</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="term-page">
	<div class="term-window">
		<header class="term-bar">
			<span class="term-dot term-dot--red" aria-hidden="true" />
			<span class="term-dot term-dot--yellow" aria-hidden="true" />
			<span class="term-dot term-dot--green" aria-hidden="true" />
			<span class="term-title">ferhat@atagun: ~ — zsh</span>
		</header>

		<div class="term-body">
			<p class="term-line">
				<span class="term-prompt">ferhat@atagun</span><span class="term-sep">:</span><span class="term-cwd">~</span><span class="term-sep">$ </span><span class="term-cmd">{typed}<span class="term-cursor">_</span></span>
			</p>

			<p class="term-output term-output--err">
				cat: <code>{path}</code>: No such file or directory
			</p>
			<p class="term-output term-output--meta">
				exit code: <code>{status}</code> · <code>{message}</code>
			</p>

			<p class="term-line term-line--spaced">
				<span class="term-prompt">ferhat@atagun</span><span class="term-sep">:</span><span class="term-cwd">~</span><span class="term-sep">$ </span><span class="term-cmd">ls -la /</span>
			</p>
			<ul class="term-ls">
				{#each links as link}
					<li>
						<a href={link.href} class="term-link">
							<span class="term-ls-perm">drwxr-xr-x</span>
							<span class="term-ls-cmd">{link.cmd}</span>
						</a>
					</li>
				{/each}
			</ul>

			<p class="term-line term-line--spaced">
				<span class="term-prompt">ferhat@atagun</span><span class="term-sep">:</span><span class="term-cwd">~</span><span class="term-sep">$ </span><button
					type="button"
					on:click={() => history.back()}
					class="term-back"
				>cd -</button>
				<span class="term-back-hint">(go back)</span>
			</p>
		</div>
	</div>
</section>

<style lang="scss">
	.term-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem 1rem;
		background: var(--main);
	}
	.term-window {
		width: 100%;
		max-width: 720px;
		border: 1px solid var(--border);
		border-radius: 10px;
		overflow: hidden;
		background: rgba(15, 15, 18, 0.75);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
	}
	.term-bar {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.6rem 0.9rem;
		background: rgba(0, 0, 0, 0.25);
		border-bottom: 1px solid var(--border);
	}
	.term-dot {
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 50%;
		display: inline-block;
	}
	.term-dot--red { background: #ff5f56; }
	.term-dot--yellow { background: #ffbd2e; }
	.term-dot--green { background: #27c93f; }
	.term-title {
		margin-left: 0.7rem;
		font-family: ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace;
		font-size: 0.78rem;
		color: var(--tertiary-text);
		letter-spacing: 0.02em;
	}
	.term-body {
		padding: 1.2rem 1.3rem 1.5rem;
		font-family: ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace;
		font-size: 0.92rem;
		line-height: 1.7;
		color: #d4d4d8;
	}
	.term-line { margin: 0; }
	.term-line--spaced { margin-top: 1rem; }
	.term-prompt { color: #a78bfa; font-weight: 600; }
	.term-sep { color: #71717a; }
	.term-cwd { color: #38bdf8; }
	.term-cmd { color: #f4f4f5; }
	.term-cursor {
		display: inline-block;
		width: 0.5em;
		color: #a78bfa;
		animation: blink 1.05s steps(2, jump-none) infinite;
	}
	@keyframes blink { 50% { opacity: 0; } }

	.term-output {
		margin: 0;
		padding-left: 0;
	}
	.term-output--err { color: #f87171; }
	.term-output--meta { color: var(--tertiary-text); font-size: 0.85rem; }
	.term-output code {
		background: rgba(167, 139, 250, 0.08);
		padding: 0 0.3rem;
		border-radius: 3px;
		color: #f4f4f5;
	}

	.term-ls {
		list-style: none;
		margin: 0.2rem 0 0;
		padding: 0 0 0 1rem;
	}
	.term-link {
		display: inline-flex;
		gap: 0.9rem;
		align-items: baseline;
		padding: 0.1rem 0.3rem;
		border-radius: 3px;
		text-decoration: none;
		transition: background 0.15s, color 0.15s;
	}
	.term-link:hover {
		background: rgba(167, 139, 250, 0.1);
	}
	.term-ls-perm { color: #71717a; }
	.term-ls-cmd { color: #a78bfa; }
	.term-link:hover .term-ls-cmd { color: #c4b5fd; text-decoration: underline; }

	.term-back {
		background: none;
		border: none;
		font-family: inherit;
		font-size: inherit;
		color: #a78bfa;
		cursor: pointer;
		padding: 0;
	}
	.term-back:hover { text-decoration: underline; color: #c4b5fd; }
	.term-back-hint { color: #71717a; font-size: 0.82rem; margin-left: 0.5rem; }
</style>
