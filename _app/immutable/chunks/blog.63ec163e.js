const c=`# Yapay Zeka ile Yazılım Geliştirme: MCP, GPT ve Cursor

Günlük geliştirme pratiğinde LLM araçları artık vazgeçilmez hale geldi. Bu yazıda **Model Context Protocol (MCP)**, **GPT** tabanlı asistanlar ve **Cursor** ile nasıl daha etkili kod yazılabileceğinden bahsediyorum.

## Neden AI Araçları?

- **Hızlı prototipleme**: Fikirleri anında koda dökebilme
- **Boilerplate azaltma**: Tekrarlayan yapıları otomatikleştirme
- **Dokümantasyon ve refactoring**: Kod tabanını anlama ve güvenli değişiklik önerileri
- **MCP ile bağlam**: Dosya sistemi, API’ler ve harici araçlara güvenli erişim

## MCP (Model Context Protocol)

MCP, AI asistanlarının uygulama dışı kaynaklara (dosyalar, veritabanları, API’ler) standart bir şekilde bağlanmasını sağlayan açık bir protokol. Cursor, Claude ve benzeri araçlar MCP sunucuları sayesinde:

- Proje dosyalarını okuyup analiz edebilir
- Harici API’leri çağırabilir
- Veritabanı şemalarına bakabilir

Böylece “sadece bu dosyayı bil” değil, “tüm proje bağlamında düşün” diyebiliyorsunuz.

## Cursor ve Günlük Kullanım

Cursor, VS Code tabanlı bir IDE ve AI’ı doğrudan editör içine taşıyor. Özellikle:

- **Agent modu**: Çok adımlı görevleri (dosya açma, arama, düzenleme) kendi planlayabiliyor
- **@ referansları**: Belirli dosyaları, dokümanları veya web’i bağlama
- **Rules (Cursor Rules)**: Proje bazlı kurallarla tutarlı kod üretimi

Bu sayede “bu API’yi kullanarak bir React formu ekle” gibi istekler tek seferde, doğru dosyalara dokunularak yapılabiliyor.

## Özet

Yapay zeka araçları deneyimi artırıyor; MCP ile bağlam, Cursor ile ise günlük akış doğal hale geliyor. Doğru prompt ve kurallarla kaliteyi koruyarak hız kazanmak mümkün.
`,p=`# Model Context Protocol (MCP) Nedir?

**Model Context Protocol**, AI asistanlarının dosya sistemine, API’lere ve diğer araçlara **güvenli ve standart** bir şekilde erişmesini sağlayan açık bir protokoldür. Anthropic ve ekosistem tarafından destekleniyor.

## Problem

LLM’ler varsayılan olarak sadece verilen metni bilir. Gerçek projelerde ise:

- Kod tabanı
- Dokümantasyon
- Canlı API’ler
- Veritabanı şemaları

gibi bağlama ihtiyaç var. Her araç (Cursor, Claude Desktop, vb.) bunu kendi yöntemiyle yapınca tekrarlar ve güvenlik riskleri ortaya çıkıyor.

## MCP’nin Getirdiği Standart

MCP ile:

1. **Kaynaklar (Resources)**: Dosyalar, URL’ler, veritabanı sorgu sonuçları vb. tek tip bir modelle sunulur.
2. **Araçlar (Tools)**: AI, belirli işlemleri (ör. “bu API’yi çağır”, “şu dosyayı oku”) tanımlı araçlar üzerinden yapar.
3. **Prompts**: Önceden tanımlı prompt şablonları paylaşılabilir.

Böylece bir MCP sunucusu yazdığınızda, bu sunucu MCP destekleyen her istemci (Cursor, Claude Desktop, vs.) tarafından kullanılabilir.

## Örnek Kullanım

- **Dosya sistemi**: Proje kökündeki dosyaları listeleme, okuma
- **Git**: Commit geçmişi, branch’ler
- **API’ler**: Özel backend’inize güvenli çağrı
- **Veritabanı**: Şema sorgulama (sadece okuma, güvenlik için)

## Sonuç

MCP, AI asistanlarının “bağlam” ihtiyacını tek bir protokolde topluyor. Geliştirici araçları bu protokolü destekledikçe, aynı MCP sunucusu ile farklı editör ve asistanlarla çalışmak mümkün olacak.
`,m=`# Cursor IDE ve Prompt Mühendisliği

Cursor, VS Code tabanlı bir IDE olarak AI’ı doğrudan editörün içine taşıyor. Etkili kullanım için **prompt mühendisliği** ve **bağlam yönetimi** önemli.

## Doğru Bağlam Vermek

- **@dosya**: Belirli bir dosyayı referans gösterin; model sadece o dosyayı değil, proje yapısını da daha iyi anlar.
- **@web**: Güncel dokümantasyon veya API referansı için web’i ekleyin.
- **@docs**: Proje içi dokümantasyon klasörünü işaret edin.

Böylece “bu API’nin son sürümüne göre örnek yaz” gibi istekler doğru sonuç verir.

## Kısa ve Net Talimatlar

- Tek seferde tek görev: “Bu component’e loading state ekle” gibi.
- Format belirtin: “TypeScript ile yaz”, “tailwind class’ları kullan”.
- Reddedeceklerinizi söyleyin: “inline style kullanma”, “any kullanma”.

## Cursor Rules (.cursorrules)

Proje kökünde \`.cursorrules\` dosyası ile sabit kurallar tanımlayabilirsiniz:

- Varsayılan dil (ör. TypeScript)
- Stil tercihleri (Tailwind, BEM, vb.)
- Test yazma beklentisi
- Kod tabanına özel kısaltmalar

Bu sayede her sohbette tekrarlamak zorunda kalmazsınız.

## Özet

Cursor’da verimlilik, doğru bağlam (@dosya, @web) ve net, kısa prompt’larla artar. \`.cursorrules\` ile tutarlılık sağlayarak AI’dan daha öngörülebilir çıktı alırsınız.
`,y=`# Cursor IDE and Prompt Engineering

Cursor brings AI directly into a VS Code–based IDE. For effective use, **prompt engineering** and **context management** matter.

## Providing the Right Context

- **@file**: Reference a specific file; the model better understands both that file and project structure.
- **@web**: Add the web for up-to-date docs or API references.
- **@docs**: Point to in-project documentation.

Requests like “write an example for the latest version of this API” then get accurate results.

## Short, Clear Instructions

- One task at a time: e.g. “Add a loading state to this component”.
- Specify format: “Write in TypeScript”, “use Tailwind classes”.
- State what to avoid: “no inline styles”, “no \`any\`”.

## Cursor Rules (.cursorrules)

In the project root, a \`.cursorrules\` file lets you define stable rules:

- Default language (e.g. TypeScript)
- Style preferences (Tailwind, BEM, etc.)
- Expectations for writing tests
- Codebase-specific shorthand

You don’t have to repeat these in every chat.

## Summary

In Cursor, productivity improves with the right context (@file, @web) and clear, short prompts. Using \`.cursorrules\` for consistency helps you get more predictable output from AI.
`,g=`# Neden Bazen Sadece Boş Ekrana Bakıyorum

Evet. Bazen açıyorum IDE'yi, bir dosyayı, sonra hiçbir tuşa basmıyorum. Beş dakika, on dakika. Ekran boş, imleç yanıp sönüyor. Bu "verimlilik" değil. Ama işin bir parçası.

## Kod yazmamak da çalışmak

Todo listesi dolu, sprint'te ticket var, ama kafanda bir şey çözülmemiş. O anda yazdığın her satır aslında sonradan sileceğin şey oluyor. Denedim. Saatlerce "belki böyle olur" diye kod yazdım, ertesi gün hepsini geri aldım. Boş ekrana baktığım günlerde ise en azından yanlış yöne gitmedim.

Buna isim koymak zorunda değiliz. "Deep work" falan da demiyorum. Sadece şu: Bazen en doğru aksiyon, aksiyon almamak. Düşünmek, taşımak, bağlamı kurmak. Sonra yazmak.

## Pomodoro bana uymuyor

25 dakika kod, 5 dakika mola — bu ritim birçok insanı taşıyor. Ben taşımıyor. Bazen 10 dakikada bitiriyorum bir şeyi, bazen 45 dakika sadece bir fonksiyonun imzasına takılıyorum. Zorlamak (şimdi kod yaz, şimdi dur) bende daha çok stres yaratıyor. Boş ekran "kayıp zaman" gibi görünüyor ama aslında problem çözme zamanı. Zihnin arka planda çalışıyor.

## Kabul etmek

Takımda "ne yaptın bugün?" diye sorulunca "ekrana baktım" demek garip geliyor. Ama yaptığım buydu. Sonuç: ertesi gün tasarımı değiştirdim, iki saatte toparladım. O bakma anı olmasa belki bir gün daha yanlış yolda gidecektim.

Özet falan yok. Sadece diyorum ki: Bazen hiçbir şey yazmıyorsan da bir şey yapıyorsun. Yeter ki o "hiçbir şey" gerçekten düşünmek olsun, kaçış değil.
`,b=`# Bitmemiş Projeler Mezarlığım ve Neden Rahatım

GitHub'da private repo sayımı söylemeyeceğim. Ama "yarım kaldı" diyebileceğim proje sayısı bir elin parmaklarını geçiyor. Bir süre bunu başarısızlık gibi hissettim. Sonra fikrim değişti.

## Bitirmek zorunda mıyız?

Her fikir ürün olmak zorunda değil. Bazen sadece "bunu nasıl yaparım?" sorusunun cevabını merak ediyorsun. Bir hafta sonu deniyorsun, öğreniyorsun, ilerlemiyor — bırakıyorsun. Bu proje "bitmedi" ama sen o hafta sonu bir şey öğrendin. Bence bu da sayılır.

Bir tane var mesela: terminalde çalışan minik bir task runner. 80 satır falan. Hiçbir zaman gerçek kullanıma sokmadım. Ama o 80 satırı yazarken Node stream'leri ve CLI argüman parsing'e bulaştım. O proje "ölü", bilgim canlı.

## Mezarlık = laboratuvar

Yarım projeleri "başarısızlık" diye saklamak yerine "deney alanı" diye düşünmeye başladım. Bazen teknoloji seçimi yanlış çıkıyor. Bazen problem ilginç değil. Bazen sadece zamanın yok. Hepsi geçerli. Önemli olan: denemek, görmek, bırakabilmek. Sonsuza kadar sürdürmek değil.

Tabii bir de şu var: Bazen yarım bıraktığın şey yıllar sonra başka bir projede canlanıyor. O task runner'dan kopardığım bir fikir, başka bir işte kullandım. Mezarlık sadece mezarlık değil, arşiv.

## "Ship it" kültürü ve ben

"Ship it", "ship something small" — hepsi güzel. Ama her şeyi ship etmek zorunda hissetmek de yorucu. Bazen bir şey sadece senin için. Kimse görmeyecek. Bitmedi bile sayılmaz, çünkü "bitme" hedefi yoktu. Keşif vardı.

Benim mezarlığımda yatan projelerin çoğu böyle. Hedef "ürün çıkarmak" değildi, "şunu anlamak"tı. Anladım, dosyalar duruyor. Sorun yok.

Eğer senin de yarım projelerin varsa: Belki başarısızlık değildir. Belki sadece o fikrin ömrü o kadardı. Yeni fikre yer açıyorsun.
`,f=`# "Best Practice" Dediklerimizin Yarısı Ezber

"Best practice böyle yapılır." Kaç kere duydun? Ben çok duydum. Sonra baktım: Aynı "best practice" bir projede hayat kurtarıyor, başka projede sadece gürültü. Demek ki best practice değil, bağlama göre iyi gelen bir tercih.

## Örnek: DRY

"Don't Repeat Yourself" — herkes bilir. Bir yerde iki kere yazma, fonksiyona çek, modüle taşı. Mantıklı. Ama bazen "tekrarlayan" iki parça kod aslında farklı sebeplerle değişiyor. Birini değiştirirken diğerini bozmamak için "ortak fonksiyon"a tuhaf parametreler ekliyorsun. Sonunda DRY değil, karmaşık bir düğüm oluyor. Bazen tekrar, okunabilirlik için daha iyi. Bunu söylemek neredeyse ayıp sayılıyor. Ama gerçek bu.

## Örnek: Yorum yazma / yaz

Bir tarafta "kod kendini anlatsın, yorum yazma" diyenler var. Diğer tarafta "karmaşık mantığı mutlaka yorumla" diyenler. Hangisi best practice? İkisi de. Bağlama bağlı. Bir utility fonksiyonda \`// iki sayıyı toplar\` yazmak gereksiz. Ama domain'e özel, "neden bu edge case'i böyle ele aldık" açıklaması bazen tek satırlık yorumla kurtarıyor. Kural değil, durum.

## Örnek: Test coverage

%80 coverage hedefi. Güzel hedef. Ama bazen en kritik akış tek bir fonksiyonda ve o fonksiyon zaten integration test'te dolaylı olarak kapsanıyor. Unit test yazmak için fonksiyonu parçalara bölüyorsun — sadece test edilebilir olsun diye. Sonuç: Daha fazla dosya, daha az okunabilir kod, ama coverage yeşil. Best practice mi? Sayılır. Faydalı mı? Her zaman değil.

## Ne yapalım o zaman?

Best practice'leri tamamen atalım demiyorum. Ama "çünkü best practice" tek başına gerekçe olmasın. "Bu projede, bu takımda, bu kısıtla neden mantıklı?" sorusunu sor. Bazen cevap "çünkü herkes böyle yapıyor" olacak — o da bir cevap, ama bilinçli olsun. Bazen cevap "burada bu kural işe yaramıyor, farklı yapıyoruz" olacak. Onu da söyleyebilmek lazım.

Kurallar düşünmeyi kolaylaştırsın, düşünmenin yerine geçmesin.
`,k=`# Rules and Commands That Actually Stick

Project rules and slash commands only work if you use them. Sounds obvious. But most teams write a long \`.cursorrules\` once, forget it, and keep repeating the same instructions in every chat. Here’s how to make rules and commands stick.

## Start with pain, not theory

Don’t write rules because “we should have rules.” Write them when something keeps going wrong. Someone keeps using \`any\`, or forgetting to add loading states, or writing components that are 400 lines. Catch that in a review, add one line to \`.cursorrules\`: “No \`any\`. Use proper types.” Next time the model sees it before it suggests code. That’s a rule that sticks because it solves a real problem.

Same for commands. If you find yourself typing the same prompt every day (“add error handling and use our toast helper”), turn it into a custom instruction or a saved prompt. The best commands come from repetition you’re already doing.

## Keep the list short

Long rule files get ignored. The model gets a wall of text and either skips it or follows it inconsistently. I aim for under 20 lines for project-wide rules. Things like: default language, no inline styles, use our design tokens, how we name components. One line per idea. If a rule is more than a sentence, it’s probably two rules or it’s too vague.

Commands: same idea. A few high-leverage ones beat a long menu. “Refactor this to use the shared hook.” “Add tests for the happy path and one error case.” You’ll remember and use 3–5; you’ll forget 20.

## Make rules visible when they matter

Rules in a file the model reads are good. Rules that appear in the flow are better. For example: “When editing components in \`src/ui/\`, prefer our design system; do not introduce new colors or spacing values.” So when the model is in that folder, the rule is relevant. You can’t always do this (Cursor doesn’t support per-folder rules yet), but you can keep the rule file focused so the model isn’t drowning in unrelated stuff.

For commands, put the ones you use daily in a place you actually click: Cursor’s custom instructions, or a small cheat sheet in the repo. If it’s buried in a doc nobody opens, it won’t stick.

## Iterate from real usage

Every few weeks, look at what you had to correct in reviews or re-prompt. Those are candidates for new rules or commands. And if a rule never gets followed (or you keep disabling it), delete it or shorten it. Dead rules add noise and teach the team to ignore the file.

Rules and commands aren’t a one-time setup. They’re a small loop: notice a repeated mistake → add or tweak a rule → see if behavior improves → repeat. The ones that stick are the ones that fix a pain you actually feel.
`,w=`# Building a streaming Claude client in the browser — without the SDK

I wanted to call Claude from a browser. The Anthropic SDK said no — sort of.

When I tried \`import Anthropic from "@anthropic-ai/sdk"\` in a Next.js app, the bundler crashed. The error pointed at \`node:fs/promises\`, deep inside the package — an agent-toolset module that reads files from disk and obviously cannot run in a browser. It isn't optional code; it's pulled in by the SDK's main client entry.

So either I waited for a browser-clean entry point (eventually, maybe), or I talked to the Messages API directly. The endpoint is HTTP. The streaming format is Server-Sent Events. I'd done this for OpenAI before — how hard could it be?

Turns out: about 150 lines of TypeScript for a usable client, and the result is cleaner than the SDK for the kind of tool I was building. Here's what that took and why I'd recommend it for anything browser-side that touches the Claude API.

**TL;DR**

- The official SDK pulls in Node-only modules and breaks browser bundles.
- Direct \`fetch\` works once you send \`anthropic-dangerous-direct-browser-access: true\`.
- The streaming format is straightforward SSE — split events on \`\\n\\n\`, parse \`data:\` lines.
- The only mild gotcha is \`tool_use\` blocks: their \`input\` arrives as \`input_json_delta\` chunks you accumulate and parse at \`content_block_stop\`.
- Hand-rolled means tiny bundle, fewer abstractions, full visibility into what the protocol is doing.

## The CORS unlock

Browsers won't let you \`fetch()\` \`https://api.anthropic.com\` by default. Anthropic ships a flag to allow it: send \`anthropic-dangerous-direct-browser-access: true\` and CORS opens up. The header's name is a warning — keys typed into a browser are visible to anyone with devtools open. For a bring-your-own-key developer tool that's fine; for a production app shipping a server-side key, it isn't.

With the header in place, a minimal request looks like this:

\`\`\`ts
await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-api-key": apiKey,
    "anthropic-version": "2023-06-01",
    "anthropic-dangerous-direct-browser-access": "true",
  },
  body: JSON.stringify({
    model,
    max_tokens: 1024,
    messages: [{ role: "user", content: "Hello." }],
    stream: true,
  }),
});
\`\`\`

\`stream: true\` gives back a Server-Sent Events stream. The response body is a \`ReadableStream<Uint8Array>\` — chunks of bytes you decode as text. Events are delimited by a blank line; each event is a couple of lines (\`event: <type>\` and \`data: <json>\`), and the meaningful payload lives in \`data:\`.

## What the stream actually looks like

For a plain text response, the SSE event sequence is:

\`\`\`
event: message_start
data: { "type": "message_start", "message": { ..., "usage": {...} } }

event: content_block_start
data: { "type": "content_block_start", "index": 0,
        "content_block": { "type": "text", "text": "" } }

event: content_block_delta
data: { "type": "content_block_delta", "index": 0,
        "delta": { "type": "text_delta", "text": "Hello" } }

event: content_block_delta
data: { "type": "content_block_delta", "index": 0,
        "delta": { "type": "text_delta", "text": " there" } }

event: content_block_stop
data: { "type": "content_block_stop", "index": 0 }

event: message_delta
data: { "type": "message_delta", "delta": { "stop_reason": "end_turn" },
        "usage": { "output_tokens": 12 } }

event: message_stop
data: { "type": "message_stop" }
\`\`\`

Each \`content_block_delta\` carries a partial token. Concatenate the \`text\` fields per \`index\` and you have the streamed message. Done — for plain text.

Three things make this slightly more interesting:

- Multiple content blocks per message (text plus tool_use, or several tool_use blocks).
- The \`tool_use\` block's \`input\` arrives as a sequence of partial-JSON deltas, not all at once.
- Aborting cleanly when the user clicks Stop.

## Parsing the stream

The parser is small. Read chunks, accumulate them in a buffer, split on \`\\n\\n\` (the SSE event separator), and process each event:

\`\`\`ts
const reader = res.body!.getReader();
const decoder = new TextDecoder();
let buffer = "";

while (true) {
  const { value, done } = await reader.read();
  if (done) break;
  buffer += decoder.decode(value, { stream: true });

  let sep: number;
  while ((sep = buffer.indexOf("\\n\\n")) !== -1) {
    const rawEvent = buffer.slice(0, sep);
    buffer = buffer.slice(sep + 2);

    const dataLine = rawEvent.split("\\n").find((l) => l.startsWith("data:"));
    if (!dataLine) continue;

    const evt = JSON.parse(dataLine.slice(5).trim());
    handle(evt);
  }
}
\`\`\`

\`TextDecoder\` with \`{ stream: true }\` matters — without it you'll get garbled UTF-8 when a multi-byte character lands on a chunk boundary. Anthropic sends a lot of em-dashes; ask me how I know.

\`handle(evt)\` switches on \`evt.type\` and updates state. For text-only, the only events that move the UI are \`content_block_delta\` (append text to the current text block) and \`message_delta\` (final usage). For a full client, I keep a \`blocks: Block[]\` array indexed by \`evt.index\` and mutate the matching block as deltas arrive.

## Tool use: partial-JSON deltas

Tool calling is where this gets a little trickier. When the model decides to call a tool, you get a \`content_block_start\` with \`content_block: { type: "tool_use", id, name, input: {} }\` — the \`input\` is empty. The arguments arrive in \`content_block_delta\` events shaped like this:

\`\`\`
event: content_block_delta
data: { "type": "content_block_delta", "index": 1,
        "delta": { "type": "input_json_delta", "partial_json": "{\\"cit" } }

event: content_block_delta
data: { "type": "content_block_delta", "index": 1,
        "delta": { "type": "input_json_delta", "partial_json": "y\\":\\"Ist" } }
\`\`\`

You can't \`JSON.parse\` a partial string. So I accumulate them per block index and only parse at \`content_block_stop\`:

\`\`\`ts
const toolUseJson: Record<number, string> = {};

case "content_block_start": {
  const cb = evt.content_block;
  if (cb.type === "tool_use") {
    blocks[evt.index] = { type: "tool_use", id: cb.id, name: cb.name, input: {} };
    toolUseJson[evt.index] = "";
  } else if (cb.type === "text") {
    blocks[evt.index] = { type: "text", text: "" };
  }
  break;
}

case "content_block_delta": {
  const d = evt.delta;
  if (d.type === "text_delta") {
    (blocks[evt.index] as TextBlock).text += d.text;
  } else if (d.type === "input_json_delta") {
    toolUseJson[evt.index] += d.partial_json;
  }
  break;
}

case "content_block_stop": {
  const b = blocks[evt.index];
  if (b?.type === "tool_use") {
    try {
      b.input = JSON.parse(toolUseJson[evt.index] || "{}");
    } catch {
      b.input = {};
    }
  }
  break;
}
\`\`\`

This is the entire tool-use accommodation. The UI gets a clean callback when the block completes, with a parsed object as \`input\` ready to render.

A nice consequence of the per-block accumulation: text deltas can be rendered live — typing animation, caret blink, the whole thing — while \`tool_use\` cards appear only when their input is fully assembled. That feels right. Text is conversational; tool calls are commands.

## Abort

Don't skip this. A streaming request that the user has clicked Stop on should actually stop, not run to completion in the background:

\`\`\`ts
const ac = new AbortController();
await fetch(ENDPOINT, { ..., signal: ac.signal });
// later, when the user clicks Stop:
ac.abort();
\`\`\`

\`reader.read()\` throws on the next iteration after abort, and \`signal.aborted\` becomes true. Catch it, distinguish it from a real error, and surface a clean "stopped" state:

\`\`\`ts
try {
  // ... the read loop ...
  cb.onDone({ usage, stopReason });
} catch (err) {
  if (signal?.aborted) {
    cb.onDone({ usage, stopReason: "aborted" });
    return;
  }
  cb.onError(errorMessage(err));
}
\`\`\`

The user gets the partial response they've already seen plus a "stopped" badge, instead of a generic crash.

## Errors that mean something

A 401 from the API can mean several things; a 429 can mean several things. The browser hands you a \`Response\` you have to drill into. Parse the body as JSON, look for \`error.message\`, fall back to status-code messages, and present something the user can act on:

\`\`\`ts
async function readError(res: Response): Promise<string> {
  try {
    const body = await res.json();
    const msg = body?.error?.message ?? body?.message;
    if (msg) return \`\${res.status} · \${msg}\`;
  } catch {
    /* fall through */
  }
  if (res.status === 401) return "401 · Invalid API key.";
  if (res.status === 429) return "429 · Rate limited — wait a moment.";
  return \`\${res.status} · Request failed.\`;
}
\`\`\`

Boring, but the difference between "the app crashed" and "your key is invalid, fix it" is the difference between a tool and a toy.

## What this gets you

The whole SSE client — request, parsing, tool use, abort, errors — fits in about 150 lines of TypeScript and ships in a browser bundle that is, in my case, around 100 KB gzipped *including* React, Tailwind v4, Framer Motion, and the rest. The SDK alone is larger than that.

The other thing it gets you is honesty. The most interesting part of working with the Claude API is the streaming behaviour — caching turning on, tokens accumulating, tool calls landing one block at a time. Hiding that behind an SDK abstraction means you have to debug the SDK before you can debug your app. With direct \`fetch\`, your client *is* the protocol, and when something goes wrong you read the SSE events as they arrive.

I shipped this approach in [**claudoscope**](https://claudoscope-labs.vercel.app/?demo=1), a browser-only x-ray for Claude API calls. The whole token-economics visualization — cache reads, cache writes, uncached input, output, cost delta — is computed straight from the stream events described above. No SDK, no backend, no server-side proxy.

\`\`\`
src/
  app/page.tsx              orchestration
  lib/anthropic.ts          the ~150-line client from this post
  lib/pricing.ts            tier-aware cost from usage events
  components/XRayPanel.tsx  what makes the data visible
\`\`\`

The same client now powers three sibling tools — [agent-replay](https://agentreplay.vercel.app), [prompt-lab](https://prompt-lab-promptly.vercel.app), [tool-lab](https://tool-lab-bice.vercel.app) — without modification. Once the SSE parsing is yours, it composes.

If you've been waiting to put the Claude API in a browser tool because the SDK fights you: it's about an afternoon's work, and the result is small, debuggable, and yours.

---

The four tools, all open-source and BYOK: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).

Source for the SSE client described here: [github.com/ferhatatagun/claudoscope/blob/main/src/lib/anthropic.ts](https://github.com/ferhatatagun/claudoscope/blob/main/src/lib/anthropic.ts).
`,v=`# Prompt caching is the cheapest Claude optimization. Nobody measures it.

Pull up the last week of Anthropic API bills from any team shipping a Claude-powered product. Two out of three of them are paying for context they could be reading from cache for one-tenth the price. Most of them don't know it, because the dashboard doesn't tell them and the SDKs don't either — by the time the response lands, the only number anyone looks at is \`output_tokens\`, and even then mostly when something seems expensive.

The information is in every response. Anthropic puts it in \`usage\`:

\`\`\`json
"usage": {
  "input_tokens": 312,
  "cache_creation_input_tokens": 4180,
  "cache_read_input_tokens": 0,
  "output_tokens": 187
}
\`\`\`

Four numbers. The first time a cached prompt runs you pay 1.25× the input price to *write* the cache. Every subsequent call within the TTL pays 0.1× to *read* it. The ratio between those two lines is the difference between a $3,000/month bill and a $300/month one. And almost no one is graphing it.

**TL;DR**

- Every Claude response carries cache-hit data in \`usage\`. Most apps log it nowhere.
- The first call after a cache miss costs \`1.25× input\` extra; every hit after costs \`0.1× input\`. Break-even is two reads.
- The cache TTL is 5 minutes by default. A request pattern that fires once every six minutes is paying the write penalty forever and getting zero benefit.
- The fix is observability, not code: graph cache hit ratio over time, alert when it dips, and you'll find the bug before the invoice does.
- A 150-line browser tool is enough to do this for any project that streams from the Messages API.

## What the four numbers actually mean

When you send a request with \`cache_control: { type: "ephemeral" }\` somewhere in your messages, the API checks if it's seen an identical prefix in the last 5 minutes. There are three outcomes:

1. **Cache miss, new content.** The full prompt is processed normally. \`input_tokens\` reflects the uncached portion; \`cache_creation_input_tokens\` reflects what got written into cache for next time.
2. **Cache hit.** The cached prefix is read at 10% the price. \`cache_read_input_tokens\` shows what was read; \`input_tokens\` is just the new suffix.
3. **TTL expired.** Same shape as a miss — you pay the creation surcharge again.

So a single response tells you exactly which of these three happened. Not "approximately." Exactly. Per request. For free.

The pricing math (Sonnet 4.5, June 2026) shapes up like this for a 5,000-token system prompt that gets queried once and then again four minutes later:

| Scenario              | First call             | Second call          | Total       |
|-----------------------|------------------------|----------------------|-------------|
| No caching            | 5,000 × $3 = $0.015    | 5,000 × $3 = $0.015  | **$0.030**  |
| Cache, hit            | 5,000 × $3.75 = $0.019 | 5,000 × $0.30 = $0.0015 | **$0.020** |
| Cache, miss (TTL out) | 5,000 × $3.75 = $0.019 | 5,000 × $3.75 = $0.019 | **$0.038** |

The third row is the failure mode. You enabled caching, you're paying the write penalty, and nobody's actually hitting the cache. Without measurement, this row looks identical to the second in your code — same headers, same prompt structure, same response — but it's 90% more expensive than not caching at all.

## How a bad cache hit ratio sneaks in

Three patterns I've watched teams ship and then quietly bleed money over:

**1. Per-user system prompts.** Someone interpolated the user's name or org ID into the system prompt to feel "personalized." Every cache write is now per-user, and unless that user fires a second request within five minutes, every call pays the creation surcharge. The fix is moving the personalization into the user message and keeping the system prompt static — but you only see this fix is needed when the hit ratio graph is flat at zero.

**2. Subtly drifting prompts.** Maybe you append the current timestamp, maybe a "today is" line, maybe you regenerate a list of available tools that arrives in a non-deterministic order. The cache key is the exact byte sequence; one character of drift and you've invalidated the whole prefix. Tools that serialize tool definitions before sending are an especially fun source of this — \`JSON.stringify\` on an object with shuffled keys produces different bytes, no hit.

**3. Wrong TTL for your traffic pattern.** A chatbot that gets ~one message every ten minutes has a structural mismatch with a 5-minute ephemeral cache. You're paying the write penalty on every conversation turn. Either bump to the 1-hour cache (more expensive write, way longer life) or accept that caching isn't economical for your traffic shape — but you need the data to make either decision.

All three of these are invisible from a code review. They're only visible in the usage telemetry.

## The minimum viable observability

You don't need a metrics stack for this. You need to log four fields per request and chart them. The unhelpful version is the one most teams have:

\`\`\`ts
logger.info("claude response", { tokens: r.usage.output_tokens });
\`\`\`

The version that pays for itself in one week is:

\`\`\`ts
const u = r.usage;
const hitRate = u.cache_read_input_tokens / 
                (u.cache_read_input_tokens + u.cache_creation_input_tokens || 1);

logger.info("claude.usage", {
  input: u.input_tokens,
  output: u.output_tokens,
  cache_create: u.cache_creation_input_tokens ?? 0,
  cache_read: u.cache_read_input_tokens ?? 0,
  hit_rate: hitRate,
  cost_estimate: estimateCost(u, model),
});
\`\`\`

The \`hit_rate\` field is the one that matters. Group by route, by model, by user-agent — whatever your traffic dimensions are. Anything trending toward zero on a cache-using endpoint is a money leak.

The \`cost_estimate\` is what makes the dashboard land in conversations with non-engineers. Anthropic publishes pricing per token tier; the conversion is mechanical:

\`\`\`ts
function estimateCost(u: Usage, model: string) {
  const p = pricing[model]; // { input, output, cache_write, cache_read }
  return (
    u.input_tokens * p.input +
    u.output_tokens * p.output +
    (u.cache_creation_input_tokens ?? 0) * p.cache_write +
    (u.cache_read_input_tokens ?? 0) * p.cache_read
  ) / 1_000_000;
}
\`\`\`

That's it. Five lines of arithmetic and you've got per-request dollars on every Claude call your app makes.

## Why I built a tool for this anyway

I built [**claudoscope**](https://claudoscope-labs.vercel.app) because I wanted to see this data live, while the response was streaming, without instrumenting whatever app I was iterating on. The use case is "I'm about to ship a prompt change, did my cache behavior just regress?" — the slow, expensive way is deploying it and looking at logs an hour later; the fast way is pasting the request into a tool that tells you in 4 seconds.

The whole thing is a browser-only client. Bring your own key, no backend. Every event from the SSE stream is parsed and the \`usage\` object is broken out into a panel:

\`\`\`
┌─ X-Ray ────────────────────────────────────────┐
│ input         312      $0.0009                 │
│ cache write 4,180      $0.0157  ◄─ first run  │
│ cache read      0      $0.0000                 │
│ output        187      $0.0028                 │
│ ─────────────                                  │
│ total                  $0.0194                 │
│                                                │
│ hit ratio: 0% (cold) — re-run within 5m       │
└────────────────────────────────────────────────┘
\`\`\`

Hit "send" a second time within the TTL and the bars rearrange — cache write goes to zero, cache read fills, the cost number drops by 90%. It's the kind of thing that's obvious once you see it move and invisible if you don't.

It's about 100KB gzipped and the source is in [one file](https://github.com/ferhatatagun/claudoscope). The pricing tier logic is in another. There's no third file.

## What I'd actually recommend you do today

The order of operations, in increasing effort:

1. **Right now (5 minutes):** Open claudoscope, paste your most expensive prompt, run it twice. Look at the difference. If the hit ratio isn't ~99% on the second call, you have a cacheability bug, not an optimization opportunity.
2. **This week (an afternoon):** Add the usage logging block above to every Claude call site in your app. Ship it. Don't bother building a dashboard yet — \`grep\` your logs and you'll find the worst offenders in fifteen minutes.
3. **This month (a sprint):** Move the four \`usage\` fields into your real metrics pipeline (Datadog/Honeycomb/Grafana/whatever). Graph cache hit ratio by endpoint. Alert when it drops below your floor.
4. **Optional (if you're me):** Build the visualizer because seeing it move in real time is the thing that makes it stick.

Three out of four of those are configuration, not code. The interesting part isn't the implementation; it's that almost nobody has done it. The teams I've talked to who do have it — without exception — found a cache misconfiguration in the first week of dashboards and saved more than the work cost them. The teams who don't have it are usually paying the cache creation surcharge for nothing.

The Anthropic API gives you everything you need to know whether your caching is working. The only question is whether you look.

---

I shipped this visualization in [**claudoscope**](https://claudoscope-labs.vercel.app) — bring-your-own-key, no backend, runs in the browser. Source: [github.com/ferhatatagun/claudoscope](https://github.com/ferhatatagun/claudoscope).

The same SSE client also powers three sibling tools — [agent-replay](https://agentreplay.vercel.app), [prompt-lab](https://prompt-lab-promptly.vercel.app), [tool-lab](https://tool-lab-bice.vercel.app). All open-source, all BYOK: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).
`,T=`# Your prompt isn't better. You just remember it being better.

Every developer who has shipped a Claude-powered feature has had this conversation with themselves:

> "OK, the old prompt was too long, this one's tighter — *feels* like it's giving better answers… and faster too, I think? Let's ship it."

You ship it. A week later something feels off — maybe outputs are flakier on the edge cases, maybe the bill went up, maybe a coworker tells you "the AI doesn't get it anymore." You don't remember the exact previous prompt. You don't have a baseline. You change it back. Or you don't, and live with a quiet regression for a month.

I have done this maybe forty times. Most of us have. The reason isn't that prompt iteration is hard. The reason is that *evaluating* prompt iteration is hard, and we don't have the tooling for it, so we substitute taste — which works fine until it doesn't.

**TL;DR**

- "It feels better" is not data. Your sample size is one query, your memory is recent, your prior is sunk cost.
- The minimum useful comparison is the same input through two prompts in parallel, surfacing three numbers: output (do they say the same thing?), latency (how long did each take?), cost (how much did each spend?).
- Models change too — comparing GPT-style verbose system prompts on Sonnet 4.5 vs Haiku 4.5 surfaces ~10× cost differences for outputs you'd score the same.
- Running them in parallel makes it fair: same time of day, same API state, same input. Running them sequentially in a chat window does not.
- A browser-only tool can do this in 4 seconds. You don't need a benchmarking framework. You need to see them side by side.

## What "vibes" actually costs

The trap with prompt tuning is that the *only* dimension a chat-style UI shows you is the output text. You read it, decide if it sounds right, and move on. Three things get hidden:

**1. Latency.** Did this take 3 seconds or 11? You squinted, kind of remembered, but you weren't watching a stopwatch. Across a thousand production requests this difference is the gap between "snappy" and "slow."

**2. Cost.** The verbose system prompt that produces beautiful structured output uses 4,000 input tokens. The terse one uses 600. They both produce ~800 output tokens. At Sonnet pricing that's the difference between $14 and $4 per thousand calls. You don't see this difference looking at one response.

**3. Output drift.** "Cleaner" outputs sometimes mean the model lost a useful constraint. The polite preamble you stripped out was actually doing something. The structured format you added looks neat but truncates on long inputs. Side-by-side reveals this; sequential doesn't, because you remember the gist of the previous answer, not the specifics.

The whole point of A/B testing is to lift all three of these into the same field of view, on the same input, at the same time. That's it. That's the entire idea. The reason most of us don't do it is that we don't have the tool — and the friction of switching between two tabs, hitting send twice, copying output into a diff viewer, and looking up cost in the dashboard is enough to make us shrug and ship.

## Same input, two prompts, parallel

The mechanism is unspectacular:

\`\`\`ts
const [outA, outB] = await Promise.all([
  runClaude({ system: promptA, messages, model }),
  runClaude({ system: promptB, messages, model }),
]);
\`\`\`

That's the core. Two requests fired in parallel against the same \`messages\`. The trick is that both streams are happening simultaneously — same network conditions, same API load, same time-of-day cache warmth. Sequential A→B isn't a fair comparison; if the API was congested for the first call and cached the second, you're measuring weather, not signal.

What you do with the two outputs is where it gets interesting. The boring version: log both, eyeball, pick one. The version that actually works: side-by-side render, each with its own latency clock, each with its own token count and cost dollars, each with a diff highlight if you want to see exactly where they disagree.

The thing I've found is that 80% of the time both prompts produce *substantively equivalent* outputs. The reason to pick one is purely on cost or latency — there's no semantic improvement, you just got a 4× cheaper version of the same answer. The remaining 20% is where the outputs actually diverge meaningfully, and that's where eyeballs are needed, but at least now you know to look.

## What "better" looks like in numbers

A concrete example from last week. I had two versions of a system prompt for a code-review tool:

**Version A** — 1,800 tokens, full taxonomy of issue types, examples for each, explicit JSON schema:

\`\`\`
You are a senior staff engineer reviewing a pull request. For each
issue you find, classify it under one of:
- correctness (the code is wrong)
- security (the code is exploitable)
- performance (the code is slow)
- maintainability (the code is hard to read)
...
\`\`\`

**Version B** — 280 tokens, no taxonomy, schema implied by an example:

\`\`\`
Review this code. For each problem, return JSON like:
[{"severity": "high"|"medium"|"low", "line": 42, "issue": "..."}]
Don't comment on style; focus on bugs and security.
\`\`\`

Same input (a 600-line Python file). Both went to Sonnet 4.5. Side-by-side run:

|                   | Version A         | Version B         |
|-------------------|-------------------|-------------------|
| Input tokens      | 2,640             | 1,120             |
| Output tokens     | 820               | 740               |
| Latency           | 5.3s              | 3.1s              |
| Cost              | $0.0202           | $0.0145           |
| Issues found      | 7                 | 6                 |

Looking at the diff: both flagged the same 5 critical issues. Version A also flagged a \`# TODO\` as a maintainability issue and split a complex function into two suggested refactors. Version B was tighter — it caught fewer minor things but every single thing it caught was actionable.

I shipped B. Not because it was "better" in a soft sense; because it was 28% cheaper and 41% faster for outputs that a human would consider equivalent on the work that mattered. *That* is what an A/B framework gives you that a chat UI doesn't: a basis for the decision that isn't "feels right."

If I had only run version B sequentially after deleting version A, I would have lost the comparison and convinced myself version B was either much better or much worse than it actually was.

## The cross-model angle

The same setup also surfaces something subtle that I think most teams underuse: the **right model is also a prompt choice**.

Same prompt, two models — Sonnet 4.5 vs Haiku 4.5 — on the same input:

|                    | Sonnet 4.5  | Haiku 4.5  |
|--------------------|-------------|------------|
| Latency            | 4.1s        | 0.9s       |
| Cost (input+output)| $0.011      | $0.0008    |
| Output quality     | 9/10        | 8/10       |

For the right kind of task, that's a ~13× cost reduction with a quality drop most users would never notice in a UI. The wrong kind of task — anything requiring complex multi-step reasoning — and Haiku will whiff in ways Sonnet wouldn't, and the comparison protects you from that too. You don't have to *guess* which kind of task you have; you can measure it on five real inputs in five minutes.

## How prompt-lab does this

I built [**prompt-lab**](https://prompt-lab-promptly.vercel.app) because the friction of A/B testing prompts in my own work was high enough that I was skipping the step and shipping by vibes. The tool's whole job is to remove that friction:

- Two prompt panes. Paste prompt A on the left, prompt B on the right.
- One input pane. Type the user message once.
- Hit run. Both responses stream into their respective panes simultaneously.
- Below each pane: a small scoreboard with input tokens, output tokens, latency, cost.
- At the bottom: a verdict line — "A: $0.0202 / 5.3s · B: $0.0145 / 3.1s · B 28% cheaper, 41% faster."

That's the entire UI. It's a browser tool, BYOK, no backend. It's about 8KB of relevant logic plus the streaming client from the [previous post](https://medium.com/@ferhatatagun/building-a-streaming-claude-client-in-the-browser-without-the-sdk-4ce8a9407d2c).

You can also do same-prompt-different-model, or different-prompt-different-model. The arena doesn't care which one you're testing — you set the two columns and hit run.

## What I'd recommend you do this week

Three steps, increasing in effort:

1. **Today (5 minutes):** Open prompt-lab. Take whatever prompt your team is currently shipping. Make a shorter version of it. Run them both on three real inputs. If the shorter one wins on cost+latency with no semantic loss on the inputs you care about, you just paid for your week.

2. **This sprint (an afternoon):** Build a small eval harness. Pick 10 representative inputs that span your real traffic. Run every prompt change through them before merging. Doesn't need to be fancy — a JSON file of inputs and a script that diffs outputs is enough to catch the worst regressions.

3. **This quarter (a project):** Make A/B comparison part of your prompt review process. Every PR that changes a prompt should include the run output for the same 10 inputs, with the cost and latency numbers in the description. Same energy as showing test results in a code review.

The economics of LLM apps are increasingly about prompt design and model choice. The teams that compete will be the ones that measure both. The teams that don't will keep shipping vibes-based prompt changes and wondering why the bill keeps creeping up while users complain it "feels worse."

You don't need to outsmart your future self. You just need to make it possible for them to look back and know what was actually changing.

---

I shipped this in [**prompt-lab**](https://prompt-lab-promptly.vercel.app) — two prompts side by side, BYOK, no backend, runs in the browser. Source: [github.com/ferhatatagun/prompt-lab](https://github.com/ferhatatagun/prompt-lab).

The same SSE client also powers three sibling tools — [claudoscope](https://claudoscope-labs.vercel.app), [agent-replay](https://agentreplay.vercel.app), [tool-lab](https://tool-lab-bice.vercel.app). All open-source, all BYOK: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).
`,_=`# Build the sandbox before you write a single tool

The first time you ship a Claude agent that uses tools you'll do it the obvious way: design the schema, write the actual tool function, hit the API, parse the \`tool_use\` block, run the function, feed the result back, loop. It works. It also has a fundamental ordering bug:

You wrote the tools before you knew if they were the right tools.

By the time you've stood up a database query function, two API calls, and a thing that hits the file system, you've sunk maybe a day. You run the agent. It calls a non-existent tool. It hallucinates an argument shape that doesn't match your schema. It picks the wrong tool when both would have worked. *Now* you're going to redesign the schema, and the four real tool implementations you wrote are going in the bin or being rewritten.

The thing that makes this worse is that the failure mode looks like an "agent quality" problem when it's actually a "premature implementation" problem. The model knew what it wanted; you'd just built the wrong scaffolding around it.

**TL;DR**

- Tool implementations are the slowest part of agent development; tool *design* is the fastest part to get wrong.
- Decouple them: write the tool schemas, run the agent loop with mocked responses, see how the model picks and uses the tools — then write the real implementations only for the tools that survived.
- The right mental model is "you play the role of every tool, by hand" — slow for the agent, fast for you, brutal for bad designs.
- This is a fifteen-minute exercise for a five-tool agent that would otherwise take a day, and it catches design mistakes before they touch your codebase.
- The whole thing fits in a browser tool with no backend.

## What "premature implementation" actually looks like

A worked example. I was building a code review agent. My first instinct was four tools:

\`\`\`ts
const tools = [
  { name: "read_file", description: "read a file from the repo", ... },
  { name: "search_code", description: "grep across the repo", ... },
  { name: "get_diff", description: "show the diff for this PR", ... },
  { name: "post_comment", description: "leave a review comment", ... },
];
\`\`\`

I implemented all four. Real filesystem access. Real git invocation. Real GitHub API call. Probably four hours total. Then I ran the agent on a real PR.

What happened: the agent called \`get_diff\` first (good), then called \`search_code\` for every single identifier in the diff (catastrophic — the diff had 200 lines, 50 unique identifiers, my rate limit ran out). It never called \`read_file\` because the diff already contained the context. It called \`post_comment\` once at the end with a 4,000-word essay instead of inline comments.

Three of my four "real" tools were either misused or unused. The agent design was wrong, not the implementations. If I'd run the loop with mocked responses first, I would have:

1. Noticed it called \`search_code\` 50 times → split the tool into \`search_code(query, limit=5)\` with an explicit budget
2. Noticed it never used \`read_file\` → deleted it, saved myself an hour
3. Noticed \`post_comment\` was being used as \`post_essay\` → split into \`post_inline_comment(line, body)\` and \`post_summary(body)\`

That intervention takes fifteen minutes when the tools are mocked. It takes a day when they're real.

## The role-play pattern

The trick is shockingly simple: write your tool schemas, send a real user message to Claude, and when the model produces a \`tool_use\` block, *you* hand-type the result and feed it back. The loop runs end-to-end, but you're playing every tool.

In code, this is the same agent loop everyone writes:

\`\`\`ts
while (true) {
  const res = await callClaude({ messages, tools });
  if (res.stop_reason === "end_turn") break;
  
  const toolUses = res.content.filter(b => b.type === "tool_use");
  const toolResults = toolUses.map(t => ({
    type: "tool_result",
    tool_use_id: t.id,
    content: PROMPT_USER_FOR_RESULT(t.name, t.input),  // <-- you fill this in
  }));
  
  messages.push({ role: "assistant", content: res.content });
  messages.push({ role: "user", content: toolResults });
}
\`\`\`

The only difference between this and a "real" agent loop is the \`PROMPT_USER_FOR_RESULT\` call — instead of executing a function, it shows you what the model called and what arguments it used, and waits for you to type the answer.

What that produces is surprisingly information-dense:

- **Did the model pick the tool I expected?** If it took a different path you didn't anticipate, your schema is signaling something other than what you meant.
- **Did the input shape match my JSON schema?** If the model is straining to fit the schema, the schema is too rigid or too loose.
- **How many tools did it chain?** A 12-step tool chain to answer one question is a sign you decomposed the toolset wrong.
- **Did it ask follow-up questions before tool use?** That's good — it means the model is trying to disambiguate. If it doesn't, your prompt isn't asking it to.

You see all of this in a five-minute conversation, before you've written a single line of real implementation.

## When you can stop role-playing

The sandbox isn't a permanent state. It's a phase. You run it until you've answered three questions:

1. **Are these the right tools?** — Some get deleted, some get split, some get merged. Usually 30-50% of your initial toolset doesn't survive contact with a real prompt.
2. **Are the schemas tight enough?** — You see the model picking awkward argument values; you constrain the schema (enum instead of string, required instead of optional). 
3. **Does the agent loop terminate?** — Some agents will keep calling tools forever if their stopping criteria are vague. The mock-response loop surfaces this immediately because *you're* the one getting stuck typing responses.

When those three are stable on a handful of real prompts, you write the real implementations. The implementation work is now de-risked: you know which tools to actually build, and the schemas are settled.

The thing you save isn't the implementation time itself — it's the rework. Writing a tool from scratch is fast. Rewriting a tool because its schema was wrong, then updating the prompt because the new schema needs different framing, then re-running every regression input, is what eats days.

## What this looks like in tool-lab

[**tool-lab**](https://tool-lab-bice.vercel.app) is what I built to do this without setting up a project each time. Three panes:

\`\`\`
┌─ Tools (JSON editor) ─────────┬─ Conversation ────────────────────┐
│ [                             │  user: review this PR             │
│   { "name": "read_file", ... },│  assistant: I'll get the diff.    │
│   { "name": "search_code"...},│    → tool_use: get_diff()         │
│   { "name": "get_diff", ... },│    ← tool_result: <YOU TYPE>      │
│   { "name": "post_comment"...}│  assistant: ...                   │
│ ]                             │                                    │
└───────────────────────────────┴───────────────────────────────────┘
\`\`\`

You paste your tool schemas on the left. Type the user message. The model streams its response into the right pane. When it lands a \`tool_use\` block, the conversation pauses with a text field for the result. You type whatever the tool would have returned — JSON, a string, an error, whatever. Hit continue. The loop runs again with your fake result included.

It's about 12KB of relevant logic on top of the shared SSE client I wrote about [here](https://ferhatatagun.com/blog/browser-only-claude-streaming). BYOK, no backend, your tool schemas and conversations live in \`localStorage\` only. There's a demo conversation seeded on \`?demo=1\` so you can see the loop run without writing tools yourself.

The thing I keep noticing: the tool-lab session for any new agent takes ten to twenty minutes. The agent design that comes out of it is consistently 30-50% smaller than what I would have written from intuition. Smaller agents with fewer, more focused tools are also dramatically easier to reason about when they go wrong in production — which is the other dividend of doing the sandbox phase.

## What I'd recommend you do this week

Three escalating moves:

1. **Today (10 minutes):** Pick an agent you're already building. Paste its tool schemas into tool-lab, send a real user message, see what happens. If the agent picks the wrong tools or uses the right ones in surprising ways, you've just learned something.

2. **This sprint (an afternoon):** Make "sandbox before implementation" the default for new agents on your team. Stand up the tool schemas first, role-play five representative prompts, then write the implementations only for tools that survived. Track the count: how many initial tools made it through.

3. **This quarter (a habit):** When something goes wrong with an agent in production — wrong tool picked, weird argument shape, infinite loop — drop the trace into the sandbox before debugging the implementation. The bug is often in the design, not the code.

Tool implementations are not the hard part of agent development. *Tool design* is. The thing that separates teams that ship reliable agents from teams that ship agents that "mostly work" isn't the quality of their tool functions; it's how many bad tool designs they killed before writing the function.

You don't need a framework for this. You don't need a vendor. You need fifteen minutes and a willingness to play the role of every tool, by hand, until you know which ones deserve to be real.

---

I shipped this in [**tool-lab**](https://tool-lab-bice.vercel.app) — define tools, mock responses, watch the agent loop. BYOK, no backend, runs in the browser. Source: [github.com/ferhatatagun/tool-lab](https://github.com/ferhatatagun/tool-lab).

The same SSE client also powers three sibling tools — [claudoscope](https://claudoscope-labs.vercel.app), [agent-replay](https://agentreplay.vercel.app), [prompt-lab](https://prompt-lab-promptly.vercel.app). All open-source, all BYOK: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).
`,I=`# How I debug Claude agents by replaying their trace

Your agent did something weird in production. A user reported it, you found the failed run in your logs, and you're now staring at a JSON file that's 400 messages long, half of them are \`tool_result\` blocks the size of small databases, and somewhere in there is the moment the agent decided to do the wrong thing.

You can't re-run the agent: the API state has moved on, the tool would behave differently now, the prompt has been updated three times since. You have only the trace.

The way most of us read agent traces is: open the JSON in an editor, ctrl+F for the tool name we suspect, scroll through walls of escaped strings, try to mentally reconstruct the sequence. It takes thirty minutes, by the end of which you have one of three answers — "yeah I see what went wrong," "I'm pretty sure I see what went wrong," or "I have no idea what went wrong." About a third of the time it's the third one, and you go ship a band-aid that may or may not fix the actual problem.

The thing nobody talks about is that this isn't a hard problem. The JSON contains all the information. The issue is purely *presentational* — it's nearly impossible to read.

**TL;DR**

- Agent traces are a sequence of decisions but stored as a wall of nested JSON. The signal is there; the format is the problem.
- The right primitive isn't a JSON viewer — it's a timeline. Each thought, tool call, tool result, and final answer becomes its own discrete, color-coded step.
- Once you can scrub through the trace step by step, the failure point becomes visually obvious in seconds instead of minutes.
- This is post-hoc, not interactive. You don't need to re-run the agent or hit the API — replay works on the raw trace alone.
- A browser-only tool can do this in 4 seconds. No backend, no key, just paste the JSON.

## What an agent trace actually contains

When you save a Claude agent run, you usually persist the \`messages\` array — the full conversation including the model's responses and the tool results you fed back. A six-step agent run looks roughly like:

\`\`\`jsonc
[
  { "role": "user", "content": "Find me the cheapest flight from IST to LAX next Tuesday" },
  { "role": "assistant", "content": [
    { "type": "text", "text": "I'll search for flights and check prices." },
    { "type": "tool_use", "id": "tu_01", "name": "search_flights", "input": {...} }
  ]},
  { "role": "user", "content": [
    { "type": "tool_result", "tool_use_id": "tu_01", "content": "[<2KB of JSON>]" }
  ]},
  { "role": "assistant", "content": [
    { "type": "text", "text": "Looking at three of those..." },
    { "type": "tool_use", "id": "tu_02", "name": "get_price", "input": {...} }
  ]},
  // ...four more steps...
]
\`\`\`

Every interesting moment of the agent's behaviour is in there: which tool it picked, what arguments it constructed, what it said about its own reasoning, how it interpreted the result. The structure is fundamentally a **sequence of discrete events**, not a "document."

But you read it as a document, because that's what an editor shows you. The brain has to do the work of converting "alternating role: assistant / role: user with tool_result content blocks" into "step 3 was a tool call to get_price with argument X, which returned Y, which the agent then interpreted as Z."

That conversion is what kills your debugging time. Doing it manually for a 12-step trace takes minutes. Doing it for a 60-step agent on a complex task takes hours.

## The right primitive: a timeline of decisions

The reframe is: stop reading the trace as JSON, start watching it as a sequence of decisions. Each step is one of:

- 💭 **Thought** — the model wrote text (the part of its response that isn't a tool call)
- 🔧 **Tool call** — the model invoked a tool with specific arguments
- 📥 **Tool result** — what came back, fed into the next turn
- ✅ **Final answer** — the model's \`end_turn\`, no more tools

Color-code those four event types. Lay them out in order, one card per event. You now have a timeline you can scrub, step through, and play back. The information density per card is high enough that you can read the entire trace at a glance, and zoom in only on the cards that look suspicious.

The structural insight: agent debugging is closer to debugging a script with breakpoints than to reading source code. You want to step through, not skim. JSON gives you no steps; the timeline gives you nothing else.

## The bugs that become obvious in this view

Three failure modes I see repeatedly when I drop a trace into the timeline:

**1. The wrong tool, picked silently.** The model called \`search_archive\` when it should have called \`search_recent\`. In JSON this is one line out of 200 that flies past your eye. In the timeline it's a card with a tool name you didn't expect, and you click on it.

**2. Hallucinated arguments.** The model called the right tool but with an argument shape that doesn't match the schema — usually because the schema is ambiguous. In JSON you see \`{"q": "foo", "limit": "10"}\` and don't notice that \`limit\` should have been an integer. In the timeline the tool result card right after shows a 400 error and you trace it back one step.

**3. The infinite loop precursor.** Some agents get stuck in a pattern where they keep calling the same tool with slightly different inputs, never reaching a conclusion. In JSON it's a wall of near-identical blocks. In the timeline it's a visual rhythm — five purple cards in a row with the same tool name — that you can see in your peripheral vision the moment you scroll.

In all three cases, the bug isn't subtle. It just *looks* subtle when it's hidden in JSON.

## What replay gives you that re-running doesn't

The temptation when an agent fails is to re-run it with print statements, see what happens, iterate. Don't. Three reasons:

**It costs API calls.** A failed agent that called 15 tools costs you 15× input tokens to re-run. With caching maybe less; either way, the bill is real. Replay is free.

**The API state has moved.** The tool you call today might return different data than the tool returned during the original run. You're not debugging the original failure anymore; you're debugging *whatever happens now*, which might be a totally different bug.

**The model is stochastic.** Even at temperature 0, retries can produce different outputs. Re-running an agent and getting a *different* failure mode means you've now got two bugs to investigate. The trace is the canonical artifact of what actually happened.

Replay sidesteps all three. You're inspecting a frozen artifact, deterministically, at whatever speed you want. The bug doesn't move while you're looking at it.

## What this looks like in agent-replay

[**agent-replay**](https://agentreplay.vercel.app) is the tool I built for this. Paste your trace into a JSON pane on the left. The right pane renders it as a cinematic timeline:

- Each event is a card with an icon and color
- You can press space to play through the trace at 1× speed (one event per second), or scrub manually
- Click any card to see the full content — the thought text, the tool call's input JSON, the raw tool result, expanded
- Filter by event type — "show me only the tool calls" or "show me only the assistant thoughts" — when you want to focus
- The whole thing is in your browser; no key needed, no backend, your trace never leaves the tab

There's a sample trace seeded on \`?demo=1\` if you want to see what a 12-step agent looks like without copying your own data anywhere.

The thing I keep finding: the moment I'm debugging is no longer "where in the JSON did the agent screw up." It's "which card looks wrong, and what does the next card show as a consequence." A 30-minute investigation becomes a 30-second one. Not because the tool is doing anything clever — it's just showing the same data in the right shape.

## What I'd recommend you do this week

Three escalating moves:

1. **Today (5 minutes):** Find the last weird agent run you have a trace for. Paste it into agent-replay. See how long it takes to find the failure point. If it's faster than your usual JSON-scrolling approach, you just changed your debugging workflow.

2. **This week (an afternoon):** Add a trace-export endpoint to your agent. Every agent run, finished or failed, dumps the \`messages\` array to S3 or a database row. You need the trace before you need to debug it, not after.

3. **This quarter (a habit):** When a user reports "the agent did something weird," your first move is to pull the trace and open it in a timeline view, *before* you read the user's report carefully. Most of the time you'll know what happened before you finish reading the bug report.

Agent debugging is presented as an emerging engineering discipline. It isn't — it's a tooling problem we've solved many times before for non-AI systems. We just haven't built the tools yet for this one. Once the trace is in the right shape, the bugs are obvious. The work is laying out the data, not interpreting it.

---

I shipped this in [**agent-replay**](https://agentreplay.vercel.app) — paste a trace, scrub the timeline. No key, no backend, runs in the browser. Source: [github.com/ferhatatagun/agent-replay](https://github.com/ferhatatagun/agent-replay).

The same SSE client (for traces that include streaming events) also powers three sibling tools — [claudoscope](https://claudoscope-labs.vercel.app), [prompt-lab](https://prompt-lab-promptly.vercel.app), [tool-lab](https://tool-lab-bice.vercel.app). All open-source, all BYOK: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).
`,h={"yapay-zeka-ve-yazilim-gelistirme-2024":c,"mcp-model-context-protocol-nedir":p,"cursor-ide-ve-prompt-muhendisligi":m,"neden-bazen-sadece-bos-ekrana-bakiyorum":g,"bitmemis-projeler-mezarligim":b,"best-practice-dedigin-yarisi-ezber":f},u={"cursor-ide-ve-prompt-muhendisligi":y,"rules-and-commands-that-stick":k,"browser-only-claude-streaming":w,"prompt-caching-nobody-measures":v,"stop-choosing-prompts-by-vibes":T,"build-the-sandbox-first":_,"debug-claude-agents-by-replaying-traces":I},A="Blog",s=[{slug:"yapay-zeka-ve-yazilim-gelistirme-2024",title:"Yapay Zeka ile Yazılım Geliştirme: MCP, GPT ve Cursor",excerpt:"LLM araçları, Model Context Protocol (MCP) ve Cursor ile günlük geliştirme pratiğinde nasıl daha verimli olunur.",date:"2024-12-01",tags:["AI","MCP","Cursor","LLM","Productivity"]},{slug:"mcp-model-context-protocol-nedir",title:"Model Context Protocol (MCP) Nedir?",excerpt:"MCP, AI asistanlarının dosya sistemine, API'lere ve araçlara güvenli erişimini standartlaştıran açık protokol.",date:"2024-11-15",tags:["MCP","AI","Protocol","Developer Tools"]},{slug:"cursor-ide-ve-prompt-muhendisligi",title:"Cursor IDE ve Prompt Mühendisliği",excerpt:"Cursor’da @dosya, @web kullanımı, net talimatlar ve .cursorrules ile daha tutarlı ve verimli AI kullanımı.",date:"2024-11-01",tags:["Cursor","AI","Prompt Engineering","IDE"],titleEn:"Cursor IDE and Prompt Engineering",excerptEn:"Using @file, @web, clear instructions and .cursorrules for more consistent and efficient AI use in Cursor."},{slug:"neden-bazen-sadece-bos-ekrana-bakiyorum",title:"Neden Bazen Sadece Boş Ekrana Bakıyorum",excerpt:"Hiçbir tuşa basmadan ekrana bakmak da işin parçası. Verimlilik kültürüne ters bir itiraf.",date:"2025-01-12",tags:["Mindset","Productivity","Reflection"]},{slug:"bitmemis-projeler-mezarligim",title:"Bitmemiş Projeler Mezarlığım ve Neden Rahatım",excerpt:"Yarım kalan side project'ler başarısızlık mı? Bence bazen sadece keşfin kendisi.",date:"2025-01-05",tags:["Side Projects","Mindset","Learning"]},{slug:"best-practice-dedigin-yarisi-ezber",title:'"Best Practice" Dediklerimizin Yarısı Ezber',excerpt:"DRY, test coverage, yorum yazmak… Kurallar bağlam olmadan anlamsız. Cesur bir tez.",date:"2024-12-20",tags:["Code Quality","Opinion","Software Design"]},{slug:"rules-and-commands-that-stick",title:"Rules and Commands That Actually Stick",excerpt:"How to make .cursorrules and slash commands useful instead of forgotten: start from pain, keep the list short, iterate from real usage.",date:"2025-01-18",tags:["Cursor","Rules","Commands","Workflow","AI"]},{slug:"browser-only-claude-streaming",title:"Building a streaming Claude client in the browser — without the SDK",excerpt:"Why I skipped the official Anthropic SDK for browser work, and the ~150 lines of TypeScript that replaced it: a hand-rolled SSE parser with tool-use support, clean aborts, and meaningful errors.",date:"2026-06-03",tags:["Claude","Anthropic","SSE","Streaming","TypeScript","Browser"]},{slug:"prompt-caching-nobody-measures",title:"Prompt caching is the cheapest Claude optimization. Nobody measures it.",excerpt:"Every Claude response carries cache-hit data. Most apps log it nowhere — and pay for it. Why hit ratio is the metric nobody graphs, and the four-field log line that pays for itself in a week.",date:"2026-06-04",tags:["Claude","Anthropic","Prompt Caching","Observability","Cost","LLM"]},{slug:"stop-choosing-prompts-by-vibes",title:"Your prompt isn't better. You just remember it being better.",excerpt:"Most teams iterate on prompts by feel and ship by memory. The minimum useful comparison is two prompts in parallel, surfacing output, latency and cost on the same input — what side-by-side reveals that sequential never does.",date:"2026-06-04",tags:["Claude","Anthropic","Prompt Engineering","A/B Testing","LLM","Evals"]},{slug:"build-the-sandbox-first",title:"Build the sandbox before you write a single tool",excerpt:"Most agent teams write the tools first, then discover the design was wrong. Mock the tool responses, role-play the loop by hand, and kill the bad tool designs in fifteen minutes — before they touch your codebase.",date:"2026-06-04",tags:["Claude","Anthropic","Agents","Tool Use","Prompt Engineering","LLM"]},{slug:"debug-claude-agents-by-replaying-traces",title:"How I debug Claude agents by replaying their trace",excerpt:"Agent traces contain everything you need to debug a weird run, but they're stored as walls of nested JSON. The reframe: stop reading them as documents, start watching them as timelines of decisions. Bugs that take 30 minutes in an editor become obvious in 30 seconds.",date:"2026-06-04",tags:["Claude","Anthropic","Agents","Debugging","LLM","Observability"]}],S=[...s].sort((e,t)=>t.date.localeCompare(e.date));function x(e){return s.find(t=>t.slug===e)}function z(e,t="tr"){return t==="en"?u[e]:h[e]}function C(e,t){return t==="en"&&e.titleEn?e.titleEn:e.title}function P(e,t){return t==="en"&&e.excerptEn?e.excerptEn:e.excerpt}function B(e){const t=h[e]??u[e];if(!t)return 0;const n=t.trim().split(/\s+/).filter(Boolean).length;return Math.max(1,Math.ceil(n/200))}function E(e){const t=x(e);if(!t)return[];const n=a=>a.slug!==e&&a.tags.some(o=>t.tags.includes(o)),d=(a,o)=>{const r=a.tags.filter(i=>t.tags.includes(i)).length,l=o.tags.filter(i=>t.tags.includes(i)).length;return l!==r?l-r:o.date.localeCompare(a.date)};return S.filter(n).sort(d).slice(0,2)}function R(){const e=new Set;return s.forEach(t=>t.tags.forEach(n=>e.add(n))),[...e].sort()}export{B as a,x as b,E as c,z as d,C as e,P as f,R as g,S as s,A as t};
