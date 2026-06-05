#!/usr/bin/env node
/**
 * Generate per-post Open Graph cards (1200×630 PNGs) for every blog post.
 *
 * Reads the items array from src/lib/data/blog.ts with a light regex parser
 * (no Vite, no TS compile), emits an SVG per post, then pipes through
 * `rsvg-convert` (poppler-utils / librsvg) to produce a PNG.
 *
 * Output: static/og-cards/<slug>.png
 *
 * Usage:  node scripts/generate-og-cards.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOG_TS = join(ROOT, 'src/lib/data/blog.ts');
const OUT_DIR = join(ROOT, 'static/og-cards');
const CARD_W = 1200;
const CARD_H = 630;

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

/* --- Parse the items array out of blog.ts ----------------------------- */

const src = readFileSync(BLOG_TS, 'utf8');
const itemsStart = src.indexOf('export const items');
if (itemsStart === -1) {
	console.error('Could not find `export const items` in blog.ts');
	process.exit(1);
}
// Grab from start of items to the closing `];` that ends the array
const itemsBody = src.slice(itemsStart, src.indexOf('];', itemsStart) + 2);

// Pull out each { ... } block (top-level)
const blocks = [];
let depth = 0;
let blockStart = -1;
for (let i = 0; i < itemsBody.length; i++) {
	const c = itemsBody[i];
	if (c === '{') {
		if (depth === 0) blockStart = i;
		depth++;
	} else if (c === '}') {
		depth--;
		if (depth === 0 && blockStart !== -1) {
			blocks.push(itemsBody.slice(blockStart, i + 1));
			blockStart = -1;
		}
	}
}

function unquote(s) {
	return s
		.trim()
		.replace(/^['"`]/, '')
		.replace(/['"`]$/, '')
		.replace(/\\'/g, "'")
		.replace(/\\"/g, '"');
}
function field(block, name) {
	const re = new RegExp(`${name}:\\s*((['\"\`])(?:\\\\.|.)*?\\2)`, 's');
	const m = block.match(re);
	return m ? unquote(m[1]) : null;
}

const posts = blocks
	.map((b) => ({
		slug: field(b, 'slug'),
		title: field(b, 'title'),
		excerpt: field(b, 'excerpt'),
		date: field(b, 'date')
	}))
	.filter((p) => p.slug && p.title);

console.log(`Found ${posts.length} posts.`);

/* --- Language detection (mirrors blog.ts logic) ----------------------- */

const TR_SLUGS_RE = /^(yapay-zeka|mcp-model|cursor-ide|neden-bazen|bitmemis|best-practice|tarayicida|prompt-caching-kim|prompt-secimi|tek-bir-tool|claude-agent-debug|iki-hafta)/;
function langOf(slug, title) {
	if (TR_SLUGS_RE.test(slug)) return 'tr';
	if (/[şçğıöüŞÇĞİÖÜ]/.test(title)) return 'tr';
	return 'en';
}

/* --- SVG template ----------------------------------------------------- */

const escape = (s) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Wrap text into multiple <tspan> lines at a max char count per line.
 * Returns an SVG <text> block.
 */
function wrap(text, maxChars, x, y, lineHeight, attrs = '') {
	const words = text.split(/\s+/);
	const lines = [];
	let line = '';
	for (const w of words) {
		if ((line + ' ' + w).trim().length > maxChars) {
			if (line) lines.push(line);
			line = w;
		} else {
			line = (line ? line + ' ' : '') + w;
		}
	}
	if (line) lines.push(line);

	// Cap at 3 lines, add ellipsis if more
	if (lines.length > 3) {
		const truncated = lines.slice(0, 3);
		truncated[2] = truncated[2].replace(/\s\S+$/, '') + '…';
		lines.length = 0;
		lines.push(...truncated);
	}

	const tspans = lines
		.map((ln, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : lineHeight}">${escape(ln)}</tspan>`)
		.join('');
	return `<text x="${x}" y="${y}" ${attrs}>${tspans}</text>`;
}

function buildSvg(post) {
	const lang = langOf(post.slug, post.title);
	const langColor = lang === 'en' ? '#a78bfa' : '#f472b6';
	const langBg = lang === 'en' ? 'rgba(139,92,246,0.18)' : 'rgba(244,114,182,0.18)';

	const dateLabel = post.date
		? new Date(post.date).toLocaleDateString('en-GB', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			})
		: '';

	// Wrap title to roughly 30 chars per line (works for ~50pt text in our box)
	const titleSvg = wrap(post.title, 30, 80, 250, 70,
		'fill="#f8fafc" font-family="Inter,sans-serif" font-size="56" font-weight="700"');

	// Excerpt wrapped narrower, smaller
	const excerptSvg = post.excerpt
		? wrap(post.excerpt, 75, 80, 470, 32,
				'fill="#94a3b8" font-family="Inter,sans-serif" font-size="22" font-weight="300"')
		: '';

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_W}" height="${CARD_H}" viewBox="0 0 ${CARD_W} ${CARD_H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1020"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="stripe" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#f472b6"/>
    </linearGradient>
    <radialGradient id="glow" cx="20%" cy="30%" r="60%">
      <stop offset="0%" stop-color="rgba(139,92,246,0.12)"/>
      <stop offset="100%" stop-color="rgba(139,92,246,0)"/>
    </radialGradient>
  </defs>

  <rect width="${CARD_W}" height="${CARD_H}" fill="url(#bg)"/>
  <rect width="${CARD_W}" height="${CARD_H}" fill="url(#glow)"/>

  <!-- Left accent stripe -->
  <rect x="0" y="0" width="14" height="${CARD_H}" fill="url(#stripe)"/>

  <!-- Eyebrow line -->
  <text x="80" y="100" fill="#94a3b8" font-family="ui-monospace,SF Mono,monospace" font-size="20" letter-spacing="2">
    FERHATATAGUN.COM / BLOG
  </text>

  <!-- Language pill -->
  <rect x="80" y="130" width="60" height="32" rx="5" fill="${langBg}"/>
  <text x="110" y="152" fill="${langColor}" font-family="ui-monospace,SF Mono,monospace" font-size="18" font-weight="600" text-anchor="middle" letter-spacing="2">
    ${lang.toUpperCase()}
  </text>
  ${dateLabel ? `
  <text x="160" y="152" fill="#94a3b8" font-family="Inter,sans-serif" font-size="18" font-weight="300">
    · ${escape(dateLabel)}
  </text>
  ` : ''}

  <!-- Title -->
  ${titleSvg}

  <!-- Excerpt -->
  ${excerptSvg}

  <!-- Footer line -->
  <line x1="80" y1="555" x2="${CARD_W - 80}" y2="555" stroke="#1e293b" stroke-width="1"/>
  <text x="80" y="585" fill="#64748b" font-family="Inter,sans-serif" font-size="22" font-weight="500">
    Ferhat Atagün
  </text>
  <text x="80" y="610" fill="#475569" font-family="Inter,sans-serif" font-size="18" font-weight="300">
    Frontend Team Lead · Building open-source Claude dev-tools
  </text>
  <text x="${CARD_W - 80}" y="585" fill="#64748b" font-family="ui-monospace,SF Mono,monospace" font-size="18" text-anchor="end" letter-spacing="2">
    /tools
  </text>
</svg>`;
}

/* --- Pipe each SVG through rsvg-convert ------------------------------- */

let okCount = 0;
let failCount = 0;
for (const post of posts) {
	const svg = buildSvg(post);
	const outPng = join(OUT_DIR, `${post.slug}.png`);

	const r = spawnSync('rsvg-convert', ['-w', String(CARD_W), '-h', String(CARD_H), '-o', outPng], {
		input: svg,
		stdio: ['pipe', 'inherit', 'inherit']
	});

	if (r.status === 0) {
		okCount++;
	} else {
		console.error(`Failed: ${post.slug}`);
		failCount++;
	}
}

// Also generate a default card for /blog itself
{
	const defaultSvg = buildSvg({
		slug: '_index',
		title: 'Notes on AI dev-tools, the Claude API, and the frontend craft underneath.',
		excerpt: '18 posts in EN and TR. Written while building a four-tool open-source suite.',
		date: null
	});
	const outPng = join(OUT_DIR, `_blog-index.png`);
	const r = spawnSync('rsvg-convert', ['-w', String(CARD_W), '-h', String(CARD_H), '-o', outPng], {
		input: defaultSvg,
		stdio: ['pipe', 'inherit', 'inherit']
	});
	if (r.status === 0) {
		console.log('Generated blog index card.');
	}
}

console.log(`\n✓ ${okCount} OG cards generated.${failCount ? ` ${failCount} failed.` : ''}`);
console.log(`  → ${OUT_DIR}`);
