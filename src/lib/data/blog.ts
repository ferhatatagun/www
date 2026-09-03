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
import postTr7Raw from '$lib/md/blog/prompt-shipping-once-onunu-gor.md?raw';
import post15EnRaw from '$lib/md/blog/how-i-shipped-a-blog-google-couldnt-see-en.md?raw';
import postTr8Raw from '$lib/md/blog/google-un-goremedigi-blog.md?raw';
import post16EnRaw from '$lib/md/blog/nobodys-model-failed-en.md?raw';
import post17EnRaw from '$lib/md/blog/accidental-fde-field-kit-en.md?raw';
import post18EnRaw from '$lib/md/blog/the-eval-is-the-deliverable-en.md?raw';
import post19EnRaw from '$lib/md/blog/that-library-will-hurt-performance-en.md?raw';
import postTr9Raw from '$lib/md/blog/performansi-bozar-dedigin-sayi-degil.md?raw';
import postTr10Raw from '$lib/md/blog/kimsenin-modeli-patlamadi.md?raw';
import postTr11Raw from '$lib/md/blog/kazara-fde-saha-cantasi.md?raw';
import postTr12Raw from '$lib/md/blog/teslim-edilen-prompt-degil-eval.md?raw';
import postTr13Raw from '$lib/md/blog/degistirebildiklerinde-bitti.md?raw';
import postTr14Raw from '$lib/md/blog/ikinci-musteri-ne-yaptigini-soyler.md?raw';
import postTr15Raw from '$lib/md/blog/ise-yarayan-kurallar-ve-komutlar.md?raw';
import post22EnRaw from '$lib/md/blog/the-failures-that-dont-throw-en.md?raw';
import postTr16Raw from '$lib/md/blog/patlamayan-hatalar.md?raw';
import post20EnRaw from '$lib/md/blog/done-when-they-can-change-it-en.md?raw';
import post21EnRaw from '$lib/md/blog/the-second-customer-en.md?raw';
import post23EnRaw from '$lib/md/blog/your-context-window-bills-you-every-turn-en.md?raw';
import postTr17Raw from '$lib/md/blog/baglam-her-turda-yeniden-faturalanir.md?raw';

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
	'iki-hafta-sonu-dort-tool': postTr6Raw,
	'prompt-shipping-once-onunu-gor': postTr7Raw,
	'google-un-goremedigi-blog': postTr8Raw,
	'performansi-bozar-dedigin-sayi-degil': postTr9Raw,
	'kimsenin-modeli-patlamadi': postTr10Raw,
	'kazara-fde-saha-cantasi': postTr11Raw,
	'teslim-edilen-prompt-degil-eval': postTr12Raw,
	'degistirebildiklerinde-bitti': postTr13Raw,
	'ikinci-musteri-ne-yaptigini-soyler': postTr14Raw,
	'ise-yarayan-kurallar-ve-komutlar': postTr15Raw,
	'patlamayan-hatalar': postTr16Raw,
	'baglam-her-turda-yeniden-faturalanir': postTr17Raw
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
	'see-the-prompt-before-you-ship-it': post14EnRaw,
	'how-i-shipped-a-blog-google-couldnt-see': post15EnRaw,
	'nobodys-model-failed': post16EnRaw,
	'accidental-fde-field-kit': post17EnRaw,
	'the-eval-is-the-deliverable': post18EnRaw,
	'that-library-will-hurt-performance': post19EnRaw,
	'done-when-they-can-change-it': post20EnRaw,
	'the-second-customer': post21EnRaw,
	'the-failures-that-dont-throw': post22EnRaw,
	'your-context-window-bills-you-every-turn': post23EnRaw
};

export const title = 'Blog';

export const items: BlogPost[] = [
	{
		slug: 'your-context-window-bills-you-every-turn',
		title: 'Your context window bills you every turn',
		excerpt:
			"Auto-compaction feels like losing your context, but the raw usage numbers from three real Claude Code sessions say the opposite: 1.99 billion tokens read from cache against 62 million written, a 32:1 ratio, and four compactions that each reset a bill that had been climbing since turn one. Compaction isn't the tax. It's the tax getting paid off.",
		date: '2026-09-02',
		tags: ['LLM', 'Claude', 'Developer Tools', 'Performance', 'Context', 'Observability']
	},
	{
		slug: 'baglam-her-turda-yeniden-faturalanir',
		title: 'Bağlam biriktirilmez, her turda yeniden faturalanır',
		excerpt:
			"Otomatik compaction bağlamı kaybetmek gibi hissettiriyor, ama üç gerçek Claude Code oturumundan çıkan ham usage verisi tam tersini söylüyor: cache'ten okunan 1,99 milyar token, cache'e yazılan 62 milyona karşı, 32:1 oran, ve her biri birinci turdan beri tırmanan faturayı sıfırlayan dört compaction. Compaction vergi değil. Verginin ödenme anı.",
		date: '2026-09-02',
		tags: ['LLM', 'Claude', 'Developer Tools', 'Performance', 'Context', 'Observability']
	},
	{
		slug: 'the-failures-that-dont-throw',
		title: "The failures that don't throw",
		excerpt:
			"One call in forty comes back with \u201cHIGH\u201d instead of \u201chigh\u201d, your switch falls through to the default branch, and the permissive branch auto-approves what the model flagged as maximum risk. Nothing errors. Schema failures are distributional, a single compliance percentage averages over the only distinction that matters, and zero failures in fifty runs is not a zero failure rate.",
		date: '2026-09-01',
		tags: ['LLM', 'Guardrails', 'Structured Output', 'Testing', 'Developer Tools', 'Claude']
	},
	{
		slug: 'patlamayan-hatalar',
		title: 'Patlamayan hatalar',
		excerpt:
			"Kırk çağrının biri \u201chigh\u201d yerine \u201cHIGH\u201d dönüyor, switch default dalına düşüyor, ve izin veren dal modelin maksimum risk dediği şeyi otomatik onaylıyor. Hiçbir şey hata vermiyor. Şema hataları dağılımsaldır, tek bir uyum yüzdesi önemli olan tek ayrımın üstünden ortalama alır, ve elli çalıştırmada sıfır hata sıfır hata oranı demek değildir.",
		date: '2026-09-01',
		tags: ['LLM', 'Guardrails', 'Structured Output', 'Testing', 'Developer Tools', 'Claude']
	},
	{
		slug: 'kimsenin-modeli-patlamadi',
		title: 'Kimsenin modeli patlamadı. Arayüz patladı.',
		excerpt:
			"Kurumsal AI pilotları %70–90 oranında başarısız olurken forward-deployed engineer ilanları %800 arttı. Kanonik başarı hikâyesi 6–8 haftalık entegrasyonun ardından dört aylık adoption çalışması, ve raporlanan kazanma koşulu %98 adoption — doğruluk değil. Adoption sayısı bir arayüz sayısıdır, ve rol ona göre kadrolanmıyor.",
		date: '2026-08-09',
		tags: ['Forward Deployed Engineering', 'Enterprise AI', 'Adoption', 'Frontend', 'LLM', 'Deployment']
	},
	{
		slug: 'kazara-fde-saha-cantasi',
		title: 'Kazara bir forward-deployed engineer saha çantası kurmuşum',
		excerpt:
			"Bir yıl önce bir SDK'yı silip yerine 150 satır yazdım ve bunu bir bundler hikâyesi sandım. Meğer adını hiç koymadan bir deployment problemi çözüyormuşum. Beş aracın her mimari kararına geri dönüp baktığımda hepsinin altında aynı dile getirilmemiş kısıt vardı: kurulacak bir şey yok, sınırdan çıkan veri yok, savunulacak bağımlılık yok.",
		date: '2026-08-10',
		tags: ['Forward Deployed Engineering', 'Enterprise AI', 'Developer Tools', 'Frontend', 'LLM', 'Architecture']
	},
	{
		slug: 'teslim-edilen-prompt-degil-eval',
		title: 'Teslim ettiğin şey prompt değil. Eval.',
		excerpt:
			"Her saha rehberi inşa etmeden önce eval'lerini tanımla diyor — ve müşteri sahasındaki üçüncü günde etiketli verin, alan uzmanlığın ve birinin ekranından aldığın beş örnekten başka bir şeyin yok. Tavsiye doğru, çerçeve yanlış. \u201cBu iyi mi?\u201d ground truth ister. \u201cBu değişti mi?\u201d sadece dondurulmuş bir snapshot ister, ve ona bu öğleden sonra sahip olabilirsin.",
		date: '2026-08-11',
		tags: ['Forward Deployed Engineering', 'Evals', 'LLM', 'Prompt Engineering', 'Testing', 'Deployment']
	},
	{
		slug: 'degistirebildiklerinde-bitti',
		title: 'Çalıştığında değil, onlar değiştirebildiğinde bitti',
		excerpt:
			"En çok düşündüğüm deployment başarısız olmadı — UAT'yi geçti, canlıya çıktı, ve altı ay sonra kimse ona bir kez bile dokunmamıştı. Bir sistem çalışmayı bıraktığında ölmez; değiştirilmeyi bıraktığında ölür, ve isteklere cevap verirken aylarca ölü kalabilir. Devir teslim dokümantasyon değildir: bir ekibin bir değişiklik yapıp güvenli olduğunu bilip bilemediğidir.",
		date: '2026-08-31',
		tags: ['Forward Deployed Engineering', 'Enterprise AI', 'Handover', 'Deployment', 'Testing', 'LLM']
	},
	{
		slug: 'ikinci-musteri-ne-yaptigini-soyler',
		title: 'İkinci müşteri ne yaptığını söyler',
		excerpt:
			"Forward-deployed iş SaaS şeklini tersine çeviriyor — çok müşteriye genişlik yerine tek müşteriyle derinlik — ve bu, ürün keşfinden hızlı yetenek üretip hangilerinin genelleşeceğini anlamanın yolunu vermiyor. İki müşterinin aynı özelliği istemesi sinyal değil. Ona aynı alttaki kısıtla varması sinyal, ve en güçlü kanıt istek bile değil: zaten elleriyle kurdukları geçici çözüm.",
		date: '2026-08-31',
		tags: ['Forward Deployed Engineering', 'Enterprise AI', 'Product', 'Deployment', 'LLM']
	},
	{
		slug: 'the-second-customer',
		title: 'The second customer tells you what you actually built',
		excerpt:
			"Forward-deployed work inverts the SaaS shape — depth with one customer instead of breadth across many — which produces capabilities faster than product discovery does and no way to tell which ones generalise. Two customers asking for the same feature isn't the signal. Two customers arriving at it through the same underlying constraint is, and the strongest evidence isn't the request at all: it's the workaround they already built by hand.",
		date: '2026-08-31',
		tags: ['Forward Deployed Engineering', 'Enterprise AI', 'Product', 'Deployment', 'LLM']
	},
	{
		slug: 'done-when-they-can-change-it',
		title: "You're not done when it works. You're done when they can change it.",
		excerpt:
			"The deployment I think about most didn't fail — it passed UAT, went live, and six months later nobody had touched it once. A system doesn't die when it stops working; it dies when it stops being changed, and it can be dead for months while still answering requests. Handover isn't documentation: it's whether a team can make a change and know it was safe.",
		date: '2026-08-31',
		tags: ['Forward Deployed Engineering', 'Enterprise AI', 'Handover', 'Deployment', 'Testing', 'LLM']
	},
	{
		slug: 'that-library-will-hurt-performance',
		title: '“That library will hurt performance” is not a number',
		excerpt:
			"Every performance tool reports what a page costs right now. None of them answer the question the meeting is actually about, which is what it would cost without the thing you're arguing over — so the argument gets settled by whoever sounds most confident. A 410 KB image that loads after LCP is worth zero points; a 124 KB render-blocking script is worth eleven. Sorting by file size sends teams to fix the wrong thing.",
		date: '2026-08-30',
		tags: ['Web Performance', 'Core Web Vitals', 'Lighthouse', 'LCP', 'Frontend', 'Developer Tools']
	},
	{
		slug: 'performansi-bozar-dedigin-sayi-degil',
		title: '“Performansı bozar” dediğin şey bir sayı değil',
		excerpt:
			'Bütün performans araçları sayfanın şu anki maliyetini raporluyor. Hiçbiri toplantının asıl konusu olan “o şey olmasa ne olurdu” sorusuna cevap vermiyor — ve karar, elinde sayı olmadığı için daha kendinden emin konuşana kalıyor. LCP’den sonra yüklenen 410 KB’lık bir görsel sıfır puan; 124 KB’lık render-blocking bir script on bir puan. Dosya boyutuna göre sıralamak ekipleri yanlış şeyi düzeltmeye gönderiyor.',
		date: '2026-08-30',
		tags: ['Web Performance', 'Core Web Vitals', 'Lighthouse', 'LCP', 'Frontend', 'Developer Tools']
	},
	{
		slug: 'the-eval-is-the-deliverable',
		title: "The deliverable isn't the prompt. It's the eval.",
		excerpt:
			"Every field guide says define your evals before you build \u2014 and on day three at a customer site you have no labelled data, no domain expertise, and five examples off someone's screen. The advice is right; the framing is wrong. \"Is this good?\" needs ground truth. \"Did this change?\" needs only a frozen snapshot, and that one you can have this afternoon.",
		date: '2026-08-11',
		tags: ['Forward Deployed Engineering', 'Evals', 'LLM', 'Prompt Engineering', 'Testing', 'Deployment']
	},
	{
		slug: 'accidental-fde-field-kit',
		title: "I accidentally built a forward-deployed engineer's field kit",
		excerpt:
			"I dropped the Anthropic SDK for 150 lines of TypeScript and called it a bundler problem. It wasn't. Browser-only, BYOK, no backend, minimal dependencies \u2014 the constraints I picked out of preference turn out to be the exact constraints of working inside someone else's regulated environment. What five tools look like when you finally name the rule you were following.",
		date: '2026-08-10',
		tags: ['Forward Deployed Engineering', 'Developer Tools', 'Claude', 'Anthropic', 'BYOK', 'Architecture']
	},
	{
		slug: 'nobodys-model-failed',
		title: "Nobody's model failed. The interface did.",
		excerpt:
			"Enterprise AI pilots fail at 70–90% while forward-deployed engineer postings jump 800%. The canonical success story is 6–8 weeks of integration followed by four months of adoption work, and the reported win condition is 98% adoption — not accuracy. An adoption number is an interface number, and the role isn't staffed against that.",
		date: '2026-08-09',
		tags: ['Forward Deployed Engineering', 'Enterprise AI', 'Adoption', 'Frontend', 'LLM', 'Deployment']
	},
	{
		slug: 'google-un-goremedigi-blog',
		title: "Google'un göremediği bir blog yayınladım",
		excerpt:
			"Sitemdeki her yazı tarayıcıda iyi görünüyordu — ama `curl` çekince yazı gövdesi boştu. Marked `onMount` içinde parse oluyor, prerender iskelet görüyor, arama motorları hiçbir şey indekslemiyordu. Düzeltme, ortaya çıkardığı üç ikincil hata, ve hiç kazanmadığım doğrulama alışkanlığı.",
		date: '2026-06-14',
		tags: ['SvelteKit', 'SEO', 'SSR', 'Markdown', 'Statik Site', 'Prerender']
	},
	{
		slug: 'how-i-shipped-a-blog-google-couldnt-see',
		title: "How I shipped a blog Google couldn't see",
		excerpt:
			"Every post on my site rendered fine in a browser — but `curl` showed the article body was empty. Marked was being parsed inside onMount, so prerender saw a skeleton and search engines indexed nothing. The fix, the three secondary failures it uncovered, and the verification habit I should have had.",
		date: '2026-06-14',
		tags: ['SvelteKit', 'SEO', 'SSR', 'Markdown', 'Static Sites', 'Prerendering']
	},
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
		slug: 'ise-yarayan-kurallar-ve-komutlar',
		title: 'Gerçekten işe yarayan kurallar ve komutlar',
		excerpt:
			'.cursorrules ve slash komutlarını unutulmuş değil faydalı hale getirmek: teoriden değil acıdan başla, listeyi kısa tut, gerçek kullanımdan iterasyon yap.',
		date: '2025-01-18',
		tags: ['Cursor', 'Rules', 'Commands', 'Workflow', 'AI']
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
		tags: ['Claude', 'Anthropic', 'SSE', 'Streaming', 'TypeScript', 'Browser'],
		sourceUrl: 'https://medium.com/@ferhatatagun/building-a-streaming-claude-client-in-the-browser-without-the-sdk-4ce8a9407d2c'
	},
	{
		slug: 'prompt-caching-nobody-measures',
		title: 'Prompt caching is the cheapest Claude optimization. Nobody measures it.',
		excerpt:
			"Every Claude response carries cache-hit data. Most apps log it nowhere — and pay for it. Why hit ratio is the metric nobody graphs, and the four-field log line that pays for itself in a week.",
		date: '2026-06-04',
		tags: ['Claude', 'Anthropic', 'Prompt Caching', 'Observability', 'Cost', 'LLM'],
		sourceUrl: 'https://medium.com/@ferhatatagun/prompt-caching-is-the-cheapest-claude-optimization-nobody-measures-it-3e597c6804d8'
	},
	{
		slug: 'stop-choosing-prompts-by-vibes',
		title: "Your prompt isn't better. You just remember it being better.",
		excerpt:
			'Most teams iterate on prompts by feel and ship by memory. The minimum useful comparison is two prompts in parallel, surfacing output, latency and cost on the same input — what side-by-side reveals that sequential never does.',
		date: '2026-06-04',
		tags: ['Claude', 'Anthropic', 'Prompt Engineering', 'A/B Testing', 'LLM', 'Evals'],
		sourceUrl: 'https://medium.com/@ferhatatagun/33758334974c'
	},
	{
		slug: 'build-the-sandbox-first',
		title: 'Build the sandbox before you write a single tool',
		excerpt:
			'Most agent teams write the tools first, then discover the design was wrong. Mock the tool responses, role-play the loop by hand, and kill the bad tool designs in fifteen minutes — before they touch your codebase.',
		date: '2026-06-04',
		tags: ['Claude', 'Anthropic', 'Agents', 'Tool Use', 'Prompt Engineering', 'LLM'],
		sourceUrl: 'https://medium.com/@ferhatatagun/build-the-sandbox-before-you-write-a-single-tool-7a508c4b6723'
	},
	{
		slug: 'debug-claude-agents-by-replaying-traces',
		title: 'How I debug Claude agents by replaying their trace',
		excerpt:
			"Agent traces contain everything you need to debug a weird run, but they're stored as walls of nested JSON. The reframe: stop reading them as documents, start watching them as timelines of decisions. Bugs that take 30 minutes in an editor become obvious in 30 seconds.",
		date: '2026-06-04',
		tags: ['Claude', 'Anthropic', 'Agents', 'Debugging', 'LLM', 'Observability'],
		sourceUrl: 'https://medium.com/@ferhatatagun/how-i-debug-claude-agents-by-replaying-their-trace-093e0c2cf1e0'
	},
	{
		slug: 'four-tools-in-two-weekends',
		title: 'What I learned shipping four open-source Claude dev-tools in two weekends',
		excerpt:
			'A meta post on the four-tool Claude dev-tool suite: why the SDK breaking was the constraint that made the work possible, the "one tool per insight" decomposition, why BYOK + browser-only is a credibility multiplier, and the four things I would front-load if starting over.',
		date: '2026-06-05',
		tags: ['Claude', 'Anthropic', 'Open Source', 'Developer Tools', 'LLM'],
		sourceUrl: 'https://medium.com/@ferhatatagun/what-i-learned-shipping-four-open-source-claude-dev-tools-in-two-weekends-e721d4c41b98'
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
		tags: ['Claude', 'Anthropic', 'Tokens', 'Prompt Engineering', 'Cost', 'LLM'],
		sourceUrl: 'https://medium.com/@ferhatatagun/see-the-prompt-before-you-ship-it-91ee42f72483'
	},
	{
		slug: 'prompt-shipping-once-onunu-gor',
		title: "Prompt'u shiplemeden önce gör",
		excerpt:
			'Token cost, context-window pozisyonu ve prompt-caching layout\'u — hepsi prompt\'tan tek başına bilinebilir. "Yaklaşık aynı" hissinin gizlediği 6.3× input-uzunluk farkını yakalayan pre-flight alışkanlığı.',
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

/**
 * dev.to mirror URLs for English posts. Each dev.to article carries a
 * canonical_url back to this site, so the SEO authority stays here; this map
 * is only used to surface a subtle "Also on dev.to" link on the post page
 * so readers can comment / react on dev.to if they prefer.
 *
 * Keyed by the EN-content slug (which matches the route slug for these posts).
 */
export const devToMirrors: Record<string, string> = {
	'browser-only-claude-streaming':
		'https://dev.to/ferhatatagun/building-a-streaming-claude-client-in-the-browser-without-the-sdk-5f80',
	'prompt-caching-nobody-measures':
		'https://dev.to/ferhatatagun/prompt-caching-is-the-cheapest-claude-optimization-nobody-measures-it-1nga',
	'stop-choosing-prompts-by-vibes':
		'https://dev.to/ferhatatagun/your-prompt-isnt-better-you-just-remember-it-being-better-3h52',
	'build-the-sandbox-first':
		'https://dev.to/ferhatatagun/build-the-sandbox-before-you-write-a-single-tool-2ja3',
	'debug-claude-agents-by-replaying-traces':
		'https://dev.to/ferhatatagun/how-i-debug-claude-agents-by-replaying-their-trace-484',
	'four-tools-in-two-weekends':
		'https://dev.to/ferhatatagun/what-i-learned-shipping-four-open-source-claude-dev-tools-in-two-weekends-1f4f',
	'see-the-prompt-before-you-ship-it':
		'https://dev.to/ferhatatagun/see-the-prompt-before-you-ship-it-51ao',
	'how-i-shipped-a-blog-google-couldnt-see':
		'https://dev.to/ferhatatagun/how-i-shipped-a-blog-google-couldnt-see-2nlc',
	'nobodys-model-failed':
		'https://dev.to/ferhatatagun/nobodys-model-failed-the-interface-did-5dh3',
	'accidental-fde-field-kit':
		'https://dev.to/ferhatatagun/i-accidentally-built-a-forward-deployed-engineers-field-kit-khi',
	'the-eval-is-the-deliverable':
		'https://dev.to/ferhatatagun/the-deliverable-isnt-the-prompt-its-the-eval-35cp'
};

export function getDevToUrl(slug: string): string | undefined {
	return devToMirrors[slug];
}

/**
 * TR ↔ EN sibling posts. These are separate URLs telling the same story in two
 * languages; without hreflang Google treats them as competing duplicates and
 * picks one, usually the wrong one for the reader's locale.
 */
export const translationPairs: Array<[en: string, tr: string]> = [
	['browser-only-claude-streaming', 'tarayicida-claude-streaming-sdk-siz'],
	['prompt-caching-nobody-measures', 'prompt-caching-kimsenin-olcmedigi'],
	['stop-choosing-prompts-by-vibes', 'prompt-secimi-his-degil-olcum'],
	['build-the-sandbox-first', 'tek-bir-tool-yazmadan-once-sandbox'],
	['debug-claude-agents-by-replaying-traces', 'claude-agent-debug-trace-replay'],
	['four-tools-in-two-weekends', 'iki-hafta-sonu-dort-tool'],
	['see-the-prompt-before-you-ship-it', 'prompt-shipping-once-onunu-gor'],
	['how-i-shipped-a-blog-google-couldnt-see', 'google-un-goremedigi-blog'],
	['that-library-will-hurt-performance', 'performansi-bozar-dedigin-sayi-degil'],
	['nobodys-model-failed', 'kimsenin-modeli-patlamadi'],
	['accidental-fde-field-kit', 'kazara-fde-saha-cantasi'],
	['the-eval-is-the-deliverable', 'teslim-edilen-prompt-degil-eval'],
	['done-when-they-can-change-it', 'degistirebildiklerinde-bitti'],
	['the-second-customer', 'ikinci-musteri-ne-yaptigini-soyler'],
	['rules-and-commands-that-stick', 'ise-yarayan-kurallar-ve-komutlar'],
	['the-failures-that-dont-throw', 'patlamayan-hatalar'],
	['your-context-window-bills-you-every-turn', 'baglam-her-turda-yeniden-faturalanir']
];

/**
 * hreflang alternates for a post. Returns [] when the post has no sibling —
 * emitting a lone self-referential hreflang is noise.
 */
export function getLangAlternates(
	slug: string,
	origin: string
): Array<{ lang: string; href: string }> {
	for (const [en, tr] of translationPairs) {
		if (slug === en || slug === tr) {
			return [
				{ lang: 'en', href: `${origin}/blog/${en}` },
				{ lang: 'tr', href: `${origin}/blog/${tr}` }
			];
		}
	}
	return [];
}

/** Most recent post date — used as the sitemap lastmod for blog listing pages. */
export function latestPostDate(): string {
	return sortedItems.length ? sortedItems[0].date : new Date().toISOString().slice(0, 10);
}

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
