const h=`# Yapay Zeka ile Yazılım Geliştirme: MCP, GPT ve Cursor

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
`,m=`# Model Context Protocol (MCP) Nedir?

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
`,p=`# Cursor IDE ve Prompt Mühendisliği

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
`,k=`# Neden Bazen Sadece Boş Ekrana Bakıyorum

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
`,g=`# "Best Practice" Dediklerimizin Yarısı Ezber

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
`,f=`# Rules and Commands That Actually Stick

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
`,v=`# Building a streaming Claude client in the browser — without the SDK

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
`,w=`# Prompt caching is the cheapest Claude optimization. Nobody measures it.

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
`,d={"yapay-zeka-ve-yazilim-gelistirme-2024":h,"mcp-model-context-protocol-nedir":m,"cursor-ide-ve-prompt-muhendisligi":p,"neden-bazen-sadece-bos-ekrana-bakiyorum":k,"bitmemis-projeler-mezarligim":b,"best-practice-dedigin-yarisi-ezber":g},c={"cursor-ide-ve-prompt-muhendisligi":y,"rules-and-commands-that-stick":f,"browser-only-claude-streaming":v,"prompt-caching-nobody-measures":w},T="Blog",i=[{slug:"yapay-zeka-ve-yazilim-gelistirme-2024",title:"Yapay Zeka ile Yazılım Geliştirme: MCP, GPT ve Cursor",excerpt:"LLM araçları, Model Context Protocol (MCP) ve Cursor ile günlük geliştirme pratiğinde nasıl daha verimli olunur.",date:"2024-12-01",tags:["AI","MCP","Cursor","LLM","Productivity"]},{slug:"mcp-model-context-protocol-nedir",title:"Model Context Protocol (MCP) Nedir?",excerpt:"MCP, AI asistanlarının dosya sistemine, API'lere ve araçlara güvenli erişimini standartlaştıran açık protokol.",date:"2024-11-15",tags:["MCP","AI","Protocol","Developer Tools"]},{slug:"cursor-ide-ve-prompt-muhendisligi",title:"Cursor IDE ve Prompt Mühendisliği",excerpt:"Cursor’da @dosya, @web kullanımı, net talimatlar ve .cursorrules ile daha tutarlı ve verimli AI kullanımı.",date:"2024-11-01",tags:["Cursor","AI","Prompt Engineering","IDE"],titleEn:"Cursor IDE and Prompt Engineering",excerptEn:"Using @file, @web, clear instructions and .cursorrules for more consistent and efficient AI use in Cursor."},{slug:"neden-bazen-sadece-bos-ekrana-bakiyorum",title:"Neden Bazen Sadece Boş Ekrana Bakıyorum",excerpt:"Hiçbir tuşa basmadan ekrana bakmak da işin parçası. Verimlilik kültürüne ters bir itiraf.",date:"2025-01-12",tags:["Mindset","Productivity","Reflection"]},{slug:"bitmemis-projeler-mezarligim",title:"Bitmemiş Projeler Mezarlığım ve Neden Rahatım",excerpt:"Yarım kalan side project'ler başarısızlık mı? Bence bazen sadece keşfin kendisi.",date:"2025-01-05",tags:["Side Projects","Mindset","Learning"]},{slug:"best-practice-dedigin-yarisi-ezber",title:'"Best Practice" Dediklerimizin Yarısı Ezber',excerpt:"DRY, test coverage, yorum yazmak… Kurallar bağlam olmadan anlamsız. Cesur bir tez.",date:"2024-12-20",tags:["Code Quality","Opinion","Software Design"]},{slug:"rules-and-commands-that-stick",title:"Rules and Commands That Actually Stick",excerpt:"How to make .cursorrules and slash commands useful instead of forgotten: start from pain, keep the list short, iterate from real usage.",date:"2025-01-18",tags:["Cursor","Rules","Commands","Workflow","AI"]},{slug:"browser-only-claude-streaming",title:"Building a streaming Claude client in the browser — without the SDK",excerpt:"Why I skipped the official Anthropic SDK for browser work, and the ~150 lines of TypeScript that replaced it: a hand-rolled SSE parser with tool-use support, clean aborts, and meaningful errors.",date:"2026-06-03",tags:["Claude","Anthropic","SSE","Streaming","TypeScript","Browser"]},{slug:"prompt-caching-nobody-measures",title:"Prompt caching is the cheapest Claude optimization. Nobody measures it.",excerpt:"Every Claude response carries cache-hit data. Most apps log it nowhere — and pay for it. Why hit ratio is the metric nobody graphs, and the four-field log line that pays for itself in a week.",date:"2026-06-04",tags:["Claude","Anthropic","Prompt Caching","Observability","Cost","LLM"]}],z=[...i].sort((e,n)=>n.date.localeCompare(e.date));function _(e){return i.find(n=>n.slug===e)}function S(e,n="tr"){return n==="en"?c[e]:d[e]}function x(e,n){return n==="en"&&e.titleEn?e.titleEn:e.title}function C(e,n){return n==="en"&&e.excerptEn?e.excerptEn:e.excerpt}function P(e){const n=d[e]??c[e];if(!n)return 0;const a=n.trim().split(/\s+/).filter(Boolean).length;return Math.max(1,Math.ceil(a/200))}function A(e){const n=_(e);if(!n)return[];const a=t=>t.slug!==e&&t.tags.some(r=>n.tags.includes(r)),u=(t,r)=>{const s=t.tags.filter(o=>n.tags.includes(o)).length,l=r.tags.filter(o=>n.tags.includes(o)).length;return l!==s?l-s:r.date.localeCompare(t.date)};return z.filter(a).sort(u).slice(0,2)}function I(){const e=new Set;return i.forEach(n=>n.tags.forEach(a=>e.add(a))),[...e].sort()}export{P as a,_ as b,A as c,S as d,x as e,C as f,I as g,z as s,T as t};
