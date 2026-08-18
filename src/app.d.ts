// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

declare module '*.md' {
	const content: string;
	export default content;
}

declare module '*.md?raw' {
	const content: string;
	export default content;
}

// Build-time constants injected by vite.config.ts `define`. Surfaced in
// the footer as a deploy fingerprint.
declare const __BUILD_SHA__: string;
declare const __BUILD_DATE__: string;

// Prism language packs ship no type declarations. They're imported purely for
// their side effect (registering a grammar), so an empty module is accurate.
declare module 'prismjs/components/*';
