import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import { execSync } from 'node:child_process';

// Build-time git metadata baked into the bundle as compile-time constants.
// The footer surfaces these so each deploy carries a visible commit signal
// — clicks through to the GitHub commit so anyone can see what's actually live.
function gitShort(): string {
	try {
		return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
			.toString()
			.trim();
	} catch {
		return 'dev';
	}
}
function gitDate(): string {
	try {
		return execSync('git log -1 --format=%cs', { stdio: ['ignore', 'pipe', 'ignore'] })
			.toString()
			.trim();
	} catch {
		return new Date().toISOString().slice(0, 10);
	}
}

const config: UserConfig = {
	plugins: [UnoCSS(), sveltekit()],
	define: {
		__BUILD_SHA__: JSON.stringify(gitShort()),
		__BUILD_DATE__: JSON.stringify(gitDate())
	},
	css: {
		postcss: {
			plugins: []
		}
	}
};

export default config;
