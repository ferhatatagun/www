import post1Raw from '$lib/md/blog/yapay-zeka-ve-yazilim-gelistirme-2024.md?raw';
import post2Raw from '$lib/md/blog/mcp-model-context-protocol-nedir.md?raw';
import post3Raw from '$lib/md/blog/cursor-ide-ve-prompt-muhendisligi.md?raw';
import post3EnRaw from '$lib/md/blog/cursor-ide-ve-prompt-muhendisligi-en.md?raw';
import post4Raw from '$lib/md/blog/neden-bazen-sadece-bos-ekrana-bakiyorum.md?raw';
import post5Raw from '$lib/md/blog/bitmemis-projeler-mezarligim.md?raw';
import post6Raw from '$lib/md/blog/best-practice-dedigin-yarisi-ezber.md?raw';
import post7EnRaw from '$lib/md/blog/rules-and-commands-that-stick-en.md?raw';
import post8EnRaw from '$lib/md/blog/browser-only-claude-streaming-en.md?raw';
import post9EnRaw from '$lib/md/blog/prompt-caching-nobody-measures-en.md?raw';
import post10EnRaw from '$lib/md/blog/stop-choosing-prompts-by-vibes-en.md?raw';
import post11EnRaw from '$lib/md/blog/build-the-sandbox-first-en.md?raw';
import post12EnRaw from '$lib/md/blog/debug-claude-agents-by-replaying-traces-en.md?raw';
import postTr1Raw from '$lib/md/blog/tarayicida-claude-streaming-sdk-siz.md?raw';
import postTr2Raw from '$lib/md/blog/prompt-caching-kimsenin-olcmedigi.md?raw';
import postTr3Raw from '$lib/md/blog/prompt-secimi-his-degil-olcum.md?raw';
import postTr4Raw from '$lib/md/blog/tek-bir-tool-yazmadan-once-sandbox.md?raw';
import postTr5Raw from '$lib/md/blog/claude-agent-debug-trace-replay.md?raw';
import post13EnRaw from '$lib/md/blog/four-tools-in-two-weekends-en.md?raw';
import postTr6Raw from '$lib/md/blog/iki-hafta-sonu-dort-tool.md?raw';
import post14EnRaw from '$lib/md/blog/see-the-prompt-before-you-ship-it-en.md?raw';

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
	'best-practice-dedigin-yarisi-ezber': post6Raw,
	'tarayicida-claude-streaming-sdk-siz': postTr1Raw,
	'prompt-caching-kimsenin-olcmedigi': postTr2Raw,
	'prompt-secimi-his-degil-olcum': postTr3Raw,
	'tek-bir-tool-yazmadan-once-sandbox': postTr4Raw,
	'claude-agent-debug-trace-replay': postTr5Raw,
	'iki-hafta-sonu-dort-tool': postTr6Raw
};

const contentMapEn: Record<string, string> = {
	'cursor-ide-ve-prompt-muhendisligi': post3EnRaw,
	'rules-and-commands-that-stick': post7EnRaw,
	'browser-only-claude-streaming': post8EnRaw,
	'prompt-caching-nobody-measures': post9EnRaw,
	'stop-choosing-prompts-by-vibes': post10EnRaw,
	'build-the-sandbox-first': post11EnRaw,
	'debug-claude-agents-by-replaying-traces': post12EnRaw,
	'four-tools-in-two-weekends': post13EnRaw,
	'see-the-prompt-before-you-ship-it': post14EnRaw
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
	},
	{
		slug: 'prompt-caching-nobody-measures',
		title: 'Prompt caching is the cheapest Claude optimization. Nobody measures it.',
		excerpt:
			"Every Claude response carries cache-hit data. Most apps log it nowhere — and pay for it. Why hit ratio is the metric nobody graphs, and the four-field log line that pays for itself in a week.",
		date: '2026-06-04',
		tags: ['Claude', 'Anthropic', 'Prompt Caching', 'Observability', 'Cost', 'LLM']
	},
	{
		slug: 'stop-choosing-prompts-by-vibes',
		title: "Your prompt isn't better. You just remember it being better.",
		excerpt:
			'Most teams iterate on prompts by feel and ship by memory. The minimum useful comparison is two prompts in parallel, surfacing output, latency and cost on the same input — what side-by-side reveals that sequential never does.',
		date: '2026-06-04',
		tags: ['Claude', 'Anthropic', 'Prompt Engineering', 'A/B Testing', 'LLM', 'Evals']
	},
	{
		slug: 'build-the-sandbox-first',
		title: 'Build the sandbox before you write a single tool',
		excerpt:
			'Most agent teams write the tools first, then discover the design was wrong. Mock the tool responses, role-play the loop by hand, and kill the bad tool designs in fifteen minutes — before they touch your codebase.',
		date: '2026-06-04',
		tags: ['Claude', 'Anthropic', 'Agents', 'Tool Use', 'Prompt Engineering', 'LLM']
	},
	{
		slug: 'debug-claude-agents-by-replaying-traces',
		title: 'How I debug Claude agents by replaying their trace',
		excerpt:
			"Agent traces contain everything you need to debug a weird run, but they're stored as walls of nested JSON. The reframe: stop reading them as documents, start watching them as timelines of decisions. Bugs that take 30 minutes in an editor become obvious in 30 seconds.",
		date: '2026-06-04',
		tags: ['Claude', 'Anthropic', 'Agents', 'Debugging', 'LLM', 'Observability']
	},
	{
		slug: 'four-tools-in-two-weekends',
		title: 'What I learned shipping four open-source Claude dev-tools in two weekends',
		excerpt:
			'A meta post on the four-tool Claude dev-tool suite: why the SDK breaking was the constraint that made the work possible, the "one tool per insight" decomposition, why BYOK + browser-only is a credibility multiplier, and the four things I would front-load if starting over.',
		date: '2026-06-05',
		tags: ['Claude', 'Anthropic', 'Open Source', 'Developer Tools', 'LLM']
	},
	{
		slug: 'iki-hafta-sonu-dort-tool',
		title: 'İki hafta sonunda dört açık kaynak Claude dev-tool shiplerken neler öğrendim',
		excerpt:
			'Dört tool\'lu Claude dev-tool suite\'i üzerine meta yazı: SDK\'nın kırılması neden işi mümkün kılan kısıt oldu, "içgörü başına bir tool" ayrıştırması, BYOK + tarayıcı-only neden güvenilirlik çarpanı, ve yeniden başlasam önden yapacağım dört şey.',
		date: '2026-06-05',
		tags: ['Claude', 'Anthropic', 'Open Source', 'Developer Tools', 'LLM']
	},
	{
		slug: 'see-the-prompt-before-you-ship-it',
		title: 'See the prompt before you ship it',
		excerpt:
			"Token cost, context-window position, and prompt-caching layout are all knowable from the prompt alone — you don't need to send the request. A worked example where 'feels about the same' was hiding a 6.3× input-length difference, and the pre-flight habit that catches it.",
		date: '2026-06-05',
		tags: ['Claude', 'Anthropic', 'Tokens', 'Prompt Engineering', 'Cost', 'LLM']
	},
	{
		slug: 'tarayicida-claude-streaming-sdk-siz',
		title: "Tarayıcıda Claude'a streaming çağrı — SDK olmadan",
		excerpt:
			"Resmi Anthropic SDK'sını tarayıcı tarafına almak için neden uğraşmadığım ve onu replace eden ~150 satır TypeScript: tool-use destekli SSE parser'ı, temiz iptal, anlamlı hatalar.",
		date: '2026-06-04',
		tags: ['Claude', 'Anthropic', 'SSE', 'Streaming', 'TypeScript', 'Tarayıcı']
	},
	{
		slug: 'prompt-caching-kimsenin-olcmedigi',
		title: "Prompt caching, Claude'un en ucuz optimizasyonu. Kimse ölçmüyor.",
		excerpt:
			"Her Claude response'u cache-hit verisi taşıyor. Çoğu uygulama bunu hiçbir yere loglamıyor — ve bunun bedelini ödüyor. Kimsenin grafiklemediği hit oranı metriği, ve kendini bir haftada amorti eden dört alanlı log satırı.",
		date: '2026-06-04',
		tags: ['Claude', 'Anthropic', 'Prompt Caching', 'Observability', 'Cost', 'LLM']
	},
	{
		slug: 'prompt-secimi-his-degil-olcum',
		title: "Prompt'un daha iyi değil. Sadece daha iyi hatırlıyorsun.",
		excerpt:
			'Çoğu ekip prompt\'u hisle iterate edip hafızayla shipliyor. Minimum işe yarayan karşılaştırma: aynı input üzerinde iki prompt\'u paralel çalıştırıp output, latency ve cost\'u yan yana görmek — side-by-side\'ın sıralı versiyonun göremediği şey.',
		date: '2026-06-05',
		tags: ['Claude', 'Anthropic', 'Prompt Engineering', 'LLM', 'A/B Testing']
	},
	{
		slug: 'tek-bir-tool-yazmadan-once-sandbox',
		title: "Tek bir tool yazmadan önce sandbox'ı kur",
		excerpt:
			'Çoğu agent ekibi önce tool\'ları yazıyor, sonra tasarımın yanlış olduğunu keşfediyor. Tool yanıtlarını mock\'la, loop\'u el ile rol-yap, kötü tool tasarımlarını codebase\'ine dokunmadan on beş dakikada öldür.',
		date: '2026-06-05',
		tags: ['Claude', 'Anthropic', 'Agents', 'Tool Use', 'Prompt Engineering', 'LLM']
	},
	{
		slug: 'claude-agent-debug-trace-replay',
		title: "Claude agent'larını trace replay ile debug ediyorum",
		excerpt:
			"Agent trace'leri garip bir çalışmayı debug etmek için gereken her şeyi içeriyor, ama wall of nested JSON olarak saklanıyor. Yeniden çerçeveleme: onları döküman olarak okumayı bırak, kararların timeline'ı olarak izle. Bir editörde 30 dakika alan bug'lar 30 saniyede bariz oluyor.",
		date: '2026-06-05',
		tags: ['Claude', 'Anthropic', 'Agents', 'Debugging', 'LLM', 'Observability']
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
