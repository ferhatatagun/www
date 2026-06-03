import post1Raw from '$lib/md/blog/yapay-zeka-ve-yazilim-gelistirme-2024.md?raw';
import post2Raw from '$lib/md/blog/mcp-model-context-protocol-nedir.md?raw';
import post3Raw from '$lib/md/blog/cursor-ide-ve-prompt-muhendisligi.md?raw';
import post3EnRaw from '$lib/md/blog/cursor-ide-ve-prompt-muhendisligi-en.md?raw';
import post4Raw from '$lib/md/blog/neden-bazen-sadece-bos-ekrana-bakiyorum.md?raw';
import post5Raw from '$lib/md/blog/bitmemis-projeler-mezarligim.md?raw';
import post6Raw from '$lib/md/blog/best-practice-dedigin-yarisi-ezber.md?raw';
import post7EnRaw from '$lib/md/blog/rules-and-commands-that-stick-en.md?raw';
import post8EnRaw from '$lib/md/blog/browser-only-claude-streaming-en.md?raw';

/**
 * Blog post metadata and optional raw markdown content.
 */
export type ContentLang = 'tr' | 'en';

export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	date: string; // ISO date
	tags: string[];
	/** English title when post has EN content */
	titleEn?: string;
	/** English excerpt when post has EN content */
	excerptEn?: string;
	/** Optional link to original/source (e.g. external article or translation) */
	sourceUrl?: string;
}

const contentMap: Record<string, string> = {
	'yapay-zeka-ve-yazilim-gelistirme-2024': post1Raw,
	'mcp-model-context-protocol-nedir': post2Raw,
	'cursor-ide-ve-prompt-muhendisligi': post3Raw,
	'neden-bazen-sadece-bos-ekrana-bakiyorum': post4Raw,
	'bitmemis-projeler-mezarligim': post5Raw,
	'best-practice-dedigin-yarisi-ezber': post6Raw
};

const contentMapEn: Record<string, string> = {
	'cursor-ide-ve-prompt-muhendisligi': post3EnRaw,
	'rules-and-commands-that-stick': post7EnRaw,
	'browser-only-claude-streaming': post8EnRaw
};

export const title = 'Blog';

export const items: BlogPost[] = [
	{
		slug: 'yapay-zeka-ve-yazilim-gelistirme-2024',
		title: 'Yapay Zeka ile Yazılım Geliştirme: MCP, GPT ve Cursor',
		excerpt:
			'LLM araçları, Model Context Protocol (MCP) ve Cursor ile günlük geliştirme pratiğinde nasıl daha verimli olunur.',
		date: '2024-12-01',
		tags: ['AI', 'MCP', 'Cursor', 'LLM', 'Productivity']
	},
	{
		slug: 'mcp-model-context-protocol-nedir',
		title: 'Model Context Protocol (MCP) Nedir?',
		excerpt:
			"MCP, AI asistanlarının dosya sistemine, API'lere ve araçlara güvenli erişimini standartlaştıran açık protokol.",
		date: '2024-11-15',
		tags: ['MCP', 'AI', 'Protocol', 'Developer Tools']
	},
	{
		slug: 'cursor-ide-ve-prompt-muhendisligi',
		title: 'Cursor IDE ve Prompt Mühendisliği',
		excerpt:
			'Cursor’da @dosya, @web kullanımı, net talimatlar ve .cursorrules ile daha tutarlı ve verimli AI kullanımı.',
		date: '2024-11-01',
		tags: ['Cursor', 'AI', 'Prompt Engineering', 'IDE'],
		titleEn: 'Cursor IDE and Prompt Engineering',
		excerptEn:
			'Using @file, @web, clear instructions and .cursorrules for more consistent and efficient AI use in Cursor.'
	},
	{
		slug: 'neden-bazen-sadece-bos-ekrana-bakiyorum',
		title: 'Neden Bazen Sadece Boş Ekrana Bakıyorum',
		excerpt:
			'Hiçbir tuşa basmadan ekrana bakmak da işin parçası. Verimlilik kültürüne ters bir itiraf.',
		date: '2025-01-12',
		tags: ['Mindset', 'Productivity', 'Reflection']
	},
	{
		slug: 'bitmemis-projeler-mezarligim',
		title: 'Bitmemiş Projeler Mezarlığım ve Neden Rahatım',
		excerpt:
			"Yarım kalan side project'ler başarısızlık mı? Bence bazen sadece keşfin kendisi.",
		date: '2025-01-05',
		tags: ['Side Projects', 'Mindset', 'Learning']
	},
	{
		slug: 'best-practice-dedigin-yarisi-ezber',
		title: '"Best Practice" Dediklerimizin Yarısı Ezber',
		excerpt:
			'DRY, test coverage, yorum yazmak… Kurallar bağlam olmadan anlamsız. Cesur bir tez.',
		date: '2024-12-20',
		tags: ['Code Quality', 'Opinion', 'Software Design']
	},
	{
		slug: 'rules-and-commands-that-stick',
		title: 'Rules and Commands That Actually Stick',
		excerpt:
			'How to make .cursorrules and slash commands useful instead of forgotten: start from pain, keep the list short, iterate from real usage.',
		date: '2025-01-18',
		tags: ['Cursor', 'Rules', 'Commands', 'Workflow', 'AI']
	},
	{
		slug: 'browser-only-claude-streaming',
		title: 'Building a streaming Claude client in the browser — without the SDK',
		excerpt:
			'Why I skipped the official Anthropic SDK for browser work, and the ~150 lines of TypeScript that replaced it: a hand-rolled SSE parser with tool-use support, clean aborts, and meaningful errors.',
		date: '2026-06-03',
		tags: ['Claude', 'Anthropic', 'SSE', 'Streaming', 'TypeScript', 'Browser']
	}
];

/** Blog posts sorted by date, newest first */
export const sortedItems = [...items].sort((a, b) => b.date.localeCompare(a.date));

export function getPostBySlug(slug: string): BlogPost | undefined {
	return items.find((p) => p.slug === slug);
}

export function getPostContent(slug: string, lang: ContentLang = 'tr'): string | undefined {
	return lang === 'en' ? contentMapEn[slug] : contentMap[slug];
}

/** Whether this post has content in the given language */
export function hasPostContent(slug: string, lang: ContentLang): boolean {
	const raw = getPostContent(slug, lang);
	return typeof raw === 'string' && raw.trim().length > 0;
}

/** Title for display (lang-aware) */
export function getPostTitle(post: BlogPost, lang: ContentLang): string {
	return lang === 'en' && post.titleEn ? post.titleEn : post.title;
}

/** Excerpt for display (lang-aware) */
export function getPostExcerpt(post: BlogPost, lang: ContentLang): string {
	return lang === 'en' && post.excerptEn ? post.excerptEn : post.excerpt;
}

/** Estimated reading time in minutes (≈200 words/min); uses TR or EN content */
export function getReadingMinutes(slug: string): number {
	const raw = contentMap[slug] ?? contentMapEn[slug];
	if (!raw) return 0;
	const words = raw.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / 200));
}

/** Up to 2 related posts (shared tags, then by date) */
export function getRelatedPosts(slug: string): BlogPost[] {
	const current = getPostBySlug(slug);
	if (!current) return [];
	const shared = (p: BlogPost) =>
		p.slug !== slug && p.tags.some((t) => current.tags.includes(t));
	const byScore = (a: BlogPost, b: BlogPost) => {
		const aCount = a.tags.filter((t) => current.tags.includes(t)).length;
		const bCount = b.tags.filter((t) => current.tags.includes(t)).length;
		if (bCount !== aCount) return bCount - aCount;
		return b.date.localeCompare(a.date);
	};
	return sortedItems.filter(shared).sort(byScore).slice(0, 2);
}

/** All unique tags from posts */
export function getAllTags(): string[] {
	const set = new Set<string>();
	items.forEach((p) => p.tags.forEach((t) => set.add(t)));
	return [...set].sort();
}
