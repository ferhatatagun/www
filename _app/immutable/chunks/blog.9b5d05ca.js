const m=`# Yapay Zeka ile Yazılım Geliştirme: MCP, GPT ve Cursor

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
`,y=`# Model Context Protocol (MCP) Nedir?

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
`,c=`# Cursor IDE ve Prompt Mühendisliği

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
`,p=`# Cursor IDE and Prompt Engineering

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
`,z=`# Your prompt isn't better. You just remember it being better.

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
`,T=`# Build the sandbox before you write a single tool

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
`,S=`# How I debug Claude agents by replaying their trace

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
`,I=`# Tarayıcıda Claude'a streaming çağrı — SDK olmadan

Tarayıcıdan Claude'u çağırmak istedim. Anthropic SDK hayır dedi — bir bakıma.

Next.js uygulamasında \`import Anthropic from "@anthropic-ai/sdk"\` denediğimde bundler patladı. Hata \`node:fs/promises\`'i gösteriyordu — SDK'nın içinde, agent toolset modülünün diskten dosya okuyan bir parçası. Tarayıcıda çalışması mümkün değil. Üstelik opsiyonel kod da değil; SDK'nın ana client entry'si onu zincirleme çekiyor.

Yani ya tarayıcı-temiz bir entry point gelene kadar (belki bir gün) bekleyecektim, ya da Messages API'yi doğrudan konuşacaktım. Endpoint HTTP. Streaming formatı Server-Sent Events. Daha önce OpenAI için bunu yapmıştım — ne kadar zor olabilir ki?

Sonuç: kullanılabilir bir client için yaklaşık 150 satır TypeScript. Üstelik benim yaptığım tool için SDK'dan daha temiz çıktı. Ne gerektirdi, neden tarayıcı tarafında Claude API'yle çalışan herhangi bir şey için bunu öneriyorum — yazının özü bu.

**TL;DR**

- Resmi SDK Node-only modüller çekiyor, tarayıcı bundle'larını kırıyor.
- Doğrudan \`fetch\` çalışıyor — yalnızca \`anthropic-dangerous-direct-browser-access: true\` header'ını göndermen lazım.
- Streaming formatı düz SSE — event'leri \`\\n\\n\` ile böl, \`data:\` satırlarını parse et.
- Tek ufak çetrefil yer: \`tool_use\` block'larının \`input\`'u \`input_json_delta\` chunk'ları olarak geliyor; \`content_block_stop\`'ta birleştirip parse ediyorsun.
- El yapımı olunca bundle ufak, soyutlama az, protokolün ne yaptığı şeffaf.

## CORS kilidini açmak

Tarayıcı varsayılan olarak \`https://api.anthropic.com\`'a \`fetch()\` etmene izin vermiyor. Anthropic bunu açan bir flag gönderiyor: \`anthropic-dangerous-direct-browser-access: true\` header'ı eklediğinde CORS açılıyor. Header'ın adı bizzat bir uyarı — tarayıcıda yazılan key DevTools açabilen herkese görünür. Bring-your-own-key bir developer tool için sorun değil; production'da server-side key servis eden bir uygulama için ise kabul edilemez.

Header yerine konunca minimum bir istek şuna benziyor:

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

\`stream: true\` sana bir Server-Sent Events stream'i veriyor. Response body bir \`ReadableStream<Uint8Array>\` — byte chunk'larını text'e decode ediyorsun. Event'ler boş bir satırla ayrılıyor; her event birkaç satırdan oluşuyor (\`event: <type>\` ve \`data: <json>\`), anlamlı yük \`data:\`'da yaşıyor.

## Stream gerçekte nasıl görünüyor

Düz bir text response için SSE event sequence'i şu:

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

Her \`content_block_delta\` bir parçayı taşıyor. \`text\` alanlarını \`index\`'e göre birleştirdiğinde stream'lenen mesajı elde ediyorsun. Düz text için iş bu kadar.

Üç şey bunu biraz daha ilginç yapıyor:

- Mesaj başına birden fazla content block (text + tool_use, ya da birkaç tool_use).
- \`tool_use\` block'unun \`input\`'u partial JSON delta dizisi olarak geliyor, toplu değil.
- Kullanıcı Stop'a bastığında temiz iptal.

## Stream'i parse etmek

Parser ufak. Chunk'ları oku, bir buffer'da birik, \`\\n\\n\`'de böl (SSE event separator'ı), her event'i işle:

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

\`TextDecoder\`'a \`{ stream: true }\` vermek önemli — vermediğinde, çok byte'lı bir karakter chunk sınırına denk düştüğünde UTF-8 bozuluyor. Anthropic bol em-dash gönderiyor; bana sorma nereden bildiğimi.

\`handle(evt)\` \`evt.type\`'a göre switch yapıyor ve state'i güncelliyor. Sadece text için, UI'yi hareket ettiren tek event'ler \`content_block_delta\` (mevcut text block'una text ekle) ve \`message_delta\` (final usage). Full client'ta \`blocks: Block[]\` dizisini \`evt.index\`'e göre tutuyorum ve delta geldiğinde matching block'u mutate ediyorum.

## Tool use: kısmi-JSON delta'ları

İşin biraz çetrefilleştiği yer burası. Model bir tool çağırmaya karar verdiğinde, \`content_block_start\` geliyor — \`content_block: { type: "tool_use", id, name, input: {} }\`. \`input\` boş. Argümanlar \`content_block_delta\` event'lerinde şöyle bir şekilde geliyor:

\`\`\`
event: content_block_delta
data: { "type": "content_block_delta", "index": 1,
        "delta": { "type": "input_json_delta", "partial_json": "{\\"cit" } }

event: content_block_delta
data: { "type": "content_block_delta", "index": 1,
        "delta": { "type": "input_json_delta", "partial_json": "y\\":\\"Ist" } }
\`\`\`

Partial bir string'i \`JSON.parse\` edemezsin. Bu yüzden block index başına biriktirip ancak \`content_block_stop\`'ta parse ediyorum:

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

Tool-use için yapılan tüm uyum bu kadar. UI block tamamlandığında temiz bir callback alıyor, \`input\` parse edilmiş bir nesne olarak hazır.

Per-block birikimin güzel bir sonucu: text delta'ları canlı render edilebiliyor — typing animasyonu, caret blink, hepsi — ama \`tool_use\` kartları yalnızca input'u tam toplanınca beliriyor. Bu doğru bir his veriyor. Text sohbet; tool call komut.

## İptal

Bunu atlama. Kullanıcı Stop'a bastığında streaming isteğin arka planda finish'lenmemeli, gerçekten durmalı:

\`\`\`ts
const ac = new AbortController();
await fetch(ENDPOINT, { ..., signal: ac.signal });
// daha sonra, kullanıcı Stop'a bastığında:
ac.abort();
\`\`\`

\`reader.read()\` abort sonrası bir sonraki iteration'da exception fırlatıyor, \`signal.aborted\` true oluyor. Bunu yakala, gerçek bir hatadan ayır, temiz bir "stopped" state göster:

\`\`\`ts
try {
  // ... read loop ...
  cb.onDone({ usage, stopReason });
} catch (err) {
  if (signal?.aborted) {
    cb.onDone({ usage, stopReason: "aborted" });
    return;
  }
  cb.onError(errorMessage(err));
}
\`\`\`

Kullanıcı zaten gördüğü partial response'u + bir "stopped" rozetini alıyor, generic crash yerine.

## Anlamlı hatalar

API'den gelen bir 401 birkaç şey anlamına gelebilir; bir 429 da öyle. Tarayıcı sana drill etmen gereken bir \`Response\` veriyor. Body'yi JSON olarak parse et, \`error.message\`'a bak, status code'a göre fallback'le, kullanıcının üzerinde aksiyon alabileceği bir şey göster:

\`\`\`ts
async function readError(res: Response): Promise<string> {
  try {
    const body = await res.json();
    const msg = body?.error?.message ?? body?.message;
    if (msg) return \`\${res.status} · \${msg}\`;
  } catch {
    /* devam */
  }
  if (res.status === 401) return "401 · Geçersiz API key.";
  if (res.status === 429) return "429 · Rate limit — biraz bekle.";
  return \`\${res.status} · İstek başarısız.\`;
}
\`\`\`

Sıkıcı, ama "uygulama çöktü" ile "key'in geçersiz, düzelt" arasındaki fark, bir tool ile bir oyuncak arasındaki fark.

## Bu sana ne kazandırıyor

Tüm SSE client — request, parsing, tool use, abort, errors — yaklaşık 150 satır TypeScript. Benim caseimde, React + Tailwind v4 + Framer Motion + diğerleri dahil **gzipped ~100 KB** bir browser bundle'ı ile geliyor. SDK tek başına bundan büyük.

Sana verdiği bir başka şey: dürüstlük. Claude API'yle çalışmanın en ilginç kısmı streaming davranışı — caching açıldığında, token'lar birikirken, tool call'lar tek tek geldiğinde. SDK soyutlaması bunu sakladığı için önce SDK'yı debug etmen gerekiyor, sonra uygulamayı. Doğrudan \`fetch\` ile, client'ın *protokolün kendisi* haline geliyor; bir şey ters gittiğinde SSE event'leri akarken okuyorsun.

Bu yaklaşımı [**claudoscope**](https://claudoscope-labs.vercel.app/?demo=1)'da kullandım — Claude API çağrıları için tarayıcı-only bir x-ray. Token ekonomisi görselleştirmesinin tamamı (cache read'leri, cache write'lar, uncached input, output, cost delta) yukarıdaki stream event'lerinden hesaplanıyor. SDK yok, backend yok, server-side proxy yok.

\`\`\`
src/
  app/page.tsx              orchestration
  lib/anthropic.ts          bu yazıdaki ~150 satırlık client
  lib/pricing.ts            usage event'lerinden tier-aware cost
  components/XRayPanel.tsx  veriyi görünür kılan kısım
\`\`\`

Aynı client şimdi üç kardeş tool'a güç veriyor — [agent-replay](https://agentreplay.vercel.app), [prompt-lab](https://prompt-lab-promptly.vercel.app), [tool-lab](https://tool-lab-bice.vercel.app) — değişiklik olmadan. SSE parsing senin olduğunda, kompoze edilebiliyor.

SDK seninle didişiyor diye Claude API'yi bir tarayıcı tool'una koymayı erteliyorsan: bir öğleden sonralık iş, ve sonuç ufak, debug-edilebilir ve senin.

---

Dört tool, hepsi açık kaynak ve BYOK: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).

Burada anlatılan SSE client'ın kaynağı: [github.com/ferhatatagun/claudoscope/blob/main/src/lib/anthropic.ts](https://github.com/ferhatatagun/claudoscope/blob/main/src/lib/anthropic.ts).
`,B=`# Prompt caching, Claude'un en ucuz optimizasyonu. Kimse ölçmüyor.

Claude-tabanlı bir ürün shipliyorsan, son haftanın Anthropic API faturasını aç. Üçte ikisi muhtemelen, cache'ten onda bir fiyatına okuyabileceği context için para ödüyor. Çoğu bunu bilmiyor, çünkü dashboard söylemiyor ve SDK'lar da söylemiyor — response geldiğinde tek bakılan sayı \`output_tokens\`, o da çoğu zaman bir şey pahalı görünüyor diye.

Bilgi her response'da var. Anthropic \`usage\`'ın içine koyuyor:

\`\`\`json
"usage": {
  "input_tokens": 312,
  "cache_creation_input_tokens": 4180,
  "cache_read_input_tokens": 0,
  "output_tokens": 187
}
\`\`\`

Dört sayı. Cache'lenmiş prompt'un ilk çalışması, cache'i *yazmak* için input fiyatının 1.25 katı. TTL içindeki her sonraki çağrı *okumak* için input'un 0.1 katı. Bu iki satır arasındaki oran, ayda $3,000'lık bir fatura ile $300'lık bir fatura arasındaki farktır. Ve neredeyse kimse bunu grafiklemiyor.

**TL;DR**

- Her Claude response'u \`usage\` içinde cache-hit verisi taşıyor. Çoğu uygulama bunu hiçbir yere loglamıyor.
- Cache miss'ten sonraki ilk çağrı \`1.25× input\` extra; her hit ise \`0.1× input\`. Break-even: iki okumada.
- Cache TTL'i varsayılan 5 dakika. Altı dakikada bir tetiklenen bir istek pattern'i, write penalty'yi sonsuza dek ödüyor ama hiç fayda görmüyor.
- Çözüm kod değil, observability: cache hit oranını zamanla grafiklersen ve düştüğünde alert atarsan, faturadan önce bug'ı bulursun.
- 150 satırlık bir tarayıcı tool'u, Messages API'den stream'leyen herhangi bir projeye bunu yapmak için yetiyor.

## Dört sayı aslında ne anlama geliyor

Mesajlarının bir yerine \`cache_control: { type: "ephemeral" }\` koyup istek attığında, API son 5 dakika içinde aynı prefix'i görüp görmediğini kontrol ediyor. Üç sonuç olabilir:

1. **Cache miss, yeni içerik.** Tüm prompt normal işleniyor. \`input_tokens\` cache-dışı kısmı yansıtıyor; \`cache_creation_input_tokens\` bir sonraki sefer için cache'e yazılanı yansıtıyor.
2. **Cache hit.** Cache'lenmiş prefix fiyatın %10'una okunuyor. \`cache_read_input_tokens\` ne kadar okunduğunu, \`input_tokens\` yalnızca yeni suffix'i gösteriyor.
3. **TTL doldu.** Miss ile aynı şekil — creation surcharge'ı tekrar ödüyorsun.

Yani tek bir response, hangisinin olduğunu sana tam olarak söylüyor. "Aşağı yukarı" değil. Tam olarak. Her istek için. Ücretsiz.

Fiyat matematiği (Sonnet 4.5, Haziran 2026) için, 5,000 token'lık bir system prompt'un bir kere sorulup dört dakika sonra tekrar sorulması senaryosu:

| Senaryo                  | İlk çağrı              | İkinci çağrı           | Toplam       |
|--------------------------|------------------------|------------------------|--------------|
| Caching yok              | 5,000 × $3 = $0.015    | 5,000 × $3 = $0.015    | **$0.030**   |
| Cache, hit               | 5,000 × $3.75 = $0.019 | 5,000 × $0.30 = $0.0015| **$0.020**  |
| Cache, miss (TTL doldu)  | 5,000 × $3.75 = $0.019 | 5,000 × $3.75 = $0.019 | **$0.038**   |

Üçüncü satır failure mode. Caching'i açtın, write penalty'yi ödüyorsun, ama kimse cache'e hit etmiyor. Ölçüm olmadan, bu satır kodda ikinci satırla aynı görünüyor — aynı header'lar, aynı prompt yapısı, aynı response — ama caching'i hiç açmamış olmaktan **%90 daha pahalı**.

## Kötü bir cache hit oranı sessizce nasıl sızar

Ekiplerin shipleyip sonra sessizce kanadığını izlediğim üç pattern:

**1. Kullanıcı-başına system prompt.** Birisi "kişiselleştirilmiş hissetsin" diye kullanıcının adını veya org ID'sini system prompt'a interpolate etmiş. Her cache write artık kullanıcıya özgü ve o kullanıcı beş dakika içinde ikinci bir istek atmazsa, her çağrı creation surcharge ödüyor. Çözüm: kişiselleştirmeyi user mesajına taşıyıp system prompt'u statik tutmak — ama bu fixe ihtiyacın olduğunu, hit oranı grafiği sıfırda yataysa görüyorsun.

**2. Hafif sürüklenen prompt'lar.** Belki current timestamp ekliyorsun, belki bir "bugün ..." satırı, belki non-deterministic sırada gelen tool tanımlarını yeniden generate ediyorsun. Cache key tam byte dizisi; tek bir karakter sürüklenme ile tüm prefix'i invalidate ettin. Tool tanımlarını gönderim öncesi serialize eden araçlar özellikle eğlenceli bir kaynak — anahtarları karışık bir nesnede \`JSON.stringify\`, farklı byte üretiyor, hit yok.

**3. Trafiğine yanlış TTL.** Yaklaşık on dakikada bir mesaj alan bir chatbot, 5-dakikalık ephemeral cache ile yapısal olarak uyuşmuyor. Her conversation turn'ünde write penalty'yi ödüyorsun. Ya 1-saatlik cache'e geç (daha pahalı write, çok daha uzun ömür) ya da caching trafik şeklin için ekonomik değil diye kabul et — ama hangi kararı verirsen ver, veri lazım.

Üçü de code review'dan görünmez. Yalnızca usage telemetrisinde görünür.

## Minimum viable observability

Bunun için bir metrik stack'ine ihtiyacın yok. İstek başına dört alanı log'lamana ve grafiklemene ihtiyacın var. Çoğu ekibin sahip olduğu, faydasız versiyon:

\`\`\`ts
logger.info("claude response", { tokens: r.usage.output_tokens });
\`\`\`

Bir haftada kendini ödeyen versiyon:

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

Önemli olan alan \`hit_rate\`. Route'a, model'e, user-agent'a göre grupla — trafik boyutların ne ise. Cache kullanan herhangi bir endpoint'te sıfıra doğru trend olan bir şey para sızıntısıdır.

\`cost_estimate\` dashboard'u mühendis-dışı insanlarla yapılan konuşmalarda taşımayı sağlayan şey. Anthropic token tier'ına göre fiyat yayınlıyor; dönüştürme mekanik:

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

Bu kadar. Beş satır aritmetik ile uygulamanın yaptığı her Claude çağrısında istek başına dolar hesaplandı.

## Bunun için neden bir tool yaptım

[**claudoscope**](https://claudoscope-labs.vercel.app)'u, bu veriyi response stream'lerken canlı görmek istediğim için yaptım — üstünde iterate ettiğim uygulamayı her seferinde instrument etmeden. Use case "bir prompt değişikliği shipleyeceğim, cache davranışım az önce regress mi etti?" — yavaş ve pahalı yol bunu deploy edip bir saat sonra loglara bakmak; hızlı yol isteği 4 saniyede sana söyleyen bir tool'a yapıştırmak.

Tamamen tarayıcı-only client. Bring your own key, backend yok. SSE stream'inin her event'i parse edilir, \`usage\` nesnesi bir panel'e ayrılır:

\`\`\`
┌─ X-Ray ────────────────────────────────────────┐
│ input         312      $0.0009                 │
│ cache write 4,180      $0.0157  ◄─ ilk çalışma │
│ cache read      0      $0.0000                 │
│ output        187      $0.0028                 │
│ ─────────────                                  │
│ toplam                 $0.0194                 │
│                                                │
│ hit oranı: 0% (soğuk) — 5dk içinde tekrar çalış│
└────────────────────────────────────────────────┘
\`\`\`

TTL içinde "send"e ikinci kez bas, bar'lar yeniden düzenleniyor — cache write sıfıra düşüyor, cache read doluyor, cost sayısı %90 düşüyor. Hareket ederken görünce bariz olan, görünmeyince görünmez olan tipinden bir şey.

Gzipped yaklaşık 100KB ve kaynak [tek bir dosyada](https://github.com/ferhatatagun/claudoscope). Pricing tier mantığı ayrı bir dosyada. Üçüncü dosya yok.

## Bugün ne yapmanı tavsiye ediyorum

Artan efor sırasıyla operasyon adımları:

1. **Şu an (5 dakika):** claudoscope'u aç, en pahalı prompt'unu yapıştır, iki kere çalıştır. Farka bak. Hit oranı ikinci çağrıda ~%99 değilse, optimizasyon fırsatın yok, *cacheability bug'ın* var.
2. **Bu hafta (bir öğleden sonra):** Uygulamanın Claude çağrılarına yukarıdaki usage logging block'unu ekle. Ship et. Henüz dashboard kurmaya gerek yok — log'larını \`grep\`'le ve en kötü offender'ları on beş dakikada bulursun.
3. **Bu ay (bir sprint):** Dört \`usage\` alanını gerçek metrik pipeline'ına taşı (Datadog/Honeycomb/Grafana/her ne ise). Endpoint başına cache hit oranını grafikle. Tabanın altına düştüğünde alert at.
4. **İsteğe bağlı (eğer bensen):** Görseli inşa et, çünkü real-time hareket ederken görmek, takıldığı için yapışan şey.

Dördünden üçü kod değil, configuration. İlginç olan kısım implementation değil; neredeyse hiç kimsenin bunu yapmamış olması. Dashboard'larını kuran konuştuğum ekipler — istisnasız — ilk haftada bir cache misconfiguration buldular ve işin maliyetinden daha fazlasını tasarruf ettiler. Kurmayan ekipler, çoğu zaman cache creation surcharge'ı boşuna ödüyor.

Anthropic API caching'inin çalışıp çalışmadığını bilmen için ihtiyacın olan her şeyi sana veriyor. Tek soru bakıp bakmamak.

---

Bu görselleştirmeyi [**claudoscope**](https://claudoscope-labs.vercel.app)'a shipledim — bring-your-own-key, backend yok, tarayıcıda çalışıyor. Kaynak: [github.com/ferhatatagun/claudoscope](https://github.com/ferhatatagun/claudoscope).

Aynı SSE client ayrıca üç kardeş tool'a güç veriyor — [agent-replay](https://agentreplay.vercel.app), [prompt-lab](https://prompt-lab-promptly.vercel.app), [tool-lab](https://tool-lab-bice.vercel.app). Hepsi açık kaynak, hepsi BYOK: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).
`,x=`# Prompt'un daha iyi değil. Sadece daha iyi hatırlıyorsun.

Claude-tabanlı bir özellik shipleyen herkes kendiyle bir kere şu konuşmayı yapmıştır:

> "Tamam, eski prompt fazla uzundu, bu daha kompakt — *galiba* daha iyi cevap veriyor… ve daha hızlı sanki? Yayına alalım."

Yayına alıyorsun. Bir hafta sonra bir şey ters geliyor — belki edge case'lerde çıktılar daha tutarsız, belki fatura arttı, belki bir iş arkadaşın "AI artık anlamıyor" diyor. Önceki prompt'un tam halini hatırlamıyorsun. Baseline'ın yok. Geri alıyorsun. Ya da almıyorsun, sessiz bir regression ile bir ay yaşıyorsun.

Bunu kırk kere yapmışımdır. Çoğumuz yapmışızdır. Sebep prompt iteration'ın zor olması değil. Sebep *prompt iteration'ı değerlendirmenin* zor olması, ve bunun için tooling'imiz olmadığı için yerine *tat*'ı koyuyoruz — bu da işe yarıyor, ta ki yaramayana kadar.

**TL;DR**

- "Daha iyi hissettiriyor" veri değil. Sample size'ın bir sorgu, hafızan taze, prior'ın ise yatırım yapılmış maliyetin.
- Minimum işe yarayan karşılaştırma: aynı input'u iki prompt'tan paralel geçirmek; üç sayıyı yan yana koymak: çıktı (aynı şeyi mi söylüyorlar?), latency (her biri ne kadar sürdü?), cost (her biri ne harcadı?).
- Modeller de değişiyor — Sonnet 4.5 vs Haiku 4.5 üzerinde GPT-stili uzun system prompt'ları karşılaştırınca, eşdeğer puanlayacağın çıktılar için ~10× cost farkı görüyorsun.
- Paralel çalıştırmak adil yapıyor: aynı saat, aynı API state, aynı input. Chat penceresinde sıralı çalıştırmak yapmıyor.
- Tarayıcı-only bir tool bunu 4 saniyede yapıyor. Benchmark framework'üne ihtiyacın yok. Yan yana görmen gerekiyor.

## "Vibes" aslında ne kadara mal oluyor

Prompt tuning'in tuzağı şu: chat-stili UI sana yalnızca *tek* boyut gösteriyor — çıktı text'i. Okuyorsun, doğru görünüyor mu karar veriyorsun, devam ediyorsun. Üç şey saklanıyor:

**1. Latency.** Bu 3 saniye mi sürdü 11 saniye mi? Sıktıraktı, yarım hatırladın, ama kronometre tutmuyordun. Production'da bin istekte bu farkın anlamı "akıcı" ile "yavaş" arasındaki uçurum.

**2. Cost.** Güzel yapılandırılmış output üreten uzun system prompt 4,000 input token kullanıyor. Kısa olan 600. İkisi de ~800 output token üretiyor. Sonnet fiyatlandırmasında bu, bin çağrı başına $14 ile $4 farkı. Tek bir response'a bakarak görmüyorsun.

**3. Output drift.** "Daha temiz" çıktılar bazen modelin işe yarayan bir kısıtı kaybetmesi anlamına geliyor. Çıkardığın kibar preamble aslında bir şey yapıyormuş. Eklediğin yapılandırılmış format düzenli görünüyor ama uzun input'larda kesiliyor. Side-by-side bunu ortaya çıkarıyor; sıralı çıkarmıyor, çünkü önceki cevabın özünü hatırlıyorsun, detayını değil.

A/B testing'in tüm amacı bu üçünü aynı görüş alanına, aynı input üzerinde, aynı zamanda yükseltmek. O kadar. Tüm fikir bu. Çoğumuzun yapmamasının nedeni tool'umuzun olmaması — ve iki tab arasında geçmek, iki kez send'e basmak, çıktıları bir diff viewer'a kopyalamak, dashboard'tan cost'a bakmak'tan oluşan friction, omuzlarımızı silkip yayına almamıza yetiyor.

## Aynı input, iki prompt, paralel

Mekanizma yavan:

\`\`\`ts
const [outA, outB] = await Promise.all([
  runClaude({ system: promptA, messages, model }),
  runClaude({ system: promptB, messages, model }),
]);
\`\`\`

İşin özü bu. Aynı \`messages\`'a karşı paralel iki istek. İşin püf noktası: iki stream eş zamanlı oluyor — aynı network koşulları, aynı API yükü, aynı saat-time cache sıcaklığı. Sıralı A→B adil bir karşılaştırma değil; ilk çağrıda API yoğunsa ve ikinci çağrı cache'lendiyse, sinyal değil hava ölçüyorsun.

Bu iki çıktıyla ne yaptığın işin ilginçleştiği yer. Sıkıcı versiyon: ikisini de logla, gözle bak, birini seç. Asıl işe yarayan versiyon: side-by-side render, her birinin kendi latency saati, kendi token sayısı ve cost dolar değeri, ve istediğinde nereye ayrıldıklarını gösteren bir diff highlight'ı.

Fark ettiğim şu: zamanın %80'inde iki prompt da *anlamlı ölçüde eşdeğer* çıktı üretiyor. Birini tercih etme nedenin saf olarak cost veya latency — semantik bir iyileşme yok, sadece aynı cevabın 4× daha ucuz versiyonu var. Kalan %20'de çıktılar gerçekten anlamlı şekilde ayrışıyor — orada göz lazım, ama en azından nereye bakacağını biliyorsun.

## "Daha iyi" sayılarda nasıl görünür

Geçen haftadan somut bir örnek. Bir code review tool'u için iki versiyon system prompt'um vardı:

**Versiyon A** — 1,800 token, issue tiplerinin tam taksonomisi, her biri için örnekler, açık JSON şema:

\`\`\`
You are a senior staff engineer reviewing a pull request. For each
issue you find, classify it under one of:
- correctness (the code is wrong)
- security (the code is exploitable)
- performance (the code is slow)
- maintainability (the code is hard to read)
...
\`\`\`

**Versiyon B** — 280 token, taksonomi yok, şema bir örnekle ima ediliyor:

\`\`\`
Review this code. For each problem, return JSON like:
[{"severity": "high"|"medium"|"low", "line": 42, "issue": "..."}]
Don't comment on style; focus on bugs and security.
\`\`\`

Aynı input (600 satırlık Python dosyası). İkisi de Sonnet 4.5'a gitti. Side-by-side çalıştırma:

|                   | Versiyon A         | Versiyon B         |
|-------------------|--------------------|--------------------|
| Input token       | 2,640              | 1,120              |
| Output token      | 820                | 740                |
| Latency           | 5.3s               | 3.1s               |
| Cost              | $0.0202            | $0.0145            |
| Bulunan issue     | 7                  | 6                  |

Diff'e bakınca: ikisi de aynı 5 kritik issue'yu işaretledi. Versiyon A ayrıca bir \`# TODO\`'yu maintainability issue'su olarak işaretledi ve karmaşık bir fonksiyonu iki refactor'a böldü. Versiyon B daha sıkıydı — daha az ufak şey yakaladı ama yakaladığı her şey aksiyon-edilebilirdi.

B'yi shipledim. Soft anlamda "daha iyi" olduğu için değil; bir insanın önemli işte eşdeğer kabul edeceği çıktılar için %28 daha ucuz ve %41 daha hızlıydı. *İşte* bir A/B framework'ünün sana chat UI'nin vermediği şey: "doğru hissettiriyor" olmayan bir karar zemini.

Eğer A'yı silip B'yi sıralı çalıştırsaydım, karşılaştırmayı kaybetmiş olurdum ve B'nin aslında olduğundan çok daha iyi veya çok daha kötü olduğuna kendimi ikna ederdim.

## Cross-model açısı

Aynı kurulum daha kurnaz bir şeyi de yüzeye çıkarıyor: **doğru model de bir prompt seçimi**.

Aynı prompt, iki model — Sonnet 4.5 vs Haiku 4.5 — aynı input üzerinde:

|                       | Sonnet 4.5  | Haiku 4.5  |
|-----------------------|-------------|------------|
| Latency               | 4.1s        | 0.9s       |
| Cost (input+output)   | $0.011      | $0.0008    |
| Output kalitesi       | 9/10        | 8/10       |

Doğru tür görev için bu ~13× cost azalması, çoğu kullanıcının UI'de fark etmeyeceği bir kalite düşüşü ile. Yanlış tür görev — kompleks çok-adımlı reasoning gerektiren herhangi bir şey — Haiku patlayacak ve Sonnet patlamayacak, ve karşılaştırma seni bundan da koruyor. Hangi tür görevinin olduğunu *tahmin etmek* zorunda değilsin; beş gerçek input'ta beş dakikada ölçebilirsin.

## prompt-lab bunu nasıl yapıyor

[**prompt-lab**](https://prompt-lab-promptly.vercel.app)'ı yaptım çünkü kendi işimde prompt A/B testing'in friction'ı, adımı atlayıp vibe ile shipleyecek kadar yüksekti. Tool'un tüm işi bu friction'ı kaldırmak:

- İki prompt paneli. Soldaki prompt A, sağdaki prompt B.
- Tek input paneli. User mesajını bir kere yaz.
- Run'a bas. İki response da kendi paneline eş zamanlı stream'leniyor.
- Her panelin altında küçük bir scoreboard: input token, output token, latency, cost.
- En altta bir verdict satırı — "A: $0.0202 / 5.3s · B: $0.0145 / 3.1s · B %28 daha ucuz, %41 daha hızlı."

Tüm UI bu. Tarayıcı tool'u, BYOK, backend yok. İlgili mantığı yaklaşık 8KB ve [önceki yazıdaki](https://ferhatatagun.com/blog/tarayicida-claude-streaming-sdk-siz) streaming client'ı kullanıyor.

Aynı-prompt-farklı-model ya da farklı-prompt-farklı-model de yapabilirsin. Arena hangisini test ettiğine bakmıyor — iki sütunu ayarlıyorsun ve run'a basıyorsun.

## Bu hafta ne yapmanı tavsiye ediyorum

Üç adım, artan efor sırası:

1. **Bugün (5 dakika):** prompt-lab'i aç. Ekibin şu an shiplediği prompt ne ise al. Daha kısa bir versiyonunu yap. Üç gerçek input'ta ikisini de çalıştır. Kısa olan, önem verdiğin input'larda semantik kayıp olmadan cost+latency'de kazanırsa, haftanın ödemesini çıkardın.

2. **Bu sprint (bir öğleden sonra):** Küçük bir eval harness'i kur. Gerçek trafiğini temsil eden 10 input seç. Her prompt değişikliğini merge öncesi bunlardan geçir. Süslü olmasına gerek yok — bir JSON file input'lar + diff'leyen bir script en kötü regression'ları yakalar.

3. **Bu çeyrek (bir alışkanlık):** A/B karşılaştırmasını prompt review process'inizin bir parçası yapın. Bir prompt'u değiştiren her PR, aynı 10 input için çalıştırma çıktılarını cost ve latency sayıları ile birlikte description'a koymalı. Code review'da test sonuçlarını gösterir gibi.

LLM uygulamalarının ekonomisi giderek prompt tasarımı ve model seçimi etrafında dönüyor. Rekabet eden ekipler ikisini de ölçen ekipler olacak. Etmeyenler vibe-tabanlı prompt değişiklikleri shipleyip neden faturanın sürünerek arttığını ve kullanıcıların "daha kötü hissettiriyor" diye şikayet ettiğini merak etmeye devam edecek.

Gelecekteki kendinden daha akıllı olmana gerek yok. Sadece geriye bakıp neyin gerçekten değiştiğini bilmeyi mümkün kılman yeterli.

---

Bu [**prompt-lab**](https://prompt-lab-promptly.vercel.app)'a shipledim — iki prompt yan yana, BYOK, backend yok, tarayıcıda çalışıyor. Kaynak: [github.com/ferhatatagun/prompt-lab](https://github.com/ferhatatagun/prompt-lab).

Aynı SSE client ayrıca üç kardeş tool'a güç veriyor — [claudoscope](https://claudoscope-labs.vercel.app), [agent-replay](https://agentreplay.vercel.app), [tool-lab](https://tool-lab-bice.vercel.app). Hepsi açık kaynak, hepsi BYOK: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).
`,A=`# Tek bir tool yazmadan önce sandbox'ı kur

Tool kullanan ilk Claude agent'ını shiplediğinde bunu bariz yolla yapacaksın: schema'yı tasarla, gerçek tool fonksiyonunu yaz, API'yi vur, \`tool_use\` block'unu parse et, fonksiyonu çalıştır, sonucu geri besle, loop. Çalışıyor. Bir de temel bir sıralama bug'ı var:

Doğru tool'lar olduğunu bilmeden tool'ları yazmışsın.

Bir database query fonksiyonu, iki API çağrısı ve dosya sistemini vuran bir şey ayağa kaldırdığında, belki bir gün gitmiş olur. Agent'ı çalıştırıyorsun. Var olmayan bir tool çağırıyor. Senin şemana uymayan bir argüman şekli halüsine ediyor. İkisi de işe yarayacakken yanlış tool'u seçiyor. *Şimdi* şemayı yeniden tasarlayacaksın, ve yazdığın dört gerçek tool implementation'ı çöpe gidiyor ya da yeniden yazılıyor.

İşi daha da kötü yapan şey: failure mode'u bir "agent kalitesi" problemi gibi görünüyor, ama aslında bir "erken implementation" problemi. Model ne istediğini biliyordu; etrafına yanlış scaffolding'i sen kurmuşsun.

**TL;DR**

- Tool implementation'ları agent geliştirmenin en yavaş kısmı; tool *tasarımı* yanlış yapmanın en hızlı yolu.
- İkisini ayır: tool schema'larını yaz, agent loop'u mock'lanmış response'larla çalıştır, modelin tool'ları nasıl seçtiğini ve kullandığını gör — sonra gerçek implementation'ları yalnızca hayatta kalan tool'lar için yaz.
- Doğru zihinsel model: "her tool'un rolünü el ile sen oynuyorsun" — agent için yavaş, senin için hızlı, kötü tasarımlar için acımasız.
- Beş-tool'lu bir agent için bu, aksi takdirde bir günlük olan bir işin on beş dakikalık egzersizi, ve tasarım hatalarını codebase'ine dokunmadan önce yakalıyor.
- Tüm iş, backend olmayan bir tarayıcı tool'una sığıyor.

## "Erken implementation" gerçekte neye benziyor

Üzerinde çalıştığım gerçek bir örnek. Bir code review agent'ı yapıyordum. İlk içgüdüm dört tool'du:

\`\`\`ts
const tools = [
  { name: "read_file", description: "read a file from the repo", ... },
  { name: "search_code", description: "grep across the repo", ... },
  { name: "get_diff", description: "show the diff for this PR", ... },
  { name: "post_comment", description: "leave a review comment", ... },
];
\`\`\`

Dördünü de implement ettim. Gerçek dosya sistemi erişimi. Gerçek git invocation. Gerçek GitHub API call. Toplam belki dört saat. Sonra gerçek bir PR üzerinde agent'ı çalıştırdım.

Olan şu: agent önce \`get_diff\`'i çağırdı (iyi), sonra diff'teki her identifier için \`search_code\` çağırdı (felaket — diff 200 satırdı, 50 unique identifier, rate limit'im tükendi). \`read_file\`'ı hiç çağırmadı çünkü diff zaten context'i içeriyordu. \`post_comment\`'ı sonunda bir kez, inline yorum yerine 4,000 kelimelik bir makale ile çağırdı.

Dört "gerçek" tool'umun üçü ya yanlış kullanıldı ya da hiç kullanılmadı. Agent tasarımı yanlıştı, implementation'lar değil. Loop'u mock response'larla önce çalıştırsaydım şunları görecektim:

1. 50 kez \`search_code\` çağırdığını gördüm → tool'u \`search_code(query, limit=5)\` olarak böldüm, açık budget'la.
2. \`read_file\`'ı hiç kullanmadığını gördüm → sildim, bir saat tasarruf ettim.
3. \`post_comment\`'ın \`post_essay\` gibi kullanıldığını gördüm → \`post_inline_comment(line, body)\` ve \`post_summary(body)\` olarak böldüm.

Bu müdahale tool'lar mock'landığında on beş dakika sürüyor. Gerçek olduklarında bir gün sürüyor.

## Rol-yapma pattern'i

Hile şaşırtıcı derecede basit: tool schema'larını yaz, Claude'a gerçek bir user mesajı gönder, model bir \`tool_use\` block ürettiğinde *sen* sonucu el ile yazıp geri besle. Loop uçtan uca çalışıyor, ama sen her tool'u oynuyorsun.

Kod tarafında, bu herkesin yazdığı aynı agent loop:

\`\`\`ts
while (true) {
  const res = await callClaude({ messages, tools });
  if (res.stop_reason === "end_turn") break;
  
  const toolUses = res.content.filter(b => b.type === "tool_use");
  const toolResults = toolUses.map(t => ({
    type: "tool_result",
    tool_use_id: t.id,
    content: PROMPT_USER_FOR_RESULT(t.name, t.input),  // <-- bunu sen dolduruyorsun
  }));
  
  messages.push({ role: "assistant", content: res.content });
  messages.push({ role: "user", content: toolResults });
}
\`\`\`

Bunun "gerçek" bir agent loop'tan tek farkı \`PROMPT_USER_FOR_RESULT\` çağrısı — bir fonksiyon çalıştırmak yerine, modelin neyi hangi argümanlarla çağırdığını sana gösteriyor, ve cevabı yazmanı bekliyor.

Ortaya çıkan şey şaşırtıcı bilgi yoğunluğunda:

- **Model beklediğim tool'u mu seçti?** Beklemediğin bir yol seçtiyse, şeman söylediğinden farklı bir şey sinyalliyor.
- **Input şekli JSON schema'ma uydu mu?** Model şemaya uyum sağlamak için zorlanıyorsa, şema ya çok katı ya çok gevşek.
- **Kaç tool zincirledi?** Bir soruyu cevaplamak için 12-adımlı tool zinciri, toolset'i yanlış böldüğüne işaret.
- **Tool kullanmadan önce takip soruları sordu mu?** İyi — model disambiguate etmeye çalışıyor demek. Sormuyorsa, prompt'un istemiyor demek.

Tüm bunları beş dakikalık bir konuşmada görüyorsun, henüz tek satır gerçek implementation yazmadan.

## Rol-yapma'yı ne zaman bırakırsın

Sandbox kalıcı bir state değil. Bir faz. Üç soruya cevap verene kadar çalıştırıyorsun:

1. **Bunlar doğru tool'lar mı?** — Bazıları siliniyor, bazıları bölünüyor, bazıları birleşiyor. Genellikle başlangıç toolset'inin %30-50'si gerçek bir prompt'la temasa hayatta kalmıyor.
2. **Şemalar yeterince sıkı mı?** — Modelin garip argüman değerleri seçtiğini görürsün; şemayı kısıtlarsın (string yerine enum, optional yerine required).
3. **Agent loop bitiyor mu?** — Bazı agent'lar belirsiz durdurma kriterleri varsa sonsuza dek tool çağırmaya devam ediyor. Mock-response loop'u bunu hemen yüzeye çıkarıyor çünkü *sen* response yazmakta sıkışıp kalan kişisin.

Bu üçü birkaç gerçek prompt üzerinde stabil olduğunda, gerçek implementation'ları yazıyorsun. Implementation işi şimdi de-risk edildi: hangi tool'ları gerçekten kuracağını biliyorsun, ve şemalar yerleşmiş.

Tasarruf ettiğin şey implementation süresi değil — rework. Bir tool'u sıfırdan yazmak hızlı. Şeması yanlış olduğu için bir tool'u yeniden yazmak, sonra yeni şema farklı framing istediği için prompt'u güncellemek, sonra her regression input'unu yeniden çalıştırmak — günleri yiyen bu.

## Bu tool-lab'de nasıl görünüyor

[**tool-lab**](https://tool-lab-bice.vercel.app), her seferinde bir proje kurmadan bunu yapmak için inşa ettiğim şey. Üç panel:

\`\`\`
┌─ Tools (JSON editor) ─────────┬─ Conversation ────────────────────┐
│ [                             │  user: bu PR'ı incele             │
│   { "name": "read_file", ... },│  assistant: Diff'i alacağım.      │
│   { "name": "search_code"...},│    → tool_use: get_diff()         │
│   { "name": "get_diff", ... },│    ← tool_result: <SEN YAZ>       │
│   { "name": "post_comment"...}│  assistant: ...                   │
│ ]                             │                                    │
└───────────────────────────────┴───────────────────────────────────┘
\`\`\`

Tool schema'larını sola yapıştırıyorsun. User mesajını yazıyorsun. Model response'unu sağa stream'liyor. Bir \`tool_use\` block geldiğinde, conversation result için bir text field ile duruyor. Tool'un dönecek olduğu her ne ise yazıyorsun — JSON, string, error, ne olursa. Continue'ya basıyorsun. Loop senin sahte sonucunla yeniden çalışıyor.

Yaklaşık 12KB ilgili mantık, [burada](https://ferhatatagun.com/blog/tarayicida-claude-streaming-sdk-siz) yazdığım paylaşılan SSE client'ın üstünde. BYOK, backend yok, tool schema'ların ve konuşmaların yalnızca \`localStorage\`'da yaşıyor. Kendi tool'unu yazmadan loop'u görebilmen için \`?demo=1\`'de seed'lenmiş bir demo konuşması var.

Fark ettiğim şey: herhangi bir yeni agent için tool-lab session'ı on-yirmi dakika sürüyor. Çıkan agent tasarımı, sezgiden yazdığımdan tutarlı şekilde %30-50 daha küçük. Daha az, daha odaklı tool'lara sahip daha küçük agent'lar, production'da bir şey ters gittiğinde reason etmek için de dramatik şekilde daha kolay — sandbox fazını yapmanın diğer payı bu.

## Bu hafta ne yapmanı tavsiye ediyorum

Üç eskalasyon hamlesi:

1. **Bugün (10 dakika):** Zaten üzerinde çalıştığın bir agent al. Tool schema'larını tool-lab'e yapıştır, gerçek bir user mesajı gönder, ne olacağını gör. Agent yanlış tool'ları seçiyor ya da doğruları sürpriz şekillerde kullanıyorsa, yeni bir şey öğrendin.

2. **Bu sprint (bir öğleden sonra):** Ekibinizdeki yeni agent'lar için "implementation'dan önce sandbox" varsayılan olsun. Önce tool schema'larını ayağa kaldır, beş temsili prompt rol-yap, sonra yalnızca hayatta kalan tool'lar için implementation yaz. Sayıyı takip et: kaç başlangıç tool'u hayatta kaldı.

3. **Bu çeyrek (bir alışkanlık):** Production'da bir agent'la bir şey ters gittiğinde — yanlış tool seçildi, garip argüman şekli, sonsuz loop — implementation'ı debug etmeden önce trace'i sandbox'a düşür. Bug genellikle tasarımda, kodda değil.

Tool implementation'ları agent geliştirmenin zor kısmı değil. *Tool tasarımı*. Güvenilir agent'lar shipleyen ekipleri "çoğunlukla çalışan" agent'lar shipleyen ekiplerden ayıran şey, tool fonksiyonlarının kalitesi değil; fonksiyonu yazmadan önce öldürdükleri kötü tool tasarımlarının sayısı.

Bunun için bir framework'e ihtiyacın yok. Bir satıcıya ihtiyacın yok. On beş dakikaya ve her tool'un rolünü el ile oynama isteğine ihtiyacın var, ta ki hangilerinin gerçek olmayı hak ettiğini bilene kadar.

---

Bu [**tool-lab**](https://tool-lab-bice.vercel.app)'a shipledim — tool tanımla, response mock'la, agent loop'u izle. BYOK, backend yok, tarayıcıda çalışıyor. Kaynak: [github.com/ferhatatagun/tool-lab](https://github.com/ferhatatagun/tool-lab).

Aynı SSE client ayrıca üç kardeş tool'a güç veriyor — [claudoscope](https://claudoscope-labs.vercel.app), [agent-replay](https://agentreplay.vercel.app), [prompt-lab](https://prompt-lab-promptly.vercel.app). Hepsi açık kaynak, hepsi BYOK: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).
`,_=`# Claude agent'larını trace replay ile debug ediyorum

Agent'ın production'da garip bir şey yaptı. Bir kullanıcı rapor etti, başarısız çalışmayı log'larında buldun, ve şimdi 400 mesajlık bir JSON dosyasına bakıyorsun, yarısı ufak veritabanları büyüklüğünde \`tool_result\` block'ları, ve bir yerde agent'ın yanlış şeyi yapmaya karar verdiği an var.

Agent'ı yeniden çalıştıramazsın: API state'i ilerledi, tool şimdi farklı davranıyor, prompt o zamandan beri üç kere güncellendi. Yalnızca trace'in var.

Çoğumuzun agent trace'lerini okuma şekli: JSON'u editörde aç, ctrl+F ile şüphelendiğin tool adını ara, escape edilmiş string duvarlarında scroll yap, sırayı zihinsel olarak yeniden kur. Otuz dakika sürüyor, sonunda üç cevaptan birine sahip oluyorsun — "evet ne olduğunu görüyorum," "muhtemelen ne olduğunu görüyorum," ya da "hiçbir fikrim yok." Yaklaşık üçte birinde üçüncüsü oluyor, ve asıl problemi düzeltip düzeltmeyen bir band-aid shipliyorsun.

Kimsenin söylemediği şey: bu zor bir problem değil. JSON tüm bilgiyi içeriyor. Mesele tamamen *sunumsal* — okunması neredeyse imkansız.

**TL;DR**

- Agent trace'leri bir karar dizisi ama wall of nested JSON olarak depolanıyor. Sinyal orada; problem format.
- Doğru primitive bir JSON viewer değil — bir timeline. Her düşünce, tool çağrısı, tool sonucu ve final cevap kendi ayrık, renk-kodlu adımı oluyor.
- Trace'i adım adım scrub edebildiğinde, başarısızlık noktası dakikalar yerine saniyelerde görsel olarak bariz oluyor.
- Bu post-hoc, etkileşimli değil. Agent'ı yeniden çalıştırman ya da API'yi vurman gerekmiyor — replay yalnızca raw trace üzerinde çalışıyor.
- Tarayıcı-only bir tool bunu 4 saniyede yapıyor. Backend yok, key yok, sadece JSON'u yapıştır.

## Agent trace gerçekte ne içeriyor

Bir Claude agent çalışmasını kaydettiğinde, genellikle \`messages\` array'ini persist ediyorsun — modelin response'ları ve geri beslediğin tool result'lar dahil tüm konuşma. Altı adımlı bir agent çalışması yaklaşık şöyle görünüyor:

\`\`\`jsonc
[
  { "role": "user", "content": "IST'tan LAX'a önümüzdeki Salı en ucuz uçuşu bul" },
  { "role": "assistant", "content": [
    { "type": "text", "text": "Uçuşları aratıp fiyatlara bakacağım." },
    { "type": "tool_use", "id": "tu_01", "name": "search_flights", "input": {...} }
  ]},
  { "role": "user", "content": [
    { "type": "tool_result", "tool_use_id": "tu_01", "content": "[<2KB JSON>]" }
  ]},
  { "role": "assistant", "content": [
    { "type": "text", "text": "Üçünü inceliyorum..." },
    { "type": "tool_use", "id": "tu_02", "name": "get_price", "input": {...} }
  ]},
  // ...dört adım daha...
]
\`\`\`

Agent davranışının ilginç her anı orada: hangi tool'u seçti, hangi argümanları kurdu, kendi muhakemesi hakkında ne söyledi, sonucu nasıl yorumladı. Yapı temelde bir **ayrık olay dizisi**, bir "döküman" değil.

Ama sen bunu bir döküman olarak okuyorsun, çünkü bir editor sana onu öyle gösteriyor. Beyin "alternatif role: assistant / role: user tool_result content block'larıyla" → "adım 3, get_price'a X argümanıyla yapılan bir tool çağrısıydı, Y döndü, ki agent bunu Z olarak yorumladı" dönüşümünü yapmak zorunda.

Bu dönüşüm debug süreni öldüren şey. 12-adımlı bir trace için manuel yapmak dakikalar alıyor. Kompleks bir görev üzerinde 60-adımlı bir agent için yapmak saatler alıyor.

## Doğru primitive: karar timeline'ı

Yeniden çerçeveleme: trace'i JSON olarak okumayı bırak, kararların dizisi olarak izlemeye başla. Her adım şunlardan biri:

- 💭 **Düşünce** — model text yazdı (response'unun tool çağrısı olmayan kısmı)
- 🔧 **Tool çağrısı** — model belirli argümanlarla bir tool çağırdı
- 📥 **Tool sonucu** — geri gelen şey, bir sonraki turn'e besleniyor
- ✅ **Final cevap** — modelin \`end_turn\`'ü, artık tool yok

Bu dört event tipini renk-kodla. Sıralı bir biçimde diz, her event için bir kart. Şimdi scrub edebileceğin, adım adım gezebileceğin, geri oynatabileceğin bir timeline'ın var. Kart başına bilgi yoğunluğu, tüm trace'i bir bakışta okuyabilmen için yeterince yüksek, ve yalnızca şüpheli görünen kartlara zoom yapıyorsun.

Yapısal içgörü: agent debugging, source code okumaya değil breakpoint'lerle bir script debug etmeye daha yakın. Adım atmak istiyorsun, scan etmek değil. JSON sana adım vermiyor; timeline başka bir şey vermiyor.

## Bu view'da bariz olan bug'lar

Bir trace'i timeline'a düşürdüğümde tekrar tekrar gördüğüm üç failure mode:

**1. Yanlış tool, sessizce seçildi.** Model \`search_recent\`'i çağırması gerekirken \`search_archive\`'ı çağırdı. JSON'da bu 200 satırın bir tanesi, gözünün önünden uçuyor. Timeline'da beklemediğin bir tool adı olan bir kart, ve tıklıyorsun.

**2. Halüsine edilmiş argümanlar.** Model doğru tool'u ama şemaya uymayan bir argüman şekliyle çağırdı — genellikle şema belirsiz olduğu için. JSON'da \`{"q": "foo", "limit": "10"}\`'u görüyorsun ve \`limit\`'in integer olması gerektiğini fark etmiyorsun. Timeline'da hemen sonraki tool sonuç kartı bir 400 hatası gösteriyor ve bir adım geri izini sürüyorsun.

**3. Sonsuz loop habercisi.** Bazı agent'lar aynı tool'u biraz farklı input'larla çağırmaya devam edip hiç sonuca varmayan bir pattern'e kapılıyor. JSON'da bir wall of near-identical block'lar. Timeline'da görsel bir ritim — aynı tool adıyla beş mor kart üst üste — periferik görüşünde scroll ettiğin anda görüyorsun.

Üç durumda da bug ince değil. Yalnızca JSON'da gizlendiğinde *ince görünüyor*.

## Replay'ın yeniden-çalıştırmadan farkı

Bir agent başarısız olduğunda cazibe, print statement'larla yeniden çalıştırmak, ne olacağını görmek, iterate etmek. Yapma. Üç sebep:

**API call'lara mal oluyor.** 15 tool çağıran başarısız bir agent'ı yeniden çalıştırmak sana 15× input token maliyetinde. Cache ile belki daha az; her halükarda fatura gerçek. Replay bedava.

**API state'i ilerledi.** Bugün çağırdığın tool, orijinal çalıştırmada dönen veriden farklı veri dönebilir. Artık orijinal başarısızlığı debug etmiyorsun; *şu an ne oluyorsa* onu debug ediyorsun, ki tamamen farklı bir bug olabilir.

**Model stokastik.** Sıcaklık 0'da bile retry'lar farklı output üretebilir. Bir agent'ı yeniden çalıştırıp *farklı* bir failure mode almak, soruşturulacak iki bug'ın olduğu anlamına geliyor. Trace gerçekte ne olduğunun kanonik artefakt'ı.

Replay üçünü de devre dışı bırakıyor. Donmuş bir artefakt'ı, deterministik şekilde, istediğin hızda inceliyorsun. Bug sen ona bakarken hareket etmiyor.

## agent-replay'de nasıl görünüyor

[**agent-replay**](https://agentreplay.vercel.app), bunun için yaptığım tool. Trace'ini sol taraftaki bir JSON paneline yapıştırıyorsun. Sağ panel sinematik bir timeline olarak render ediyor:

- Her event bir icon ve renkle bir kart
- Trace'i 1× hızda (saniyede bir event) çalıştırmak için space'e bas, ya da manuel scrub et
- Tam içeriği görmek için herhangi bir karta tıkla — düşünce text'i, tool çağrısının input JSON'u, raw tool result, hepsi expanded
- Event tipine göre filtrele — "yalnızca tool call'ları göster" ya da "yalnızca assistant düşüncelerini göster" — odaklanmak istediğinde
- Her şey tarayıcında; key gerekmiyor, backend yok, trace'in tab'ı asla terk etmiyor

12 adımlı bir agent'ın nasıl göründüğünü kendi veriyi kopyalamadan görmek istersen \`?demo=1\`'de seed'lenmiş bir örnek trace var.

Sürekli fark ettiğim şey: debug ettiğim an artık "JSON'un neresinde agent batırdı" değil. "Hangi kart yanlış görünüyor, ve sonraki kart bunun sonucunu ne olarak gösteriyor" oldu. 30 dakikalık bir araştırma 30 saniyelik bir araştırma haline geldi. Tool'un akıllı bir şey yapması yüzünden değil — sadece aynı veriyi doğru şekilde gösterdiği için.

## Bu hafta ne yapmanı tavsiye ediyorum

Üç eskalasyon hamlesi:

1. **Bugün (5 dakika):** Trace'ini elinde tuttuğun son garip agent çalışmasını bul. agent-replay'e yapıştır. Failure noktasını bulmanın ne kadar sürdüğüne bak. Olağan JSON-scroll yaklaşımından hızlıysa, debugging workflow'unu az önce değiştirdin.

2. **Bu hafta (bir öğleden sonra):** Agent'ına bir trace-export endpoint'i ekle. Bitmiş ya da başarısız her agent çalışması \`messages\` array'ini S3'e ya da bir database satırına dump ediyor. Trace'e debug etmeden *önce* ihtiyacın oluyor, sonra değil.

3. **Bu çeyrek (bir alışkanlık):** Bir kullanıcı "agent garip bir şey yaptı" rapor ettiğinde, ilk hareketin trace'i çekip timeline view'ında açmak, kullanıcının raporunu dikkatlice okumadan *önce*. Çoğu zaman bug raporunu bitirmeden ne olduğunu biliyor olacaksın.

Agent debugging, ortaya çıkan bir mühendislik disiplini olarak sunuluyor. Değil — non-AI sistemler için defalarca çözdüğümüz bir tooling problemi. Yalnızca bu için tool'ları henüz yapmadık. Trace doğru şekle geldiğinde, bug'lar bariz. İş veriyi yorumlamak değil, sergilemek.

---

Bu [**agent-replay**](https://agentreplay.vercel.app)'e shipledim — trace yapıştır, timeline scrub et. Key yok, backend yok, tarayıcıda çalışıyor. Kaynak: [github.com/ferhatatagun/agent-replay](https://github.com/ferhatatagun/agent-replay).

Aynı SSE client (streaming event içeren trace'ler için) ayrıca üç kardeş tool'a güç veriyor — [claudoscope](https://claudoscope-labs.vercel.app), [prompt-lab](https://prompt-lab-promptly.vercel.app), [tool-lab](https://tool-lab-bice.vercel.app). Hepsi açık kaynak, hepsi BYOK: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).
`,P=`# What I learned shipping four open-source Claude dev-tools in two weekends

About a month ago I tried to import the Anthropic SDK into a Next.js project and the bundler crashed. The fix was straightforward — talk to the Messages API directly, ~150 lines of TypeScript replacing the SDK — but the side-effect was that I now had a hand-rolled SSE client lying around, with all of Claude's streaming behaviour visible to me at the protocol level for the first time.

That client became the seed of four small open-source tools, shipped over two weekends. Each one points a different microscope at the same protocol:

- [**claudoscope**](https://claudoscope-labs.vercel.app) — live x-ray of token economics: input, cache write, cache read, output, all visible as the response streams.
- [**agent-replay**](https://agentreplay.vercel.app) — paste a Claude agent trace, replay it step-by-step on a cinematic timeline.
- [**prompt-lab**](https://prompt-lab-promptly.vercel.app) — run two prompts (or models) on the same input, side by side, with output/cost/latency compared.
- [**tool-lab**](https://tool-lab-bice.vercel.app) — define Claude tools in a JSON editor, type the mock responses by hand, watch the agent loop play out.

All four run only in your browser, BYOK, no backend, MIT-licensed. Together they're around 400 KB gzipped; the shared SSE client is the same file in all four repos. Five long-form posts on [ferhatatagun.com/blog](https://ferhatatagun.com/blog) and Medium document the engineering decisions behind each one.

The work is done — the more interesting question for me now is what shipping them in this shape, on this timeline, taught me about building developer tools in the AI-tooling era.

**TL;DR**

- Resistance from the official SDK ended up being the most generative constraint. Without the crash, I would never have written the parser, and without the parser, I would never have noticed how much the SDK hides.
- "One tool per insight" beats "one tool for everything." Each of the four tools makes exactly one thing visible. They compose because they don't try to.
- BYOK + browser-only is a credibility multiplier. The threshold for "I'll try this" drops dramatically when there's no account to make and no server to trust.
- A \`<150-line\` shared protocol client across four projects is a more interesting reuse pattern than "extract into a library." It travels by copy-paste, but with intent.
- The articles are not promotion; they're scaffolding. Every tool needs a long-form artifact that explains *why* it exists, not what it does.

## The constraint that made the work possible

If the Anthropic SDK had imported cleanly into my Next.js bundle, none of this exists. I would have used the SDK, never seen the SSE event stream, never realized that the four \`usage\` fields are sitting there in every response, and shipped some boring product feature instead.

What broke first was the bundler — \`node:fs/promises\` from inside an agent-toolset module, deep in the SDK's transitive imports. The fix wasn't subtle: don't use the SDK. Talk to \`api.anthropic.com\` directly with \`fetch\`. Add the \`anthropic-dangerous-direct-browser-access\` header. Parse the SSE stream by hand. About 150 lines.

The interesting part wasn't the parser — it was what I saw *because* of the parser. I'd been calling Claude for months without ever noticing that \`cache_creation_input_tokens\` and \`cache_read_input_tokens\` were distinct fields. I'd never looked at the granular order of \`content_block_delta\` events. I'd never noticed that \`tool_use\` inputs arrive as partial-JSON deltas you have to accumulate. The SDK had been doing me a favor by hiding this stuff, and I'd been doing my apps a disservice by letting it.

The lesson, restated: when an SDK fights you, the fight is the gift. The work to bypass it gives you ground-truth visibility you'd never have bought yourself.

## One tool, one thing it makes visible

The temptation, once I had the SSE parser, was to build "a Claude developer dashboard" — one tool that did everything. I almost did. The reason I didn't is that the most useful diagnostic tools I've ever used (Wireshark, Chrome DevTools' specific panels, the React Profiler) all share a property: each panel makes *exactly one thing* visible in a way no other tool does.

So I broke the work into four:

| Tool | Makes visible |
|------|----------------|
| claudoscope | The four \`usage\` fields, live, as cost in dollars |
| agent-replay | The decision sequence inside a \`messages\` array |
| prompt-lab | The latency/cost/output diff between two variants |
| tool-lab | What the model actually does with your tool schemas |

Each is a small surface area. None of them does the other three's job. They're all the same shape — paste-some-JSON, watch-some-output, see-the-thing — but the "thing" is intentionally different in each.

This decomposition cost me something: I have four landing pages to maintain, four READMEs, four sets of cross-links. But it bought me an asymmetric thing: a clear pitch per tool. "X-ray a Claude API call" is easier to share than "an all-in-one Claude developer console." On a Show HN front page or a Twitter timeline, the small specific claim wins.

## BYOK + browser-only as a trust multiplier

The first version of each tool, in my head, had a backend. A small Node service, an API key kept server-side, maybe a rate limiter. I started building the first one this way, then stopped at the deploy step and asked: why am I making the user trust me with their key?

There is no good answer. For a developer tool that the user is going to use for ten minutes to debug their own work, no backend is necessary. Their key, their requests, their data. The browser is the right runtime; \`localStorage\` is the right persistence layer; "nothing leaves your tab" is the right privacy guarantee.

What this changed: the "try it" threshold collapsed. No account creation. No OAuth dance. No "should I trust this site with my key?" hesitation. Open the URL, paste a key, hit send. The tool is yours in under thirty seconds. The Anthropic header named \`anthropic-dangerous-direct-browser-access\` was clearly built for exactly this kind of usage — a developer wants to look at the protocol directly, on their own machine, with their own credentials.

The flip side: this design only works for *developer tools used by their own creator*. A production app that ships keys to users would still need a backend. But for the diagnostic case, BYOK + browser-only is the right architecture.

## A 150-line client, copied four times

The shared SSE streaming client is \`src/lib/anthropic.ts\` in all four repos. Same file. Same 150ish lines. I considered extracting it to an npm package — \`@ferhatatagun/claude-fetch\` or similar — and decided against it three times.

The case against extraction is intuitive once you've worked at scale: a shared library across four tools creates a fan-out problem. A breaking change in the library breaks all four; a non-breaking change requires version-pinning logic; a hotfix requires four PR's to deploy. Meanwhile the four tools are *small enough that the file is reviewable in five minutes*. There's nothing to abstract over.

What I do instead: the file at the top of \`src/lib/anthropic.ts\` in each repo says, in a comment, where it was last synced from. When I improve the parser in one tool, I diff the file across the four repos and reconcile. It takes minutes, not hours, and the four tools stay in sync without the ceremony of a published package.

This isn't a universal pattern — for ten projects it would break down, for a hundred it's clearly wrong. But for four tools shipped by one person on weekends, it's strictly better than the npm-and-versioning alternative.

## The articles aren't marketing — they're scaffolding

Each of the four tools has a long-form post that explains why it exists. claudoscope has two (one on the streaming client itself, one on cache observability). prompt-lab, tool-lab, and agent-replay each have one. There are also five matching Turkish translations on ferhatatagun.com.

These posts are not promotion in the marketing sense. I'm not optimizing them for SEO and I'm not pumping them on LinkedIn for impressions. (OK, I'm pumping them on LinkedIn a little. But that's not the point.)

The point is: a tool that does one specific thing benefits massively from an artifact that explains *why* that specific thing is worth doing. "Here's a tool to A/B test Claude prompts" is a less convincing pitch than "you're choosing prompts by vibes; here's what side-by-side reveals that sequential doesn't, with a worked example, and a tool for it." The article does the persuasion; the tool catches the convinced reader.

Without the writing, the tools look like toys. With the writing, they look like the natural conclusion of an argument. The two work as a pair.

## What I'd do differently

A handful of small things I'd front-load if I were starting over:

1. **Demo mode from day one.** I added \`?demo=1\` to three of the four tools as an afterthought. It's the single highest-conversion feature — users who land on a tool and don't have a key still need something to look at, or they bounce. Should have been there at first commit.

2. **Per-tool OG cards.** I shipped each tool with a generic OG image and went back two days later to make per-tool 1200×630 cards in the right brand color. The first two days of traffic that came in via shared links looked generic. Should have been there at launch.

3. **Cross-linking inside the tools.** Each tool's footer points to the other three. I added this in the second weekend. The first weekend, every tool was a silo, and visitors discovered them one at a time. Should have been baked into the template.

4. **A "what's in this for me" line on the landing page.** I had four hero descriptions like "see what Claude is doing." Better: "see prompt caching save you 90% of your bill, live, as you debug." Specific outcome > vague capability. I corrected this in the second pass.

None of these are large fixes. They're all things that, if you've ever shipped a small developer tool, you already know. Knowing and remembering at the moment of shipping are different things.

## What's next

Whatever the API surface adds next, the same pattern applies: ship a small visualizer for it the day it lands. Anthropic shipped MCP, batch, files, computer-use, and citations over the last year, and most of them still don't have great developer-side observability tools. Each one is a 200-300 line tool waiting to be built.

For now, the four-tool suite is at a natural stopping point. The work I'm interested in now is around adoption — making it visible enough that the people who need these tools can find them. If you've read this far and one of the four sounds like it would have saved you time last week, take it for a spin and let me know what's missing.

---

All four tools: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).

Source on [github.com/ferhatatagun](https://github.com/ferhatatagun). MIT, BYOK, no backend.

Articles on each one: [ferhatatagun.com/blog](https://ferhatatagun.com/blog).
`,C=`# İki hafta sonunda dört açık kaynak Claude dev-tool shiplerken neler öğrendim

Yaklaşık bir ay önce Anthropic SDK'sını bir Next.js projesine import etmeye çalıştım ve bundler çöktü. Çözüm basitti — Messages API'ye doğrudan konuş, SDK'yı yaklaşık 150 satır TypeScript ile replace et — ama yan etkisi şuydu: artık elimde el yapımı bir SSE client vardı, ve Claude'un tüm streaming davranışı protokol seviyesinde ilk kez bana açıktı.

O client, iki hafta sonu üzerinde shiplediğim dört küçük açık kaynak tool'un tohumu oldu. Her biri aynı protokole farklı bir mikroskop tutuyor:

- [**claudoscope**](https://claudoscope-labs.vercel.app) — token ekonomisinin canlı x-ray'i: input, cache write, cache read, output, hepsi response stream'lerken görünür.
- [**agent-replay**](https://agentreplay.vercel.app) — bir Claude agent trace'i yapıştır, sinematik bir timeline'da adım adım replay et.
- [**prompt-lab**](https://prompt-lab-promptly.vercel.app) — aynı input üzerinde iki prompt'u (veya model'i) yan yana çalıştır, output/cost/latency karşılaştır.
- [**tool-lab**](https://tool-lab-bice.vercel.app) — Claude tool'larını bir JSON editor'da tanımla, mock response'ları el ile yaz, agent loop'un oynanışını izle.

Dördü de yalnızca tarayıcında çalışıyor, BYOK, backend yok, MIT lisanslı. Birlikte yaklaşık 400 KB gzipped; paylaşılan SSE client dört repo'da da aynı dosya. [ferhatatagun.com/blog](https://ferhatatagun.com/blog) ve Medium'da beş uzun yazı her birinin arkasındaki mühendislik kararlarını anlatıyor.

İş bitti — şimdi benim için daha ilginç olan soru, bunları bu şekilde, bu zaman çizelgesinde shiplemenin AI-tooling çağında developer tool inşa etmek hakkında bana öğrettiği şey.

**TL;DR**

- Resmi SDK'nın direnci en üretken kısıt oldu. Çöküş olmasaydı parser'ı asla yazmazdım, parser olmasaydı SDK'nın ne kadar şey gizlediğini asla fark etmezdim.
- "İçgörü başına bir tool" yaklaşımı "her şey için bir tool" yaklaşımını yeniyor. Dört tool'un her biri tam olarak bir şeyi görünür kılıyor. Birbirini kompoze ediyorlar, çünkü bunu yapmaya *çalışmıyorlar*.
- BYOK + tarayıcı-only bir güvenilirlik çarpanı. "Bunu deneyeceğim" eşiği, açılacak hesap olmadığında ve güvenilecek sunucu olmadığında dramatik şekilde düşüyor.
- Dört proje arasında \`<150-satırlık\` paylaşılan protokol client'ı, "bir kütüphaneye çıkar" pattern'inden daha ilginç bir reuse pattern'i. Niyetle yapılmış copy-paste ile yolculuk ediyor.
- Yazılar reklam değil — iskele. Her tool, *ne yaptığını* değil *neden var olduğunu* anlatan bir uzun-form artefakta ihtiyaç duyuyor.

## İşi mümkün kılan kısıt

Anthropic SDK'sı Next.js bundle'ıma temiz import edilseydi, bunların hiçbiri olmazdı. SDK'yı kullanırdım, SSE event stream'ini hiç görmezdim, dört \`usage\` alanının her response'da orada beklediğini fark etmezdim, ve onun yerine sıkıcı bir ürün özelliği shiplerdim.

İlk kırılan bundler'dı — \`node:fs/promises\`, SDK'nın transitive import'larının derinindeki bir agent-toolset modülünden. Çözüm ince değildi: SDK'yı kullanma. \`api.anthropic.com\`'a doğrudan \`fetch\` ile konuş. \`anthropic-dangerous-direct-browser-access\` header'ını ekle. SSE stream'i el ile parse et. Yaklaşık 150 satır.

İlginç olan kısım parser değildi — parser *yüzünden* gördüğüm şeydi. Aylardır Claude'u çağırıyordum ve \`cache_creation_input_tokens\` ile \`cache_read_input_tokens\`'in farklı alanlar olduğunu hiç fark etmemiştim. \`content_block_delta\` event'lerinin granüler sırasına hiç bakmamıştım. \`tool_use\` input'larının biriktirmen gereken partial-JSON delta'ları olarak geldiğini hiç fark etmemiştim. SDK bunları gizleyerek bana bir iyilik yapıyordu, ben de SDK'nın yapmasına izin vererek uygulamalarıma bir kötülük yapıyordum.

Yeniden ifade edilmiş ders: bir SDK seninle didişiyorsa, didişme bir hediye. Onu bypass etmek için yaptığın iş, kendin alamayacağın ground-truth görünürlüğü veriyor.

## Bir tool, görünür kıldığı bir şey

SSE parser'ı elime aldığımda cazibe, "bir Claude developer dashboard" inşa etmekti — her şeyi yapan bir tool. Neredeyse yaptım. Yapmamamın nedeni şu: hayatımda kullandığım en yararlı diagnostic tool'ların (Wireshark, Chrome DevTools'un belirli panelleri, React Profiler) hepsi bir özelliği paylaşıyor: her panel başka hiçbir tool'un yapmadığı şekilde *tam olarak bir şeyi* görünür kılıyor.

Bu yüzden işi dörde böldüm:

| Tool | Görünür kıldığı şey |
|------|--------------------|
| claudoscope | Dört \`usage\` alanı, canlı, dolar olarak cost |
| agent-replay | \`messages\` array'inin içindeki karar dizisi |
| prompt-lab | İki varyant arasındaki latency/cost/output diff |
| tool-lab | Modelin senin tool schema'larınla gerçekten ne yaptığı |

Her biri ufak bir surface area. Hiçbiri diğer üçünün işini yapmıyor. Hepsi aynı şekilde — bir-JSON-yapıştır, bir-output-izle, şeyi-gör — ama "şey" her birinde kasıtlı olarak farklı.

Bu ayrıştırma bana bir şeye mal oldu: dört landing page'i, dört README'yi, dört set cross-link'i sürdürmem gerekiyor. Ama asimetrik bir şey kazandırdı: tool başına net bir pitch. "Bir Claude API çağrısını x-ray'le" cümlesi "her şey için bir Claude developer console" cümlesinden paylaşılması daha kolay. Bir Show HN front page'inde ya da bir Twitter timeline'da, küçük ve spesifik iddia kazanıyor.

## Güvenilirlik çarpanı olarak BYOK + browser-only

Kafamda her tool'un ilk versiyonunun bir backend'i vardı. Küçük bir Node servis, server tarafında tutulan bir API key, belki bir rate limiter. İlkini bu şekilde inşa etmeye başladım, sonra deploy adımında durdum ve sordum: kullanıcıyı bana key'iyle güvenmeye neden zorluyorum?

İyi bir cevap yok. Kullanıcının kendi işini debug etmek için on dakika kullanacağı bir developer tool için backend gerekmez. Onun key'i, onun istekleri, onun verisi. Tarayıcı doğru runtime; \`localStorage\` doğru persistence katmanı; "hiçbir şey tab'ını terk etmiyor" doğru gizlilik garantisi.

Bunun değiştirdiği şey: "deneme" eşiği çöktü. Hesap açma yok. OAuth dansı yok. "Bu siteye key'imi vermek zorunda mıyım?" tereddüdü yok. URL'yi aç, key yapıştır, send'e bas. Tool otuz saniyenin altında senin. \`anthropic-dangerous-direct-browser-access\` adlı Anthropic header'ı, açıkça bu tür kullanım için inşa edilmiş — bir developer kendi makinesinde, kendi credential'larıyla protokole doğrudan bakmak istiyor.

Diğer taraf: bu tasarım yalnızca *yaratıcıları tarafından kullanılan developer tool'lar* için çalışıyor. Kullanıcılarına key gönderen bir production app'in hala backend'i gerekirdi. Ama diagnostic case için, BYOK + tarayıcı-only doğru mimari.

## 150-satırlık client, dört kez kopyalandı

Paylaşılan SSE streaming client dört repo'da da \`src/lib/anthropic.ts\`. Aynı dosya. Aynı 150 küsur satır. Bir npm package'a çıkarmayı düşündüm — \`@ferhatatagun/claude-fetch\` ya da benzeri — ve üç kez aksini kararlaştırdım.

Extraction'a karşı dava bir kez ölçekte çalıştığında sezgisel: dört tool üzerinde paylaşılan bir kütüphane fan-out problemi yaratıyor. Kütüphanedeki bir breaking change dördünü de kırar; non-breaking bir değişiklik version-pin'ling mantığı gerektirir; bir hotfix dört PR'lık deploy gerektirir. Bu arada dört tool *dosyanın beş dakikada review edilebilecek kadar küçük*. Soyutlanacak bir şey yok.

Onun yerine yaptığım: her repo'daki \`src/lib/anthropic.ts\`'nin başındaki bir yorum, son nereden sync edildiğini söylüyor. Bir tool'da parser'ı iyileştirdiğimde, dört repo'da dosyayı diff'leyip uzlaştırıyorum. Saatler değil dakikalar alıyor, ve dört tool, yayınlanmış bir paketin ceremony'si olmadan sync kalıyor.

Bu evrensel bir pattern değil — on proje için yıkılır, yüz için açıkça yanlış. Ama hafta sonları tek kişi tarafından shiplenen dört tool için, npm-and-versioning alternatifinden kesinlikle daha iyi.

## Yazılar marketing değil — iskele

Dört tool'un her birinin var olma sebebini anlatan bir uzun yazısı var. claudoscope'un ikisi var (biri streaming client'ın kendisi, biri cache observability üzerine). prompt-lab, tool-lab ve agent-replay'in her birinin bir tane var. Ayrıca ferhatatagun.com'da beş eşleşen Türkçe çeviri var.

Bu yazılar marketing anlamında promosyon değil. Onları SEO için optimize etmiyorum ve impression için LinkedIn'de pompalamıyorum. (Tamam, LinkedIn'de azıcık pompalıyorum. Ama önemli olan o değil.)

Önemli olan şu: belirli bir şey yapan bir tool, o belirli şeyin yapılmaya değer olduğunu *anlatan* bir artefakttan büyük fayda görür. "İşte Claude prompt'larını A/B test etmek için bir tool" pitch'i "prompt'ları vibe ile seçiyorsun; işte side-by-side'ın sıralı versiyonun göstermediği şey, çalıştırılmış bir örnek ve onun için bir tool" pitch'inden daha az ikna edici. Yazı ikna ediyor; tool ikna edilmiş okuyucuyu yakalıyor.

Yazı olmadan tool'lar oyuncak gibi görünüyor. Yazıyla, bir argümanın doğal sonucu gibi görünüyor. İkisi çift olarak çalışıyor.

## Farklı yapardım

Yeniden başlasaydım önden yapacağım birkaç küçük şey:

1. **Birinci günden demo mode.** Dört tool'un üçüne \`?demo=1\`'i sonradan ekledim. En yüksek dönüşüm özelliği — bir tool'a inip key'i olmayan kullanıcılar hala bakacak bir şeye ihtiyaç duyuyorlar, yoksa bounce. İlk commit'te orada olmalıydı.

2. **Tool başına OG card'lar.** Her tool'u generic bir OG image ile shipledim ve iki gün sonra geri dönüp doğru brand renginde tool başına 1200×630 card'lar yaptım. Paylaşılan linkler üzerinden gelen ilk iki gün trafiği generic görünüyordu. Launch'ta orada olmalıydı.

3. **Tool'ların içinde cross-link.** Her tool'un footer'ı diğer üçüne işaret ediyor. Bunu ikinci hafta sonunda ekledim. İlk hafta sonu her tool bir siloydu, ve ziyaretçiler onları teker teker keşfediyorlardı. Template'e baştan dahil edilmeliydi.

4. **Landing page'de "bunun bana ne faydası var" satırı.** "Claude'un ne yaptığını gör" gibi dört hero açıklamam vardı. Daha iyisi: "prompt caching'in faturanı %90 düşürmesini, canlı, debug ederken gör." Spesifik sonuç > muğlak kabiliyet. Bunu ikinci geçişte düzelttim.

Bunların hiçbiri büyük fix değil. Hepsi, eğer bir kez küçük bir developer tool shiplediyseniz, zaten bildiğiniz şeyler. Bilmek ve shipleme anında hatırlamak farklı şeyler.

## Bundan sonra

API surface'ı bundan sonra ne eklerse eklesin, aynı pattern geçerli: indiği gün onun için küçük bir visualizer shiple. Anthropic geçen yıl MCP, batch, files, computer-use ve citations shipledi, ve çoğunun hala developer tarafında iyi observability tool'u yok. Her biri inşa edilmeyi bekleyen 200-300 satırlık bir tool.

Şu an dört-tool'lu suite doğal bir durma noktasında. Şimdi ilgilendiğim iş benimsenme etrafında — bu tool'lara ihtiyaç duyan insanların onları bulabilmesi için yeterince görünür yapmak. Bunu buraya kadar okuduysan ve dördünden biri sana geçen hafta zaman kazandıracak gibi geliyorsa, bir deneme yap ve neyin eksik olduğunu söyle.

---

Dört tool: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).

Kaynak: [github.com/ferhatatagun](https://github.com/ferhatatagun). MIT, BYOK, backend yok.

Her biri üzerine yazılar: [ferhatatagun.com/blog](https://ferhatatagun.com/blog).
`,D=`# See the prompt before you ship it

The way most teams find out their prompt is too long is in the bill. The way most teams find out their prompt is approaching the context window is when the model starts dropping the system instructions. The way most teams find out their prompt-caching boundary is in the wrong place is by graphing a hit ratio that won't climb above 30%.

All three of these are diagnosable in advance, in about four seconds, for free. The reason they keep happening is that the tools every Claude developer reaches for — chat playgrounds, IDE plugins, the official SDK — are *post-hoc*. They show you what just happened. None of them shows you what your prompt looks like *before* you press send.

The other four tools I've shipped in this suite are all post-hoc too. [claudoscope](https://claudoscope-labs.vercel.app) x-rays a finished response. [agent-replay](https://agentreplay.vercel.app) scrubs a finished trace. [prompt-lab](https://prompt-lab-promptly.vercel.app) compares two finished runs. [tool-lab](https://tool-lab-bice.vercel.app) sandboxes the agent loop. They're all "look at what just happened" microscopes. None of them is a "look at what you're about to do" lens.

[**context-lens**](https://context-lens-sigma.vercel.app) is. Paste a system prompt and a user message; see exactly how the API will count them, where in the 200K window you sit, where caching boundaries fall, and what each call will cost. The pre-flight check that turns a guess into a measurement.

**TL;DR**

- Token cost, context-window position, and prompt-caching layout are all knowable from the prompt alone — you don't need to send the request.
- Anthropic's \`count_tokens\` endpoint gives you the exact number; a \`~3.7 chars/token\` heuristic gives you a good-enough number while you type.
- The most useful single number is "tokens × calls/day × dollars/token" — once you can compute it before deploying, "ship this prompt" stops being an aesthetic call and becomes a budget call.
- A 4× difference in input length between two equivalent prompts is normal. Catching it before it goes to production saves more than the tool costs to build.

## What you can actually pre-flight

Three things, all derivable from the prompt text alone:

**1. Exact token count.** Not an estimate. Anthropic ships a \`/v1/messages/count_tokens\` endpoint that takes the exact same shape as \`/v1/messages\` (system, messages, tools) and returns just the \`input_tokens\` number. Same tokenization as the actual API call would use. No model invocation, no output, no cost beyond a single tiny request.

**2. Position in the context window.** Sonnet 4.5 has a 200K-token window. Going past it doesn't error; the model silently drops the oldest content, which usually means dropping your system instructions, which usually means the model stops doing what you asked. The math is \`(input + max_output) / 200_000\`. You should never see "78% of window" in production without knowing about it.

**3. Cost per call.** Multiply input tokens by input price (\`$3/M\` on Sonnet), output tokens by output price (\`$15/M\`), and you have one number for the cost of one call. Multiply by your traffic and you have the bill. The interesting move: do this *before* you commit to a prompt design, not after.

The fourth thing — where prompt-caching boundaries should sit — is harder to derive purely from text, but it's still pre-flight: you choose where to put \`cache_control\` based on which prefix is *stable* across your real traffic. context-lens won't choose for you, but it will show you the boundaries you've chosen so you can sanity-check them.

## The four-fold cost difference no one was looking for

A real example, the worked-out kind. Two versions of the same agent system prompt:

| Version | Approach | Input tokens (counted) |
|---------|----------|----------------------|
| A | Markdown headings, examples, long taxonomy, JSON schema embedded | **3,847** |
| B | Single paragraph, schema implied by one example, no preamble | **612** |

Same model (Sonnet 4.5). Same user inputs (a code review task). The output was substantively equivalent on five real traffic samples — both caught the same critical bugs, both produced valid JSON, both came in under 800 output tokens.

The cost differential is mechanical:

- A: \`(3847 × 3 + 800 × 15) / 1_000_000\` = **$0.0235** per call
- B: \`(612 × 3 + 800 × 15) / 1_000_000\` = **$0.0138** per call

At 10,000 calls per day, that's **$97/day saved**, or **$3,000/month**. For a single prompt rewrite that took two hours to test in context-lens.

The salient detail: I didn't *intend* version B to be cheaper. I intended it to be more readable. The cost reduction was a side-effect that I would not have noticed without the pre-flight number, because both prompts felt "about the same length" to me in an editor. context-lens told me one was 6.3× the length of the other, in the only metric that matters: the metric the API uses.

The lesson is that "feels about the same" is a uniformly bad estimator for token count, and you stop making the mistake the day you start measuring before you ship.

## Why the heuristic mode exists

context-lens does two things:

- Live as you type: a fast heuristic, roughly \`3.7 chars/token\` for English-ish text, that updates with every keystroke. No API call, no key required, instant.
- On demand: a real API call to \`count_tokens\` that gives you the exact number Anthropic will use.

The heuristic isn't quite right — Turkish, code, and JSON all tokenize differently than English prose, sometimes by 30%. But it's a real-time signal while you iterate, which is more useful than an accurate-but-asynchronous one while you write. When you're ready to commit, you click the button and get the exact number. The two modes are intentional: one for the iteration phase, one for the verification phase.

The pattern generalizes. Every place you have a fast-approximate metric and a slow-exact one, ship both, label them clearly, default to the fast one. The fast metric should never be wrong by more than ~30%; otherwise it's not a useful approximation. ~3.7 chars/token meets that bar for the languages context-lens has to handle.

## What about prompt caching

Caching is the lever most teams underuse — and the one context-lens helps with most by surfacing where the boundaries are. Anthropic lets you mark any segment of your prompt as cacheable with \`cache_control: { type: "ephemeral" }\`. The next 5 minutes, requests that share that exact prefix get the cached portion at **10% of the input price**. The math flips: a 4,000-token system prompt that costs \`$0.012\` per cold call costs \`$0.0012\` per warm call. That's 10×.

The catch: every byte before the \`cache_control\` boundary must be identical. If you interpolate the user's name into the system prompt — gone. If your tool list reorders between requests — gone. If you append a timestamp — gone.

context-lens shows you the structure you're sending. It doesn't auto-detect cacheability for you, but it does let you toggle "assume input is cache-read" and see what the cost would be if your caching worked. If \`$0.012 → $0.0012\` is interesting at your traffic level, the path to verify it works is in [claudoscope](https://claudoscope-labs.vercel.app), which shows you the actual cache-read and cache-write breakdown on a live call. The two tools are complementary: context-lens predicts, claudoscope measures.

I wrote a longer piece on the caching observability case in [Prompt caching is the cheapest Claude optimization. Nobody measures it.](https://ferhatatagun.com/blog/prompt-caching-nobody-measures) if you want the full argument.

## What I'd recommend you do this week

Three escalating moves:

1. **Today (5 minutes):** Take whatever prompt your team is shipping right now. Paste it into context-lens with a representative user message. Note the token count. Now write a 1-paragraph version of the same prompt and paste that. If the count drops by 50% with no quality regression on three real inputs, you have a free production cost cut.

2. **This sprint (an afternoon):** Add a pre-merge step to your prompt-change workflow: every PR that touches a prompt must include the context-lens token counts (before / after) in the description. Same energy as showing test results. If a PR triples your input tokens, that should be a conversation, not a stealth deploy.

3. **This quarter (a habit):** Track the prompt-cost-per-feature number across your product as a real metric. If feature X costs \`$0.02/call\` and feature Y costs \`$0.20/call\`, that's information you should know about before the bill teaches you. context-lens is the cheapest place to start collecting it — \`count_tokens\` is free to call.

The economics of LLM apps in 2026 are not about model selection, mostly. They're about prompt design. Teams that can see their prompts before they ship them will out-compete teams that can't, on cost first and on quality second. The "see them" part is what's missing in most setups, and what context-lens is for.

---

I shipped this in [**context-lens**](https://context-lens-sigma.vercel.app) — paste a Claude prompt, see what it costs before you ship. BYOK, no backend, runs in the browser. Source: [github.com/ferhatatagun/context-lens](https://github.com/ferhatatagun/context-lens).

The same protocol-level approach also powers four sibling tools — [claudoscope](https://claudoscope-labs.vercel.app), [agent-replay](https://agentreplay.vercel.app), [prompt-lab](https://prompt-lab-promptly.vercel.app), [tool-lab](https://tool-lab-bice.vercel.app). All open source, all BYOK: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).
`,O=`# Prompt'u shiplemeden önce gör

Çoğu ekip prompt'larının çok uzun olduğunu **faturada** öğreniyor. Çoğu ekip prompt'larının context window'a yaklaştığını **model system instruction'ları silmeye başladığında** öğreniyor. Çoğu ekip prompt-caching boundary'sinin yanlış yerde olduğunu **hit oranı %30'un üstüne çıkmayınca** öğreniyor.

Üçü de önceden, dört saniyede, ücretsiz teşhis edilebilir. Olmaya devam etmelerinin nedeni: her Claude developer'ının uzandığı araçlar — chat playground'ları, IDE eklentileri, resmi SDK — *post-hoc*. Sana ne *az önce olduğunu* gösteriyorlar. Hiçbiri prompt'unun göndermeden *önce* nasıl göründüğünü göstermiyor.

Bu suite'te shiplediğim diğer dört tool da post-hoc. [claudoscope](https://claudoscope-labs.vercel.app) biten bir response'u x-ray'liyor. [agent-replay](https://agentreplay.vercel.app) biten bir trace'i scrub ediyor. [prompt-lab](https://prompt-lab-promptly.vercel.app) biten iki çalıştırmayı karşılaştırıyor. [tool-lab](https://tool-lab-bice.vercel.app) agent loop'unu sandbox'lıyor. Hepsi "az önce ne oldu" mikroskopları. Hiçbiri "yapmak üzere olduğun şeye bak" lensi değil.

[**context-lens**](https://context-lens-sigma.vercel.app) öyle. Bir system prompt ve user mesajı yapıştır; API'nin onları tam olarak nasıl sayacağını, 200K window içinde nerede durduğunu, caching boundary'lerinin nereye düştüğünü ve her çağrının ne kadara mal olacağını gör. Tahmini ölçüme çeviren pre-flight check.

**TL;DR**

- Token cost, context-window pozisyonu ve prompt-caching layout'u — hepsi prompt'tan tek başına bilinebilir, istek göndermene gerek yok.
- Anthropic'in \`count_tokens\` endpoint'i sana kesin sayıyı veriyor; \`~3.7 chars/token\` heuristic'i yazarken yeterli tahmin veriyor.
- En faydalı tek sayı "token × günlük çağrı × dolar/token" — bunu deploy etmeden hesaplayabildiğinde, "bu prompt'u shiple" estetik bir karar olmaktan çıkıp bütçe kararı oluyor.
- Anlam olarak eşdeğer iki prompt arasında input uzunluğunda 4× fark normal. Production'a gitmeden yakalamak, tool'un kendisini kurmaktan daha çok tasarruf ediyor.

## Aslında pre-flight ne yapabilirsin

Üç şey, hepsi prompt metninden türetilebilir:

**1. Kesin token sayısı.** Tahmin değil. Anthropic bir \`/v1/messages/count_tokens\` endpoint'i sunuyor — \`/v1/messages\` ile tam aynı şekli (system, messages, tools) alıyor ve sadece \`input_tokens\` sayısını dönüyor. Asıl API çağrısının kullanacağı aynı tokenization. Model invocation yok, output yok, tek bir küçük istek dışında ücret yok.

**2. Context window pozisyonu.** Sonnet 4.5'in 200K-token window'u var. Aşmak hata vermiyor; model sessizce en eski içeriği bırakıyor — ki bu genellikle system instruction'larını bırakmak demek, ki bu da modelin istediğin şeyi yapmayı bırakması demek. Matematik: \`(input + max_output) / 200_000\`. Production'da bilmediğin bir "window'un %78'i" durumunu asla görmemelisin.

**3. Çağrı başına cost.** Input token'ları input fiyatıyla çarp (Sonnet'te \`$3/M\`), output token'ları output fiyatıyla çarp (\`$15/M\`), ve bir çağrının cost'u için tek bir sayı al. Trafiğinle çarpınca fatura çıkıyor. İlginç hamle: bunu prompt tasarımına commit etmeden *önce* yap, sonra değil.

Dördüncü şey — prompt-caching boundary'lerinin nereye oturması gerektiği — saf olarak metinden türetmek daha zor, ama hala pre-flight: \`cache_control\`'u nereye koyacağını, gerçek trafiğinde hangi prefix'in *stabil* olduğuna göre seçiyorsun. context-lens senin için seçmiyor, ama seçtiğin boundary'leri sana gösterip sanity check yapmana izin veriyor.

## Kimsenin aramadığı dört-kat cost farkı

Gerçek bir örnek, çalıştırılmış olanından. Aynı agent system prompt'unun iki versiyonu:

- **Versiyon A** — Markdown başlıklar, örnekler, uzun taksonomi, JSON şema gömülü — **3,847 input token**
- **Versiyon B** — Tek paragraf, şema bir örnekle ima edilmiş, preamble yok — **612 input token**

Aynı model (Sonnet 4.5). Aynı user input'ları (code review görevi). Output beş gerçek trafik örneğinde anlam olarak eşdeğerdi — ikisi de aynı kritik bug'ları yakaladı, ikisi de geçerli JSON üretti, ikisi de 800 output token'ın altında kaldı.

Cost farkı mekanik:

- A: \`(3847 × 3 + 800 × 15) / 1_000_000\` = **$0.0235** çağrı başına
- B: \`(612 × 3 + 800 × 15) / 1_000_000\` = **$0.0138** çağrı başına

Günde 10,000 çağrıda bu **$97/gün tasarruf**, ya da **$3,000/ay**. context-lens'te iki saatlik bir prompt yeniden yazımıyla.

Önemli detay: versiyon B'yi daha ucuz olsun diye *yazmadım*. Daha okunabilir olsun diye yazdım. Cost azalması bir yan etkiydi ki pre-flight sayı olmadan fark etmeyecektim, çünkü bir editörde ikisi de bana "yaklaşık aynı uzunlukta" hissettirdi. context-lens bana birinin diğerinin 6.3×'i kadar uzun olduğunu söyledi — önemli olan tek metrikte: API'nin kullandığı metrikte.

Ders şu: "yaklaşık aynı" token sayısı için tutarlı olarak kötü bir estimator. Shiplemeden önce ölçmeye başladığın gün hatayı yapmayı bırakıyorsun.

## Heuristic mode neden var

context-lens iki şey yapıyor:

- Yazarken canlı: kabaca İngilizce-benzeri metin için \`3.7 chars/token\` hızlı bir heuristic, her tuş vuruşunda güncellenir. API call yok, key gerekmez, anlık.
- İstek üzerine: gerçek \`count_tokens\` API call'u — Anthropic'in kullanacağı kesin sayıyı verir.

Heuristic tam doğru değil — Türkçe, kod ve JSON İngilizce düzyazıdan farklı tokenize oluyor, bazen %30 farkla. Ama iterate ederken real-time sinyal — accurate-ama-asenkron olandan daha faydalı. Commit etmeye hazır olduğunda butonu tıklıyorsun ve kesin sayıyı alıyorsun. İki mod kasıtlı: biri iteration için, biri verification için.

Pattern genelleşiyor. Hızlı-yaklaşık ve yavaş-kesin metriklerinin olduğu her yerde, ikisini de shiple, açıkça etiketle, varsayılan olarak hızlıyı kullan. Hızlı metriği ~%30'dan fazla yanlış olmamalı; yoksa faydalı bir yaklaşıklık değil. ~3.7 chars/token context-lens'in handle etmesi gereken diller için bu çıtayı geçiyor.

## Prompt caching tarafı

Caching, çoğu ekibin yetersiz kullandığı kaldıraç — ve context-lens'in boundary'leri yüzeye çıkararak en çok yardım ettiği şey. Anthropic prompt'unun herhangi bir segmentini \`cache_control: { type: "ephemeral" }\` ile cache-able işaretlemeye izin veriyor. Sonraki 5 dakikada, o tam prefix'i paylaşan istekler cache'lenmiş kısmı **input fiyatının %10'una** alıyor. Matematik dönüyor: çağrı başına \`$0.012\`'lık 4,000 token'lık bir system prompt warm çağrıda \`$0.0012\` ediyor. Bu 10×.

Çıkmaz: \`cache_control\` boundary'sinden önceki her byte aynı olmalı. System prompt'a user'ın adını interpolate ediyorsan — gitti. Tool list'in istekler arası reorder oluyorsa — gitti. Timestamp ekliyorsan — gitti.

context-lens sana gönderdiğin yapıyı gösteriyor. Otomatik cacheability tespit etmiyor, ama "input cache-read varsayılır" toggle'ı ile caching'in çalışsa cost'un ne olacağını görebiliyorsun. Eğer \`$0.012 → $0.0012\` senin trafik seviyende ilginçse, gerçekten çalıştığını doğrulamanın yolu [claudoscope](https://claudoscope-labs.vercel.app)'ta — sana canlı bir çağrıda gerçek cache-read ve cache-write breakdown'ını gösteriyor. İki tool birbirini tamamlıyor: context-lens tahmin ediyor, claudoscope ölçüyor.

Caching observability case'i üzerine daha uzun bir yazı yazdım: [Prompt caching, Claude'un en ucuz optimizasyonu. Kimse ölçmüyor.](https://ferhatatagun.com/blog/prompt-caching-kimsenin-olcmedigi) — full argümanı isteyenler için.

## Bu hafta ne yapmanı tavsiye ediyorum

Üç eskalasyon hamlesi:

1. **Bugün (5 dakika):** Ekibinizin şu an shiplediği herhangi bir prompt'u al. context-lens'e temsili bir user mesajıyla yapıştır. Token sayısını not et. Şimdi aynı prompt'un 1-paragraflık bir versiyonunu yaz ve yapıştır. Üç gerçek input'ta kalite regression'ı olmadan sayı %50 düşerse, ücretsiz bir production cost cut'ın var.

2. **Bu sprint (bir öğleden sonra):** Prompt değişikliği workflow'una pre-merge bir adım ekle: prompt'a dokunan her PR description'da context-lens token sayılarını (önce / sonra) içermek zorunda. Code review'da test sonuçlarını gösterir gibi. Bir PR input token'larını üçe katlıyorsa, bu bir konuşma olmalı — stealth deploy değil.

3. **Bu çeyrek (bir alışkanlık):** Ürünün boyunca prompt-cost-per-feature sayısını gerçek bir metrik olarak takip et. Feature X çağrı başına \`$0.02\` ediyor ve feature Y \`$0.20\` ediyorsa, bu fatura sana öğretmeden önce bilmen gereken bir bilgi. context-lens onu toplamaya başlamak için en ucuz yer — \`count_tokens\` çağrılması ücretsiz.

LLM uygulamalarının 2026 ekonomisi model seçimi hakkında değil, çoğunlukla. Prompt tasarımı hakkında. Prompt'larını shiplemeden görebilen ekipler göremeyenleri yenecek, önce cost'ta sonra kalitede. Eksik olan "görme" kısmı, ve context-lens onun için.

---

Bu [**context-lens**](https://context-lens-sigma.vercel.app)'a shipledim — Claude prompt'u yapıştır, shiplemeden ne kadar tutacağını gör. BYOK, backend yok, tarayıcıda çalışıyor. Kaynak: [github.com/ferhatatagun/context-lens](https://github.com/ferhatatagun/context-lens).

Aynı protokol-seviye yaklaşımı ayrıca dört kardeş tool'a güç veriyor — [claudoscope](https://claudoscope-labs.vercel.app), [agent-replay](https://agentreplay.vercel.app), [prompt-lab](https://prompt-lab-promptly.vercel.app), [tool-lab](https://tool-lab-bice.vercel.app). Hepsi açık kaynak, hepsi BYOK: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).
`,E=`# How I shipped a blog Google couldn't see

Every blog post on my site looked fine. Open \`/blog/something\`, the
article was there — title, paragraphs, code blocks, the works.

Then I ran \`curl https://ferhatatagun.com/blog/four-tools-in-two-weekends\`
on a hunch, and the HTML had **zero** of the body text. Title in \`<head>\`,
layout chrome, a perfectly empty \`<div class="markdown-container" />\`, and
nothing else. The article only rendered after JavaScript loaded — meaning
the version Google indexed had no article in it.

This had been the case for *every blog post on the site, for months*.

**TL;DR**

- The site used \`adapter-static\` with \`prerender = true\`, which suggests "all routes are rendered to HTML at build time." That's true for the page chrome — but not the body.
- The Markdown component parsed \`content\` inside \`onMount\`, so the HTML on disk had a skeleton and nothing else. The article materialized only after hydration.
- Two ways this hides from you: every browser you test in runs the JS, so the page looks fine; and the page reports a healthy 200 response, so monitoring stays green.
- The fix is mechanical (parse markdown at module scope, inject via \`{@html}\`), but it cascaded: prerender OOMed on the worker heap, the prerender crawler followed embedded \`.md\` links and 404'd, and the static adapter's fallback was clobbering the prerendered home. Each problem appeared only because the previous one was fixed.

This is a write-up of the regression: what I missed, how it stayed hidden,
the actual code-level fix, and the three secondary failures that the fix
unblocked.

## What the page was actually serving

The Svelte component looked harmless:

\`\`\`svelte
<script lang="ts">
    import { marked } from 'marked';
    import { gfmHeadingId } from 'marked-gfm-heading-id';
    import { mangle } from 'marked-mangle';
    import createSanitizer from 'dompurify';
    import Prism from 'prismjs';
    import { onMount } from 'svelte';

    let container: HTMLDivElement;
    export let content: string;

    onMount(() => {
        marked.use(gfmHeadingId());
        marked.use(mangle());
        const sanitizer = createSanitizer(window);
        const parsed = marked.parse(content);
        container.innerHTML = sanitizer.sanitize(parsed);
        Prism.highlightAllUnder(container);
    });
<\/script>

<div bind:this={container} class="markdown-container" />
\`\`\`

The whole thing — parsing markdown, sanitising, highlighting — lives
inside \`onMount\`. That callback fires only in the browser, after
hydration. During SvelteKit's prerender pass, \`onMount\` never runs.
So the HTML on disk contains exactly what's in the template: an empty
\`<div class="markdown-container" />\`.

The article body was being added *imperatively to the DOM at runtime*.
That's invisible to Google. It's invisible to OG/Twitter card scrapers.
It's invisible to anyone who fetches the URL with \`curl\`.

Two checks that would have caught this and didn't:

1. **My browser tabs were always rendering the right thing**, because they
   ran the JS. Testing the live page by *looking at it* is testing the
   hydrated version, not the indexed version.
2. **The page returned 200.** Uptime monitors stayed green. Status pages
   stayed green. Lighthouse scored fine, because Lighthouse runs JS too.

The only way to see the regression is to bypass JS. \`curl\` does. So does
Googlebot's render preview. So does the View-source feature your browser
hides three menus deep. I'd been opening DevTools to inspect post-hydration
DOM for months, and never View Source on the raw response.

The numbers, once I looked:

\`\`\`
$ curl -s https://ferhatatagun.com/blog/four-tools-in-two-weekends \\
    | wc -c
32280
$ curl -s https://ferhatatagun.com/blog/four-tools-in-two-weekends \\
    | grep -c "claudoscope"
0
$ curl -s https://ferhatatagun.com/blog/four-tools-in-two-weekends \\
    | grep -c "TL;DR"
0
\`\`\`

The page is 32 KB and contains no part of the article body. "claudoscope"
appears half a dozen times in the post; in the HTML, zero. Same for
"TL;DR". The HTML was 100% layout chrome.

## Why \`prerender = true\` wasn't enough

The static adapter's prerender pass walks every route, calls the page's
\`load\`, and renders the resulting component tree to HTML. It runs all the
top-level Svelte component code. What it does *not* do is run lifecycle
hooks like \`onMount\`, because those are explicitly contracted to be
browser-only.

So \`prerender = true\` was doing exactly what it advertises. The bug was
that the data dependency lived behind a lifecycle that prerender skips.

The fix is to make markdown parsing module-level, not lifecycle-level:

\`\`\`svelte
<script lang="ts">
    import { marked } from 'marked';
    import { gfmHeadingId } from 'marked-gfm-heading-id';
    import { mangle } from 'marked-mangle';
    import { onMount } from 'svelte';
    import 'prismjs/themes/prism-tomorrow.css';

    marked.use(gfmHeadingId());
    marked.use(mangle());

    export let content: string;
    $: parsed = marked.parse(content) as string;

    let container: HTMLDivElement;

    onMount(async () => {
        const Prism = (await import('prismjs')).default;
        await import('prismjs/components/prism-typescript');
        if (container) Prism.highlightAllUnder(container);
    });
<\/script>

<div bind:this={container} class="markdown-container">{@html parsed}</div>
\`\`\`

Three things changed:

1. \`marked.use(...)\` moved to module scope. It now runs both during
   prerender and during hydration, configuring the same extensions in
   both environments.
2. \`parsed = marked.parse(content)\` is a reactive top-level statement.
   It runs synchronously inside the component's render pass, so its
   output is in the HTML that goes to disk.
3. Prism syntax highlighting stays inside \`onMount\`, dynamic-imported.
   Prism touches \`self\` at import time, which is fine in the browser
   but not on the prerender worker. Highlighting is cosmetic — losing
   it on prerender is invisible until JS loads, which is acceptable.

I also dropped DOMPurify. The original code piped marked's output
through it before injecting. That was paying a sanitiser's bundle cost
plus a render-time cost, but the input was our own \`?raw\`-imported
markdown files, not user content. Defending against ourselves was
defensive theatre. If a hostile actor can write to my markdown source,
sanitising the output is the wrong layer to do it at.

The result of the fix:

\`\`\`
$ wc -c www/build/blog/four-tools-in-two-weekends.html
45292
$ grep -c "claudoscope" www/build/blog/four-tools-in-two-weekends.html
3
$ grep -c "TL;DR" www/build/blog/four-tools-in-two-weekends.html
1
$ grep -c "<h1 id=" www/build/blog/four-tools-in-two-weekends.html
1
\`\`\`

45 KB instead of 32 KB. The 13 KB difference is the article body —
the part Google had been seeing as empty.

## The home page was even worse

The home page had a different version of the same problem. SvelteKit's
\`adapter-static\` accepts a \`fallback\` option for SPA-style hosting; if
a path doesn't have a prerendered HTML file, the server can serve the
fallback and let the client-side router resolve it.

The config was:

\`\`\`js
fallback: 'index.html'
\`\`\`

Which writes the fallback shell *to \`index.html\`*. The home route at \`/\`
*also* prerenders to \`index.html\`. So you have two operations writing to
the same path. The fallback wins, because the adapter writes it after
the prerender. The 40 KB prerendered home gets overwritten with the
13 KB SPA shell.

\`\`\`
$ wc -c www/build/index.html
13096
\`\`\`

That's the bare HTML that the bundler emits as the SPA's entry point —
just the imports for the JS bundles, no body content. Anyone hitting \`/\`
with a non-JS user agent was getting *that*.

The fix is one character of intent:

\`\`\`js
fallback: '200.html'
\`\`\`

\`200.html\` is a convention some static hosts (Surge, Netlify with
configuration) use to mean "the SPA fallback." The static adapter
doesn't care about the name; it just writes the fallback to whatever
path you give it. Renaming to \`200.html\` keeps the fallback for unknown
paths without colliding with the prerendered home.

\`\`\`
$ wc -c www/build/index.html
40871
\`\`\`

3.1× growth, all of it actual rendered home content.

## The three problems the fix uncovered

Each of these only became visible *because the previous one was fixed*.

### 1. Prerender worker OOM

Once the markdown was actually being parsed during prerender, the
GitHub Actions build started failing with:

\`\`\`
Error [ERR_WORKER_OUT_OF_MEMORY]: Worker terminated due to reaching
memory limit: JS heap out of memory
\`\`\`

The default Node heap on \`ubuntu-latest\` is about 1.4 GB. The
prerender pass was now doing real work — \`marked.parse\` on every blog
post markdown source, each producing 10–15 KB of HTML. Across 14 blog
posts plus the markdown rendering inside other routes, that pushed the
worker over the line.

Two fixes:

\`\`\`yaml
env:
  NODE_OPTIONS: --max-old-space-size=4096
\`\`\`

That alone unblocked it. Belt-and-suspenders, I also guarded the
\`marked.use(...)\` calls so they only configure once per Node process,
in case Vite's SSR ever re-imports the module across routes:

\`\`\`ts
const __markedKey = '__omni_marked_configured__';
const __markedScope = globalThis as unknown as Record<string, boolean>;
if (!__markedScope[__markedKey]) {
    marked.use(gfmHeadingId());
    marked.use(mangle());
    __markedScope[__markedKey] = true;
}
\`\`\`

### 2. The prerender crawler followed every link in the rendered HTML

Several blog posts embed relative links to translations or \`contributing.md\`
files that live in the source repos they reference — \`[/i18n/README.tr.md]\`,
\`[/contributing.md]\`, that kind of thing. When markdown rendering was
client-side, those got hydrated into \`<a>\` tags but the prerender crawler
never saw them.

Now the crawler sees them, follows them, and treats the 404s as build
errors:

\`\`\`
Error: 404 /contributing.md (linked from /skills/nextjs)
\`\`\`

These are not site routes I own — they're content links inside post bodies.
The fix is to demote prerender 404s from errors to warnings:

\`\`\`js
prerender: {
    handleHttpError: 'warn',
    handleMissingId: 'warn'
}
\`\`\`

### 3. The shared host wasn't pulling from gh-pages

The repo's CI deploys to \`gh-pages\`. The \`ferhatatagun.com\` domain
points at a Spaceship shared host that I FTP-upload to. The two were
unrelated, which meant every CI deploy updated \`gh-pages\` and the live
site stayed exactly as it had been.

This wasn't a CI bug; it was a deployment-pipeline shape I'd let drift.
The fix isn't code — it's "manually FTP the \`gh-pages\` contents to the
shared host's \`public_html\`," or rebuild the deploy pipeline to push
directly. For one-shot remediation, I went with the FTP path.

## How to catch the next one before it ships

The reason this regression survived for months is that none of my
verification ran with JS disabled. To prevent the next one:

1. **Always view source on a critical route after a deploy.** Not
   DevTools — that shows the hydrated DOM. The browser's "View Source"
   shows what arrived on the wire. The two should differ in trivial
   ways (hydration markers, attribute order); they should not differ
   in *content*.
2. **\`curl | grep\` your most important sentinel.** For a blog: a phrase
   you know is in the body. For a product page: the price. For a
   marketing page: the value prop. Make it a 10-second post-deploy
   check.
3. **Test once with JavaScript disabled.** It's a one-time check per
   major template change. The first time a critical body of text is
   missing from the JS-disabled page, you have the answer.
4. **For static sites, diff the page sizes you ship over time.** A
   40 KB → 13 KB drop on a single route would have lit up. I had no
   alert because I'd never measured a baseline.

For SvelteKit specifically, the pattern is one rule: anything that
materializes data into the rendered DOM should be reactive or
top-level, not in \`onMount\`. \`onMount\` is for browser-only side
effects — DOM measurement, third-party widget init, anything that
needs \`window\`. As soon as you put content production in there, the
prerender stops seeing it. The same shape exists in React (\`useEffect\`),
Vue (\`onMounted\`), and every framework that distinguishes hydration
from render.

## What this cost

Two evenings to find it. Forty-five minutes to fix it. Three
follow-up commits to deal with the secondary failures the fix exposed.

The harder cost is the months of indexing where every post's body was
empty. Google's view of those pages now has the title and the OG image
and an empty \`<div>\`. The dev.to mirrors of seven of the posts, which I
published with \`canonical_url\` pointing back to my site, were *more*
indexable than the originals.

Search engines will recrawl. The mirrors will eventually catch up. But
this is the kind of bug that doesn't reverse itself instantly — the
right move after the fix is to submit a fresh sitemap, request reindex
on the most important URLs, and wait.

The win-condition I'm watching for is the same \`curl | grep\` that
revealed the bug, run against the production URL:

\`\`\`
$ curl -s https://ferhatatagun.com/blog/four-tools-in-two-weekends \\
    | grep -c "TL;DR"
1
\`\`\`

Zero is the bug. One is the fix.
`,M=`# Google'un göremediği bir blog yayınladım

Sitemdeki her blog yazısı tarayıcıda gayet iyi görünüyordu.
\`/blog/something\` aç, yazı orada — başlık, paragraflar, kod blokları, her şey.

Sonra bir tahminle \`curl https://ferhatatagun.com/blog/four-tools-in-two-weekends\`
çalıştırdım, ve HTML'de yazı gövdesinin **sıfır** karakteri vardı. \`<head>\` içinde başlık,
layout chrome, mükemmel boş bir \`<div class="markdown-container" />\`, ve
hepsi bu. Yazı sadece JavaScript yüklendikten sonra render oluyordu — yani
Google'ın indekslediği versiyonda hiç yazı yoktu.

Bu durum **sitedeki her blog yazısı için, aylardır** geçerliydi.

**TL;DR**

- Site \`adapter-static\` + \`prerender = true\` kullanıyordu, ki bu "tüm route'lar build zamanında HTML'e render edilir" anlamına gelir. Bu sayfa chrome'u için doğru — ama gövde için değil.
- Markdown bileşeni \`content\`'i \`onMount\` içinde parse ediyordu, dolayısıyla diskteki HTML iskelet ve başka bir şey değildi. Yazı sadece hydration sonrası belirdi.
- Bu iki şekilde gözden saklanıyor: test ettiğin her tarayıcı JS çalıştırıyor, sayfa iyi görünüyor; ve sayfa sağlıklı 200 dönüyor, monitör yeşil kalıyor.
- Düzeltme mekanik (markdown'ı modül scope'unda parse et, \`{@html}\` ile bas) ama yan etkileri kademeli oldu: prerender worker heap'i taştı, prerender crawler gömülü \`.md\` linkleri takip edip 404 verdi, statik adapter'ın fallback'i prerendered home'u eziyordu. Her sorun, öncekisi düzeltildikten sonra ortaya çıktı.

Bu yazı regresyonun yazımı: neyi kaçırdım, nasıl saklı kaldı, kod seviyesinde gerçek düzeltme, ve düzeltmenin tetiklediği üç ikincil hata.

## Sayfa aslında neyi serve ediyordu

Svelte bileşeni zararsız görünüyordu:

\`\`\`svelte
<script lang="ts">
    import { marked } from 'marked';
    import { gfmHeadingId } from 'marked-gfm-heading-id';
    import { mangle } from 'marked-mangle';
    import createSanitizer from 'dompurify';
    import Prism from 'prismjs';
    import { onMount } from 'svelte';

    let container: HTMLDivElement;
    export let content: string;

    onMount(() => {
        marked.use(gfmHeadingId());
        marked.use(mangle());
        const sanitizer = createSanitizer(window);
        const parsed = marked.parse(content);
        container.innerHTML = sanitizer.sanitize(parsed);
        Prism.highlightAllUnder(container);
    });
<\/script>

<div bind:this={container} class="markdown-container" />
\`\`\`

Tüm bu işler — markdown parse, sanitize, highlight — \`onMount\` içinde.
O callback sadece tarayıcıda, hydration'dan sonra çalışıyor. SvelteKit'in prerender
adımı \`onMount\`'u asla çalıştırmaz. Diskteki HTML tam olarak template'te ne varsa
onu içerir: boş bir \`<div class="markdown-container" />\`.

Yazı gövdesi *runtime'da DOM'a imperatif olarak ekleniyordu*.
Bu Google için görünmez. OG/Twitter card scraper'ları için görünmez.
URL'i \`curl\` ile çekenler için görünmez.

Bunu yakalayabilecek iki kontrol yapmamıştım:

1. **Tarayıcı sekmelerim hep doğru şeyi render ediyordu**, çünkü JS çalışıyordu.
   Canlı sayfayı *bakarak* test etmek hydrate edilmiş versiyonu test etmektir,
   indekslenen versiyonu değil.
2. **Sayfa 200 dönüyordu.** Uptime monitörleri yeşil. Status sayfası yeşil.
   Lighthouse da iyi puanlıyordu, çünkü Lighthouse JS çalıştırır.

Regresyonu görmenin tek yolu JS'i atlamak. \`curl\` atlar. Googlebot'un render önizlemesi de.
Tarayıcının üç menü derinde sakladığı View Source da. Aylardır post-hydration DOM'u
DevTools'tan inceliyordum, raw response'a hiç View Source yapmamıştım.

Bakınca rakamlar:

\`\`\`
$ curl -s https://ferhatatagun.com/blog/four-tools-in-two-weekends \\
    | wc -c
32280
$ curl -s https://ferhatatagun.com/blog/four-tools-in-two-weekends \\
    | grep -c "claudoscope"
0
$ curl -s https://ferhatatagun.com/blog/four-tools-in-two-weekends \\
    | grep -c "TL;DR"
0
\`\`\`

Sayfa 32 KB ve yazı gövdesinin hiçbir parçasını içermiyor. "claudoscope" yazıda
yarım düzine yerde geçer; HTML'de sıfır. "TL;DR" için aynı. HTML %100 layout chrome'du.

## \`prerender = true\` neden yetmedi

Statik adapter'ın prerender adımı her route'u dolaşır, sayfanın \`load\`'ını çağırır,
ve sonucundaki component ağacını HTML'e render eder. Tüm top-level Svelte
component kodunu çalıştırır. *Çalıştırmadığı* şey \`onMount\` gibi lifecycle hook'lar,
çünkü onlar açıkça browser-only sözleşmesindedir.

Yani \`prerender = true\` tam olarak iddia ettiğini yapıyordu. Hata, veri bağımlılığının
prerender'ın atladığı bir lifecycle'ın arkasında yaşıyor olmasıydı.

Düzeltme: markdown parse'ı lifecycle-level değil, module-level yapmak:

\`\`\`svelte
<script lang="ts">
    import { marked } from 'marked';
    import { gfmHeadingId } from 'marked-gfm-heading-id';
    import { mangle } from 'marked-mangle';
    import { onMount } from 'svelte';
    import 'prismjs/themes/prism-tomorrow.css';

    marked.use(gfmHeadingId());
    marked.use(mangle());

    export let content: string;
    $: parsed = marked.parse(content) as string;

    let container: HTMLDivElement;

    onMount(async () => {
        const Prism = (await import('prismjs')).default;
        await import('prismjs/components/prism-typescript');
        if (container) Prism.highlightAllUnder(container);
    });
<\/script>

<div bind:this={container} class="markdown-container">{@html parsed}</div>
\`\`\`

Üç şey değişti:

1. \`marked.use(...)\` modül scope'una taşındı. Hem prerender hem hydration sırasında
   çalışıyor, aynı extension'lar her iki ortamda da aktif.
2. \`parsed = marked.parse(content)\` reactive bir top-level statement. Component'ın
   render pass'ında senkron olarak çalışıyor, çıktısı diske giden HTML'de.
3. Prism syntax highlighting \`onMount\` içinde kalıyor, dynamic-import edilmiş.
   Prism import zamanında \`self\`'e dokunuyor, tarayıcıda sorun yok ama prerender
   worker'da var. Highlighting kozmetik — prerender'da kaybetmek JS yüklenene
   kadar görünmez, bu kabul edilebilir.

DOMPurify'ı da çıkardım. Orijinal kod marked'ın çıktısını ona pipe edip sonra inject ediyordu.
Bu sanitizer'ın bundle maliyetini + render-time maliyetini ödüyordu, ama input bizim
kendi \`?raw\`-import edilmiş markdown dosyalarımızdı, user content değil. Kendimize karşı
defans defansif tiyatroydu. Eğer kötü niyetli biri markdown kaynağına yazabiliyorsa,
output'u sanitize etmek yanlış katmanda yapmaktır.

Düzeltmenin sonucu:

\`\`\`
$ wc -c www/build/blog/four-tools-in-two-weekends.html
45292
$ grep -c "claudoscope" www/build/blog/four-tools-in-two-weekends.html
3
$ grep -c "TL;DR" www/build/blog/four-tools-in-two-weekends.html
1
$ grep -c "<h1 id=" www/build/blog/four-tools-in-two-weekends.html
1
\`\`\`

32 yerine 45 KB. 13 KB fark yazı gövdesi — Google'ın boş olarak gördüğü kısım.

## Anasayfa daha da kötüydü

Anasayfanın aynı problemin farklı bir versiyonu vardı. SvelteKit'in \`adapter-static\`'i
SPA-stil hosting için bir \`fallback\` seçeneği alır; bir path'in prerendered HTML
dosyası yoksa, sunucu fallback'i serve edip client-side router'ın çözmesine izin verir.

Config şuydu:

\`\`\`js
fallback: 'index.html'
\`\`\`

Bu fallback shell'i *\`index.html\`'e* yazar. \`/\`'deki home route'u da *aynı
index.html'e* prerender eder. Yani aynı path'e yazan iki operasyon var. Fallback kazanıyor,
çünkü adapter onu prerender'dan *sonra* yazıyor. 40 KB prerendered home, 13 KB
SPA shell ile eziliyor.

\`\`\`
$ wc -c www/build/index.html
13096
\`\`\`

Bu bundler'ın SPA'nın entry'si olarak emit ettiği bare HTML — sadece JS bundle'ları
için import'lar, gövde içeriği yok. \`/\`'a JS olmayan bir user agent ile gelen herkes
*bunu* alıyordu.

Düzeltme bir karakter niyet:

\`\`\`js
fallback: '200.html'
\`\`\`

\`200.html\` bazı statik host'ların (Surge, konfigüre edilmiş Netlify) "SPA fallback"
anlamında kullandığı bir konvansiyon. Statik adapter ismi umursamıyor; fallback'i ne
path verirsen oraya yazar. \`200.html\`'e rename etmek bilinmeyen path'ler için
fallback'i tutar, prerendered home ile çakışmaz.

\`\`\`
$ wc -c www/build/index.html
40871
\`\`\`

3.1× büyüme, hepsi gerçek render edilmiş home içeriği.

## Düzeltmenin ortaya çıkardığı üç sorun

Her biri yalnızca *bir öncekisi düzeltildiği için* görünür hale geldi.

### 1. Prerender worker OOM

Markdown gerçekten prerender sırasında parse edilmeye başlayınca, GitHub Actions
build'i şu hatayla başarısız olmaya başladı:

\`\`\`
Error [ERR_WORKER_OUT_OF_MEMORY]: Worker terminated due to reaching
memory limit: JS heap out of memory
\`\`\`

\`ubuntu-latest\` üzerinde varsayılan Node heap'i ~1.4 GB. Prerender adımı artık
gerçek iş yapıyordu — her blog yazısının markdown kaynağında \`marked.parse\`,
her biri 10–15 KB HTML üretiyor. 14 blog yazısı + diğer route'lardaki markdown
render'larıyla, worker sınırı aştı.

İki düzeltme:

\`\`\`yaml
env:
  NODE_OPTIONS: --max-old-space-size=4096
\`\`\`

Bu tek başına unblock etti. Belt-and-suspenders olarak, \`marked.use(...)\` çağrılarını
da guard'ladım ki Vite SSR modülü route'lar arası re-import etse de extension'lar
sadece bir kez kaydolsun:

\`\`\`ts
const __markedKey = '__omni_marked_configured__';
const __markedScope = globalThis as unknown as Record<string, boolean>;
if (!__markedScope[__markedKey]) {
    marked.use(gfmHeadingId());
    marked.use(mangle());
    __markedScope[__markedKey] = true;
}
\`\`\`

### 2. Prerender crawler render edilen HTML'deki her link'i takip ediyor

Birkaç blog yazısı çeviri veya \`contributing.md\` dosyalarına relative link'ler içeriyor —
referans verdikleri kaynak repolarda yaşayan ama site route'u olmayan \`[/i18n/README.tr.md]\`,
\`[/contributing.md]\` tarzı. Markdown rendering client-side iken bunlar \`<a>\` tag'lerine
hydrate oluyordu ama prerender crawler hiç görmüyordu.

Şimdi crawler görüyor, takip ediyor, ve 404'leri build hatası olarak değerlendiriyor:

\`\`\`
Error: 404 /contributing.md (linked from /skills/nextjs)
\`\`\`

Bunlar benim sahip olduğum site route'ları değil — yazı gövdeleri içindeki içerik
link'leri. Düzeltme prerender 404'lerini error'dan warning'e indirgemek:

\`\`\`js
prerender: {
    handleHttpError: 'warn',
    handleMissingId: 'warn'
}
\`\`\`

### 3. Shared host gh-pages'i çekmiyordu

Repo'nun CI'ı \`gh-pages\`'e deploy ediyor. \`ferhatatagun.com\` domain'i Spaceship shared
host'a point ediyor, ki ben oraya FTP ile yüklüyorum. İkisi alakasız, yani her CI deploy
gh-pages'i güncelliyor ve live site olduğu gibi kalıyordu.

Bu bir CI bug'ı değildi; deployment-pipeline'ın drift etmesine izin verdiğim bir şekildi.
Düzeltme kod değil — "gh-pages içeriklerini manuel olarak shared host'un \`public_html\`'ine
FTP'le ya da deploy pipeline'ını direkt push edecek şekilde yeniden kur". Bir seferlik
çözüm için FTP yolunu seçtim.

## Bir dahaki regresyonu shiplemeden nasıl yakalanır

Bu regresyonun aylarca hayatta kalmasının sebebi, doğrulamamın hiçbirinin JS kapalı
çalışmıyor olmasıydı. Bir dahakini engellemek için:

1. **Kritik bir route deploy sonrası her zaman view source yap.** DevTools değil —
   o hydrate edilmiş DOM'u gösterir. Tarayıcının "View Source"'u wire'a gelene bakar.
   İkisi trivial şekillerde farklı olmalı (hydration marker'ları, attribute sırası);
   *içerik* olarak farklı olmamalı.
2. **En önemli sentinel'ini \`curl | grep\` ile kontrol et.** Blog için: gövdede
   olduğunu bildiğin bir cümle. Ürün sayfası için: fiyat. Pazarlama sayfası için:
   value prop. 10 saniyelik deploy-sonrası kontrol yap.
3. **JavaScript kapalı bir kez test et.** Bu, major template değişikliği başına
   bir seferlik kontrol. Critical body text'in JS-disabled sayfada eksik olduğu
   ilk sefer, cevap elinde olur.
4. **Statik siteler için, zamanla sayfa boyutlarını diff'le.** Tek route'ta
   40 KB → 13 KB düşüş alarma neden olurdu. Benim alarm yoktu çünkü baseline
   ölçmemiştim.

SvelteKit özelinde, pattern tek kural: render edilen DOM'a veri materialize eden
her şey reactive veya top-level olmalı, \`onMount\` içinde değil. \`onMount\` sadece
browser-only side effect'ler için — DOM ölçümü, üçüncü-parti widget init, \`window\`
gerektiren her şey. İçerik üretimini oraya koyduğun an, prerender görmüyor.
Aynı şekil React'te (\`useEffect\`), Vue'da (\`onMounted\`), ve hydration'ı render'dan
ayıran her framework'te var.

## Bunun maliyeti

Bulmak için iki akşam. Düzeltmek için kırk beş dakika. Düzeltmenin ortaya çıkardığı
ikincil hatalarla başa çıkmak için üç follow-up commit.

Daha zor maliyet, her yazının gövdesinin boş olduğu aylarca süren indeksleme.
Google'ın o sayfalar için görüşünde şimdi başlık + OG image + boş bir \`<div>\` var.
Yazıların yedi tanesinin dev.to mirror'ları, ki \`canonical_url\` siteme point eden
şekilde yayımladım, orijinallerinden *daha* indekslenebilirdi.

Arama motorları yeniden tarayacak. Mirror'lar eventually yakalayacak. Ama bu
anında geri sarmayan tipte bir bug — düzeltmeden sonra doğru hamle taze sitemap
göndermek, en önemli URL'lerin reindex'ini talep etmek, ve beklemek.

İzlediğim kazanma koşulu, hatayı ortaya çıkaran aynı \`curl | grep\`, prod URL'sine
karşı koşturulduğunda:

\`\`\`
$ curl -s https://ferhatatagun.com/blog/four-tools-in-two-weekends \\
    | grep -c "TL;DR"
1
\`\`\`

Sıfır hatadır. Bir düzeltmedir.
`,K=`# Nobody's model failed. The interface did.

Three numbers, and they don't sit comfortably next to each other.

Postings for one job title — forward deployed engineer — went up roughly
**800% in 2025**. Total comp at the frontier labs settled somewhere around
**$350–550K** for mid-to-senior. And enterprise AI pilots still fail at a rate
that lands somewhere between **70% and 90%**, depending on whose survey you
read. One widely-cited figure has the share of companies abandoning AI
initiatives going from 17% to 42% in a single year.

If the models were the bottleneck, the fix would be a better model. Instead the
industry's answer has been to hire humans and put them inside the customer's
building. That is an unusual response to a technology problem. It's the response
you get when the thing that's broken isn't the technology.

So: what exactly keeps failing?

**TL;DR**

- The canonical FDE success story — OpenAI at Morgan Stanley — is about 6–8 weeks of technical scaffolding followed by roughly **four months** of getting advisors to actually use the thing. The reported win condition is **98% adoption**, not accuracy and not latency.
- An adoption number is not a model metric. It's a measure of whether a human decided to trust what was on their screen. That decision is made at the interface.
- The three places that trust reliably dies — hidden uncertainty, invisible cost, and a system that won't show its work — are all rendering decisions, not modelling decisions.
- FDE roles are written and staffed as backend/ML/infra roles. Read a dozen job specs and count how many mention what the operator sees. The failure surface and the hiring surface don't line up.
- This isn't an argument that the backend doesn't matter. It's an argument that the backend is the six weeks, and the last mile is the four months.

## The number that doesn't fit

Every write-up of the forward-deployed model eventually reaches for the same
case study: OpenAI's engineers embedded at Morgan Stanley, building an assistant
for wealth advisors.

The part everyone quotes is the ending — 98% adoption. The part worth staring at
is the shape of the timeline that produced it. Roughly six to eight weeks of
technical scaffolding: integration, data plumbing, evals. Then about four months
of running pilots with actual advisors.

Four months. After the system worked.

Whatever was happening in those four months, it wasn't model training. The model
was done. The integration was done. What remained was a group of experienced
professionals deciding, one at a time, whether they were willing to put their
name on an answer a machine produced.

That is the last mile. And notice how it's measured: not "the model scored 0.91
on our eval set" but "98% of them use it." A deployment that nobody opens is
indistinguishable from a deployment that doesn't work.

## Adoption is an interface number

Here's the reframe I'd argue for.

We treat adoption as a change-management problem — training sessions,
champions, executive mandates. Some of that is real. But most of what determines
whether a professional trusts a system is not a memo. It's the accumulated
experience of using it: what it showed them, what it hid, and whether it was
honest about the difference.

A wealth advisor doesn't trust a model because someone told them its F1 score.
They trust it because over three weeks it never confidently handed them
something wrong without warning them first — and when it *was* unsure, it said
so in a way they could act on.

That's not a model property. That's a rendering property. It's a decision
somebody made about what appears on screen when the confidence is 0.51 instead
of 0.98.

## Three places trust dies — all of them on screen

I'd argue there are three recurring failure modes in AI-powered interfaces, and
none of them is a model defect.

**1. Uncertainty is flattened.** The model returns something it half-guessed,
formatted identically to something it's certain about. Same font, same
confidence, same tone. The operator has no way to distinguish. They find out the
hard way — once — and after that they double-check everything, which means the
system has stopped saving them time, which means they stop using it.

The fix is a design decision: give low-confidence output a different affordance.
Not a scary red banner. Something that says *check this one* in a way a busy
person will actually parse at a glance.

**2. Cost is invisible until the invoice.** The people who approve the renewal
are not the people using the tool. If the only time the budget owner sees a
number is on the monthly bill, every conversation about the system is a
conversation about a surprise. I've written about
[why nobody measures prompt caching](https://ferhatatagun.com/blog/prompt-caching-nobody-measures)
and about
[pre-flighting a prompt before you send it](https://ferhatatagun.com/blog/see-the-prompt-before-you-ship-it),
and both of those posts were, in retrospect, about this: cost is a first-class
piece of interface state, and treating it as an ops metric hides it from the
person who decides whether the project survives.

**3. The system won't show its work.** When output is wrong and the operator
can't see *why*, they don't file a bug — they lose confidence in the whole
thing, including the parts that were right. A system that can't be inspected
can only be trusted or abandoned, and people abandon.

This is why I ended up building
[trace replay for agent runs](https://ferhatatagun.com/blog/debug-claude-agents-by-replaying-traces).
Not because traces are interesting, but because "why did it do that" is the
question that decides whether a deployment survives its first bad week.

Every one of these three is fixed in the interface layer. None of them is fixed
by a better model.

## The strongest version of the counter-argument

Let me argue the other side properly, because the weak version is easy to knock
down and I don't want to do that.

The serious objection goes: *the last mile isn't a UI problem, it's a data
problem.* The customer's schema is undocumented. Half the workflow lives in a
spreadsheet somebody's assistant maintains. The API you were promised doesn't
exist. Nothing renders correctly because nothing is correct upstream. The head
of OpenAI's FDE team has said more or less this — that what a customer describes
during scoping routinely fails to match the reality of the systems on the
ground.

That is true, and it's the hardest part of the job. I'm not disputing it.

But look at the timeline again. That work is the six weeks. It's necessary and
it is absolutely not sufficient, and the evidence is that the project didn't
succeed at week eight — it succeeded four months later, after a completely
different kind of work.

Both halves are real. My claim is narrower than "UI is what matters." It's:
the second half is the larger half, it's the half where projects actually die,
and it's the half almost nobody is being hired against.

## The hiring gap

Go read a batch of forward-deployed engineer job specs. You'll see: production
LLM experience, advanced prompt engineering, agent frameworks — LangGraph,
LangChain, CrewAI, DSPy — evaluation frameworks, deployment at scale,
multi-step tool-use chains, sometimes air-gapped and bare-metal provisioning.

All of it legitimate. All of it necessary.

Now count the lines about what the operator sees. About how uncertainty is
surfaced. About whether the person doing the work can tell the difference
between a confident answer and a guess.

The role was defined by people solving the integration problem, and it was
staffed by people who are excellent at the integration problem. Meanwhile the
number everyone reports as the win condition — adoption — is decided somewhere
else entirely.

I don't think this is a conspiracy or an oversight by unserious people. I think
it's what happens when a role gets invented under time pressure by the
discipline that noticed the problem first. Palantir invented this model in the
2000s for intelligence customers who literally could not describe what they
needed. The problem then really was mostly data and access. The problem now has
a large human-facing component, and the job description hasn't caught up.

## What I'd actually do this week

If you're shipping an AI feature into somebody else's workflow, three concrete
moves, in order of how cheap they are:

**1. Give uncertainty a visual identity.** Pick one signal your model already
emits — a confidence score, a refusal, a low-agreement result from two sampled
runs — and render it differently. One afternoon of work. It converts your
system from "trust it or don't" into "trust it here, check it there," and that
distinction is the entire difference between a tool people keep and a tool
people quietly stop opening.

**2. Put cost on screen for whoever signs the renewal.** Not in a dashboard they
have to remember to open. In the thing they already look at. A number that
updates is a number that never becomes a surprise, and surprises are what kill
renewals.

**3. Make one thing inspectable.** Pick the single most consequential decision
your system makes and give the operator a way to see how it got there. Not full
observability — one path, one explanation. The first time something goes wrong,
that path is the difference between a bug report and a lost account.

None of these require touching the model. All of them move the number the FDE
model says is the win condition.

## Where this goes next

If the argument holds — that the last mile is substantially an interface
problem — then there's a follow-on question worth taking seriously: what does an
engineer working that mile actually carry?

Because the constraints are brutal and specific. You're in someone else's
environment. You can't install anything without a six-week security review. The
data can't leave their boundary. Every dependency you bring is a question their
security team gets to ask. And you still need to answer "why did it do that"
while a stakeholder watches over your shoulder.

I've spent a year building tools under exactly those constraints, and until
recently I thought I was doing it for aesthetic reasons.

That's the next post.

---

*Part one of a series on the last mile of enterprise AI.
Part two: [I accidentally built a forward-deployed engineer's field kit](https://ferhatatagun.com/blog/accidental-fde-field-kit) ·
Part three: [The deliverable isn't the prompt. It's the eval.](https://ferhatatagun.com/blog/the-eval-is-the-deliverable) ·
Part four: [You're not done when it works. You're done when they can change it.](https://ferhatatagun.com/blog/done-when-they-can-change-it) ·
Part five: [The second customer tells you what you actually built](https://ferhatatagun.com/blog/the-second-customer)*
`,L=`# I accidentally built a forward-deployed engineer's field kit

A year ago I deleted \`@anthropic-ai/sdk\` from a project and wrote about 150
lines of TypeScript to replace it.

The reason I gave myself was honest and boring. The SDK pulled \`node:fs/promises\`
in through an agent-toolset module, which broke the browser bundle. I could have
waited for a browser-clean entry point. Instead I hand-rolled an SSE parser and
[wrote a post about why](https://ferhatatagun.com/blog/browser-only-claude-streaming).

I filed that away as a bundler story.

Then I read a line in a piece about tooling for forward-deployed engineers — the
people who get sent into a customer's building to make an AI deployment actually
work. Roughly: every framework dependency is something the customer's security
team will ask about, and bare-metal code is easier to debug in an environment
that isn't yours.

Same decision. Same reasoning. Different discipline, different job title,
different problem entirely — except it wasn't a different problem.

I hadn't been solving a bundler issue. I'd been solving a *deployment* problem
without ever naming it, which is why I mistook it for taste.

This post is what happened when I went back through every architectural decision
in the five tools I've shipped and asked a question I'd never asked: what
constraint was actually operating here?

**TL;DR**

- Five tools, all browser-only, all BYOK, none with a backend. I picked those for what felt like preference and mild laziness.
- They are, almost exactly, the constraints of working inside someone else's regulated environment: nothing to install, no data leaving the boundary, nothing for a security team to threat-model, minimal dependency surface to defend.
- Constraints converge. Two disciplines solving the same *shape* of problem land on the same engineering decisions without talking to each other.
- Mapped against the four categories FDE tooling usually gets split into — observability, evaluation, orchestration, guardrails — I have three. The fourth is missing, and pretending otherwise would be the least interesting thing I could do.
- The transferable part isn't my repos. It's that an articulated constraint is what separates a tool from a toy, and most side projects never articulate one.

## The decision, and the reason underneath it

Here's the thing about the SDK call that I got wrong at the time.

I framed it as: *the SDK doesn't work in my environment, so I'll write the
minimum that does.* Reasonable. What I actually did was reduce the tool's
dependency surface to \`fetch\` and a \`TextDecoder\` — and the consequence of that,
which I did not think about even once, is that the entire runtime is
inspectable. There's no framework doing something clever between my code and the
wire. When a stream terminates weirdly, I read my own parser.

That property is worthless when you're debugging on your own laptop with a
debugger attached and all the time in the world.

It is the whole game when you're on a call with someone else's engineer, in
someone else's network, and they ask why the response cut off, and the honest
answer needs to arrive in the next ninety seconds.

I didn't build it for that. But that's what it is.

## Four more decisions, same shape

Once I started looking, the pattern didn't stop.

**BYOK — bring your own key.** What I told myself: I don't want to run a proxy,
I don't want to hold anyone's credentials, and I *really* don't want to pay for
strangers' tokens. All true. What it actually is: the customer's key never
leaves their browser and their prompt never touches infrastructure I control.
There's no data-processing agreement to negotiate because there's no data
processing. The "I'm too lazy to run a backend" version and the "this passes a
compliance review" version are the same architecture.

**No backend at all.** What I told myself: static hosting is free and I don't
want to maintain servers for a side project. What it actually is: there is no
server to threat-model, no attack surface to document, no uptime story to tell,
and no vendor security questionnaire that takes six weeks to clear. The thing a
security team can approve fastest is the thing that doesn't exist.

**Every tool is a URL.** What I told myself: it's easier to share a link than to
tell someone to clone a repo and run \`npm install\`. What it actually is: zero
install. Nothing enters the customer's machine. The people who most need a
diagnostic tool are exactly the people who are least permitted to install one.

**Cost rendered live, not logged.** What I told myself: the number is
interesting and I wanted to see it move. What it actually is: the person who
approves the renewal can read it without asking anyone. I made [an entire
argument](https://ferhatatagun.com/blog/prompt-caching-nobody-measures) about
prompt caching being the cheapest optimization nobody measures, and I still
framed it as an engineering-hygiene issue. It isn't. It's a
[trust issue](https://ferhatatagun.com/blog/nobodys-model-failed), and trust is
what decides whether a deployment survives.

Four decisions. Four reasons I gave at the time that were true but shallow. One
constraint underneath all of them that I never said out loud.

## What browser-only actually costs

I don't want to make this sound cleaner than it is, so let me argue against
myself for a second.

Browser-only is a genuinely bad choice for a lot of software. You get no
server-side secret handling. You fight CORS constantly — and for some providers
you simply lose, because they don't send the headers and there's nothing you can
do about it from a tab. You have no durable storage worth the name, no scheduled
jobs, no background processing, no way to do anything computationally serious.
You can't build a product this way. I'm not going to pretend you can.

But none of those limitations bind on a *diagnostic instrument*.

A multimeter doesn't need a database. The tool that tells you why the system is
behaving strangely is not the system. It has to be trustworthy, portable, and
readable — and it has to work at the exact moment when everything heavier is
unavailable to you. Every constraint I listed as a cost is irrelevant to that
job, and two of them (no storage, no server) are the reason it can be used at
all in a place that would reject a real deployment.

The limitation and the qualification are the same fact viewed from two sides.

## The map

FDE tooling gets described, fairly consistently, in four categories: agent
orchestration, evaluation, guardrails, and observability. I went and put my
things in the boxes.

| Category | Tool | What it does |
|---|---|---|
| Observability | [claudoscope](https://claudoscope-labs.vercel.app) | X-rays a live call — token composition, cache reads and writes, cost, as the response streams |
| Observability / debugging | [agent-replay](https://agentreplay.vercel.app) | Replays a finished agent trace as a timeline instead of a wall of nested JSON |
| Pre-flight | [context-lens](https://context-lens-sigma.vercel.app) | Counts the prompt before you send it — window position, cost, caching boundaries |
| Evaluation | [prompt-lab](https://prompt-lab-promptly.vercel.app) | Two prompts, one input, side by side on output, latency and cost |
| Orchestration | [tool-lab](https://tool-lab-bice.vercel.app) | Sandboxes the tool-use loop — define tools, mock responses, drive it by hand |
| **Guardrails** | — | — |

Three categories covered, one pre-flight bonus, one hole.

I want to be careful here, because there's a version of this post that's a
portfolio tour with an FDE hat on, and that version is worthless. So: I didn't
plan this map. It's a retrofit. The tools were built one at a time over a couple
of weekends each, and the only through-line I could have articulated at the time
was ["make the Claude API
legible"](https://ferhatatagun.com/blog/four-tools-in-two-weekends). The
categories came from somebody else's discipline. The fit is real, and it's also
an accident, and both of those things can be true.

## The gap I can't paper over

Guardrails is missing, and it's the one that would hurt most in the field.

Guardrails is the layer that keeps model output inside a shape your code can
safely consume. You ask for \`{"risk": "high"|"medium"|"low", "score": 0-100}\`.
What actually comes back, across enough calls:

- the JSON wrapped in a markdown fence
- \`"HIGH"\` instead of \`"high"\` — enum drift
- \`"very high"\` — an enum value that doesn't exist, invented on the spot
- \`"score": "85"\` as a string, silently breaking arithmetic downstream
- \`score\` missing entirely
- a sentence of prose before the JSON starts

Every one of those either crashes your parser or, worse, doesn't — and quietly
puts a wrong category on someone's dashboard.

The reason this needs an instrument rather than a unit test is that the failures
are **distributional**. You run it once, it works, you ship. Then one call in
forty returns a hallucinated enum, and you never see it, because you looked at
one sample. What you need is the failure *rate*, broken down by failure type,
across fifty runs. That's a different question than "does it work."

So that's the sixth tool, and it's the honest one to build next: define a
schema, run a prompt against it N times, show the distribution of ways it
breaks. Same constraints as the rest — browser-only, BYOK, no backend, because
by now those aren't a preference, they're the spec.

## Why any of this generalizes

Strip out my repos and there's one idea left worth keeping.

Most side projects have no constraint. That's why they read as toys — not
because they're small or unfinished, but because nothing about them was *forced*.
Any decision could have gone the other way and nothing would have broken. A
reader can feel that.

A tool with an articulated constraint reads completely differently, even when
it's fifty lines. "This runs in a tab because it has to work where nothing can
be installed" is a design brief. "This is a React app" is not. The first one
tells you what the author was up against; the second tells you what they typed.

The uncomfortable part, for me, is that I had the constraint the whole time and
couldn't name it. I shipped five things under a rule I was following
unconsciously, and because I never said it out loud, I also couldn't tell you
what the work was evidence *of*. It looked like five small tools. It was a
position.

If you're a frontend engineer looking at the current AI hiring market and
wondering how to become legible to it: you very likely already have
constraint-shaped work sitting in your repos. The move isn't to build something
new. It's to go back and figure out what you were actually solving for, and then
say it in the README.

Mine took a year and a stranger's sentence about security teams.

---

**Update, 1 September 2026.** The gap is closed. I built the sixth tool —
[guard-lab](https://guard-lab.vercel.app) — more or less to the spec in the
section above: define a schema, run a prompt against it N times, show the
distribution of ways it breaks.

Two things I got wrong while writing this. I described the job as reporting a
failure *rate*, and a rate on its own turns out to be the misleading version:
what matters is the split between failures that throw, failures you can strip,
and the ones that parse cleanly and are wrong. Only the third kind is
invisible, and it's the entire reason to build the thing. I also hadn't
thought about the clean run — fifty passes with no failures reads as proof and
isn't one, so the tool reports an interval rather than a reassuring zero.

There is also now a seventh, [perf-lab](https://perf-lab-topaz.vercel.app),
which is about performance budgets rather than the Claude API. The count in
this post is left at five because that's what was true when it was written.

---

*Part two of a series on the last mile of enterprise AI.
Part one: [Nobody's model failed. The interface did.](https://ferhatatagun.com/blog/nobodys-model-failed) ·
Part three: [The deliverable isn't the prompt. It's the eval.](https://ferhatatagun.com/blog/the-eval-is-the-deliverable) ·
Part four: [You're not done when it works. You're done when they can change it.](https://ferhatatagun.com/blog/done-when-they-can-change-it) ·
Part five: [The second customer tells you what you actually built](https://ferhatatagun.com/blog/the-second-customer)*
`,R=`# The deliverable isn't the prompt. It's the eval.

Every field guide to forward-deployed work says a version of the same thing:
define your evaluation framework *before* you build anything.

And every engineer who has actually landed in a customer's environment has had
the same reaction, which is: with what?

On day three you don't have labelled data. You don't have domain expertise —
the people who do are the ones you're building for, and they're busy. You have
five examples someone showed you on a shared screen, a workflow that diverges
from its documentation in ways nobody has written down, and a rough sense that
the current process takes too long. Building a golden dataset off that is not a
task. It's a fantasy.

So the advice gets skipped. Not out of laziness — out of practicality. And then
about ninety days later the system starts drifting, quietly, and nobody notices
until the customer does.

I think the advice is right and the framing is wrong. You're not being told to
skip evals. You're being told to build the wrong kind first.

**TL;DR**

- Standard eval guidance — golden datasets, rubrics, labelled examples — is correct and close to unusable in week one, which is exactly when it's prescribed.
- "Eval" is doing double duty for two different questions. *Is this output good?* needs ground truth. *Did this change?* needs only a snapshot.
- The second one is buildable on day three, and it catches most of what actually kills deployments: silent drift after a prompt edit, a model version bump, a parameter change nobody logged.
- Don't diff prose — LLM output is nondeterministic and you'll drown in noise. Diff the **decision**: the structured claim underneath the words.
- The regression harness then writes your golden dataset for you. Every failure it catches is a labelled example you didn't have to imagine.
- This is why the eval is the deliverable. When you leave, the prompt is a text file anyone can edit — and someone will. The eval is what tells them whether the edit was safe.

## Two different questions wearing the same word

Here's the distinction that unlocked this for me.

| | Quality eval | Regression eval |
|---|---|---|
| Question | Is this output correct? | Did this change from what we accepted? |
| Needs | Ground truth, domain expertise, rubric | A frozen snapshot |
| Buildable on day 3 | No | Yes |
| Catches | Bad design | Silent drift |
| Cost to build | Weeks | An afternoon |

We call both of them "evals," which is how the cheap one gets postponed
alongside the expensive one.

The expensive one is genuinely expensive and genuinely later. The cheap one has
no prerequisites at all, and skipping it is what turns a working deployment into
a mysteriously-degraded one.

## What you can actually build on day three

Concretely, five steps, none of which require you to know what "good" means:

**1. Collect real inputs.** Not synthetic ones. Sit with whoever does the work
and take five to ten actual cases off their screen — including the two weird
ones they apologise for. The weird ones are the whole point; they're where the
system will break and where the documentation is silent.

**2. Run them and print the output.** No scoring, no rubric.

**3. Get a binary from the person who owns the workflow.** Not "rate this 1–5."
Just: *would you have been comfortable if the system did this on its own?* Yes
or no. People are fast and reliable at this and slow and unreliable at rubrics.

**4. Freeze the yeses.** That file is your eval. It is not a prototype of an
eval, it is the thing.

**5. Re-run it on every change.** Prompt edit, model bump, parameter tweak,
context restructure. Anything.

The frozen file is boring on purpose:

\`\`\`json
[
  {
    "id": "claim-2024-0871",
    "input": "…the actual case, verbatim…",
    "decision": { "risk": "high", "route": "manual-review" },
    "acceptedBy": "ops lead",
    "acceptedOn": "2026-03-04"
  }
]
\`\`\`

And the runner is about twenty lines:

\`\`\`ts
for (const c of frozen) {
  const output   = await run(currentPrompt, c.input);
  const decision = extractDecision(output);      // structured claim only

  if (!deepEqual(decision, c.decision)) {
    report({ id: c.id, was: c.decision, now: decision });
  }
}
\`\`\`

That's it. There's no framework here, and there shouldn't be. It's a habit with
a file attached.

## Diff decisions, not prose

The obvious objection: LLM output is nondeterministic. Diffing it produces
nothing but noise. Correct — if you diff the wrong thing.

Run the same prompt twice and the prose will differ. Word order, hedging, how
the explanation is structured. None of that is a regression. If you string-diff
the response body, every run fails and you'll turn the harness off inside a week.

So don't. Extract the **decision** and diff that.

Almost every useful LLM step in a production workflow reduces to a small
structured claim buried in the prose: a category, a number, a routing choice, a
yes/no. The prose around it is presentation. The claim is the behaviour.

\`\`\`ts
// prose varies; this must not
type Decision = {
  risk: 'high' | 'medium' | 'low';
  route: 'auto' | 'manual-review';
};
\`\`\`

If the model routes claim-0871 to \`manual-review\` on Monday and \`auto\` on
Friday, that is a regression regardless of how nicely it explained itself. If it
routes it to \`manual-review\` both times using completely different sentences,
nothing happened.

This also has a side benefit I didn't anticipate: forcing yourself to name the
decision type clarifies the design. If you can't write that type down, you don't
yet know what the model is for — and a step whose output can't be reduced to a
claim is usually a step that should have been two steps.

## What this catches that nothing else does

Every one of these is real, silent, and invisible without a frozen set:

- **The prompt edit that fixes case A and breaks case D.** The most common one. You improve something in response to a complaint, ship it, and quietly regress a case nobody complained about *yet*.
- **A model version bump.** Behaviour shifts at the margins. Your happy path is fine. Your two weird cases aren't.
- **Parameter drift.** Somebody changes temperature during debugging and doesn't change it back.
- **Length-induced behaviour change.** Input grows over months; the model starts truncating or de-prioritising instructions that used to hold. I've written about [seeing this before you ship](https://ferhatatagun.com/blog/see-the-prompt-before-you-ship-it) — the frozen set is how you find out it already happened.
- **A caching boundary move.** Someone interpolates a timestamp into what used to be a stable prefix. Cost triples. [Nobody's watching that number either.](https://ferhatatagun.com/blog/prompt-caching-nobody-measures)

None of these announce themselves. All of them show up as a diff in a
twenty-line script.

## Where this is weaker than it sounds

I'd rather say this than have you find out.

**You can freeze a bug.** If the day-three output was subtly wrong and got a
yes, you've now enshrined it and your harness will defend it. The mitigation is
unglamorous: revisit the frozen set once you know more, and treat early
acceptance as provisional rather than permanent.

**Small N misses things.** Ten cases will not cover a workflow with real
variety. It's a floor, not a ceiling — but a floor you have on day three beats a
ceiling you get in month three.

**It says nothing about quality.** A regression harness will happily confirm
that your mediocre system is still exactly as mediocre as it was. That's a real
limitation, and it's why this is the *first* eval rather than the only one.

## The upgrade path is free

Here's the part I like.

Every failure the regression harness catches is a labelled example. Case D broke
when you fixed case A? You now have a case with a known-correct answer and a
known failure mode, discovered from real behaviour rather than imagined during a
planning meeting.

After a month of this you're not starting a golden dataset from zero. You're
curating one that assembled itself out of actual failures — which is a
substantially better dataset than one written in advance by someone guessing at
what might go wrong.

The cheap eval isn't a compromise you eventually replace. It's the collection
mechanism for the expensive one.

## Why this is the deliverable

I've made a version of this argument before, for a solo developer choosing
between two prompts — that [you don't remember your prompt being better, you
just remember it being better](https://ferhatatagun.com/blog/stop-choosing-prompts-by-vibes).
That post was about self-deception on a personal scale, and the stakes were an
afternoon.

The stakes change when you hand something over.

When you leave, the prompt is a text file. Someone will edit it — reasonably,
for a good reason, in response to a real complaint. That's not a failure mode,
that's the system working. The failure mode is that they have no way to know
what their edit cost somewhere else.

A prompt without an eval is a config file nobody is allowed to touch, which
means either it never improves or it degrades unpredictably. Both are how a
deployment dies quietly. A prompt *with* a frozen set is something a team can
actually own after you're gone — and whether they can own it is the thing that
decides if the work survives.

Which is the real subject of the next post: not what you build, but what you
leave behind.

---

*Part three of a series on the last mile of enterprise AI.
Part one: [Nobody's model failed. The interface did.](https://ferhatatagun.com/blog/nobodys-model-failed) ·
Part two: [I accidentally built a forward-deployed engineer's field kit](https://ferhatatagun.com/blog/accidental-fde-field-kit) ·
Part four: [You're not done when it works. You're done when they can change it.](https://ferhatatagun.com/blog/done-when-they-can-change-it) ·
Part five: [The second customer tells you what you actually built](https://ferhatatagun.com/blog/the-second-customer)*
`,N=`# "That library will hurt performance" is not a number

Somebody in the room says the marketing team's chat widget is making the site slow. Somebody else says it drives a third of the qualified leads. Both are probably right, neither has a number, and the decision gets made by whoever sounds more confident. Two sprints later the widget is still there and the page is still slow.

I've been on both sides of that conversation and I've never once seen it settled with evidence. Not because the evidence is hard to get — because the tool that would produce it doesn't exist. Every performance tool we have reports in the present tense. Lighthouse tells you what the page costs. WebPageTest tells you what the page costs, in more detail. CrUX and RUM tell you what the page costs, for real users. All of them answer "what is this page doing right now", and none of them answers the question the meeting is actually about, which is **"what would it cost without that"**.

So I built [**perf-lab**](https://perf-lab-topaz.vercel.app). Drop in a Lighthouse JSON report, switch resources off, and watch the score move. It turns *"that library will hurt performance"* into *"that library costs 0.4 s of LCP and 7 points"* — which is a sentence you can put in a ticket.

**TL;DR**

- Every performance tool is a measurement tool. The decisions teams argue about are counterfactual, and nothing measures counterfactuals.
- A projection is only worth arguing with if it lands on the scale the stakeholders already screenshot, so perf-lab reimplements Lighthouse's actual scoring — the log-normal curves, the published control points, the category weights. On a real report it recomputes 57 against Lighthouse's reported 57.
- Ranking by bytes is actively misleading. A 410 KB image that finishes loading after LCP is worth **zero points**; a 124 KB render-blocking script is worth **eleven**.
- Savings overlap. Four independent "+7 point" fixes do not add up to 28, and a tool that implies they do is setting up a disappointing retro.
- Everything is a delta against measured values, never an invented absolute — and where a number is modelled rather than measured, the UI says so.

## Why the score has to be Lighthouse's score

The first version of this idea I sketched had its own 0–100 index. It was useless within a day.

The whole point is to end an argument, and the argument is being had by people who look at Lighthouse. If my tool says "this saves you 12 points" on a scale I invented, the reply is "twelve of *what*", and now we're arguing about my scale instead of about the chat widget. The projection has to arrive in the same units as the screenshot in the ticket.

So \`scoring.ts\` is a reimplementation of the real thing. Lighthouse doesn't score metrics linearly — it maps each one through a log-normal curve calibrated to two control points, the 10th percentile of real sites and the median:

\`\`\`ts
export const METRIC_WEIGHTS = {
  fcp: 0.1, si: 0.1, lcp: 0.25, tbt: 0.3, cls: 0.25
} as const;

export const CONTROL_POINTS = {
  fcp: { p10: 1800, median: 3000 },
  si:  { p10: 3387, median: 5800 },
  lcp: { p10: 2500, median: 4000 },
  tbt: { p10: 200,  median: 600  },
  cls: { p10: 0.1,  median: 0.25 }
};
\`\`\`

Two things fall out of those numbers that are worth internalising even if you never open the tool.

**TBT is 30% of your score and CLS is 25%.** Together, two metrics that have nothing to do with how fast the page *looks* are 55% of the number. LCP — the one everybody talks about — is 25%.

**The curve is brutal near the top and forgiving in the middle.** Going from 4.0 s to 3.5 s of LCP buys you very little. Going from 2.8 s to 2.4 s buys you a lot. Which means "we improved LCP by half a second" is not a fact you can price without knowing where you started.

I did eventually verify the reimplementation rather than trusting it, which I should have done far earlier than I did. I ran real Lighthouse against my own site and fed the JSON straight into the parser:

\`\`\`
reported: 57   recomputed: 57
\`\`\`

That agreement is the entire credibility of the tool. There's a \`scripts/probe.ts\` in the repo whose first line of output is exactly that comparison, so if the implementation ever drifts from Lighthouse's, it fails loudly instead of quietly producing plausible numbers on the wrong scale.

## The inversion that makes byte-sorted reports lie

Here's the demo page perf-lab ships with — a fairly ordinary marketing page, 1.1 MB, scoring 57. Sorted by what removing each resource is actually worth:

| Resource | Size | Worth |
|---|---|---|
| \`consent-banner.js\` | 124 KB | **+11** |
| \`intercom.js\` | 168 KB | **+11** |
| \`framework.bundle.js\` | 178 KB | **+10** |
| \`gtm.js\` | 92 KB | **+7** |
| \`below-fold-gallery.webp\` | **410 KB** | **0** |

The biggest file on the page is worth nothing. It's a gallery image below the fold that finishes loading after LCP has already fired, so it was never on the critical path — removing it makes the page lighter and doesn't make it faster. Meanwhile the third-smallest file in that list is worth eleven points, because it blocks rendering.

This is not an exotic edge case. It's the normal shape of a web page, and it's why the "largest assets" table in every performance report sends teams to optimise the wrong thing. The question was never *what is heavy*. It's *what is heavy **and** on the critical path*.

## The bug that proves the point

I want to be straight about this one, because it's the most useful thing in the post.

I shipped the tool, opened it, and the demo showed \`below-fold-gallery.webp\` at **+12 points** — the exact inversion the tool exists to correct, in the tool, on the first screen. Removing any resource shrank the total transfer, and I was applying the transfer saving to FCP and LCP without first checking whether the resource had anything to do with them.

I fixed that, and then found a second version of the same mistake hiding one layer down, in the parser:

\`\`\`ts
beforeLcp: endTime <= metrics.lcp || startTime <= metrics.lcp
\`\`\`

Almost every request on a page *starts* before LCP fires. That second clause marked nearly everything as critical-path, which quietly dismantles the tool's central claim on every real report.

It survived because the sample data sets \`beforeLcp\` by hand, so the demo — the thing I kept looking at — never went through that code path. The only way to catch it was to run a real Lighthouse report through the parser, which I hadn't done until the tool was already live. **The demo data that makes a tool easy to show off is the same data that stops you testing the part that matters.**

## Savings don't add up, and pretending they do is worse than useless

First version ranked every resource against the untouched report. Which reads fine, until you notice it's promising each removal the full win independently — four "+7 point" fixes that sum to 28 on the slide and 11 in production, because they overlap. Once you've dropped two analytics tags, TBT has already come down, and the third tag has less left to give back.

So the ranking is now marginal: it re-simulates against whatever you've already switched off. In the demo, removing Intercom drops the hero image from **+11 to +6** — same file, same bytes, worth half as much once LCP has already moved.

That behaviour turned out to be the most persuasive thing in the tool. Watching the list re-sort as you strip things out teaches the overlap in about fifteen seconds, and it's the sort of thing teams normally learn in a retro.

## What's measured and what's modelled

A tool that projects the future can very easily become a tool that makes things up confidently. The rule I held to: **never invent an absolute number when a measured one exists.** Everything works on deltas applied to the metrics Lighthouse actually recorded, so the baseline is always ground truth and only the difference is modelled.

Taken straight from the report: transfer size and timing per request (\`network-requests\`), parse and execute time per script (\`bootup-time\`), render-blocking status *and its measured saving* (\`render-blocking-resources\`), third-party attribution (\`third-party-summary\`).

Modelled, and therefore approximate: transfer time recovered on a throttled connection, how much of a script's execution lands inside the TBT window, and whether removing something moves LCP. Even the TBT fraction is anchored to the report rather than to an industry average — it uses the ratio *this page* exhibited, measured TBT over total measured CPU.

Every projection carries a confidence label — \`measured\`, \`modelled\`, or \`speculative\` — that degrades as you move away from the conditions the report was captured under. Change the throttling preset and remove something Lighthouse never measured, and the tool tells you it's directional only, rather than handing you a number with false authority.

## It found a bug on the site it's published from

The real Lighthouse run I'd done to verify the scoring was against my own \`/tools\` page. Having gone to the trouble, I read the rest of it.

Mobile score 57. LCP 7.2 s, which the curves price at roughly 23 of the 43 points I was losing. And the LCP element — named right there in the report — was the first tool card's screenshot.

Every card image on that page was marked \`loading="lazy"\`.

The one image the score is measured on was the one I was deliberately deferring. Lazy-loading is good practice, I'd applied it uniformly, and applying it uniformly is exactly the mistake: the LCP element must never be lazy. First card is now \`eager\` with \`fetchpriority="high"\`, the rest stay lazy.

The tool also flagged 238 KiB sitting in PNGs that should have been WebP. Converting them saved 620 KB.

I'd been working on that page for weeks, with SEO and performance explicitly in mind, and I'd have kept not seeing it. That's the argument for the whole category, really. Measurement tells you the page is slow. You already suspected that. What changes a decision is knowing what it would cost to be otherwise — and until you can put a number on the counterfactual, the loudest person in the room is going to keep being right.

---

**[perf-lab](https://perf-lab-topaz.vercel.app)** is free, open source, and browser-only — the report is parsed in your tab and nothing is uploaded, which matters when the report came from a client's staging environment. Source on [GitHub](https://github.com/ferhatatagun/perf-lab).

Generate a report with:

\`\`\`
npx lighthouse https://example.com --only-categories=performance \\
  --output=json --output-path=./report.json
\`\`\`

Or DevTools → Lighthouse → run → ⋮ → *Save as JSON*. No report handy? There's sample data one click in.
`,j=`# "Performansı bozar" dediğin şey bir sayı değil

Odada birisi marketing'in chat widget'ının siteyi yavaşlattığını söylüyor. Bir başkası o widget'ın nitelikli lead'lerin üçte birini getirdiğini söylüyor. Muhtemelen ikisi de haklı, hiçbirinin elinde sayı yok, ve karar daha kendinden emin konuşana kalıyor. İki sprint sonra widget hala orada ve sayfa hala yavaş.

Bu konuşmanın her iki tarafında da bulundum ve bir kez bile kanıtla bittiğini görmedim. Kanıtı bulmak zor olduğundan değil — o kanıtı üretecek araç yok olduğundan. Elimizdeki bütün performans araçları şimdiki zamanda rapor veriyor. Lighthouse sana sayfanın maliyetini söylüyor. WebPageTest sana sayfanın maliyetini daha detaylı söylüyor. CrUX ve RUM sana sayfanın gerçek kullanıcılardaki maliyetini söylüyor. Hepsi "bu sayfa şu an ne yapıyor" sorusuna cevap veriyor, hiçbiri toplantının asıl konusu olan **"o şey olmasa ne olurdu"** sorusuna cevap vermiyor.

Ben de [**perf-lab**](https://perf-lab-topaz.vercel.app)'i yazdım. Bir Lighthouse JSON raporu bırak, kaynakları tek tek kapat, skorun hareket edişini izle. *"Bu kütüphane performansı bozar"*ı *"bu kütüphane 0.4 s LCP ve 7 puana mal oluyor"*a çeviriyor — ki bu, ticket'a yazabileceğin bir cümle.

**TL;DR**

- Bütün performans araçları ölçüm aracı. Ekiplerin tartıştığı kararlar ise karşı-olgusal, ve karşı-olguyu hiçbir şey ölçmüyor.
- Bir projeksiyon ancak paydaşların zaten ekran görüntüsünü aldığı skalaya düşerse tartışılmaya değer. Bu yüzden perf-lab Lighthouse'un gerçek skorlamasını yeniden yazıyor — log-normal eğriler, yayınlanmış control point'ler, kategori ağırlıkları. Gerçek bir raporda Lighthouse'un raporladığı 57'ye karşı 57 hesaplıyor.
- Byte'a göre sıralamak aktif olarak yanıltıcı. LCP'den *sonra* yüklenmesi biten 410 KB'lık bir görsel **sıfır puan**; 124 KB'lık render-blocking bir script **on bir puan**.
- Kazançlar örtüşüyor. Dört ayrı "+7 puan" düzeltmesi 28 etmiyor, ve ettiğini ima eden bir araç sana hüsranla biten bir retro hazırlıyor.
- Her şey ölçülmüş değerlerin üstüne delta, asla uydurulmuş bir mutlak değil — ve bir sayı ölçülmüş değil de modellenmişse, arayüz bunu söylüyor.

## Skor neden Lighthouse'un skoru olmak zorunda

Bu fikrin ilk taslağında kendi 0–100 index'im vardı. Bir gün içinde işe yaramaz olduğu ortaya çıktı.

Bütün mesele bir tartışmayı bitirmek, ve o tartışmayı Lighthouse'a bakan insanlar yapıyor. Benim aracım uydurduğum bir skalada "bu sana 12 puan kazandırır" diyorsa, cevap "neyin 12'si" oluyor ve artık chat widget'ı yerine benim skalamı tartışıyoruz. Projeksiyon, ticket'taki ekran görüntüsüyle **aynı birimde** gelmek zorunda.

Yani \`scoring.ts\` gerçek olanın yeniden yazımı. Lighthouse metrikleri doğrusal skorlamıyor — her birini iki control point'e kalibre edilmiş log-normal bir eğriden geçiriyor: gerçek sitelerin 10. persentili ve medyanı.

\`\`\`ts
export const METRIC_WEIGHTS = {
  fcp: 0.1, si: 0.1, lcp: 0.25, tbt: 0.3, cls: 0.25
} as const;

export const CONTROL_POINTS = {
  fcp: { p10: 1800, median: 3000 },
  si:  { p10: 3387, median: 5800 },
  lcp: { p10: 2500, median: 4000 },
  tbt: { p10: 200,  median: 600  },
  cls: { p10: 0.1,  median: 0.25 }
};
\`\`\`

Bu sayılardan çıkan ve aracı hiç açmasan bile bilmeye değer iki şey var.

**TBT skorunun %30'u, CLS ise %25'i.** Yani sayfanın ne kadar *hızlı göründüğüyle* alakası olmayan iki metrik, sayının %55'i. Herkesin konuştuğu LCP ise %25.

**Eğri tepede acımasız, ortada affedici.** LCP'yi 4.0 s'den 3.5 s'ye çekmek sana çok az şey kazandırıyor. 2.8 s'den 2.4 s'ye çekmek çok şey kazandırıyor. Yani "LCP'yi yarım saniye iyileştirdik" cümlesi, nereden başladığını bilmeden fiyatlandırabileceğin bir olgu değil.

Yeniden yazıma güvenmek yerine sonunda doğruladım — ki bunu yaptığımdan çok daha önce yapmalıydım. Kendi siteme gerçek Lighthouse çalıştırıp JSON'u doğrudan parser'a verdim:

\`\`\`
reported: 57   recomputed: 57
\`\`\`

Bu uyuşma, aracın bütün güvenilirliği. Repo'da bir \`scripts/probe.ts\` var ve çıktısının ilk satırı tam olarak bu karşılaştırma — implementasyon Lighthouse'unkinden saparsa, yanlış skalada makul görünen sayılar üretmek yerine yüksek sesle patlasın diye.

## Byte'a göre sıralanmış raporları yalancı yapan tersine çevirme

perf-lab'in içinde gelen demo sayfası şöyle — gayet sıradan bir marketing sayfası, 1.1 MB, skoru 57. Her kaynağı kaldırmanın gerçekte ne ettiğine göre sıralanmış hali:

| Kaynak | Boyut | Değeri |
|---|---|---|
| \`consent-banner.js\` | 124 KB | **+11** |
| \`intercom.js\` | 168 KB | **+11** |
| \`framework.bundle.js\` | 178 KB | **+10** |
| \`gtm.js\` | 92 KB | **+7** |
| \`below-fold-gallery.webp\` | **410 KB** | **0** |

Sayfadaki en büyük dosya hiçbir şey etmiyor. Ekranın altında kalan, LCP çoktan tetiklendikten sonra yüklenmesi biten bir galeri görseli — yani hiçbir zaman kritik yolda değildi. Kaldırmak sayfayı hafifletiyor, hızlandırmıyor. Bu arada listedeki üçüncü en küçük dosya on bir puan ediyor, çünkü render'ı blokluyor.

Bu egzotik bir uç durum değil. Bir web sayfasının normal şekli bu, ve her performans raporundaki "en büyük varlıklar" tablosunun ekipleri yanlış şeyi optimize etmeye göndermesinin sebebi de bu. Soru hiçbir zaman *ne ağır* değildi. *Ne ağır **ve** kritik yolda* idi.

## Tezi kanıtlayan bug

Bu konuda dürüst olmak istiyorum, çünkü yazıdaki en faydalı şey bu.

Aracı shipledim, açtım, ve demo \`below-fold-gallery.webp\`'yi **+12 puan** gösterdi — aracın düzeltmek için var olduğu tam o tersine çevirme, aracın içinde, ilk ekranda. Herhangi bir kaynağı kaldırmak toplam transfer'i küçültüyordu ve ben transfer kazancını FCP ile LCP'ye, o kaynağın onlarla bir ilgisi olup olmadığına bakmadan uyguluyordum.

Onu düzelttim, sonra aynı hatanın bir katman aşağıda, parser'ın içinde saklanan ikinci versiyonunu buldum:

\`\`\`ts
beforeLcp: endTime <= metrics.lcp || startTime <= metrics.lcp
\`\`\`

Bir sayfadaki neredeyse her istek LCP tetiklenmeden *önce başlar*. O ikinci koşul neredeyse her şeyi kritik yol olarak işaretliyordu — ki bu, aracın merkezî iddiasını her gerçek raporda sessizce çökertiyor.

Hayatta kaldı çünkü örnek veri \`beforeLcp\`'yi elle set ediyor, yani sürekli baktığım şey olan demo o kod yolundan hiç geçmiyordu. Yakalamanın tek yolu parser'a gerçek bir Lighthouse raporu vermekti, ki bunu araç zaten canlıya çıkana kadar yapmamıştım. **Bir aracı göstermesi kolay kılan demo verisi, tam da asıl önemli kısmı test etmeni engelleyen veridir.**

## Kazançlar toplanmaz, toplandığını varsaymak işe yaramazdan da kötüdür

İlk versiyon her kaynağı dokunulmamış rapora göre sıralıyordu. Kulağa doğru geliyor — ta ki her kaldırmaya tam kazancı bağımsız olarak vaat ettiğini fark edene kadar. Slayt'ta 28 eden, production'da 11 eden dört tane "+7 puan", çünkü örtüşüyorlar. İki analytics tag'ini düşürdükten sonra TBT zaten inmiştir ve üçüncü tag'in geri verecek daha az şeyi kalmıştır.

Bu yüzden sıralama artık marjinal: zaten kapattıklarının üstüne yeniden simüle ediyor. Demo'da Intercom'u kaldırmak hero görselini **+11'den +6'ya** düşürüyor — aynı dosya, aynı byte, LCP zaten hareket ettiği için yarı değerinde.

Bu davranış aracın en ikna edici kısmı çıktı. Bir şeyleri kapattıkça listenin yeniden sıralanışını izlemek örtüşmeyi on beş saniyede öğretiyor — ekiplerin normalde retro'da öğrendiği türden bir şeyi.

## Ne ölçülmüş, ne modellenmiş

Geleceği kestiren bir araç, çok kolay bir şekilde kendinden emin biçimde uyduran bir araca dönüşebilir. Tuttuğum kural: **ölçülmüş bir sayı varken asla mutlak bir sayı uydurma.** Her şey Lighthouse'un gerçekte kaydettiği metriklerin üstüne uygulanan delta'lar üzerinden çalışıyor, yani baseline her zaman ground truth ve sadece fark modelleniyor.

Doğrudan rapordan alınanlar: istek başına transfer boyutu ve zamanlama (\`network-requests\`), script başına parse ve execute süresi (\`bootup-time\`), render-blocking durumu *ve ölçülmüş kazancı* (\`render-blocking-resources\`), third-party ataması (\`third-party-summary\`).

Modellenmiş, dolayısıyla yaklaşık olanlar: throttled bir bağlantıda geri kazanılan transfer süresi, bir script'in execution'ının ne kadarının TBT penceresine düştüğü, ve bir şeyi kaldırmanın LCP'yi hareket ettirip ettirmediği. TBT oranı bile sektör ortalamasına değil rapora demirlenmiş — *bu sayfanın* sergilediği oranı kullanıyor, yani ölçülmüş TBT bölü ölçülmüş toplam CPU.

Her projeksiyon bir güven etiketi taşıyor — \`measured\`, \`modelled\` ya da \`speculative\` — ve rapor hangi koşullarda alındıysa ondan uzaklaştıkça etiket düşüyor. Throttling preset'ini değiştirip Lighthouse'un hiç ölçmediği bir şeyi kaldırırsan, araç sana sahte bir otoriteyle sayı vermek yerine bunun sadece yön gösterdiğini söylüyor.

## Yayınlandığı sitede bug buldu

Skorlamayı doğrulamak için aldığım gerçek Lighthouse raporu kendi \`/tools\` sayfamdaydı. Madem zahmet etmişim, raporun kalanını da okudum.

Mobil skor 57. LCP 7.2 s — ki eğriler bunu kaybettiğim 43 puanın yaklaşık 23'ü olarak fiyatlandırıyor. Ve LCP elementi — raporda adı geçiyor — ilk tool kartının ekran görüntüsüydü.

O sayfadaki her kart görseli \`loading="lazy"\` işaretliydi.

Skorun üzerinden ölçüldüğü tek görsel, kasten geciktirdiğim görseldi. Lazy-loading iyi bir pratik, ben de tekdüze uygulamıştım, ve tekdüze uygulamak tam olarak hatanın kendisi: LCP elementi asla lazy olmamalı. İlk kart artık \`eager\` ve \`fetchpriority="high"\`, geri kalanı lazy kaldı.

Araç ayrıca WebP olması gereken PNG'lerde duran 238 KiB'ı da işaretledi. Dönüştürmek 620 KB kazandırdı.

O sayfa üzerinde haftalardır, hem de açıkça SEO ve performansı düşünerek çalışıyordum, ve görmemeye devam edecektim. Aslında bütün kategorinin gerekçesi bu. Ölçüm sana sayfanın yavaş olduğunu söylüyor. Bunu zaten tahmin ediyordun. Bir kararı değiştiren şey, aksi halde neye mal olacağını bilmek — ve karşı-olguya bir sayı koyamadığın sürece, odadaki en yüksek sesli kişi haklı olmaya devam edecek.

---

**[perf-lab](https://perf-lab-topaz.vercel.app)** ücretsiz, açık kaynak ve yalnızca tarayıcıda çalışıyor — rapor senin sekmende parse ediliyor ve hiçbir şey yüklenmiyor, ki bu rapor bir müşterinin staging ortamından geldiğinde önemli. Kaynak kod [GitHub'da](https://github.com/ferhatatagun/perf-lab).

Rapor üretmek için:

\`\`\`
npx lighthouse https://example.com --only-categories=performance \\
  --output=json --output-path=./report.json
\`\`\`

Ya da DevTools → Lighthouse → çalıştır → ⋮ → *Save as JSON*. Elinde rapor yoksa, tek tıkla örnek veri var.
`,H=`# Kimsenin modeli patlamadı. Arayüz patladı.

Üç sayı, ve yan yana durunca rahatsız ediyorlar.

Tek bir iş unvanı için — forward deployed engineer — ilan sayısı **2025'te yaklaşık %800** arttı. Frontier lab'lerde toplam paket orta-kıdemli için **$350–550K** civarına oturdu. Ve kurumsal AI pilotları, hangi araştırmayı okuduğunuza bağlı olarak hâlâ **%70 ile %90** arasında bir oranda başarısız oluyor. Yaygın olarak alıntılanan bir rakam, AI girişimlerini terk eden şirketlerin oranını tek yılda %17'den %42'ye çıkarıyor.

Darboğaz modeller olsaydı, çözüm daha iyi bir model olurdu. Bunun yerine sektörün cevabı insan işe alıp müşterinin binasının içine koymak oldu. Bu, bir teknoloji problemine verilen alışılmadık bir cevap. Bozuk olan şey teknoloji değilken verdiğin cevap.

Peki tam olarak ne patlamaya devam ediyor?

**TL;DR**

- Kanonik FDE başarı hikâyesi — Morgan Stanley'deki OpenAI — 6–8 haftalık teknik iskele kurmayı, ardından danışmanlara bu şeyi gerçekten kullandırmak için harcanan yaklaşık **dört ayı** anlatıyor. Raporlanan kazanma koşulu **%98 adoption**; doğruluk da değil, latency de değil.
- Adoption sayısı bir model metriği değil. Bir insanın ekranındakine güvenmeye karar verip vermediğinin ölçüsü. O karar arayüzde veriliyor.
- Güvenin düzenli olarak öldüğü üç yer — gizlenmiş belirsizlik, görünmez maliyet, ve işini göstermeyen bir sistem — hepsi rendering kararı, modelleme kararı değil.
- FDE rolleri backend/ML/infra rolü olarak yazılıyor ve öyle dolduruluyor. Bir düzine ilan okuyun ve kaçının operatörün ne gördüğünden bahsettiğini sayın. Başarısızlık yüzeyiyle işe alım yüzeyi hizalanmıyor.
- Bu, backend önemsiz demek değil. Backend'in altı hafta, son kilometrenin ise dört ay olduğunu söylemek.

## Oturmayan sayı

Forward-deployed modeli anlatan her yazı eninde sonunda aynı vaka çalışmasına uzanıyor: Morgan Stanley'e yerleşmiş OpenAI mühendisleri, wealth advisor'lar için bir asistan kuruyor.

Herkesin alıntıladığı kısım sonu — %98 adoption. Bakmaya değer kısım ise onu üreten zaman çizgisinin şekli. Kabaca altı-sekiz hafta teknik iskele: entegrasyon, veri bağlantıları, eval'ler. Sonra gerçek danışmanlarla pilot çalıştırılan yaklaşık dört ay.

Dört ay. Sistem çalıştıktan **sonra**.

O dört ayda her ne oluyorsa, model eğitimi değildi. Model bitmişti. Entegrasyon bitmişti. Geriye kalan, deneyimli bir grup profesyonelin, tek tek, bir makinenin ürettiği cevabın altına adlarını yazmaya razı olup olmadıklarına karar vermesiydi.

Son kilometre bu. Ve nasıl ölçüldüğüne dikkat edin: "model eval setimizde 0.91 aldı" değil, "%98'i kullanıyor". Kimsenin açmadığı bir deployment, çalışmayan bir deployment'tan ayırt edilemez.

## Adoption bir arayüz sayısıdır

Savunacağım yeniden çerçeveleme şu.

Adoption'ı bir change-management problemi gibi ele alıyoruz — eğitim oturumları, şampiyonlar, yönetici direktifleri. Bunların bir kısmı gerçek. Ama bir profesyonelin sisteme güvenip güvenmeyeceğini belirleyen şeyin çoğu bir memo değil. Kullanmanın biriken deneyimi: ona ne gösterdi, neyi sakladı, ve aradaki fark konusunda dürüst müydü.

Bir wealth advisor bir modele, birisi ona F1 skorunu söylediği için güvenmez. Üç hafta boyunca model ona kendinden emin bir tavırla yanlış bir şey verip önceden uyarmadığı için güvenir — ve *emin olmadığında* bunu, kişinin harekete geçebileceği bir şekilde söylediği için.

Bu bir model özelliği değil. Bir rendering özelliği. Confidence 0.98 yerine 0.51 olduğunda ekranda ne görüneceğine dair birinin verdiği karar.

## Güvenin öldüğü üç yer — hepsi ekranda

AI destekli arayüzlerde tekrar eden üç başarısızlık modu olduğunu ve hiçbirinin model kusuru olmadığını savunuyorum.

**1. Belirsizlik düzleştiriliyor.** Model yarı tahmin ettiği bir şeyi, emin olduğu bir şeyle birebir aynı formatta döndürüyor. Aynı font, aynı özgüven, aynı ton. Operatörün ayırt etme imkânı yok. Zor yoldan öğreniyor — bir kez — ve ondan sonra her şeyi iki kez kontrol ediyor, ki bu sistemin ona zaman kazandırmayı bıraktığı anlamına geliyor, ki bu da kullanmayı bıraktığı anlamına geliyor.

Çözüm bir tasarım kararı: düşük güvenli çıktıya farklı bir affordance ver. Korkutucu kırmızı bir banner değil. Meşgul birinin bir bakışta gerçekten okuyacağı şekilde *şuna bir bak* diyen bir şey.

**2. Maliyet faturaya kadar görünmez.** Yenilemeyi onaylayan insanlar, aracı kullanan insanlar değil. Bütçe sahibinin bir sayı gördüğü tek an aylık fatura ise, sistemle ilgili her konuşma bir sürprizle ilgili konuşmadır. Daha önce [prompt caching'i kimsenin neden ölçmediği](https://ferhatatagun.com/blog/prompt-caching-kimsenin-olcmedigi) ve [prompt'u göndermeden önce pre-flight etmek](https://ferhatatagun.com/blog/prompt-shipping-once-onunu-gor) üzerine yazmıştım; geriye dönüp bakınca ikisi de aslında bunu anlatıyordu: maliyet birinci sınıf bir arayüz durumudur, ve onu bir ops metriği gibi ele almak, projenin yaşayıp yaşamayacağına karar veren kişiden gizler.

**3. Sistem işini göstermiyor.** Çıktı yanlış olduğunda ve operatör *nedenini* göremediğinde, bug açmıyor — doğru olan kısımlar dahil olmak üzere her şeye olan güvenini kaybediyor. İncelenemeyen bir sisteme ya güvenilir ya da terk edilir, ve insanlar terk eder.

[Agent çalıştırmaları için trace replay](https://ferhatatagun.com/blog/claude-agent-debug-trace-replay) yazmamın sebebi bu. Trace'ler ilginç olduğu için değil, "bunu neden yaptı" sorusu bir deployment'ın ilk kötü haftasını atlatıp atlatmayacağına karar verdiği için.

Üçü de arayüz katmanında çözülüyor. Hiçbiri daha iyi bir modelle çözülmüyor.

## Karşı argümanın en güçlü hali

Karşı tarafı düzgün savunayım, çünkü zayıf halini devirmek kolay ve bunu yapmak istemiyorum.

Ciddi itiraz şöyle: *son kilometre bir UI problemi değil, bir veri problemi.* Müşterinin şeması dokümante edilmemiş. Workflow'un yarısı birinin asistanının güncellediği bir spreadsheet'te yaşıyor. Sana vaat edilen API yok. Hiçbir şey doğru render olmuyor çünkü yukarı akışta hiçbir şey doğru değil. OpenAI'ın FDE ekibinin başı aşağı yukarı bunu söyledi — müşterinin scoping sırasında tarif ettiği şey, sahadaki sistemlerin gerçekliğiyle rutin olarak uyuşmuyor.

Bu doğru, ve işin en zor kısmı. İtiraz etmiyorum.

Ama zaman çizgisine tekrar bakın. O iş, altı hafta. Gerekli, ve kesinlikle yeterli değil — kanıtı da şu: proje sekizinci haftada başarılı olmadı, dört ay sonra, tamamen farklı türde bir işin ardından başarılı oldu.

İki yarı da gerçek. Benim iddiam "önemli olan UI'dır"dan daha dar. Şu: ikinci yarı daha büyük yarı, projelerin asıl öldüğü yarı, ve neredeyse hiç kimsenin ona göre işe alınmadığı yarı.

## İşe alım açığı

Bir tutam forward-deployed engineer ilanı okuyun. Şunları göreceksiniz: production LLM deneyimi, ileri prompt engineering, agent framework'leri — LangGraph, LangChain, CrewAI, DSPy — evaluation framework'leri, ölçekte deployment, çok adımlı tool-use zincirleri, bazen air-gapped ve bare-metal provisioning.

Hepsi meşru. Hepsi gerekli.

Şimdi operatörün ne gördüğüne dair satırları sayın. Belirsizliğin nasıl yüzeye çıkarıldığına dair. İşi yapan kişinin emin bir cevapla bir tahmini ayırt edip edemediğine dair.

Rol, entegrasyon problemini çözen insanlar tarafından tanımlandı ve entegrasyon probleminde çok iyi olan insanlarla dolduruldu. Bu sırada herkesin kazanma koşulu olarak raporladığı sayı — adoption — bambaşka bir yerde belirleniyor.

Bunun bir komplo ya da ciddiyetsiz insanların gözden kaçırması olduğunu düşünmüyorum. Bir rol, problemi ilk fark eden disiplin tarafından zaman baskısı altında icat edildiğinde olan şey bu. Palantir bu modeli 2000'lerde, ihtiyacını kelimenin tam anlamıyla tarif edemeyen istihbarat müşterileri için icat etti. O zamanki problem gerçekten çoğunlukla veri ve erişimdi. Şimdiki problemin büyük bir insana bakan bileşeni var, ve iş tanımı henüz yetişemedi.

## Bu hafta gerçekten ne yapardım

Bir AI özelliğini başkasının workflow'una gönderiyorsanız, ucuzdan pahalıya üç somut hamle:

**1. Belirsizliğe görsel bir kimlik verin.** Modelinizin zaten ürettiği bir sinyal seçin — bir confidence skoru, bir reddetme, iki örneklenmiş çalıştırmadan düşük uyum sonucu — ve onu farklı render edin. Bir öğleden sonralık iş. Sisteminizi "güven ya da güvenme"den "buraya güven, şurayı kontrol et"e çeviriyor, ki bu ayrım insanların tuttuğu bir araçla sessizce açmayı bıraktığı bir araç arasındaki tüm fark.

**2. Yenilemeyi imzalayan kişi için maliyeti ekrana koyun.** Açmayı hatırlaması gereken bir dashboard'da değil. Zaten baktığı şeyin içinde. Güncellenen bir sayı, asla sürprize dönüşmeyen bir sayıdır — ve yenilemeleri öldüren şey sürprizlerdir.

**3. Bir şeyi incelenebilir yapın.** Sisteminizin verdiği en sonuç doğurucu tek kararı seçin ve operatöre oraya nasıl vardığını görme imkânı verin. Tam observability değil — tek bir yol, tek bir açıklama. Bir şey ilk kez ters gittiğinde, o yol bir bug raporuyla kaybedilmiş bir hesap arasındaki fark oluyor.

Hiçbiri modele dokunmayı gerektirmiyor. Hepsi FDE modelinin kazanma koşulu dediği sayıyı hareket ettiriyor.

## Bundan sonrası

Argüman tutuyorsa — son kilometrenin büyük ölçüde bir arayüz problemi olduğu — ciddiye alınmaya değer bir devam sorusu var: o kilometrede çalışan bir mühendis aslında ne taşıyor?

Çünkü kısıtlar acımasız ve spesifik. Başkasının ortamındasınız. Altı haftalık bir güvenlik incelemesi olmadan hiçbir şey kuramıyorsunuz. Veri onların sınırından çıkamıyor. Getirdiğiniz her bağımlılık, güvenlik ekiplerinin sorabileceği bir soru. Ve bir paydaş omzunuzun üstünden bakarken hâlâ "bunu neden yaptı"yı cevaplamanız gerekiyor.

Bir yıldır tam olarak bu kısıtlar altında araç yazıyorum, ve yakın zamana kadar bunu estetik sebeplerle yaptığımı sanıyordum.

Sonraki yazı bu.

---

*Bu, kurumsal AI'ın son kilometresi üzerine bir serinin birinci yazısı.
İkinci: [Kazara bir forward-deployed engineer saha çantası kurmuşum](https://ferhatatagun.com/blog/kazara-fde-saha-cantasi) ·
Üçüncü: [Teslim ettiğin şey prompt değil. Eval.](https://ferhatatagun.com/blog/teslim-edilen-prompt-degil-eval) ·
Dördüncü: [Çalıştığında değil, onlar değiştirebildiğinde bitti.](https://ferhatatagun.com/blog/degistirebildiklerinde-bitti) ·
Beşinci: [İkinci müşteri ne yaptığını söyler](https://ferhatatagun.com/blog/ikinci-musteri-ne-yaptigini-soyler)*
`,Y=`# Kazara bir forward-deployed engineer saha çantası kurmuşum

Bir yıl önce bir projeden \`@anthropic-ai/sdk\`'yı sildim ve yerine yaklaşık 150 satır TypeScript yazdım.

Kendime verdiğim gerekçe dürüst ve sıkıcıydı. SDK, bir agent-toolset modülü üzerinden \`node:fs/promises\` çekiyordu ve bu browser bundle'ını kırıyordu. Browser'a temiz bir entry point çıkmasını bekleyebilirdim. Bunun yerine elle bir SSE parser yazdım ve [nedenini anlatan bir yazı yazdım](https://ferhatatagun.com/blog/tarayicida-claude-streaming-sdk-siz).

Bunu bir bundler hikâyesi diye kaldırdım.

Sonra forward-deployed engineer'lar — bir AI deployment'ını gerçekten çalıştırmak için müşterinin binasına gönderilen insanlar — için araç geliştirmeye dair bir yazıda bir cümle okudum. Kabaca: her framework bağımlılığı, müşterinin güvenlik ekibinin soracağı bir sorudur, ve bare-metal kod senin olmayan bir ortamda debug etmesi daha kolaydır.

Aynı karar. Aynı gerekçe. Farklı disiplin, farklı unvan, tamamen farklı bir problem — ama farklı bir problem değilmiş.

Bir bundler sorunu çözmemişim. Adını hiç koymadan bir **deployment** problemi çözmüşüm, ve bu yüzden onu zevk sanmışım.

Bu yazı, shiplediğim beş araçtaki her mimari kararı geri dönüp hiç sormadığım bir soruyla incelediğimde çıkanlar: burada aslında hangi kısıt işliyordu?

**TL;DR**

- Beş araç; hepsi yalnızca tarayıcıda, hepsi BYOK, hiçbirinde backend yok. Bunları tercih ve hafif tembellik gibi hissettiren şeylerle seçtim.
- Bunlar, neredeyse tam olarak, başkasının regüle ortamında çalışmanın kısıtları: kurulacak bir şey yok, sınırdan çıkan veri yok, güvenlik ekibinin threat-model'leyeceği bir şey yok, savunulacak minimum bağımlılık yüzeyi.
- Kısıtlar yakınsar. Aynı *şekildeki* problemi çözen iki disiplin, birbiriyle hiç konuşmadan aynı mühendislik kararlarına varır.
- FDE araçlarının genelde ayrıldığı dört kategoriye — observability, evaluation, orchestration, guardrails — göre eşleştirdiğimde üçü var. Dördüncüsü eksik, ve aksini iddia etmek yapabileceğim en az ilginç şey olurdu.
- Aktarılabilir kısım benim repo'larım değil. Bir aracı oyuncaktan ayıran şeyin *dile getirilmiş bir kısıt* olması, ve çoğu yan projenin hiçbir zaman bir kısıt dile getirmemesi.

## Karar, ve altındaki gerçek sebep

SDK kararıyla ilgili o zaman yanlış anladığım şey şu.

Şöyle çerçeveledim: *SDK benim ortamımda çalışmıyor, o yüzden çalışan minimumu yazayım.* Makul. Aslında yaptığım şey, aracın bağımlılık yüzeyini \`fetch\` ve bir \`TextDecoder\`'a indirmekti — ve bunun bir kez bile düşünmediğim sonucu şu: runtime'ın tamamı incelenebilir. Kodumla tel arasında akıllıca bir şey yapan bir framework yok. Bir stream tuhaf biçimde sonlandığında kendi parser'ımı okuyorum.

Bu özellik, kendi laptop'unda, debugger bağlı ve dünya kadar zamanın varken debug ederken beş para etmez.

Başkasının mühendisiyle telefondayken, başkasının network'ündeyken, ve sana response'un neden kesildiğini sorduklarında, ve dürüst cevabın önümüzdeki doksan saniye içinde gelmesi gerektiğinde ise oyunun tamamı budur.

Onun için yapmadım. Ama o.

## Dört karar daha, aynı şekil

Bakmaya başlayınca desen bitmedi.

**BYOK — kendi anahtarını getir.** Kendime söylediğim: proxy çalıştırmak istemiyorum, kimsenin kimlik bilgisini tutmak istemiyorum, ve yabancıların token'ları için ödeme yapmayı *hiç* istemiyorum. Hepsi doğru. Aslında olan şey: müşterinin anahtarı tarayıcısından hiç çıkmıyor ve prompt'u benim kontrol ettiğim bir altyapıya hiç değmiyor. Müzakere edilecek bir veri işleme sözleşmesi yok çünkü veri işleme yok. "Backend çalıştıramayacak kadar tembelim" versiyonuyla "bu bir compliance incelemesinden geçer" versiyonu aynı mimari.

**Hiç backend yok.** Kendime söylediğim: statik hosting bedava ve yan proje için sunucu bakmak istemiyorum. Aslında olan şey: threat-model'lenecek sunucu yok, dokümante edilecek saldırı yüzeyi yok, anlatılacak uptime hikâyesi yok, ve geçmesi altı hafta süren tedarikçi güvenlik anketi yok. Bir güvenlik ekibinin en hızlı onayladığı şey, var olmayan şeydir.

**Her araç bir URL.** Kendime söylediğim: link paylaşmak, birine repo klonlayıp \`npm install\` çalıştırmasını söylemekten kolay. Aslında olan şey: sıfır kurulum. Müşterinin makinesine hiçbir şey girmiyor. Bir teşhis aracına en çok ihtiyacı olan insanlar, tam olarak kurmasına en az izin verilen insanlar.

**Maliyet loglanmıyor, canlı render ediliyor.** Kendime söylediğim: sayı ilginç ve hareket edişini görmek istedim. Aslında olan şey: yenilemeyi onaylayan kişi kimseye sormadan okuyabiliyor. [Prompt caching'in kimsenin ölçmediği en ucuz optimizasyon olduğuna dair koca bir argüman](https://ferhatatagun.com/blog/prompt-caching-kimsenin-olcmedigi) yazdım ve yine de onu bir mühendislik hijyeni meselesi gibi çerçeveledim. Değil. Bir [güven meselesi](https://ferhatatagun.com/blog/kimsenin-modeli-patlamadi), ve bir deployment'ın yaşayıp yaşamayacağına güven karar veriyor.

Dört karar. O zaman verdiğim, doğru ama yüzeysel dört gerekçe. Hepsinin altında, hiç yüksek sesle söylemediğim tek bir kısıt.

## Yalnızca-tarayıcı gerçekte neye mal oluyor

Bunu olduğundan temiz göstermek istemiyorum, o yüzden bir saniye kendime karşı çıkayım.

Yalnızca-tarayıcı, birçok yazılım için gerçekten kötü bir seçim. Sunucu tarafı secret yönetimi yok. Sürekli CORS'la boğuşuyorsun — ve bazı sağlayıcılarda düpedüz kaybediyorsun, çünkü header'ları göndermiyorlar ve bir sekmeden yapabileceğin hiçbir şey yok. Adı gibi kalıcı depolama yok, zamanlanmış iş yok, arka plan işleme yok, hesaplama açısından ciddi bir şey yapmanın yolu yok. Bu şekilde ürün yapamazsın. Yapabilirsin gibi davranmayacağım.

Ama bu sınırlamaların hiçbiri bir *teşhis aleti* için bağlayıcı değil.

Multimetrenin veritabanına ihtiyacı yok. Sana sistemin neden garip davrandığını söyleyen araç, sistemin kendisi değil. Güvenilir, taşınabilir ve okunabilir olmak zorunda — ve tam da daha ağır olan her şeyin sana kapalı olduğu anda çalışmak zorunda. Maliyet diye saydığım her kısıt bu iş için alakasız, ve ikisi (depolama yok, sunucu yok) gerçek bir deployment'ı reddedecek bir yerde kullanılabilmesinin sebebi.

Sınırlama ile yeterlilik, aynı olgunun iki yüzü.

## Harita

FDE araçları oldukça tutarlı bir şekilde dört kategoride tarif ediliyor: agent orchestration, evaluation, guardrails ve observability. Gidip kendi şeylerimi kutulara koydum.

| Kategori | Araç | Ne yapıyor |
|---|---|---|
| Observability | [claudoscope](https://claudoscope-labs.vercel.app) | Canlı bir çağrıyı röntgenliyor — token bileşimi, cache okuma/yazma, maliyet; response akarken |
| Observability / debugging | [agent-replay](https://agentreplay.vercel.app) | Biten bir agent trace'ini iç içe JSON duvarı yerine zaman çizgisi olarak oynatıyor |
| Pre-flight | [context-lens](https://context-lens-sigma.vercel.app) | Prompt'u göndermeden sayıyor — window pozisyonu, maliyet, caching sınırları |
| Evaluation | [prompt-lab](https://prompt-lab-promptly.vercel.app) | İki prompt, tek input; çıktı, latency ve maliyette yan yana |
| Orchestration | [tool-lab](https://tool-lab-bice.vercel.app) | Tool-use döngüsünü sandbox'lıyor — tool tanımla, response mock'la, elle sür |
| **Guardrails** | — | — |

Üç kategori kapsanmış, bir pre-flight bonusu, bir delik.

Burada dikkatli olmak istiyorum, çünkü bu yazının FDE şapkası takmış bir portföy turu olan bir versiyonu var ve o versiyon beş para etmez. Yani: bu haritayı planlamadım. Sonradan giydirme. Araçlar birkaç hafta sonunda birer birer yapıldı ve o zaman dile getirebileceğim tek ortak çizgi ["Claude API'yi okunur kılmak"](https://ferhatatagun.com/blog/iki-hafta-sonu-dort-tool) idi. Kategoriler başkasının disiplininden geldi. Uyum gerçek, ve aynı zamanda bir kaza, ve ikisi birden doğru olabilir.

## Üstünü örtemediğim boşluk

Guardrails eksik, ve sahada en çok canı yakacak olan da o.

Guardrails, model çıktısını kodunun güvenle tüketebileceği bir şeklin içinde tutan katman. \`{"risk": "high"|"medium"|"low", "score": 0-100}\` istiyorsun. Yeterince çağrıda gerçekte dönen:

- markdown fence'ine sarılmış JSON
- \`"high"\` yerine \`"HIGH"\` — enum kayması
- \`"very high"\` — var olmayan, anında uydurulmuş bir enum değeri
- string olarak \`"score": "85"\`, aşağı akıştaki aritmetiği sessizce bozuyor
- \`score\` tamamen yok
- JSON başlamadan önce bir cümle düz metin

Bunların her biri ya parser'ını çökertiyor ya da — daha kötüsü — çökertmiyor ve birinin dashboard'una sessizce yanlış bir kategori koyuyor.

Bunun unit test değil de alet gerektirmesinin sebebi, hataların **dağılımsal** olması. Bir kez çalıştırıyorsun, çalışıyor, shipliyorsun. Sonra kırk çağrının biri halüsinasyon bir enum dönüyor ve sen hiç görmüyorsun, çünkü tek bir örneğe baktın. İhtiyacın olan şey, elli çalıştırma boyunca, hata tipine göre kırılmış hata *oranı*. Bu, "çalışıyor mu"dan farklı bir soru.

Yani altıncı araç bu, ve sırada yapılacak dürüst şey de bu: bir şema tanımla, bir prompt'u ona karşı N kez çalıştır, bozulma biçimlerinin dağılımını göster. Geri kalanla aynı kısıtlar — yalnızca tarayıcı, BYOK, backend yok; çünkü artık bunlar tercih değil, şartname.

## Bu neden genelleşiyor

Repo'larımı çıkar, geriye tutmaya değer tek bir fikir kalıyor.

Çoğu yan projenin kısıtı yoktur. Oyuncak gibi okunmalarının sebebi bu — küçük ya da yarım oldukları için değil, haklarında hiçbir şey *zorunlu* olmadığı için. Her karar öbür türlü de verilebilirdi ve hiçbir şey kırılmazdı. Okuyucu bunu hissediyor.

Dile getirilmiş kısıtı olan bir araç, elli satır bile olsa tamamen farklı okunuyor. "Bu bir sekmede çalışıyor çünkü hiçbir şeyin kurulamadığı yerde çalışmak zorunda" bir tasarım brief'i. "Bu bir React uygulaması" değil. Birincisi yazarın neye karşı olduğunu söylüyor; ikincisi ne yazdığını.

Benim için rahatsız edici kısım, kısıtın başından beri elimde olması ve adını koyamamam. Bilinçsizce uyduğum bir kural altında beş şey shipledim, ve hiç yüksek sesle söylemediğim için, işin *neyin* kanıtı olduğunu da söyleyemedim. Beş küçük araç gibi görünüyordu. Bir pozisyondu.

Şu anki AI işe alım piyasasına bakıp ona nasıl okunur hale geleceğini düşünen bir frontend mühendisiyseniz: büyük ihtimalle repo'larınızda zaten kısıt-şeklinde iş duruyor. Hamle yeni bir şey yapmak değil. Geri dönüp aslında ne için çözdüğünüzü bulmak, sonra da onu README'ye yazmak.

Benimki bir yıl ve bir yabancının güvenlik ekipleri hakkındaki bir cümlesini aldı.

---

**Güncelleme, 1 Eylül 2026.** Boşluk kapandı. Altıncı aracı yazdım —
[guard-lab](https://guard-lab.vercel.app) — aşağı yukarı yukarıdaki bölümdeki
şartnameye göre: bir şema tanımla, bir prompt'u ona karşı N kez çalıştır,
bozulma biçimlerinin dağılımını göster.

Yazarken yanlış anladığım iki şey var. İşi bir hata *oranı* raporlamak diye
tarif etmişim, oysa tek başına oran yanıltıcı olanı: asıl önemli olan, çöken
hatalarla, temizleyip geçebileceğin hatalarla, ve temiz parse olup yanlış
olanlar arasındaki ayrım. Sadece üçüncüsü görünmez, ve bu şeyi yapmanın tüm
sebebi de o. Bir de temiz çalıştırmayı hiç düşünmemişim — elli geçiş, sıfır
hata kanıt gibi okunuyor ama değil, o yüzden araç rahatlatıcı bir sıfır yerine
bir aralık raporluyor.

Artık bir yedinci de var, [perf-lab](https://perf-lab-topaz.vercel.app); Claude
API'yle değil performans bütçesiyle ilgili. Bu yazıdaki sayı beş olarak
bırakıldı, çünkü yazıldığında doğru olan buydu.

---

*Bu, kurumsal AI'ın son kilometresi üzerine bir serinin ikinci yazısı.
Birinci: [Kimsenin modeli patlamadı. Arayüz patladı.](https://ferhatatagun.com/blog/kimsenin-modeli-patlamadi) ·
Üçüncü: [Teslim ettiğin şey prompt değil. Eval.](https://ferhatatagun.com/blog/teslim-edilen-prompt-degil-eval) ·
Dördüncü: [Çalıştığında değil, onlar değiştirebildiğinde bitti.](https://ferhatatagun.com/blog/degistirebildiklerinde-bitti) ·
Beşinci: [İkinci müşteri ne yaptığını söyler](https://ferhatatagun.com/blog/ikinci-musteri-ne-yaptigini-soyler)*
`,q=`# Teslim ettiğin şey prompt değil. Eval.

Forward-deployed işe dair her saha rehberi aynı şeyin bir versiyonunu söylüyor: bir şey inşa etmeden **önce** değerlendirme çerçeveni tanımla.

Ve gerçekten bir müşterinin ortamına inmiş her mühendisin aynı tepkisi oluyor: neyle?

Üçüncü günde etiketli verin yok. Alan uzmanlığın yok — o uzmanlığa sahip olanlar zaten senin için inşa ettiğin insanlar ve meşguller. Elinde birinin paylaşılan ekranda gösterdiği beş örnek var, dokümantasyonundan kimsenin yazmadığı yerlerden sapan bir workflow var, ve mevcut sürecin çok uzun sürdüğüne dair kaba bir his var. Bundan golden dataset kurmak bir görev değil. Bir hayal.

Böylece tavsiye atlanıyor. Tembellikten değil — pratiklikten. Ve yaklaşık doksan gün sonra sistem sessizce kaymaya başlıyor, ve müşteri fark edene kadar kimse görmüyor.

Bence tavsiye doğru, çerçeve yanlış. Sana eval'i atla denmiyor. Sana önce **yanlış türünü** kur deniyor.

**TL;DR**

- Standart eval tavsiyesi — golden dataset, rubrik, etiketli örnek — doğru ve birinci haftada kullanılamaza yakın; ki tam olarak reçete edildiği an o.
- "Eval" kelimesi iki farklı soruya birden bakıyor. *Bu çıktı iyi mi?* ground truth istiyor. *Bu değişti mi?* sadece bir snapshot istiyor.
- İkincisi üçüncü günde kurulabilir ve deployment'ları asıl öldüren şeylerin çoğunu yakalar: bir prompt düzenlemesinden sonraki sessiz kayma, model sürümü sıçraması, kimsenin loglamadığı bir parametre değişikliği.
- Düz metni diff'leme — LLM çıktısı deterministik değil, gürültüde boğulursun. **Kararı** diff'le: kelimelerin altındaki yapılandırılmış iddiayı.
- Regresyon koşum takımı sonra golden dataset'ini senin yerine yazıyor. Yakaladığı her hata, hayal etmek zorunda kalmadığın etiketli bir örnek.
- Eval'in teslimat olmasının sebebi bu. Sen gittiğinde prompt, herkesin düzenleyebileceği bir metin dosyası — ve biri düzenleyecek. Düzenlemenin güvenli olup olmadığını onlara söyleyen şey eval.

## Aynı kelimeyi giyen iki farklı soru

Bunu benim için açan ayrım şu.

| | Kalite eval'i | Regresyon eval'i |
|---|---|---|
| Soru | Bu çıktı doğru mu? | Kabul ettiğimizden değişti mi? |
| Gerekenler | Ground truth, alan uzmanlığı, rubrik | Dondurulmuş bir snapshot |
| 3. günde kurulabilir | Hayır | Evet |
| Yakaladığı | Kötü tasarım | Sessiz kayma |
| Kurma maliyeti | Haftalar | Bir öğleden sonra |

İkisine de "eval" diyoruz, ucuz olanın pahalı olanla birlikte ertelenmesi de böyle oluyor.

Pahalı olan gerçekten pahalı ve gerçekten sonra. Ucuz olanın hiçbir ön koşulu yok, ve onu atlamak çalışan bir deployment'ı gizemli biçimde bozulmuş bir deployment'a çeviren şey.

## Üçüncü günde gerçekten ne kurabilirsin

Somut olarak beş adım, hiçbiri "iyi"nin ne demek olduğunu bilmeni gerektirmiyor:

**1. Gerçek input topla.** Sentetik değil. İşi yapan kişinin yanına otur ve ekranından beş-on gerçek vaka al — özür dileyerek gösterdiği o iki tuhaf olan dahil. Tuhaf olanlar bütün mesele; sistemin kırılacağı ve dokümantasyonun sustuğu yer orası.

**2. Çalıştır ve çıktıyı yazdır.** Puanlama yok, rubrik yok.

**3. Workflow'un sahibinden ikili bir cevap al.** "Bunu 1–5 arası puanla" değil. Sadece: *sistem bunu kendi başına yapsaydı rahat eder miydin?* Evet ya da hayır. İnsanlar bunda hızlı ve güvenilir, rubriklerde yavaş ve güvenilmez.

**4. Evetleri dondur.** O dosya senin eval'in. Eval'in prototipi değil, kendisi.

**5. Her değişiklikte tekrar çalıştır.** Prompt düzenlemesi, model sıçraması, parametre oynaması, context yeniden yapılandırması. Her şeyde.

Dondurulmuş dosya kasıtlı olarak sıkıcı:

\`\`\`json
[
  {
    "id": "claim-2024-0871",
    "input": "…gerçek vaka, kelimesi kelimesine…",
    "decision": { "risk": "high", "route": "manual-review" },
    "acceptedBy": "ops lead",
    "acceptedOn": "2026-03-04"
  }
]
\`\`\`

Ve runner yaklaşık yirmi satır:

\`\`\`ts
for (const c of frozen) {
  const output   = await run(currentPrompt, c.input);
  const decision = extractDecision(output);      // sadece yapılandırılmış iddia

  if (!deepEqual(decision, c.decision)) {
    report({ id: c.id, was: c.decision, now: decision });
  }
}
\`\`\`

Hepsi bu. Burada framework yok, olmamalı da. Dosyası olan bir alışkanlık.

## Düz metni değil, kararı diff'le

Bariz itiraz: LLM çıktısı deterministik değil, diff'lemek gürültüden başka bir şey üretmez. Doğru — yanlış şeyi diff'lersen.

Aynı prompt'u iki kez çalıştır, düz metin farklı olacak. Kelime sırası, çekinceler, açıklamanın kurgusu. Bunların hiçbiri regresyon değil. Response gövdesini string olarak diff'lersen her çalıştırma patlar ve bir hafta içinde koşum takımını kapatırsın.

O yüzden yapma. **Kararı** çıkar ve onu diff'le.

Bir production workflow'undaki neredeyse her faydalı LLM adımı, düz metnin içine gömülü küçük bir yapılandırılmış iddiaya iniyor: bir kategori, bir sayı, bir yönlendirme tercihi, bir evet/hayır. Etrafındaki metin sunum. İddia ise davranış.

\`\`\`ts
// metin değişir; bu değişmemeli
type Decision = {
  risk: 'high' | 'medium' | 'low';
  route: 'auto' | 'manual-review';
};
\`\`\`

Model claim-0871'i pazartesi \`manual-review\`'a, cuma \`auto\`'ya yönlendiriyorsa, kendini ne kadar güzel açıkladığından bağımsız olarak bu bir regresyon. İkisinde de tamamen farklı cümlelerle \`manual-review\`'a yönlendiriyorsa, hiçbir şey olmamış.

Bunun beklemediğim bir yan faydası da var: karar tipini adlandırmaya kendini zorlamak tasarımı netleştiriyor. O tipi yazamıyorsan, modelin ne için olduğunu henüz bilmiyorsun demektir — ve çıktısı bir iddiaya indirgenemeyen bir adım, genellikle iki adım olması gereken bir adımdır.

## Bunun yakaladığı, başka hiçbir şeyin yakalamadığı

Hepsi gerçek, sessiz, ve dondurulmuş set olmadan görünmez:

- **A vakasını düzeltip D vakasını bozan prompt düzenlemesi.** En yaygını. Bir şikâyete karşılık bir şeyi iyileştiriyorsun, shipliyorsun, ve *henüz* kimsenin şikâyet etmediği bir vakayı sessizce geriletiyorsun.
- **Model sürümü sıçraması.** Davranış kenarlarda kayıyor. Happy path'in iyi. İki tuhaf vakan değil.
- **Parametre kayması.** Biri debug ederken temperature'ı değiştiriyor ve geri almıyor.
- **Uzunluğun tetiklediği davranış değişimi.** Input aylar içinde büyüyor; model eskiden tutan talimatları kesmeye ya da önceliksizleştirmeye başlıyor. [Bunu shiplemeden önce görmek](https://ferhatatagun.com/blog/prompt-shipping-once-onunu-gor) üzerine yazmıştım — dondurulmuş set ise zaten olmuş olduğunu öğrenme şeklin.
- **Caching sınırının kayması.** Biri eskiden stabil olan bir prefix'in içine timestamp yerleştiriyor. Maliyet üçe katlanıyor. [O sayıya da kimse bakmıyor.](https://ferhatatagun.com/blog/prompt-caching-kimsenin-olcmedigi)

Hiçbiri kendini ilan etmiyor. Hepsi yirmi satırlık bir script'te diff olarak çıkıyor.

## Bunun kulağa geldiğinden zayıf olduğu yerler

Sen keşfetmektense ben söyleyeyim.

**Bir bug'ı dondurabilirsin.** Üçüncü gündeki çıktı ince biçimde yanlışsa ve evet aldıysa, onu artık kutsallaştırdın ve koşum takımın onu savunacak. Çözümü gösterişsiz: daha çok şey öğrendiğinde dondurulmuş sete geri dön, ve erken kabulü kalıcı değil geçici say.

**Küçük N bir şeyleri kaçırır.** On vaka, gerçek çeşitliliği olan bir workflow'u kapsamaz. Bu bir taban, tavan değil — ama üçüncü günde sahip olduğun bir taban, üçüncü ayda elde ettiğin bir tavanı yener.

**Kalite hakkında hiçbir şey söylemez.** Bir regresyon koşum takımı, vasat sisteminin hâlâ tam olarak eskisi kadar vasat olduğunu memnuniyetle doğrular. Bu gerçek bir sınırlama, ve bunun neden tek eval değil de *ilk* eval olduğunun sebebi.

## Yükseltme yolu bedava

Sevdiğim kısım burası.

Regresyon koşum takımının yakaladığı her hata, etiketli bir örnek. A vakasını düzeltince D vakası mı bozuldu? Artık elinde doğru cevabı bilinen ve hata modu bilinen bir vaka var — bir planlama toplantısında hayal edilmiş değil, gerçek davranıştan keşfedilmiş.

Bir ay sonra golden dataset'e sıfırdan başlamıyorsun. Gerçek hatalardan kendi kendine derlenmiş birini küratörlüyorsun — ki bu, birinin önceden neyin ters gidebileceğini tahmin ederek yazdığından belirgin şekilde daha iyi bir dataset.

Ucuz eval, sonunda değiştireceğin bir taviz değil. Pahalı olanın toplama mekanizması.

## Bu neden teslimat

Bu argümanın bir versiyonunu daha önce, iki prompt arasında seçim yapan tek kişilik bir geliştirici için yapmıştım — [prompt'un daha iyi değil, sadece daha iyi hatırlıyorsun](https://ferhatatagun.com/blog/prompt-secimi-his-degil-olcum). O yazı kişisel ölçekte kendini kandırmayla ilgiliydi ve bahis bir öğleden sonraydı.

Bir şeyi devrettiğinde bahis değişiyor.

Sen gittiğinde prompt bir metin dosyası. Biri onu düzenleyecek — makul biçimde, iyi bir sebeple, gerçek bir şikâyete karşılık. Bu bir hata modu değil, sistemin çalışması. Hata modu, düzenlemelerinin başka bir yerde neye mal olduğunu bilmelerinin hiçbir yolu olmaması.

Eval'i olmayan bir prompt, kimsenin dokunmasına izin verilmeyen bir config dosyasıdır — ki bu ya hiç iyileşmemesi ya da öngörülemez biçimde bozulması demektir. İkisi de bir deployment'ın sessizce ölme biçimi. Dondurulmuş seti *olan* bir prompt ise, sen gittikten sonra bir ekibin gerçekten sahiplenebileceği bir şey — ve işin yaşayıp yaşamayacağına, sahiplenip sahiplenemedikleri karar veriyor.

Ki sonraki yazının asıl konusu bu: ne inşa ettiğin değil, geride ne bıraktığın.

---

*Bu, kurumsal AI'ın son kilometresi üzerine bir serinin üçüncü yazısı.
Birinci: [Kimsenin modeli patlamadı. Arayüz patladı.](https://ferhatatagun.com/blog/kimsenin-modeli-patlamadi) ·
İkinci: [Kazara bir forward-deployed engineer saha çantası kurmuşum](https://ferhatatagun.com/blog/kazara-fde-saha-cantasi) ·
Dördüncü: [Çalıştığında değil, onlar değiştirebildiğinde bitti.](https://ferhatatagun.com/blog/degistirebildiklerinde-bitti) ·
Beşinci: [İkinci müşteri ne yaptığını söyler](https://ferhatatagun.com/blog/ikinci-musteri-ne-yaptigini-soyler)*
`,W=`# Çalıştığında değil, onlar değiştirebildiğinde bitti

En çok düşündüğüm deployment başarısız olmadı. UAT'yi geçti, canlıya çıktı, müşteri memnundu, ve sonunda gerçekten güzel bir e-posta vardı.

Altı ay sonra hâlâ çalışıyordu ve kimse ona dokunmamıştı. Bir kez bile. Prompt, bıraktığımla byte-byte aynıydı. Altında bir model sürümü kullanımdan kaldırılmıştı ve ekip yenisini test etmek yerine eskisini pinlemişti. Biri çıktı formatında küçük bir değişiklik istemiş ve riske değmeyeceği söylenmişti.

Hiçbir şey bozulmadı. Anlamam biraz zaman alan kısım bu. **Sistem çalışmayı bıraktığında ölmedi. Değiştirilmeyi bıraktığında öldü** — ve o altı ayın yaklaşık beşi boyunca, response dönmeye devam ederken ölüydü.

Kimsenin post-mortem yazmadığı hata modu bu, çünkü ortada olay yok. Sadece köşede duran, herkesin etrafından dolandığı bir şey var — ta ki bir reorg ya da sözleşme yenilemesi onu sessizce kaldırana kadar.

**TL;DR**

- Bir deployment'ın gerçek bitiş tarihi, bir isteğe son cevap verdiği an değil, birinin ona güvenle son kez dokunduğu andır.
- Dokümantasyon bir *durumu* tarif eder. Sahiplenme, bir *değişiklik* yapıp güvenli olduğunu bilmeyi gerektirir. Bunlar farklı teslimatlar ve ilk düzenlemeyle temasta sadece biri hayatta kalıyor.
- İşin senden sonra yaşayıp yaşamayacağını üç soru belirliyor: değiştirebiliyorlar mı, değişikliğin işe yaradığını anlayabiliyorlar mı, ve neden öyle olduğunu biliyorlar mı. Çoğu devir teslim sadece birincisini cevaplıyor.
- *Neden* en hızlı çürüyen ve en az yazılan. Kod *ne*yi kaydeder, git *ne zaman*ı kaydeder, ve tuhaf bir maddenin var olma sebebi tek bir kişinin hafızasında yaşar — ta ki gürültü gibi görünüp silinene kadar.
- Forward-deployed engineer olarak sen, tasarım gereği bus factor'sün. İş, bir takvime bağlı olarak kendini gereksiz kılmak, ve vazgeçilmez hissetmek bunun ters gittiğinin sinyali.

## Dokümantasyon tuzağı

Bir engagement'ın sonundaki içgüdü her şeyi yazmak. Mimari diyagram, çağrı sırası, deployment runbook, bileşen başına bir wiki sayfası. Özen gibi hissettiriyor ve son toplantıda işaret edebileceğin bir çıktı üretiyor.

Aynı zamanda biri ilk değişikliği yaptığı anda bayatlıyor — ve kimse değişiklik yapmıyorsa, yazmış olman zaten fark etmedi.

Rahatsız edici versiyonu: kapsamlı bir doküman işleri *kötüleştirebilir*, çünkü asıl işe yarayacak şeyin yerine geçiyor. Ekip okuyor, sistemin şeklini anlıyor, ve yine dokunmuyor — çünkü onları durduran şey hiçbir zaman mimariyi anlamamak değildi. Onları durduran şey, bir değişiklik yapıp bir şeyi bozup bozmadıklarını öğrenmenin bir yolu olmamasıydı.

Dokümantasyon "bu nedir"i cevaplıyor. Sahiplenmenin ihtiyacı "bunu değiştirirsem ne olur"a bir cevap. Birincisinin hiçbir miktarı ikincisini üretmiyor.

## Üç soru

Bir deployment'ın devir teslimden sağ çıkıp çıkmayacağı üç şeye bakıyor, ve sırayla ele alınma ihtimalleri düşüyor.

**1. Değiştirebiliyorlar mı?**

Mekanik olan. Kimlik bilgileri, repo erişimi, deploy yolu, geri alma imkânı var mı. Bu, her devir teslim kontrol listesinin kapsadığı soru, ve gerçekten gerekli.

Aynı zamanda en kolayı, ve onu geçmek biraz yanıltıcı biçimde ilerleme gibi hissettiriyor — çünkü tam production erişimi olan ve özgüveni olmayan bir ekip hiçbir şeyi değiştirmiyor, ki bu gözlemsel olarak hiç erişimi olmayan bir ekiple aynı şey.

**2. Değişikliğin işe yaradığını anlayabiliyorlar mı?**

Bu, [bir önceki yazının tüm argümanı](https://ferhatatagun.com/blog/teslim-edilen-prompt-degil-eval), ve menteşe burası.

Dondurulmuş snapshot — gerçek input'lar ve mevcut sistemin onlarda verdiği kararlar — öncelikle bir kalite aracı değil. Asıl işlevi *izin*. "Bu prompt düzenlemesi sanırım sorunsuz"u "on dört vakanın on ikisi değişmedi, kayan iki tanesi de şunlar"a çeviren şey. Birinci cümle review'da geri çevriliyor. İkincisi merge ediliyor.

Bu olmadan bir ekip prompt'u düzenlemeyecek. Düzenlememekte de haklılar. Patlama yarıçapını kontrol etmenin yolu olmadan prompt düzenlemek tedbir değil, başkasının workflow'uyla kumar oynamaktır, ve aklı başında insanlar bunu reddeder.

**3. Neden öyle olduğunu biliyorlar mı?**

Neredeyse hiç ele alınmayan, ve sessizce her şeyi belirleyen.

Gerçeklikle karşılaşmış her sistemin içinde yanlış görünen maddeler vardır. Prompt'ta gereksiz görünen bir formatta ısrar eden bir cümle. Tuhaf biçimde spesifik bir backoff'lu bir retry. Gösterilmeden önce temizlenen bir alan. Her biri var çünkü bir şey oldu — belirli bir gün, belirli bir varsayımı kıran belirli bir müşteri kaydıyla, belirli bir hata.

Altı ay sonra devralan kişi açıklaması olmayan çirkin bir madde görüyor ve makul olanı yapıyor: temizliyor. Ve orijinal hata geri geliyor, ancak artık odada ilkini hatırlayan kimse olmadığı için yeni bir bug gibi görünüyor.

Kod *ne*yi kaydeder. Git *ne zaman*ı, ve şanslıysan bir commit mesajı *neden*in sıkıştırılmış bir versiyonunu kaydeder. Hiçbir şey gerekçeyi, birinin o kararla karşılaşacağı yerde kaydetmiyor.

## Nedeni şeyin yanına değil, içine iliştir

Bende gerçekten işe yaramış pratik gösterişsiz: **gerekçeyi karar hakkındaki bir dokümana değil, kararın olduğu yere koy.**

Prompt'lar için bu, prompt dosyasının kendi içinde, her bariz olmayan talimatı üreten hatayı adlandıran bir yorum bloğu demek. "Kısa ol" değil — *"kısa ol: ikinci haftadaki 2.400 kelimelik cevaplar aşağı akışta 500 karakter sınırı olan bir alana yapıştırılıyor, cümle ortasında kesiliyor ve model hatası gibi görünüyordu."*

Davranış için bu, fonksiyonun değil olayın adını taşıyan bir test demek. \`keeps_the_account_number_when_the_name_is_missing\` adlı bir vaka, işle ilgili bir cümle. \`test_parse_edge_case_3\` adlı bir vaka hiçbir şeyle ilgili bir cümle, ve kırmızıya döndüğünde silinen o oluyor.

Bu, dondurulmuş eval setiyle aynı hamlenin davranış yerine gerekçeye uygulanmış hali. İkisi de işe yarıyor çünkü çalışan bir şeye iliştirilmişler. Bir wiki sayfası sessizce bayatlayabilir; adlandırılmış bir test gürültüyle kırmızıya döner, ve adı ona bakan kişiye neyi kırmak üzere olduğunu söyler.

Test şu: orada olmayan biri maddeyi okuyup, kendi başına, gerekçenin hâlâ geçerli olup olmadığına karar verebiliyor mu. Bütün çıta bu. "Sistemi anlıyorlar" değil — *benimle güvenle aynı fikirde olmayabiliyorlar.*

## Bus factor sensin, bilerek

Bu rolle ilgili açıkça söylenmeye değer garip bir şey var.

Forward-deployed engineer, yapısal olarak, kasten devreye sokulmuş tek nokta arızasıdır. Oradasın çünkü müşterinin ekibi o şeyi henüz yapamıyor. Orada geçirdiğin her hafta, başka hiçbir yerde olmayan bağlam biriktiriyorsun — hangi workflow dokümantasyonundan sapıyor, hangi paydaşın itirazı gerçek hangisi pozisyon alma, ikinci veri kaynağına pazartesileri neden güvenilmez.

Seni etkili kılan şey o bağlam. Aynı zamanda, aktif olarak dışarı akıtmazsan, sen gittiğinde deployment'ın ölme sebebi.

Ve teşvikler ters yönde işliyor. Sistemi anlayan kişi olmak iyi iş çıkarmak gibi hissettiriyor. Başka kimse debug edemediği için aranmak değer gibi hissettiriyor. Vazgeçilmez diye okunuyor, ve vazgeçilmez, postmortem olana kadar başarı gibi hissettiriyor.

Asıl önemli metrik optimize etmesi rahatsız edici olan: **ne kadar hızlı gereksizleştiğin.** Ne kadar shiplediğin değil. Kalanların seni odada istemeyi ne kadar çabuk bıraktığı.

Ki bu ölçülmesi garip bir şey, ve çoğu engagement'ın bunu hiç ölçtüğünü sanmıyorum — teslimatı ölçüyorlar, teslimat da sen hâlâ oradayken olan kısım.

## Gerçekte ne bırakırdım

Somut olarak, kulağa hoş gelip hayatta kalmayan kısımlardan arındırılmış hali:

- **Dondurulmuş set**, repo'nun içinde, tek komutla çalıştırma yoluyla. Notebook değil, birinin hatırlaması gereken bir süreç değil. \`npm run eval\` ya da eşdeğeri, yazarı olmayan birinin okuyabileceği çıktı.
- **Bir kararlar dosyası**, ama sıkı kapsamlı: sadece bariz seçeneğin reddedildiği kararlar, her biri onu bariz-ama-yanlış yapan şeyi adlandırarak. Varsayılanları belgeleyen altmış madde değil, önemli olan on madde.
- **Gerekçeler satır içinde** — prompt'ta, test adlarında, retry sabitinin yanında. Birinin onu değiştirmeyi düşünürken duracağı her yerde.
- **Bir değişikliği onlar yapsın, ben değil.** Başka birinin prompt'u düzenlediği, eval'i çalıştırdığı, diff'i okuduğu ve shiplediği anda orada oturmak. Bir ekibin bunu bir kez yaptığını izlemek, yerine başka bir şey konabildiğini hiç görmediğim tek devir teslim adımı. Diğer her şey iyi bir dokümanla taklit edilebilir; bu edilemez.

Sonuncusu aslında bütün mesele. Ondan öncekilerin hepsi, senden başka birinin sistemi değiştirdiği ve kötü bir şey olmadığı ana hazırlık. O an sen gitmeden önce gerçekleşmiyorsa, gerçekleşebileceğine dair hiçbir kanıtın yok.

Ve "gerçekleşebileceğine dair kanıt yok", pratikte "gerçekleşmeyecek" ile aynı şey — ki bu da altı aylık saati geri getiriyor, ve hâlâ cevap verirken çoktan ölmüş olan sistemi.

---

Bütün bunların rahatsız edici iması şu: iş aslında modelle, prompt'la, hatta arayüzle ilgili değil — bir ekibin bir yeteneği başka bir ekibe devredip devredemeyeceğiyle ilgili. Ki bu, bu alandaki her şeyden çok daha eski bir problem, ve serinin son yazısının konusu.

---

*Bu, kurumsal AI'ın son kilometresi üzerine bir serinin dördüncü yazısı.
Birinci: [Kimsenin modeli patlamadı. Arayüz patladı.](https://ferhatatagun.com/blog/kimsenin-modeli-patlamadi) ·
İkinci: [Kazara bir forward-deployed engineer saha çantası kurmuşum](https://ferhatatagun.com/blog/kazara-fde-saha-cantasi) ·
Üçüncü: [Teslim ettiğin şey prompt değil. Eval.](https://ferhatatagun.com/blog/teslim-edilen-prompt-degil-eval) ·
Beşinci: [İkinci müşteri ne yaptığını söyler](https://ferhatatagun.com/blog/ikinci-musteri-ne-yaptigini-soyler)*
`,G=`# İkinci müşteri ne yaptığını söyler

Forward-deployed iş hakkında tekrarlanan, genelde Palantir'in modeline atfedilen bir cümle var, ve yanlış tarafında kalana kadar slogan gibi duruyor: **tek müşteri, çok yetenek** — SaaS şekli olan çok müşteri, tek yeteneğin karşıtı olarak.

SaaS şekli iyi anlaşılmış. Çok insanın ihtiyaç duyduğu tek bir şey bul, bir kez inşa et, tekrar tekrar sat, ve her ek müşteri sana neredeyse hiçbir şeye mal olmasın. Ürün yönetimi disiplininin tamamı o tek şeyi tespit etmek üzerine kurulu.

Forward-deployed iş ters yönde çalışıyor. Tek bir organizasyona yerleşiyorsun ve o organizasyonun gerçekten ihtiyaç duyduğu her şeyi inşa ediyorsun — ki bu on bir şey çıkıyor, çoğunu bina dışından kimse ürün olarak tanımaz. Ve sonra biri, yazılım şirketi mi yoksa şirket kılığında bir danışmanlık mı olduğuna karar veren soruyu soruyor: **bu on birden hangisi bir yetenek, hangisi bir daha asla satamayacağın ısmarlama iş?**

Bunu iki yönden birinde yanlış yapmak öldürücü, ve iki hata birbirine hiç benzemiyor.

**TL;DR**

- FDE işi SaaS şeklini tersine çeviriyor: çok müşteriye genişlik yerine tek müşteriyle derinlik. Bu, ürün keşfinden daha hızlı yetenek üretiyor ve hangilerinin genelleşeceğini anlamanın hiçbir yolunu vermiyor.
- Çok erken genelle, örneklem büyüklüğü bir olan bir duruma uydurulmuş konfigüre edilebilir bir soyutlama shiplersin. Değişen eksende ayarları vardır, değişmeyen ekseni hardcode eder.
- Hiç genelleme, her deployment ısmarlama olur. Marj gider, ikinci engagement birincisi kadar pahalıya patlar, ve gelirini "platform" altında dosyalayan bir danışmanlık olursun.
- İki müşterinin aynı özelliği istemesi sinyal değil. İki müşterinin ona **aynı alttaki sebeple** varması sinyal. Aynı istek, farklı sebepler; inşa ettiğin an ayrışacak bir tesadüf.
- En güvenilir kanıt istek değil. Geçici çözüm: kimse sormadan önce iki ekibin de elle kurmuş olduğu şey.

## İki hata

**Çok erken genellemek**, mühendislerin yaptığı; çünkü soyutlama zanaatkârlık gibi hissettiriyor. Bir müşteri için bir problemi çözdün, şeklini görebiliyorsun, ve şekil yeniden kullanılabilir görünüyor. Böylece spesifikleri konfigürasyona çıkarıp genel versiyonu shipliyorsun.

Tek bir deployment'ın içinden göremediğin şey, hangi eksenin gerçekten değiştiği. Tek veri kaynağın vardı, o yüzden veri kaynağını takılabilir yaptın. Tek onay akışın vardı, o yüzden onay akışını hardcode bıraktın. İkinci müşteri aynı veri kaynağı ve tamamen farklı bir onay akışıyla geliyor, ve şimdi elinde hiçbir şeyin kımıldamadığı yönde esnek, her şeyin kımıldadığı yönde katı bir soyutlama var. İki müşteri de ısmarlama bir yapımdan daha kötü bir sistem alıyor, ve soyutlama artık taşıyıcı olduğu için kaldırmak bir proje.

**Hiç genellememek** daha sessiz ve canını yakması daha uzun sürüyor. Her engagement sıfırdan yapım. Her biri iyi gidiyor. Mühendisler çok iyileşiyor ve teslimat çok güvenilir oluyor, ve onuncu deployment'ın maliyeti kabaca birincinin maliyeti kadar. Bu geçerli bir iş — sadece danışmanlık, ve genellikle ürünmüş gibi değerleniyor ve kadrolanıyor; dağıldığı yer de burası. Açık önce marj olarak, sonra işe alım olarak, sonra da şirketin ne sattığını kimseye açıklayamamak olarak görünüyor.

İki hata da aynı eksik şeyden geliyor: bir yeteneğin ne zaman gerçek olduğuna dair bir test.

## İstek sinyal değil

Sezgisel test tekrar. İki müşteri aynı özelliği istiyor, o zaman düzgün inşa et.

Bunun tuttuğunu sanmıyorum, ve sebebi bu işin daha ilginç yarısı.

İki organizasyon aynı şeyi tamamen ilgisiz sebeplerle isteyebilir. İkisi de CSV export istiyor: biri analistleri Excel'de yaşadığı için, diğeri compliance ekibinin denetim izi için değiştirilemez bir çıktıya ihtiyacı olduğu için. Aynı istek, ticket'ta aynı üç kelime. Genel versiyonu inşa et, birincinin canlı veri ve sütun sıralaması istediğini, ikincisinin ise checksum'lı ve saklama politikalı dondurulmuş bir dosyaya ihtiyacı olduğunu keşfedeceksin. İkisini birden karşılayan özellik, adı ortak olan iki özellik.

Genelleşmeyi asıl öngören şey isteğin yakınsaması değil. *Kısıtın* yakınsaması.

Bu, [iki yazı önce kendi araçlarım hakkında](https://ferhatatagun.com/blog/kazara-fde-saha-cantasi) yaptığım argümanın öbür ucundan hali. Beş şeyi kişisel tercih gibi hissettiren sebeplerle yalnızca-tarayıcı ve BYOK yaptım, ve sonradan fark ettim ki bunlar tam olarak başkasının regüle ortamında çalışmanın kısıtları — kurulacak bir şey yok, sınırı geçen veri yok, güvenlik ekibinin threat-model'leyeceği bir şey yok. Bunu hiçbir yerden kopyalamamıştım. Aynı *şekle* sahip iki problem, ilgili insanlar hiç konuşmadan aynı mühendislik kararlarını üretiyor.

Bu bağımsızlık bütün sinyal. İki müşteri aynı tasarıma, durumları yapısal bir kısıtı paylaştığı için varıyorsa — verinin geçemediği bir sınır, gerekçenin saklanmasını isteyen bir düzenleyici, sahibi izne çıkınca da ayakta kalması gereken bir workflow — ikisi için inşa ettiğin şey gerçekten tek bir şey. Aynı isteğe farklı kısıtlardan varıyorlarsa, bir isim çakışmasına bakıyorsun.

Yani tekrar eden bir istek hakkında sorulacak soru *bunu kaç müşteri istiyor* değil. **Onları isteten şey ne, ve aynı şey mi.**

## İsteğe değil, geçici çözüme bak

Bulduğum en faydalı kanıt müşterilerin istediklerinde değil. Zaten elleriyle kurmuş olduklarında.

Gerçek bir workflow yürüten her organizasyonda birikmiş bir manuel telafi katmanı var: birinin güncellediği bir spreadsheet, kuyruk işlevi gören bir Slack kanalı, her sabah dokuzda bir şeyi kontrol eden bir kişi. Bunlar var çünkü sistemde bir şey yapılması gereken bir işi yapmıyor, ve biri boşluğu kendi zamanıyla dolduracak kadar önemsedi.

Aynı geçici çözümü bağımsız olarak kurmuş iki müşteri, sana aynı özelliği isteyen iki müşteriden çok daha güçlü bir şey söylüyor. Bir istek özlem olabilir, bir konferans konuşmasından sana geri okunuyor olabilir, ya da bir paydaşın tercihi olabilir. Geçici çözüm ise *bedeli ödenmiş*. Biri günde bir saatini harcıyor. Kimse "olsa iyi olur" için bunu sürdürmez.

Ve geçici çözümler, alttaki kısıt hakkında isteklerin olmadığı şekilde okunabilir. Sabah kontrolü var çünkü süreç asenkron ve kimse gürültüyle patlayacağına güvenmiyor. Spreadsheet var çünkü sistemin iş modeli gerçeklikten bir alan eksik. Kısıt bu, ve müşteriler arasında karşılaştırabileceğin bir formda ifade edilmiş — kısıtları karşılaştırmak da özellik istek listesinin senin yerine yapamayacağı şey.

## FDE sensördür, ve sorun raporlama hattı

Bu doğruysa, deployment'a yerleşmiş kişi şirketin sahip olduğu en yüksek bant genişlikli ürün keşif aleti. Anket okumuyor. Geçici çözümün, sabah dokuzda, onu kuran kişi tarafından kullanılışını izliyor.

Ki bu, hafife alındığını düşündüğüm yapısal bir soruyu doğuruyor: **o kişinin öğrendiğini kim okuyor?**

Çoğu düzende forward-deployed engineer teslimat üzerinden raporluyor. Teslimat ise bu deployment'ı zamanında shiplemekle ölçülüyor. Üçüncü müşterinin, birinci müşteriyle aynı spreadsheet'i bağımsız olarak yeniden kurduğu gözlemi bir teslimat çıktısı değil. Genelde onun için bir alan, indiği bir mecra, ve meşgul bir mühendisin yazması için bir teşvik yok.

Böylece tek bir kişinin kafasında kalıyor — ki [bir önceki yazının müşteri devir teslimi hakkında savunduğu gibi](https://ferhatatagun.com/blog/degistirebildiklerinde-bitti), bu var olmamakla aynı şey. Hata modu birebir aynı, sadece içeriye dönük: bağlam bir bireyde birikiyor, organizasyona akıtılmıyor, ve o kişi gidince gidiyor. Bir şirket ürün yol haritasını, sahip olduğunu hiç fark etmeden bu şekilde kaybedebilir.

Çözüm karmaşık değil, sadece kimsenin işi değil: yerleşik mühendislerin *istek* değil *kısıt* raporlaması için sürekli, düşük törenli bir yol. "Müşteri export istiyor" değil, "bu yıl verisi sınırdan çıkamayan üçüncü müşteri, üçü de manuel bir extract kurmuş". Arka arkaya üç tane böylesi, kendi kendini vermiş bir ürün kararıdır.

## Serinin aslında konusu neydi

Beş yazı, ve altındaki desen başlarken beklediğimden daha tutarlı.

Pilotlar modelde değil arayüzde patlıyor. Hayatta kalan araçlar, dile getirilmiş kısıtı olanlar. Teslimat eval'dir, çünkü eval başkasının o şeyi değiştirmesini sağlayan şey. Devir teslim, bir ekip bir değişiklik yapıp güvenli olduğunu bilebildiğinde işliyor. Ve yetenek, iki müşteri ona aynı kelimelerle değil aynı kısıtla vardığında genelleşiyor.

Bunların her biri aynı iddianın farklı bir yerdeki hali: **zor kısım devir, inşa değil.** Modelden insana, prototipten workflow'a, senden kalan ekibe, bir müşteriden diğerine. Model hiçbir zaman darboğaz değildi, ve her çeyrek daha az darboğaz oluyor.

Ki bence rolün var olma sebebi bu, ve eskisinin sekiz katı sıklıkta işe alınmasının da — teknoloji zorlaştığı için değil, devir hiç kolaylaşmadığı için; ve pahalı kısmın hep o olduğu ortaya çıktığı için.

---

*Bu, kurumsal AI'ın son kilometresi üzerine bir serinin beşinci ve son yazısı.
Birinci: [Kimsenin modeli patlamadı. Arayüz patladı.](https://ferhatatagun.com/blog/kimsenin-modeli-patlamadi) ·
İkinci: [Kazara bir forward-deployed engineer saha çantası kurmuşum](https://ferhatatagun.com/blog/kazara-fde-saha-cantasi) ·
Üçüncü: [Teslim ettiğin şey prompt değil. Eval.](https://ferhatatagun.com/blog/teslim-edilen-prompt-degil-eval) ·
Dördüncü: [Çalıştığında değil, onlar değiştirebildiğinde bitti.](https://ferhatatagun.com/blog/degistirebildiklerinde-bitti)*
`,J=`# Gerçekten işe yarayan kurallar ve komutlar

Proje kuralları ve slash komutları ancak kullanırsan işe yarıyor. Bariz geliyor. Ama çoğu ekip bir kere uzun bir \`.cursorrules\` yazıyor, unutuyor, ve aynı talimatları her sohbette tekrar etmeye devam ediyor. Kuralların ve komutların kalıcı olmasının yolu şu.

## Teoriden değil, acıdan başla

"Kuralımız olması lazım" diye kural yazma. Bir şey sürekli ters gittiğinde yaz. Biri sürekli \`any\` kullanıyordur, ya da loading state eklemeyi unutuyordur, ya da 400 satırlık component yazıyordur. Bunu bir review'da yakala, \`.cursorrules\`'a tek satır ekle: "\`any\` yok. Düzgün tip kullan." Bir dahakine model kod önermeden önce onu görüyor. Gerçek bir problemi çözdüğü için kalıcı olan bir kural bu.

Komutlar için de aynısı. Her gün aynı prompt'u yazdığını fark ediyorsan ("error handling ekle ve bizim toast helper'ı kullan"), onu bir custom instruction'a ya da kayıtlı bir prompt'a çevir. En iyi komutlar, zaten yaptığın tekrarlardan çıkıyor.

## Listeyi kısa tut

Uzun kural dosyaları görmezden geliniyor. Model bir metin duvarı alıyor ve ya atlıyor ya da tutarsız uyguluyor. Proje geneli kurallarda 20 satırın altını hedefliyorum. Şunun gibi şeyler: varsayılan dil, inline style yok, design token'larımızı kullan, component'leri nasıl adlandırıyoruz. Fikir başına bir satır. Bir kural bir cümleden uzunsa, muhtemelen iki kuraldır ya da fazla muğlaktır.

Komutlar: aynı fikir. Yüksek kaldıraçlı birkaç tanesi uzun bir menüyü yener. "Bunu shared hook'u kullanacak şekilde refactor et." "Happy path ve bir hata durumu için test ekle." 3–5 tanesini hatırlar ve kullanırsın; 20 tanesini unutursun.

## Kuralları önemli oldukları anda görünür yap

Modelin okuduğu bir dosyadaki kurallar iyi. Akışın içinde beliren kurallar daha iyi. Örneğin: "\`src/ui/\` içindeki component'leri düzenlerken design system'imizi tercih et; yeni renk ya da spacing değeri ekleme." Böylece model o klasördeyken kural alakalı oluyor. Bunu her zaman yapamıyorsun (Cursor henüz klasör bazlı kuralları desteklemiyor), ama kural dosyasını odaklı tutabilirsin ki model alakasız şeylerin içinde boğulmasın.

Komutlar için, her gün kullandıklarını gerçekten tıkladığın bir yere koy: Cursor'ın custom instruction'ları, ya da repo'da küçük bir kopya kâğıdı. Kimsenin açmadığı bir dokümanın içine gömülüyse kalıcı olmayacak.

## Gerçek kullanımdan iterasyon yap

Birkaç haftada bir, review'larda neyi düzeltmek ya da yeniden prompt'lamak zorunda kaldığına bak. Yeni kural ve komut adayları onlar. Ve bir kurala hiç uyulmuyorsa (ya da sürekli kapatıyorsan), sil ya da kısalt. Ölü kurallar gürültü ekliyor ve ekibe dosyayı görmezden gelmeyi öğretiyor.

Kurallar ve komutlar tek seferlik bir kurulum değil. Küçük bir döngü: tekrar eden bir hatayı fark et → kural ekle ya da düzelt → davranış düzeliyor mu bak → tekrarla. Kalıcı olanlar, gerçekten hissettiğin bir acıyı geçirenler.
`,F=`# The failures that don't throw

You ask a model for \`{"risk": "high" | "medium" | "low", "score": 0-100}\`. You run it, you get exactly that, you wire it up and ship.

Six weeks later somebody notices that a handful of claims were auto-approved that obviously shouldn't have been. Nothing errored. There's no exception in the logs, no failed request, no alert. The rows just have the wrong value in them, and they've had it for six weeks.

What happened is that one call in forty came back with \`"HIGH"\` instead of \`"high"\`, and your code did this:

\`\`\`ts
switch (result.risk) {
  case "high":   return escalate(claim);
  case "medium": return queue(claim);
  case "low":    return autoApprove(claim);
  default:       return autoApprove(claim);
}
\`\`\`

The default branch is almost always the permissive one, because that's what keeps the queue moving. So the model said *maximum risk* and your system read it as *approve automatically*. The failure didn't degrade the decision. It inverted it.

That's the class of bug [**guard-lab**](https://guard-lab.vercel.app) exists to find: define a schema, run a prompt against it N times, and look at the distribution of ways it breaks.

**TL;DR**

- Schema failures are distributional. One clean run tells you nothing, and five tell you almost nothing.
- A single "94% compliant" number is worse than no number, because the interesting question isn't how many failed — it's what your code does about each one.
- Three buckets: **crash** (throws, already in your error rate), **recoverable** (right payload, wrapped), and **silent** (parses, is accepted, is wrong). Only the third is invisible, and it's the only one that needs a tool.
- Zero failures in fifty runs is not a zero failure rate. At n = 50 the data is still consistent with about 7%. Ruling out 1% takes 381 clean runs.
- Constrained decoding removes most of this and is the right first move. It does not tell you your rate, and it constrains shape rather than sense.

## Counting failures is the wrong instrument

The obvious way to build this is a compliance percentage. Run it fifty times, count how many matched, print 94%.

I built that first and it was useless within an hour, for a reason that took me longer to articulate than it should have: **the failures are not equally dangerous, and a single number averages over the only distinction that matters.**

Consider two runs that both report 94%.

In the first, the 6% is markdown fences — the model wrapped the object in \` \`\`\`json \`. Your parser either strips fences or it doesn't. If it does, that 6% costs you nothing at all. If it doesn't, it costs you 6% of requests, loudly, on day one, and you fix it before lunch.

In the second, the 6% is enum drift and numbers arriving as strings. Nothing throws. Every one of those responses is accepted by your code, written to your database, and rendered on someone's screen. You will find out when a customer does.

Same number. Completely different situation. One is a morning; the other is the six weeks at the top of this post.

## The three buckets

So guard-lab sorts failures by what your code does about them rather than by what went wrong:

**Crash** — the output doesn't parse. \`JSON.parse\` throws, the request fails, and it appears in an error rate you're already watching. Genuinely fine. Loud failures get fixed.

**Recoverable** — the payload is correct but wrapped. A markdown fence, a sentence of preamble, a helpful trailing note. Free if you strip it, fatal if you assume the body is only JSON. Either way you find out immediately.

**Silent** — the output parses, your code accepts it, and the value is wrong.

The third bucket is the whole point, and it's bigger than it looks. It isn't only enum drift:

- **A missing field** reads as \`undefined\`. Templates render blank, comparisons quietly go false, nothing throws.
- **\`"score": "85"\`** as a string gives you \`NaN\` on arithmetic, or \`"8510"\` on \`+ 10\`. No error either way.
- **An invented enum** — \`"very high"\` — passes every check you wrote for the values you expected and hits the default branch as if it were routine.
- **\`"score": 150\`** on a 0–100 field is a valid number in an invalid position. It renders, it charts, it misleads.
- **\`null\` where a value was required** passes an existence check and fails a type check somewhere far away, at a distance from the cause.

Every one of these is accepted by JavaScript without complaint. None of them will ever appear in your error rate. That's not a gap in your monitoring — it's a category your monitoring cannot see, because from the outside nothing went wrong.

## Zero failures is not a zero failure rate

Here's the part I didn't expect to end up caring most about.

You run the tool, fifty times, and everything passes. Green across the board. That reads as proof, and it isn't one.

Fifty clean runs is a sample. The true failure rate is whatever it is, and your sample is consistent with a range of values — at n = 50 with zero observed failures, the 95% Wilson upper bound is **7.1%**. At a thousand calls a day, that's up to seventy-one bad records daily that your test run had no power to detect.

So guard-lab never shows a bare zero. A clean sweep gets an interval and a sentence saying what it does and doesn't rule out, because the reassuring version of that screen is the single most misleading thing the tool could do. The whole reason someone runs it is to stop trusting a sample of one; handing them a sample of fifty dressed up as certainty would just move the same mistake somewhere more expensive.

The deflating corollary: ruling out a 1% failure rate takes **381 clean runs**. Which is a real number that real teams will not run, and knowing that is still better than believing five runs settled it.

## The strongest version of the counter-argument

Let me argue the other side properly, because there's a good objection here and the weak version isn't worth knocking down.

*This is a solved problem. Use structured outputs.* Tool use with a JSON schema, or a constrained-decoding mode, forces the model's output to conform at the token level. Fences, prose, unparseable output, missing fields, wrong types — most of the taxonomy above simply cannot happen.

That's correct, and it should be your first move. If you can use constrained decoding, use it; a validator downstream of an unconstrained prompt is a worse design than not needing one.

Two things survive it.

**It constrains shape, not sense.** A schema that says \`"risk"\` is one of three strings will get you one of three strings. It will not tell you whether the model picked the right one, and it won't catch a range violation you didn't encode — most people write \`"type": "number"\` and not the 0–100 bound, so \`150\` passes. Constrained decoding turns a syntax problem into a semantics problem. That's a large improvement and not a solution.

**Plenty of production code isn't in a position to use it.** A prompt template inside a vendor product. An internal gateway that normalises requests and drops the tool-use block. An older endpoint someone integrated in 2024 and nobody has budget to revisit. A model behind a proxy that only forwards \`messages\`. These are not exotic; they're most of what an engineer walking into someone else's environment actually finds.

And underneath both: **constrained decoding doesn't give you a rate.** It reduces the failure probability, plausibly by a lot, to some number you still don't know. If the answer to "how often does this break" is "less than before", you haven't measured anything — you've just moved the number somewhere you can't see it.

## Two bugs I shipped into it

The useful part of building this was that I committed, twice, exactly the kind of error the tool is for.

**The first was a silent failure inside the silent-failure detector.** To be generous about what counts as recoverable, the parser salvages JSON out of surrounding prose by taking the widest span between the first \`{\` and the last \`}\` — which is roughly what defensive production code does. Then a test case handed it \`[{...}, {...}]\`: a model returning an array of results instead of one object.

The salvage worked. It pulled the first object out, reported a clean recovery, and silently discarded every element after it.

That is precisely the failure mode in the post you're reading — parses, is accepted, is wrong — committed inside the thing built to catch it. The fix is to parse the response as-is first, exactly as real code would, and only fall back to salvage when that fails. Valid JSON of the wrong shape now reaches the caller intact and gets judged as a crash, because that's what it is.

**The second was a statistical self-contradiction.** For "how many clean runs would it take to rule out a 1% failure rate" I used the rule of three: zero events in n trials bounds the rate near 3/n, so 300 runs. Textbook, correct, widely used.

Except everywhere else the tool reports a Wilson interval, and Wilson is slightly more conservative at zero. Run 300 clean and it would have told you **1.26%** — after promising 300 would get you to 1%. Two individually defensible methods, disagreeing, in a tool whose entire pitch is that you should trust its numbers.

It now inverts the same interval it displays. The answer is 381 rather than 300: less satisfying, and consistent with what the tool will say to you afterwards.

Neither bug was caught by using the app. Both were caught by tests written against reference values — seventeen classifier cases, and Wilson checked against published intervals. Which is its own small argument for [the thing I wrote about evals two posts ago](https://ferhatatagun.com/blog/the-eval-is-the-deliverable): looking at the screen and seeing plausible numbers is not verification.

## What it doesn't tell you

Anything about whether the answers are *good*.

A response can satisfy every field in the schema — correct enum, in-range score, all fields present — and be completely wrong about the claim. guard-lab measures whether the contract holds. Whether the judgement inside the contract is any good is the other kind of eval, the one that needs ground truth, and this doesn't touch it.

Contract compliance is the floor. It's just that most teams have never measured the floor, and it turns out not to be where they assumed it was.

---

**[guard-lab](https://guard-lab.vercel.app)** is free, open source, and browser-only — BYOK, and the key never leaves your tab because there's no backend to send it to. Source on [GitHub](https://github.com/ferhatatagun/guard-lab).

It's the sixth in a set of tools built under one constraint: they have to work in a room where you can't install anything and the data can't leave. [The rest are here.](https://ferhatatagun.com/tools)
`,$=`# Patlamayan hatalar

Modelden \`{"risk": "high" | "medium" | "low", "score": 0-100}\` istiyorsun. Çalıştırıyorsun, tam da onu alıyorsun, bağlayıp shipliyorsun.

Altı hafta sonra biri, açıkça onaylanmaması gereken birkaç talebin otomatik onaylandığını fark ediyor. Hiçbir şey hata vermemiş. Log'da exception yok, başarısız istek yok, alarm yok. Satırlarda sadece yanlış değer var, ve altı haftadır orada.

Olan şu: kırk çağrının biri \`"high"\` yerine \`"HIGH"\` dönmüş, ve kodun şunu yapmış:

\`\`\`ts
switch (result.risk) {
  case "high":   return escalate(claim);
  case "medium": return queue(claim);
  case "low":    return autoApprove(claim);
  default:       return autoApprove(claim);
}
\`\`\`

Default dalı neredeyse her zaman izin veren daldır, çünkü kuyruğu akıtan odur. Yani model *maksimum risk* dedi ve sistemin bunu *otomatik onayla* diye okudu. Hata kararı bozmadı. Tersine çevirdi.

[**guard-lab**](https://guard-lab.vercel.app) tam da bu sınıf bug'ı bulmak için var: bir şema tanımla, bir prompt'u ona karşı N kez çalıştır, ve bozulma biçimlerinin dağılımına bak.

**TL;DR**

- Şema hataları dağılımsaldır. Tek temiz çalıştırma sana hiçbir şey söylemez, beş tanesi de neredeyse hiçbir şey.
- Tek bir "%94 uyumlu" sayısı, hiç sayı olmamasından kötüdür; çünkü ilginç soru kaçının patladığı değil — kodunun her biri hakkında ne yaptığı.
- Üç kova: **crash** (patlıyor, zaten error rate'inde), **recoverable** (doğru payload, sarmalanmış), ve **silent** (parse oluyor, kabul ediliyor, yanlış). Sadece üçüncüsü görünmez, ve alet gerektiren tek şey o.
- Elli çalıştırmada sıfır hata, sıfır hata oranı demek değil. n = 50'de veri hâlâ yaklaşık %7 ile tutarlı. %1'i elemek 381 temiz çalıştırma alıyor.
- Constrained decoding bunun çoğunu kaldırıyor ve ilk hamlen o olmalı. Ama sana oranını söylemiyor, ve şekli kısıtlıyor, anlamı değil.

## Hata saymak yanlış alet

Bunu kurmanın bariz yolu bir uyum yüzdesi. Elli kez çalıştır, kaçının eşleştiğini say, %94 yazdır.

Önce onu yaptım ve bir saat içinde işe yaramaz olduğu ortaya çıktı; sebebini dile getirmem gerekenden uzun sürdü: **hatalar eşit derecede tehlikeli değil, ve tek bir sayı tam da önemli olan tek ayrımın üstünden ortalama alıyor.**

İkisi de %94 raporlayan iki çalıştırma düşünün.

Birincisinde %6 markdown fence — model nesneyi \` \`\`\`json \` içine sarmış. Parser'ın ya fence temizliyordur ya temizlemiyordur. Temizliyorsa bu %6 sana hiçbir şeye mal olmuyor. Temizlemiyorsa isteklerin %6'sına mal oluyor, gürültüyle, birinci günde, ve öğle yemeğinden önce düzeltiyorsun.

İkincisinde %6 enum kayması ve string olarak gelen sayılar. Hiçbir şey patlamıyor. O yanıtların her biri kodun tarafından kabul ediliyor, veritabanına yazılıyor, ve birinin ekranında render ediliyor. Bir müşteri öğrendiğinde öğreneceksin.

Aynı sayı. Tamamen farklı durum. Biri bir sabah; diğeri bu yazının başındaki altı hafta.

## Üç kova

Bu yüzden guard-lab hataları ne olduklarına göre değil, kodunun onlar hakkında ne yaptığına göre ayırıyor:

**Crash** — çıktı parse olmuyor. \`JSON.parse\` patlıyor, istek başarısız oluyor, ve zaten izlediğin bir error rate'te görünüyor. Gerçekten sorun değil. Gürültülü hatalar düzeltilir.

**Recoverable** — payload doğru ama sarmalanmış. Bir markdown fence, bir giriş cümlesi, yardımsever bir kapanış notu. Temizliyorsan bedava, gövdenin sadece JSON olduğunu varsayıyorsan öldürücü. Her iki durumda da hemen öğreniyorsun.

**Silent** — çıktı parse oluyor, kodun kabul ediyor, ve değer yanlış.

Üçüncü kova bütün mesele, ve göründüğünden büyük. Sadece enum kayması değil:

- **Eksik alan** \`undefined\` olarak okunuyor. Template'ler boş render ediyor, karşılaştırmalar sessizce false'a düşüyor, hiçbir şey patlamıyor.
- **String olarak \`"score": "85"\`** aritmetikte \`NaN\` veriyor, ya da \`+ 10\` ile \`"8510"\`. İkisinde de hata yok.
- **Uydurulmuş enum** — \`"very high"\` — beklediğin değerler için yazdığın her kontrolden geçiyor ve rutinmiş gibi default dalına düşüyor.
- **0–100 alanında \`"score": 150\`** geçersiz bir konumda geçerli bir sayı. Render ediliyor, grafiğe giriyor, yanıltıyor.
- **Değer beklenen yerde \`null\`** çoğu kodda varlık kontrolünden geçiyor ve çok uzakta, sebepten kopuk bir yerde tip kontrolünde patlıyor.

Bunların her biri JavaScript tarafından itirazsız kabul ediliyor. Hiçbiri error rate'inde asla görünmeyecek. Bu monitoring'inde bir boşluk değil — monitoring'inin *göremeyeceği* bir kategori, çünkü dışarıdan bakınca hiçbir şey ters gitmedi.

## Sıfır hata, sıfır hata oranı değil

En çok önemseyeceğimi beklemediğim kısım burası.

Aracı çalıştırıyorsun, elli kez, ve hepsi geçiyor. Baştan aşağı yeşil. Bu kanıt gibi okunuyor, ve değil.

Elli temiz çalıştırma bir örneklem. Gerçek hata oranı her neyse o, ve örneklemin bir değerler aralığıyla tutarlı — n = 50'de sıfır gözlenen hatayla %95 Wilson üst sınırı **%7.1**. Günde bin çağrıda bu, test çalıştırmanın tespit etme gücü olmayan, günde yetmiş bir bozuk kayda kadar demek.

Bu yüzden guard-lab asla çıplak bir sıfır göstermiyor. Temiz bir tarama bir aralık ve neyi eleyip neyi elemediğini söyleyen bir cümle alıyor; çünkü o ekranın rahatlatıcı versiyonu aracın yapabileceği en yanıltıcı tek şey olurdu. Birinin bunu çalıştırmasının tüm sebebi bir örnekliğe güvenmeyi bırakmak; ona elli örnekliği kesinlik kılığında vermek aynı hatayı daha pahalı bir yere taşımaktan ibaret olurdu.

Moral bozucu doğal sonuç: %1'lik bir hata oranını elemek **381 temiz çalıştırma** alıyor. Gerçek ekiplerin çalıştırmayacağı gerçek bir sayı, ve bunu bilmek yine de beş çalıştırmanın meseleyi kapattığına inanmaktan iyi.

## Karşı argümanın en güçlü hali

Karşı tarafı düzgün savunayım, çünkü burada iyi bir itiraz var ve zayıf halini devirmeye değmez.

*Bu çözülmüş bir problem. Structured output kullan.* JSON şemasıyla tool use, ya da bir constrained-decoding modu, modelin çıktısını token seviyesinde uymaya zorluyor. Fence'ler, düz metin, parse olmayan çıktı, eksik alanlar, yanlış tipler — yukarıdaki taksonominin çoğu düpedüz olamaz hale geliyor.

Bu doğru, ve ilk hamlen o olmalı. Constrained decoding kullanabiliyorsan kullan; kısıtlanmamış bir prompt'un arkasına validator koymak, ona ihtiyaç duymamaktan kötü bir tasarım.

İki şey hayatta kalıyor.

**Şekli kısıtlıyor, anlamı değil.** \`"risk"\` üç string'den biri diyen bir şema sana üç string'den birini verecek. Doğru olanı seçip seçmediğini söylemeyecek, ve kodlamadığın bir aralık ihlalini yakalamayacak — çoğu insan 0–100 sınırını değil \`"type": "number"\` yazıyor, yani \`150\` geçiyor. Constrained decoding bir sözdizimi problemini anlam problemine çeviriyor. Bu büyük bir iyileşme ve bir çözüm değil.

**Çok sayıda production kodu onu kullanacak konumda değil.** Bir satıcı ürününün içindeki prompt template'i. İstekleri normalize edip tool-use bloğunu düşüren bir iç gateway. Birinin 2024'te entegre ettiği ve kimsenin elden geçirmeye bütçesi olmayan eski bir endpoint. Sadece \`messages\` ileten bir proxy'nin arkasındaki model. Bunlar egzotik değil; başkasının ortamına giren bir mühendisin gerçekte bulduğu şeylerin çoğu.

Ve ikisinin de altında: **constrained decoding sana bir oran vermiyor.** Hata olasılığını düşürüyor, muhtemelen epeyce, hâlâ bilmediğin bir sayıya. "Bu ne sıklıkla bozuluyor"un cevabı "eskisinden az" ise hiçbir şey ölçmemişsin — sadece sayıyı göremediğin bir yere taşımışsın.

## İçine gönderdiğim iki bug

Bunu yapmanın faydalı kısmı, tam da aracın var olma sebebi olan türden hatayı iki kez işlemem oldu.

**Birincisi, sessiz-hata dedektörünün içindeki sessiz bir hataydı.** Neyin kurtarılabilir sayılacağı konusunda cömert olmak için parser, çevreleyen düz metnin içinden JSON'u ilk \`{\` ile son \`}\` arasındaki en geniş aralığı alarak çıkarıyor — ki savunmacı production kodunun yaptığı aşağı yukarı bu. Sonra bir test vakası ona \`[{...}, {...}]\` verdi: tek nesne yerine sonuç dizisi dönen bir model.

Kurtarma çalıştı. İlk nesneyi çekti, temiz bir kurtarma raporladı, ve ondan sonraki her elemanı sessizce attı.

Bu tam olarak okuduğunuz yazıdaki hata modu — parse oluyor, kabul ediliyor, yanlış — onu yakalamak için yapılmış şeyin içinde işlenmiş halde. Çözüm, yanıtı önce olduğu gibi, tam da gerçek kodun yapacağı şekilde parse etmek, ve ancak o başarısız olunca kurtarmaya düşmek. Yanlış şekildeki geçerli JSON artık çağırana bozulmadan ulaşıyor ve crash olarak yargılanıyor, çünkü öyle.

**İkincisi istatistiksel bir kendiyle çelişmeydi.** "%1'lik bir hata oranını elemek kaç temiz çalıştırma alır" için rule of three kullandım: n denemede sıfır olay, oranı 3/n civarında sınırlıyor, yani 300 çalıştırma. Ders kitabı, doğru, yaygın.

Ne var ki araç başka her yerde Wilson aralığı raporluyor, ve Wilson sıfırda biraz daha muhafazakâr. 300 temiz çalıştırsan sana **%1.26** derdi — 300'ün seni %1'e götüreceğine söz verdikten sonra. Tek tek savunulabilir iki yöntem, birbiriyle çelişiyor, ve tüm iddiası sayılarına güvenmen olan bir aracın içinde.

Artık gösterdiği aralığı tersine çeviriyor. Cevap 300 değil 381: daha az tatmin edici, ve aracın sonrasında sana söyleyeceğiyle tutarlı.

İki bug da uygulamayı kullanarak yakalanmadı. İkisi de referans değerlere karşı yazılmış testlerle yakalandı — on yedi sınıflandırıcı vakası, ve yayınlanmış aralıklara karşı kontrol edilmiş Wilson. Ki bu, [iki yazı önce eval'ler hakkında yazdığım şeyin](https://ferhatatagun.com/blog/teslim-edilen-prompt-degil-eval) kendi küçük argümanı: ekrana bakıp makul sayılar görmek doğrulama değildir.

## Sana söylemediği şey

Cevapların *iyi* olup olmadığına dair hiçbir şey.

Bir yanıt şemadaki her alanı karşılayabilir — doğru enum, aralıkta skor, bütün alanlar mevcut — ve talep konusunda tamamen yanlış olabilir. guard-lab sözleşmenin tutup tutmadığını ölçüyor. Sözleşmenin içindeki yargının iyi olup olmadığı diğer tür eval, ground truth isteyen tür, ve bu ona dokunmuyor.

Sözleşme uyumu taban. Sadece çoğu ekip tabanı hiç ölçmemiş, ve tabanın sandıkları yerde olmadığı ortaya çıkıyor.

---

**[guard-lab](https://guard-lab.vercel.app)** ücretsiz, açık kaynak ve yalnızca tarayıcıda — BYOK, ve anahtar sekmenden hiç çıkmıyor çünkü gönderilecek bir backend yok. Kaynak kod [GitHub'da](https://github.com/ferhatatagun/guard-lab).

Tek bir kısıt altında yapılmış araç setinin altıncısı: hiçbir şeyin kurulamadığı ve verinin çıkamadığı bir odada çalışmak zorundalar. [Diğerleri burada.](https://ferhatatagun.com/tools)
`,U=`# You're not done when it works. You're done when they can change it.

The deployment I think about most didn't fail. It passed UAT, it went live, the customer was pleased, and there was a genuinely nice email at the end of it.

Six months later it was still running and nobody had touched it. Not once. The prompt was byte-identical to the one I'd left. A model version had been deprecated underneath it and the team had pinned the old one rather than test the new. Someone had asked for a small change to the output format and been told it wasn't worth the risk.

Nothing broke. That's the part that took me a while to understand. **The system didn't die when it stopped working. It died when it stopped being changed** — and it had been dead for about five of those six months while continuing to return responses.

That's the failure mode nobody writes a post-mortem for, because there's no incident. There's just a thing in the corner that everyone routes around, until a reorg or a contract renewal quietly removes it.

**TL;DR**

- A deployment's real end date is the last time someone modified it with confidence, not the last time it responded to a request.
- Documentation describes a *state*. Ownership requires being able to make a *change* and know it was safe. Those are different deliverables and only one of them survives contact with the first edit.
- Three questions decide whether the work outlives you: can they change it, can they tell if the change worked, and do they know why it's like that. Most handovers answer only the first.
- The *why* decays fastest and is written down least. Code records what, git records when, and the reason a strange clause exists lives in one person's memory until it looks like noise and gets deleted.
- As a forward-deployed engineer you are the bus factor by design. The job is to make yourself unnecessary on a schedule, and feeling indispensable is the signal that it's going wrong.

## The documentation trap

The instinct at the end of an engagement is to write everything down. Architecture diagram, sequence of calls, deployment runbook, a wiki page per component. It feels like diligence, and it produces an artifact you can point at in the final meeting.

It also goes stale the first time someone makes a change — and if nobody makes a change, it didn't matter that you wrote it.

The uncomfortable version: a thorough document can make things *worse*, because it substitutes for the thing that would actually have helped. The team reads it, understands the shape of the system, and still doesn't touch it, because understanding the architecture was never what was stopping them. What was stopping them is that they had no way to make a change and find out whether they'd broken something.

Documentation answers "what is this". Ownership needs an answer to "what happens if I change this". No amount of the first produces the second.

## The three questions

Whether a deployment survives handover comes down to three things, and they get progressively less likely to be addressed.

**1. Can they change it?**

The mechanical one. Do they have the credentials, the repo access, the deploy path, the ability to roll back. This is the question every handover checklist covers, and it's genuinely necessary.

It's also the easiest one, and clearing it feels like progress in a way that's slightly misleading — because a team with full production access and no confidence changes nothing, which is observationally identical to a team with no access at all.

**2. Can they tell if the change worked?**

This is [the previous post's whole argument](https://ferhatatagun.com/blog/the-eval-is-the-deliverable), and it's the hinge.

The frozen snapshot — a set of real inputs and the decisions the current system makes on them — isn't primarily a quality tool. Its real function is *permission*. It's the thing that converts "I think this prompt edit is fine" into "twelve of the fourteen cases are unchanged and here are the two that moved". The first sentence gets a change reverted in review. The second gets it merged.

A team without that will not edit the prompt. They'll be right not to. Editing a prompt with no way to check the blast radius is not caution, it's gambling with someone else's workflow, and sensible people decline.

**3. Do they know why it's like that?**

The one that almost never gets handled, and the one that quietly determines everything.

Every system that has met reality has clauses in it that look wrong. A sentence in the prompt insisting on a format that seems redundant. A retry with an oddly specific backoff. A field that gets stripped before it's shown. Each of those exists because something happened — a specific failure, on a specific day, with a specific customer record that broke a specific assumption.

Six months later, whoever inherits it sees an ugly clause with no explanation and does the reasonable thing: cleans it up. And the original failure comes back, except now nobody in the room remembers the first one, so it presents as a new bug.

Code records *what*. Git records *when* and, if you're lucky, a commit message records a compressed version of *why*. Nothing records the reasoning at the place where someone will encounter the decision.

## Attach the why to the thing, not beside it

The practice that has actually worked for me is unglamorous: **put the reason where the decision is, not in a document about the decision.**

For prompts, that means a comment block in the prompt file itself, naming the failure that produced each non-obvious instruction. Not "be concise" — *"be concise: the 2,400-word answers in week two were being pasted into a field with a 500-character limit downstream, which truncated mid-sentence and looked like a model failure."*

For behaviour, it means a test named after the incident rather than the function. A case called \`keeps_the_account_number_when_the_name_is_missing\` is a sentence about the business. A case called \`test_parse_edge_case_3\` is a sentence about nothing, and it's the one that gets deleted when it goes red.

This is the same move as the frozen eval set, applied to reasoning instead of behaviour. Both work because they're attached to something that runs. A wiki page can go stale silently; a named test goes red loudly, and the name tells the person staring at it what they're about to break.

The test is: someone who wasn't there reads the clause and can decide, on their own, whether the reason still applies. That's the whole bar. Not "they understand the system" — *they can safely disagree with me.*

## You are the bus factor, on purpose

There's an awkward thing about this role that's worth saying plainly.

A forward-deployed engineer is, structurally, a single point of failure introduced deliberately. You're embedded because the customer's team can't yet do the thing. Every week you're there, you accumulate context that exists nowhere else — which workflow diverges from its documentation, which stakeholder's objection is real and which is positioning, why the second data source can't be trusted on Mondays.

That context is what makes you effective. It's also, if you don't actively bleed it out, the reason the deployment dies when you leave.

And the incentives run the wrong way. Being the person who understands the system feels like doing well. Getting the call because nobody else can debug it feels like value. It reads as indispensable, and indispensable feels like success right up until it's the postmortem.

The metric that actually matters is uncomfortable to optimise for: **how quickly you become unnecessary.** Not how much you shipped. How fast the people who stay stopped needing you in the room.

Which is a strange thing to be measured on, and I don't think most engagements measure it at all — they measure delivery, and delivery is the part that happens while you're still there.

## What I'd actually leave

Concretely, stripped of the parts that sound good and don't survive:

- **The frozen set**, in the repo, with a one-command way to run it. Not a notebook, not a process someone has to remember. \`npm run eval\` or the equivalent, output that a non-author can read.
- **A decisions file**, but scoped hard: only decisions where the obvious choice was rejected, each one naming the thing that made it obvious-but-wrong. Ten entries that matter, not sixty that document the defaults.
- **The reasons inline** — in the prompt, in the test names, next to the retry constant. Anywhere someone will be standing when they consider changing it.
- **One change they make and I don't.** Sitting there while someone else edits the prompt, runs the eval, reads the diff, and ships it. Watching a team do it once is the only handover step I've never seen substituted successfully. Everything else can be faked with a good document; this one can't.

That last one is the whole thing, really. Everything before it is preparation for the moment where someone other than you changes the system and nothing bad happens. If that moment doesn't occur before you leave, you have no evidence it can.

And "no evidence it can" is, in practice, the same as "it won't" — which brings the six-month clock back around, and the system that's already dead while it's still answering.

---

The uncomfortable implication of all of this is that the work isn't really about the model, or the prompt, or even the interface — it's about whether one team can hand a capability to another. Which is a much older problem than anything in this field, and the subject of the last post in this series.

---

*Part four of a series on the last mile of enterprise AI.
Part one: [Nobody's model failed. The interface did.](https://ferhatatagun.com/blog/nobodys-model-failed) ·
Part two: [I accidentally built a forward-deployed engineer's field kit](https://ferhatatagun.com/blog/accidental-fde-field-kit) ·
Part three: [The deliverable isn't the prompt. It's the eval.](https://ferhatatagun.com/blog/the-eval-is-the-deliverable) ·
Part five: [The second customer tells you what you actually built](https://ferhatatagun.com/blog/the-second-customer)*
`,V=`# The second customer tells you what you actually built

There's a sentence that gets repeated about forward-deployed work, usually attributed to Palantir's model, and it sounds like a slogan until you've been on the wrong side of it: **one customer, many capabilities** — as opposed to the SaaS shape, which is many customers, one capability.

The SaaS shape is well understood. Find one thing a lot of people need, build it once, sell it repeatedly, and every additional customer costs you almost nothing. The whole discipline of product management is built around identifying that one thing.

Forward-deployed work runs the other way. You embed with one organisation and build whatever that organisation actually needs, which turns out to be eleven things, most of which nobody outside the building would recognise as a product. And then somebody asks the question that decides whether you're a software company or a consultancy in a company's clothing: **which of those eleven is a capability, and which is bespoke work you'll never sell twice?**

Getting that wrong in either direction is fatal, and the two failures look nothing alike.

**TL;DR**

- FDE work inverts the SaaS shape: depth with one customer instead of breadth across many. That produces capabilities faster than product discovery does, and no way to tell which ones generalise.
- Generalise too early and you ship a configurable abstraction fitted to a sample size of one. It has settings for the axis that varied and hardcodes the one that didn't.
- Generalise never and every deployment is bespoke. Margins go, the second engagement is as expensive as the first, and you're a consultancy that files its revenue under "platform".
- Two customers asking for the same feature is not the signal. Two customers arriving at the same feature **for the same underlying reason** is. Same request, different causes, is a coincidence that will diverge the moment you build it.
- The most reliable evidence isn't the request. It's the workaround: what both teams already built by hand before anyone asked you.

## The two failures

**Generalising too early** is the one engineers do, because abstraction feels like craftsmanship. You've solved a problem for one customer, you can see the shape of it, and the shape looks reusable. So you pull the specifics out into configuration and ship a general version.

The thing you can't see from inside a single deployment is which axis actually varies. You had one data source, so you made the data source pluggable. You had one approval flow, so you left the approval flow hardcoded. Customer two arrives with the same data source and a completely different approval flow, and now you have an abstraction that is flexible in the direction nothing moves and rigid in the direction everything does. Both customers get a worse system than a bespoke build, and the abstraction is now load-bearing so removing it is a project.

**Never generalising** is quieter and takes longer to hurt. Every engagement is a fresh build. Each one goes fine. The engineers get very good and the delivery gets very reliable, and the cost of the tenth deployment is roughly the cost of the first. That's a viable business — it's just consultancy, and it's usually being valued and staffed as though it were a product, which is where it comes apart. The gap shows up as margin, then as hiring, then as an inability to explain to anyone what the company sells.

Both failures come from the same missing thing, which is a test for when a capability is real.

## The request is not the signal

The intuitive test is repetition. Two customers ask for the same feature, so build it properly.

I don't think that holds, and the reason is the more interesting half of this.

Two organisations can ask for the same thing for entirely unrelated reasons. Both want an export to CSV: one because their analysts live in Excel, the other because their compliance team needs an immutable artifact for an audit trail. Same request, same three words in the ticket. Build the general version and you'll discover the first one wants live data and column reordering, and the second needs a frozen file with a checksum and a retention policy. The feature that satisfies both is two features with a shared name.

What actually predicts generalisation isn't the request converging. It's the *constraint* converging.

This is the same argument I made [two posts ago about my own tools](https://ferhatatagun.com/blog/accidental-fde-field-kit), from the other end. I built five things browser-only and BYOK out of what felt like personal preference, and later noticed those are precisely the constraints of working inside someone else's regulated environment — nothing to install, no data crossing the boundary, nothing for a security team to threat-model. I hadn't copied that from anywhere. Two problems with the same *shape* produce the same engineering decisions independently, without the people involved ever talking.

That independence is the whole signal. When two customers land on the same design because their situations share a structural constraint — a boundary the data can't cross, a regulator who needs the reasoning preserved, a workflow that has to survive its owner going on leave — the thing you build for both is genuinely one thing. When they land on the same request through different constraints, you're looking at a naming collision.

So the question to ask about a repeated request isn't *how many customers want this*. It's **what makes them want it, and is it the same thing.**

## Look at the workaround, not the ask

The most useful evidence I've found isn't in what customers ask for at all. It's in what they've already built by hand.

Every organisation running a real workflow has accumulated a layer of manual compensation: a spreadsheet someone maintains, a Slack channel that functions as a queue, a person who checks a thing every morning at nine. Those exist because something in the system doesn't do a job that needs doing, and somebody cared enough to fill the gap with their own time.

Two customers who've independently built the same workaround are telling you something much stronger than two customers asking for the same feature. A request can be aspirational, or repeated back to you from a conference talk, or a stakeholder's preference. A workaround is *paid for*. Somebody spends an hour a day on it. Nobody sustains that for a nice-to-have.

And workarounds are legible about the underlying constraint in a way requests aren't. The morning check exists because the process is asynchronous and nobody trusts it to fail loudly. The spreadsheet exists because the system's model of the work is one field short of reality. That's the constraint, stated in a form you can compare across customers — and comparing constraints is the thing the feature-request list can't do for you.

## The FDE is the sensor, and the reporting line is the problem

If this is right, the person embedded in the deployment is the highest-bandwidth product-discovery instrument the company has. They're not reading a survey. They're watching the workaround get used, at nine in the morning, by the person who built it.

Which raises a structural question that I think is underrated: **who reads what that person learns?**

In most arrangements, the forward-deployed engineer reports through delivery. Delivery is measured on shipping this deployment, on time. The observation that customer three has independently rebuilt the same spreadsheet as customer one is not a delivery artifact. There's usually no field for it, no forum where it lands, and no incentive for a busy engineer to write it up.

So it stays in one person's head, which — as [the previous post argued about customer handover](https://ferhatatagun.com/blog/done-when-they-can-change-it) — is the same as it not existing. The failure mode is identical, just pointed inward: context accumulates in an individual, doesn't get bled out to the organisation, and leaves when they do. A company can lose its product roadmap this way without ever noticing it had one.

The fix isn't complicated, it's just nobody's job: a standing, low-ceremony way for embedded engineers to report *constraints* rather than *requests*. Not "customer wants export" but "third customer this year whose data can't leave the boundary, all three built a manual extract". Three of those in a row is a product decision that made itself.

## What the series has actually been about

Five posts, and the pattern underneath them is more consistent than I expected when I started.

Pilots fail at the interface, not the model. The tools that survive are the ones with an articulated constraint. The deliverable is the eval, because the eval is what lets someone else change the thing. The handover works when a team can make a change and know it was safe. And the capability generalises when two customers reach it through the same constraint rather than the same words.

Every one of those is the same claim in a different setting: **the hard part is the transfer, not the build.** From a model to a person, from a prototype to a workflow, from you to the team that stays, from one customer to the next. The model was never the bottleneck, and it's less of one every quarter.

Which is, I think, why the role exists at all, and why it's being hired for eight times as often as it was — not because the technology got harder, but because the transfer never got easier, and it turns out that was always the expensive part.

---

*Part five, and the last, of a series on the last mile of enterprise AI.
Part one: [Nobody's model failed. The interface did.](https://ferhatatagun.com/blog/nobodys-model-failed) ·
Part two: [I accidentally built a forward-deployed engineer's field kit](https://ferhatatagun.com/blog/accidental-fde-field-kit) ·
Part three: [The deliverable isn't the prompt. It's the eval.](https://ferhatatagun.com/blog/the-eval-is-the-deliverable) ·
Part four: [You're not done when it works. You're done when they can change it.](https://ferhatatagun.com/blog/done-when-they-can-change-it)*
`,X=`# Your context window bills you every turn

Claude Code compacted my session for the fourth time this week, and my first reaction was the normal one: annoyance. It just erased everything and I have to re-explain half of it.

Then I pointed Claude Code at its own transcript files and did the arithmetic instead of the complaining. The transcripts are just JSONL on disk — every request, every token count, timestamped. Three sessions, 5,288 requests, a few minutes of parsing.

The reframe that came out of it: **compaction isn't the tax. It's the tax getting paid off.** The tax is every turn before that.

**TL;DR**

- Every turn re-sends the entire conversation so far. Nothing is "remembered" for free — a 900K-token context gets re-read, in some discounted form, on turn 901.
- Across three real sessions: 1.99 billion tokens read from cache, 62 million tokens written to it. A **32:1** ratio — each token you put in context gets paid for roughly thirty-two more times before it leaves.
- Four auto-compactions fired at 968K, 996K, 999K, and 771K tokens. Each one took **108–140 seconds** of wall-clock time doing nothing but summarizing. Immediately after, cache-read dropped from ~990K to 0.
- At list-price API rates, cache discounting saved an estimated **86%** versus paying full input price every turn — which is the whole mechanism working as intended, and also the reason a 1M-token context doesn't bankrupt anyone by turn 50.
- None of this is "Claude Code is expensive." It's "the meter is per-turn, not per-token-ever-seen," and almost nobody reasons about a session that way while they're in it.

## What actually happens on turn 500

There's no persistent working memory across a conversation. Each API call is stateless — the model sees whatever text is in the request, and nothing else. So a coding session's "memory" is an illusion built entirely out of re-sending: every prior file read, every tool result, every message, concatenated and shipped again, every single turn.

Prompt caching is the thing that makes this survivable — [I've written before](https://ferhatatagun.com/blog/prompt-caching-nobody-measures) about the mechanics of that discount for teams billing the Messages API directly. This post isn't about that bill. It's about what the discount doesn't erase: a coding *agent's* context isn't a system prompt that sits still for five minutes: it grows every tool call, and it's the agent itself — not your app's request pattern — deciding how much gets re-sent on turn 500.

"A fraction of full price" is not "free." It's a discount on a bill that still arrives every turn. The number of tokens in context is not a one-time cost you paid when you pasted that file in — it's a recurring line item for every remaining turn in the session.

## What my own sessions looked like

I pulled this from three Claude Code project transcripts — \`.jsonl\` files sitting in \`~/.claude/projects/\`, one line per event, a \`usage\` object on every assistant message.

| Session | Requests | Cache read | Cache write | Output |
|---|---|---|---|---|
| A | 498 | 132M | 2.2M | 0.34M |
| B | 2,138 | 670M | 24M | 1.5M |
| C | 2,652 | 1,191M | 36M | 2.3M |
| **Total** | **5,288** | **1,993M** | **62M** | **4.2M** |

The read:write ratio — how many times a token gets billed for being *re-seen* versus the one time it's billed for being *newly added* — sits at **32:1** overall, and climbs inside any single long session as context grows.

Session C is the sharper case. It hit four automatic compactions:

| Trigger | Context size at compaction | Duration |
|---|---|---|
| auto | 968,704 tokens | — |
| auto | 996,078 tokens | 108.7s |
| auto | 999,313 tokens | 139.5s |
| manual | 771,369 tokens | 140.5s |

Every one clusters right at the ~1M ceiling — the auto-compactor is doing exactly what it should, firing before the window overflows. And every one shows the same signature in the raw usage data: cache-read tokens at ~990K on the request immediately before, then **0** on the first request after. The entire accumulated context — everything that made every subsequent turn progressively more expensive — gets discarded and replaced with a summary. Turn 901 is cheap again.

That's the reframe. The compaction isn't losing your context. It's the moment the recurring bill resets to zero — at the cost of a two-minute pause and whatever the summary didn't preserve.

## The honest cost math

At published list-price API rates, running the actual token mix from these three sessions through the cached-price and never-cached-price formulas gives:

- With caching: roughly **$4,500**
- Without caching (every token, every turn, at full input price): roughly **$31,000**

That's an 86% reduction from caching alone — before compaction ever fires.

Two caveats, because getting this wrong would be exactly the kind of unverified number [I've written about before](https://ferhatatagun.com/blog/the-eval-is-the-deliverable):

1. **This is a subscription, not API billing.** I didn't write a $4,500 check — I pay a flat plan. The number is only meaningful as a *ratio* (cached vs. uncached), not as an actual bill. Presenting it as real spend would be the exact silent-failure-shaped mistake of treating a plausible number as a verified one.
2. **List price, not effective price.** Actual API cache pricing varies by provider and model tier; the multiplier is illustrative of the mechanism, not a quote.

## The strongest counterargument

*Isn't this just... how caching is supposed to work?* Yes. That's the point, and it's worth stating plainly instead of implying context bloat is a bug: caching is what makes long sessions economically viable at all, and it's doing its job well — 86% off is not a rounding error.

But "there's a discount" and "there's no cost" get quietly treated as the same thing when you're forty tool calls into a debugging session, and they aren't. A discounted recurring charge is still a recurring charge. The fact that it's 90% off doesn't change that it's billed again next turn, and the turn after, for as long as that token stays in the window.

## What to actually do with this

Nothing exotic — the levers were already sitting in Claude Code's own design, this just explains why they matter more than they look like they do:

- **Open a new session for unrelated work**, rather than dragging a 600K-token context into a task that doesn't need any of it. The context isn't a free cache of everything you've discussed — it's a bill for everything you've discussed.
- **Delegate wide exploration to a subagent** instead of reading ten files into the main thread. A subagent's context dies with it; yours keeps paying for whatever you pulled in directly.
- **A manual compact before switching topics** is a legitimate move, not a concession — it's paying down the balance on purpose instead of waiting for the automatic one to do it while you're mid-thought.

None of this is news framed as "AI context windows are expensive." It's closer to a hosting-bill instinct engineers already have for anything metered per-request — it just hadn't been pointed at a coding agent's own conversation before, mostly because nobody's context window ships with a bill attached. This one does. It's just sitting in a JSONL file, one line per turn, waiting to be added up.
`,Z=`# Bağlam biriktirilmez, her turda yeniden faturalanır

Claude Code bu hafta oturumumu dördüncü kez compact etti, ve ilk tepkim normal olanıydı: sinirlendim. Her şeyi sildi, yarısını yeniden anlatmam gerekecek.

Sonra Claude Code'u kendi transkript dosyalarına yönlendirdim, sinirlenmek yerine hesabı yaptım. Transkriptler diskte duran JSONL dosyaları — her istek, her token sayısı, zaman damgalı. Üç oturum, 5.288 istek, birkaç dakikalık parse işlemi.

Çıkan yeniden çerçeveleme şu: **compaction vergi değil. Verginin ödenme anı.** Vergi, ondan önceki her tur.

**TL;DR**

- Her tur, o ana kadarki tüm konuşmayı yeniden gönderir. Hiçbir şey bedavaya "hatırlanmaz" — 900K token'lık bir bağlam, 901. turda indirimli bir biçimde yeniden okunur.
- Üç gerçek oturumda: cache'ten okunan 1,99 milyar token, cache'e yazılan 62 milyon token. **32:1** oran — bağlama koyduğun her token, oradan çıkana kadar ortalama otuz iki kez daha faturalanıyor.
- Dört otomatik compaction, 968K, 996K, 999K ve 771K token'da tetiklendi. Her biri sadece özetleme yaparken **108–140 saniye** sürdü. Hemen sonrasında cache-read ~990K'dan 0'a düştü.
- Liste fiyatıyla, cache indirimi compaction hiç devreye girmeden bile her turda tam fiyat ödemeye kıyasla tahmini **%86** tasarruf sağladı — mekanizmanın amaçlandığı gibi çalışması bu, ve 1M token'lık bir bağlamın 50. turda kimseyi batırmamasının nedeni de bu.

## 500. turda gerçekte ne oluyor

Bir konuşma boyunca kalıcı bir çalışma belleği yok. Her API çağrısı durumsuz (stateless) — model isteğe konan metni görür, başka hiçbir şeyi görmez. Yani bir kodlama oturumunun "hafızası" tamamen yeniden-göndermeden ibaret bir yanılsama: her önceki dosya okuması, her araç sonucu, her mesaj, birleştirilip her tekil turda yeniden gönderilir.

Prompt caching, bunu sürdürülebilir kılan şey — [bu indirimin mekaniğini](https://ferhatatagun.com/blog/prompt-caching-kimsenin-olcmedigi) Messages API'yi doğrudan faturalandıran ekipler için daha önce yazmıştım. Bu yazı o fatura hakkında değil. İndirimin silmediği şey hakkında: bir kodlama *ajanının* bağlamı, beş dakika sabit kalan bir sistem prompt'u değil — her araç çağrısında büyüyor, ve 500. turda ne kadarının yeniden gönderileceğine sizin uygulamanızın istek deseni değil, ajanın kendisi karar veriyor.

"Büyük indirim var" ile "bedava" aynı şey değil. Bağlamdaki token sayısı, o dosyayı yapıştırdığınız anda ödediğiniz tek seferlik bir maliyet değil — oturumdaki her kalan tur için tekrar eden bir kalem.

## Kendi oturumlarım neye benziyordu

Bunu üç Claude Code proje transkriptinden çıkardım — \`~/.claude/projects/\` altında duran \`.jsonl\` dosyaları, olay başına bir satır, her asistan mesajında bir \`usage\` nesnesi.

| Oturum | İstek | Cache okuma | Cache yazma | Çıktı |
|---|---|---|---|---|
| A | 498 | 132M | 2,2M | 0,34M |
| B | 2.138 | 670M | 24M | 1,5M |
| C | 2.652 | 1.191M | 36M | 2,3M |
| **Toplam** | **5.288** | **1.993M** | **62M** | **4,2M** |

Okuma:yazma oranı — bir token'ın *yeniden görülerek* kaç kez faturalandığı, *yeni eklenerek* bir kez faturalandığına kıyasla — toplamda **32:1**'de duruyor, ve herhangi bir tek uzun oturum içinde bağlam büyüdükçe tırmanıyor.

Oturum C daha çarpıcı örnek. Dört otomatik compaction'a çarptı:

| Tetikleyici | Compaction'daki bağlam boyutu | Süre |
|---|---|---|
| otomatik | 968.704 token | — |
| otomatik | 996.078 token | 108,7s |
| otomatik | 999.313 token | 139,5s |
| manuel | 771.369 token | 140,5s |

Her biri ~1M tavanına tam yakın kümeleniyor — otomatik compactor tam olarak yapması gerekeni yapıyor, pencere taşmadan önce tetikleniyor. Ve her biri ham usage verisinde aynı imzayı gösteriyor: bir önceki istekte cache-read ~990K, ondan sonraki ilk istekte **0**. Sonraki her turu kademeli olarak daha maliyetli kılan, biriken bağlamın tamamı atılıyor ve bir özetle değiştiriliyor. 901. tur yeniden ucuz.

Yeniden çerçeveleme burada: compaction, bağlamınızı kaybetmiyor. İki dakikalık bir duraklama ve özetin koruyamadığı her şey bedeliyle, tekrar eden faturanın sıfırlandığı an.

## Dürüst maliyet hesabı

Yayınlanmış liste fiyatlarında, bu üç oturumdaki gerçek token karışımını cache'li ve cache'siz fiyat formüllerinden geçirmek şunu veriyor:

- Caching ile: kabaca **4.500 dolar**
- Caching olmadan (her token, her turda, tam giriş fiyatıyla): kabaca **31.000 dolar**

Bu, compaction hiç devreye girmeden, sadece caching'den gelen %86'lık bir azalma.

İki uyarı var, çünkü bunu yanlış anlatmak tam da [daha önce yazdığım](https://ferhatatagun.com/blog/teslim-edilen-prompt-degil-eval) türden bir doğrulanmamış sayıyı gerçek sanma hatası olurdu:

1. **Bu bir abonelik, API faturalandırması değil.** 4.500 dolarlık bir çek yazmadım — sabit bir plan ödüyorum. Sayı sadece bir *oran* olarak (cache'li vs cache'siz) anlamlı, gerçek harcama olarak değil. Onu gerçek harcama gibi sunmak, tam da makul görünen bir sayıyı doğrulanmış sanma hatasının kendisi olurdu.
2. **Liste fiyatı, efektif fiyat değil.** Gerçek API cache fiyatlandırması sağlayıcıya ve model katmanına göre değişir; çarpan mekanizmayı gösteriyor, bir teklif değil.

## En güçlü karşı argüman

*Bu caching'in çalışması gerektiği şekilde çalışması değil mi?* Evet. Nokta da tam burası, ve bağlam şişkinliğini bir hata gibi ima etmek yerine açıkça söylemekte fayda var: caching, uzun oturumları ekonomik olarak mümkün kılan şey, ve işini iyi yapıyor — %86 indirim yuvarlama hatası değil.

Ama "indirim var" ile "maliyet yok" — kırk araç çağrısı derinliğinde bir hata ayıklama oturumundaysanız sessizce aynı şey gibi ele alınıyor, ve değiller. İndirimli tekrar eden bir ücret, hâlâ tekrar eden bir ücret. %90 indirimli olması, o token pencerede kaldığı sürece bir sonraki turda da, ondan sonraki turda da yeniden faturalanacağını değiştirmiyor.

## Bununla gerçekte ne yapılır

Egzotik bir şey değil — kaldıraçlar Claude Code'un kendi tasarımında zaten oturuyordu, bu sadece göründüklerinden daha çok önemli olduklarını açıklıyor:

- **İlgisiz iş için yeni oturum aç**, 600K token'lık bir bağlamı hiçbirine ihtiyacı olmayan bir göreve sürüklemek yerine. Bağlam, konuştuğunuz her şeyin bedava bir cache'i değil — konuştuğunuz her şeyin faturası.
- **Geniş keşfi bir subagent'a devret**, on dosyayı ana thread'e okumak yerine. Subagent'ın bağlamı kendisiyle birlikte ölür; sizinki, direkt çektiğiniz her şey için ödemeye devam eder.
- **Konu değiştirmeden önce manuel compact**, bir taviz değil, meşru bir hamle — bakiyeyi otomatik olanın siz düşüncenin ortasındayken yapmasını beklemek yerine bilerek kapatmak.

Bunun hiçbiri "AI bağlam pencereleri pahalı" diye çerçevelenmiş bir haber değil. Mühendislerin istek başına ölçülen her şey için zaten sahip olduğu barındırma faturası içgüdüsüne daha yakın — sadece bir kodlama ajanının kendi konuşmasına şimdiye kadar yöneltilmemişti, çoğunlukla çünkü hiçbir bağlam penceresi faturayla birlikte gelmiyor. Bu geliyor. Sadece bir JSONL dosyasında, tur başına bir satır olarak duruyor, toplanmayı bekliyor.
`,d={"yapay-zeka-ve-yazilim-gelistirme-2024":m,"mcp-model-context-protocol-nedir":y,"cursor-ide-ve-prompt-muhendisligi":c,"neden-bazen-sadece-bos-ekrana-bakiyorum":k,"bitmemis-projeler-mezarligim":b,"best-practice-dedigin-yarisi-ezber":g,"tarayicida-claude-streaming-sdk-siz":I,"prompt-caching-kimsenin-olcmedigi":B,"prompt-secimi-his-degil-olcum":x,"tek-bir-tool-yazmadan-once-sandbox":A,"claude-agent-debug-trace-replay":_,"iki-hafta-sonu-dort-tool":C,"prompt-shipping-once-onunu-gor":O,"google-un-goremedigi-blog":M,"performansi-bozar-dedigin-sayi-degil":j,"kimsenin-modeli-patlamadi":H,"kazara-fde-saha-cantasi":Y,"teslim-edilen-prompt-degil-eval":q,"degistirebildiklerinde-bitti":W,"ikinci-musteri-ne-yaptigini-soyler":G,"ise-yarayan-kurallar-ve-komutlar":J,"patlamayan-hatalar":$,"baglam-her-turda-yeniden-faturalanir":Z},u={"cursor-ide-ve-prompt-muhendisligi":p,"rules-and-commands-that-stick":f,"browser-only-claude-streaming":v,"prompt-caching-nobody-measures":w,"stop-choosing-prompts-by-vibes":z,"build-the-sandbox-first":T,"debug-claude-agents-by-replaying-traces":S,"four-tools-in-two-weekends":P,"see-the-prompt-before-you-ship-it":D,"how-i-shipped-a-blog-google-couldnt-see":E,"nobodys-model-failed":K,"accidental-fde-field-kit":L,"the-eval-is-the-deliverable":R,"that-library-will-hurt-performance":N,"done-when-they-can-change-it":U,"the-second-customer":V,"the-failures-that-dont-throw":F,"your-context-window-bills-you-every-turn":X},ie="Blog",h=[{slug:"your-context-window-bills-you-every-turn",title:"Your context window bills you every turn",excerpt:"Auto-compaction feels like losing your context, but the raw usage numbers from three real Claude Code sessions say the opposite: 1.99 billion tokens read from cache against 62 million written, a 32:1 ratio, and four compactions that each reset a bill that had been climbing since turn one. Compaction isn't the tax. It's the tax getting paid off.",date:"2026-09-02",tags:["LLM","Claude","Developer Tools","Performance","Context","Observability"]},{slug:"baglam-her-turda-yeniden-faturalanir",title:"Bağlam biriktirilmez, her turda yeniden faturalanır",excerpt:"Otomatik compaction bağlamı kaybetmek gibi hissettiriyor, ama üç gerçek Claude Code oturumundan çıkan ham usage verisi tam tersini söylüyor: cache'ten okunan 1,99 milyar token, cache'e yazılan 62 milyona karşı, 32:1 oran, ve her biri birinci turdan beri tırmanan faturayı sıfırlayan dört compaction. Compaction vergi değil. Verginin ödenme anı.",date:"2026-09-02",tags:["LLM","Claude","Developer Tools","Performance","Context","Observability"]},{slug:"the-failures-that-dont-throw",title:"The failures that don't throw",excerpt:"One call in forty comes back with “HIGH” instead of “high”, your switch falls through to the default branch, and the permissive branch auto-approves what the model flagged as maximum risk. Nothing errors. Schema failures are distributional, a single compliance percentage averages over the only distinction that matters, and zero failures in fifty runs is not a zero failure rate.",date:"2026-09-01",tags:["LLM","Guardrails","Structured Output","Testing","Developer Tools","Claude"]},{slug:"patlamayan-hatalar",title:"Patlamayan hatalar",excerpt:"Kırk çağrının biri “high” yerine “HIGH” dönüyor, switch default dalına düşüyor, ve izin veren dal modelin maksimum risk dediği şeyi otomatik onaylıyor. Hiçbir şey hata vermiyor. Şema hataları dağılımsaldır, tek bir uyum yüzdesi önemli olan tek ayrımın üstünden ortalama alır, ve elli çalıştırmada sıfır hata sıfır hata oranı demek değildir.",date:"2026-09-01",tags:["LLM","Guardrails","Structured Output","Testing","Developer Tools","Claude"]},{slug:"kimsenin-modeli-patlamadi",title:"Kimsenin modeli patlamadı. Arayüz patladı.",excerpt:"Kurumsal AI pilotları %70–90 oranında başarısız olurken forward-deployed engineer ilanları %800 arttı. Kanonik başarı hikâyesi 6–8 haftalık entegrasyonun ardından dört aylık adoption çalışması, ve raporlanan kazanma koşulu %98 adoption — doğruluk değil. Adoption sayısı bir arayüz sayısıdır, ve rol ona göre kadrolanmıyor.",date:"2026-08-09",tags:["Forward Deployed Engineering","Enterprise AI","Adoption","Frontend","LLM","Deployment"]},{slug:"kazara-fde-saha-cantasi",title:"Kazara bir forward-deployed engineer saha çantası kurmuşum",excerpt:"Bir yıl önce bir SDK'yı silip yerine 150 satır yazdım ve bunu bir bundler hikâyesi sandım. Meğer adını hiç koymadan bir deployment problemi çözüyormuşum. Beş aracın her mimari kararına geri dönüp baktığımda hepsinin altında aynı dile getirilmemiş kısıt vardı: kurulacak bir şey yok, sınırdan çıkan veri yok, savunulacak bağımlılık yok.",date:"2026-08-10",tags:["Forward Deployed Engineering","Enterprise AI","Developer Tools","Frontend","LLM","Architecture"]},{slug:"teslim-edilen-prompt-degil-eval",title:"Teslim ettiğin şey prompt değil. Eval.",excerpt:"Her saha rehberi inşa etmeden önce eval'lerini tanımla diyor — ve müşteri sahasındaki üçüncü günde etiketli verin, alan uzmanlığın ve birinin ekranından aldığın beş örnekten başka bir şeyin yok. Tavsiye doğru, çerçeve yanlış. “Bu iyi mi?” ground truth ister. “Bu değişti mi?” sadece dondurulmuş bir snapshot ister, ve ona bu öğleden sonra sahip olabilirsin.",date:"2026-08-11",tags:["Forward Deployed Engineering","Evals","LLM","Prompt Engineering","Testing","Deployment"]},{slug:"degistirebildiklerinde-bitti",title:"Çalıştığında değil, onlar değiştirebildiğinde bitti",excerpt:"En çok düşündüğüm deployment başarısız olmadı — UAT'yi geçti, canlıya çıktı, ve altı ay sonra kimse ona bir kez bile dokunmamıştı. Bir sistem çalışmayı bıraktığında ölmez; değiştirilmeyi bıraktığında ölür, ve isteklere cevap verirken aylarca ölü kalabilir. Devir teslim dokümantasyon değildir: bir ekibin bir değişiklik yapıp güvenli olduğunu bilip bilemediğidir.",date:"2026-08-31",tags:["Forward Deployed Engineering","Enterprise AI","Handover","Deployment","Testing","LLM"]},{slug:"ikinci-musteri-ne-yaptigini-soyler",title:"İkinci müşteri ne yaptığını söyler",excerpt:"Forward-deployed iş SaaS şeklini tersine çeviriyor — çok müşteriye genişlik yerine tek müşteriyle derinlik — ve bu, ürün keşfinden hızlı yetenek üretip hangilerinin genelleşeceğini anlamanın yolunu vermiyor. İki müşterinin aynı özelliği istemesi sinyal değil. Ona aynı alttaki kısıtla varması sinyal, ve en güçlü kanıt istek bile değil: zaten elleriyle kurdukları geçici çözüm.",date:"2026-08-31",tags:["Forward Deployed Engineering","Enterprise AI","Product","Deployment","LLM"]},{slug:"the-second-customer",title:"The second customer tells you what you actually built",excerpt:"Forward-deployed work inverts the SaaS shape — depth with one customer instead of breadth across many — which produces capabilities faster than product discovery does and no way to tell which ones generalise. Two customers asking for the same feature isn't the signal. Two customers arriving at it through the same underlying constraint is, and the strongest evidence isn't the request at all: it's the workaround they already built by hand.",date:"2026-08-31",tags:["Forward Deployed Engineering","Enterprise AI","Product","Deployment","LLM"]},{slug:"done-when-they-can-change-it",title:"You're not done when it works. You're done when they can change it.",excerpt:"The deployment I think about most didn't fail — it passed UAT, went live, and six months later nobody had touched it once. A system doesn't die when it stops working; it dies when it stops being changed, and it can be dead for months while still answering requests. Handover isn't documentation: it's whether a team can make a change and know it was safe.",date:"2026-08-31",tags:["Forward Deployed Engineering","Enterprise AI","Handover","Deployment","Testing","LLM"]},{slug:"that-library-will-hurt-performance",title:"“That library will hurt performance” is not a number",excerpt:"Every performance tool reports what a page costs right now. None of them answer the question the meeting is actually about, which is what it would cost without the thing you're arguing over — so the argument gets settled by whoever sounds most confident. A 410 KB image that loads after LCP is worth zero points; a 124 KB render-blocking script is worth eleven. Sorting by file size sends teams to fix the wrong thing.",date:"2026-08-30",tags:["Web Performance","Core Web Vitals","Lighthouse","LCP","Frontend","Developer Tools"]},{slug:"performansi-bozar-dedigin-sayi-degil",title:"“Performansı bozar” dediğin şey bir sayı değil",excerpt:"Bütün performans araçları sayfanın şu anki maliyetini raporluyor. Hiçbiri toplantının asıl konusu olan “o şey olmasa ne olurdu” sorusuna cevap vermiyor — ve karar, elinde sayı olmadığı için daha kendinden emin konuşana kalıyor. LCP’den sonra yüklenen 410 KB’lık bir görsel sıfır puan; 124 KB’lık render-blocking bir script on bir puan. Dosya boyutuna göre sıralamak ekipleri yanlış şeyi düzeltmeye gönderiyor.",date:"2026-08-30",tags:["Web Performance","Core Web Vitals","Lighthouse","LCP","Frontend","Developer Tools"]},{slug:"the-eval-is-the-deliverable",title:"The deliverable isn't the prompt. It's the eval.",excerpt:`Every field guide says define your evals before you build — and on day three at a customer site you have no labelled data, no domain expertise, and five examples off someone's screen. The advice is right; the framing is wrong. "Is this good?" needs ground truth. "Did this change?" needs only a frozen snapshot, and that one you can have this afternoon.`,date:"2026-08-11",tags:["Forward Deployed Engineering","Evals","LLM","Prompt Engineering","Testing","Deployment"]},{slug:"accidental-fde-field-kit",title:"I accidentally built a forward-deployed engineer's field kit",excerpt:"I dropped the Anthropic SDK for 150 lines of TypeScript and called it a bundler problem. It wasn't. Browser-only, BYOK, no backend, minimal dependencies — the constraints I picked out of preference turn out to be the exact constraints of working inside someone else's regulated environment. What five tools look like when you finally name the rule you were following.",date:"2026-08-10",tags:["Forward Deployed Engineering","Developer Tools","Claude","Anthropic","BYOK","Architecture"]},{slug:"nobodys-model-failed",title:"Nobody's model failed. The interface did.",excerpt:"Enterprise AI pilots fail at 70–90% while forward-deployed engineer postings jump 800%. The canonical success story is 6–8 weeks of integration followed by four months of adoption work, and the reported win condition is 98% adoption — not accuracy. An adoption number is an interface number, and the role isn't staffed against that.",date:"2026-08-09",tags:["Forward Deployed Engineering","Enterprise AI","Adoption","Frontend","LLM","Deployment"]},{slug:"google-un-goremedigi-blog",title:"Google'un göremediği bir blog yayınladım",excerpt:"Sitemdeki her yazı tarayıcıda iyi görünüyordu — ama `curl` çekince yazı gövdesi boştu. Marked `onMount` içinde parse oluyor, prerender iskelet görüyor, arama motorları hiçbir şey indekslemiyordu. Düzeltme, ortaya çıkardığı üç ikincil hata, ve hiç kazanmadığım doğrulama alışkanlığı.",date:"2026-06-14",tags:["SvelteKit","SEO","SSR","Markdown","Statik Site","Prerender"]},{slug:"how-i-shipped-a-blog-google-couldnt-see",title:"How I shipped a blog Google couldn't see",excerpt:"Every post on my site rendered fine in a browser — but `curl` showed the article body was empty. Marked was being parsed inside onMount, so prerender saw a skeleton and search engines indexed nothing. The fix, the three secondary failures it uncovered, and the verification habit I should have had.",date:"2026-06-14",tags:["SvelteKit","SEO","SSR","Markdown","Static Sites","Prerendering"]},{slug:"yapay-zeka-ve-yazilim-gelistirme-2024",title:"Yapay Zeka ile Yazılım Geliştirme: MCP, GPT ve Cursor",excerpt:"LLM araçları, Model Context Protocol (MCP) ve Cursor ile günlük geliştirme pratiğinde nasıl daha verimli olunur.",date:"2024-12-01",tags:["AI","MCP","Cursor","LLM","Productivity"]},{slug:"mcp-model-context-protocol-nedir",title:"Model Context Protocol (MCP) Nedir?",excerpt:"MCP, AI asistanlarının dosya sistemine, API'lere ve araçlara güvenli erişimini standartlaştıran açık protokol.",date:"2024-11-15",tags:["MCP","AI","Protocol","Developer Tools"]},{slug:"cursor-ide-ve-prompt-muhendisligi",title:"Cursor IDE ve Prompt Mühendisliği",excerpt:"Cursor’da @dosya, @web kullanımı, net talimatlar ve .cursorrules ile daha tutarlı ve verimli AI kullanımı.",date:"2024-11-01",tags:["Cursor","AI","Prompt Engineering","IDE"],titleEn:"Cursor IDE and Prompt Engineering",excerptEn:"Using @file, @web, clear instructions and .cursorrules for more consistent and efficient AI use in Cursor."},{slug:"neden-bazen-sadece-bos-ekrana-bakiyorum",title:"Neden Bazen Sadece Boş Ekrana Bakıyorum",excerpt:"Hiçbir tuşa basmadan ekrana bakmak da işin parçası. Verimlilik kültürüne ters bir itiraf.",date:"2025-01-12",tags:["Mindset","Productivity","Reflection"]},{slug:"bitmemis-projeler-mezarligim",title:"Bitmemiş Projeler Mezarlığım ve Neden Rahatım",excerpt:"Yarım kalan side project'ler başarısızlık mı? Bence bazen sadece keşfin kendisi.",date:"2025-01-05",tags:["Side Projects","Mindset","Learning"]},{slug:"best-practice-dedigin-yarisi-ezber",title:'"Best Practice" Dediklerimizin Yarısı Ezber',excerpt:"DRY, test coverage, yorum yazmak… Kurallar bağlam olmadan anlamsız. Cesur bir tez.",date:"2024-12-20",tags:["Code Quality","Opinion","Software Design"]},{slug:"ise-yarayan-kurallar-ve-komutlar",title:"Gerçekten işe yarayan kurallar ve komutlar",excerpt:".cursorrules ve slash komutlarını unutulmuş değil faydalı hale getirmek: teoriden değil acıdan başla, listeyi kısa tut, gerçek kullanımdan iterasyon yap.",date:"2025-01-18",tags:["Cursor","Rules","Commands","Workflow","AI"]},{slug:"rules-and-commands-that-stick",title:"Rules and Commands That Actually Stick",excerpt:"How to make .cursorrules and slash commands useful instead of forgotten: start from pain, keep the list short, iterate from real usage.",date:"2025-01-18",tags:["Cursor","Rules","Commands","Workflow","AI"]},{slug:"browser-only-claude-streaming",title:"Building a streaming Claude client in the browser — without the SDK",excerpt:"Why I skipped the official Anthropic SDK for browser work, and the ~150 lines of TypeScript that replaced it: a hand-rolled SSE parser with tool-use support, clean aborts, and meaningful errors.",date:"2026-06-03",tags:["Claude","Anthropic","SSE","Streaming","TypeScript","Browser"],sourceUrl:"https://medium.com/@ferhatatagun/building-a-streaming-claude-client-in-the-browser-without-the-sdk-4ce8a9407d2c"},{slug:"prompt-caching-nobody-measures",title:"Prompt caching is the cheapest Claude optimization. Nobody measures it.",excerpt:"Every Claude response carries cache-hit data. Most apps log it nowhere — and pay for it. Why hit ratio is the metric nobody graphs, and the four-field log line that pays for itself in a week.",date:"2026-06-04",tags:["Claude","Anthropic","Prompt Caching","Observability","Cost","LLM"],sourceUrl:"https://medium.com/@ferhatatagun/prompt-caching-is-the-cheapest-claude-optimization-nobody-measures-it-3e597c6804d8"},{slug:"stop-choosing-prompts-by-vibes",title:"Your prompt isn't better. You just remember it being better.",excerpt:"Most teams iterate on prompts by feel and ship by memory. The minimum useful comparison is two prompts in parallel, surfacing output, latency and cost on the same input — what side-by-side reveals that sequential never does.",date:"2026-06-04",tags:["Claude","Anthropic","Prompt Engineering","A/B Testing","LLM","Evals"],sourceUrl:"https://medium.com/@ferhatatagun/33758334974c"},{slug:"build-the-sandbox-first",title:"Build the sandbox before you write a single tool",excerpt:"Most agent teams write the tools first, then discover the design was wrong. Mock the tool responses, role-play the loop by hand, and kill the bad tool designs in fifteen minutes — before they touch your codebase.",date:"2026-06-04",tags:["Claude","Anthropic","Agents","Tool Use","Prompt Engineering","LLM"],sourceUrl:"https://medium.com/@ferhatatagun/build-the-sandbox-before-you-write-a-single-tool-7a508c4b6723"},{slug:"debug-claude-agents-by-replaying-traces",title:"How I debug Claude agents by replaying their trace",excerpt:"Agent traces contain everything you need to debug a weird run, but they're stored as walls of nested JSON. The reframe: stop reading them as documents, start watching them as timelines of decisions. Bugs that take 30 minutes in an editor become obvious in 30 seconds.",date:"2026-06-04",tags:["Claude","Anthropic","Agents","Debugging","LLM","Observability"],sourceUrl:"https://medium.com/@ferhatatagun/how-i-debug-claude-agents-by-replaying-their-trace-093e0c2cf1e0"},{slug:"four-tools-in-two-weekends",title:"What I learned shipping four open-source Claude dev-tools in two weekends",excerpt:'A meta post on the four-tool Claude dev-tool suite: why the SDK breaking was the constraint that made the work possible, the "one tool per insight" decomposition, why BYOK + browser-only is a credibility multiplier, and the four things I would front-load if starting over.',date:"2026-06-05",tags:["Claude","Anthropic","Open Source","Developer Tools","LLM"],sourceUrl:"https://medium.com/@ferhatatagun/what-i-learned-shipping-four-open-source-claude-dev-tools-in-two-weekends-e721d4c41b98"},{slug:"iki-hafta-sonu-dort-tool",title:"İki hafta sonunda dört açık kaynak Claude dev-tool shiplerken neler öğrendim",excerpt:`Dört tool'lu Claude dev-tool suite'i üzerine meta yazı: SDK'nın kırılması neden işi mümkün kılan kısıt oldu, "içgörü başına bir tool" ayrıştırması, BYOK + tarayıcı-only neden güvenilirlik çarpanı, ve yeniden başlasam önden yapacağım dört şey.`,date:"2026-06-05",tags:["Claude","Anthropic","Open Source","Developer Tools","LLM"]},{slug:"see-the-prompt-before-you-ship-it",title:"See the prompt before you ship it",excerpt:"Token cost, context-window position, and prompt-caching layout are all knowable from the prompt alone — you don't need to send the request. A worked example where 'feels about the same' was hiding a 6.3× input-length difference, and the pre-flight habit that catches it.",date:"2026-06-05",tags:["Claude","Anthropic","Tokens","Prompt Engineering","Cost","LLM"],sourceUrl:"https://medium.com/@ferhatatagun/see-the-prompt-before-you-ship-it-91ee42f72483"},{slug:"prompt-shipping-once-onunu-gor",title:"Prompt'u shiplemeden önce gör",excerpt:`Token cost, context-window pozisyonu ve prompt-caching layout'u — hepsi prompt'tan tek başına bilinebilir. "Yaklaşık aynı" hissinin gizlediği 6.3× input-uzunluk farkını yakalayan pre-flight alışkanlığı.`,date:"2026-06-05",tags:["Claude","Anthropic","Tokens","Prompt Engineering","Cost","LLM"]},{slug:"tarayicida-claude-streaming-sdk-siz",title:"Tarayıcıda Claude'a streaming çağrı — SDK olmadan",excerpt:"Resmi Anthropic SDK'sını tarayıcı tarafına almak için neden uğraşmadığım ve onu replace eden ~150 satır TypeScript: tool-use destekli SSE parser'ı, temiz iptal, anlamlı hatalar.",date:"2026-06-04",tags:["Claude","Anthropic","SSE","Streaming","TypeScript","Tarayıcı"]},{slug:"prompt-caching-kimsenin-olcmedigi",title:"Prompt caching, Claude'un en ucuz optimizasyonu. Kimse ölçmüyor.",excerpt:"Her Claude response'u cache-hit verisi taşıyor. Çoğu uygulama bunu hiçbir yere loglamıyor — ve bunun bedelini ödüyor. Kimsenin grafiklemediği hit oranı metriği, ve kendini bir haftada amorti eden dört alanlı log satırı.",date:"2026-06-04",tags:["Claude","Anthropic","Prompt Caching","Observability","Cost","LLM"]},{slug:"prompt-secimi-his-degil-olcum",title:"Prompt'un daha iyi değil. Sadece daha iyi hatırlıyorsun.",excerpt:"Çoğu ekip prompt'u hisle iterate edip hafızayla shipliyor. Minimum işe yarayan karşılaştırma: aynı input üzerinde iki prompt'u paralel çalıştırıp output, latency ve cost'u yan yana görmek — side-by-side'ın sıralı versiyonun göremediği şey.",date:"2026-06-05",tags:["Claude","Anthropic","Prompt Engineering","LLM","A/B Testing"]},{slug:"tek-bir-tool-yazmadan-once-sandbox",title:"Tek bir tool yazmadan önce sandbox'ı kur",excerpt:"Çoğu agent ekibi önce tool'ları yazıyor, sonra tasarımın yanlış olduğunu keşfediyor. Tool yanıtlarını mock'la, loop'u el ile rol-yap, kötü tool tasarımlarını codebase'ine dokunmadan on beş dakikada öldür.",date:"2026-06-05",tags:["Claude","Anthropic","Agents","Tool Use","Prompt Engineering","LLM"]},{slug:"claude-agent-debug-trace-replay",title:"Claude agent'larını trace replay ile debug ediyorum",excerpt:"Agent trace'leri garip bir çalışmayı debug etmek için gereken her şeyi içeriyor, ama wall of nested JSON olarak saklanıyor. Yeniden çerçeveleme: onları döküman olarak okumayı bırak, kararların timeline'ı olarak izle. Bir editörde 30 dakika alan bug'lar 30 saniyede bariz oluyor.",date:"2026-06-05",tags:["Claude","Anthropic","Agents","Debugging","LLM","Observability"]}],Q=[...h].sort((e,n)=>n.date.localeCompare(e.date)),ee={"browser-only-claude-streaming":"https://dev.to/ferhatatagun/building-a-streaming-claude-client-in-the-browser-without-the-sdk-5f80","prompt-caching-nobody-measures":"https://dev.to/ferhatatagun/prompt-caching-is-the-cheapest-claude-optimization-nobody-measures-it-1nga","stop-choosing-prompts-by-vibes":"https://dev.to/ferhatatagun/your-prompt-isnt-better-you-just-remember-it-being-better-3h52","build-the-sandbox-first":"https://dev.to/ferhatatagun/build-the-sandbox-before-you-write-a-single-tool-2ja3","debug-claude-agents-by-replaying-traces":"https://dev.to/ferhatatagun/how-i-debug-claude-agents-by-replaying-their-trace-484","four-tools-in-two-weekends":"https://dev.to/ferhatatagun/what-i-learned-shipping-four-open-source-claude-dev-tools-in-two-weekends-1f4f","see-the-prompt-before-you-ship-it":"https://dev.to/ferhatatagun/see-the-prompt-before-you-ship-it-51ao","how-i-shipped-a-blog-google-couldnt-see":"https://dev.to/ferhatatagun/how-i-shipped-a-blog-google-couldnt-see-2nlc","nobodys-model-failed":"https://dev.to/ferhatatagun/nobodys-model-failed-the-interface-did-5dh3","accidental-fde-field-kit":"https://dev.to/ferhatatagun/i-accidentally-built-a-forward-deployed-engineers-field-kit-khi","the-eval-is-the-deliverable":"https://dev.to/ferhatatagun/the-deliverable-isnt-the-prompt-its-the-eval-35cp"};function re(e){return ee[e]}const ne=[["browser-only-claude-streaming","tarayicida-claude-streaming-sdk-siz"],["prompt-caching-nobody-measures","prompt-caching-kimsenin-olcmedigi"],["stop-choosing-prompts-by-vibes","prompt-secimi-his-degil-olcum"],["build-the-sandbox-first","tek-bir-tool-yazmadan-once-sandbox"],["debug-claude-agents-by-replaying-traces","claude-agent-debug-trace-replay"],["four-tools-in-two-weekends","iki-hafta-sonu-dort-tool"],["see-the-prompt-before-you-ship-it","prompt-shipping-once-onunu-gor"],["how-i-shipped-a-blog-google-couldnt-see","google-un-goremedigi-blog"],["that-library-will-hurt-performance","performansi-bozar-dedigin-sayi-degil"],["nobodys-model-failed","kimsenin-modeli-patlamadi"],["accidental-fde-field-kit","kazara-fde-saha-cantasi"],["the-eval-is-the-deliverable","teslim-edilen-prompt-degil-eval"],["done-when-they-can-change-it","degistirebildiklerinde-bitti"],["the-second-customer","ikinci-musteri-ne-yaptigini-soyler"],["rules-and-commands-that-stick","ise-yarayan-kurallar-ve-komutlar"],["the-failures-that-dont-throw","patlamayan-hatalar"],["your-context-window-bills-you-every-turn","baglam-her-turda-yeniden-faturalanir"]];function oe(e,n){for(const[a,i]of ne)if(e===a||e===i)return[{lang:"en",href:`${n}/blog/${a}`},{lang:"tr",href:`${n}/blog/${i}`}];return[]}function ae(e){return h.find(n=>n.slug===e)}function te(e,n="tr"){return n==="en"?u[e]:d[e]}function se(e,n){const a=te(e,n);return typeof a=="string"&&a.trim().length>0}function le(e,n){return n==="en"&&e.titleEn?e.titleEn:e.title}function de(e,n){return n==="en"&&e.excerptEn?e.excerptEn:e.excerpt}function ue(e){const n=d[e]??u[e];if(!n)return 0;const a=n.trim().split(/\s+/).filter(Boolean).length;return Math.max(1,Math.ceil(a/200))}function he(e){const n=ae(e);if(!n)return[];const a=t=>t.slug!==e&&t.tags.some(r=>n.tags.includes(r)),i=(t,r)=>{const s=t.tags.filter(o=>n.tags.includes(o)).length,l=r.tags.filter(o=>n.tags.includes(o)).length;return l!==s?l-s:r.date.localeCompare(t.date)};return Q.filter(a).sort(i).slice(0,2)}export{ae as a,he as b,te as c,oe as d,re as e,le as f,ue as g,se as h,de as i,Q as s,ie as t};
