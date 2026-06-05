# Tarayıcıda Claude'a streaming çağrı — SDK olmadan

Tarayıcıdan Claude'u çağırmak istedim. Anthropic SDK hayır dedi — bir bakıma.

Next.js uygulamasında `import Anthropic from "@anthropic-ai/sdk"` denediğimde bundler patladı. Hata `node:fs/promises`'i gösteriyordu — SDK'nın içinde, agent toolset modülünün diskten dosya okuyan bir parçası. Tarayıcıda çalışması mümkün değil. Üstelik opsiyonel kod da değil; SDK'nın ana client entry'si onu zincirleme çekiyor.

Yani ya tarayıcı-temiz bir entry point gelene kadar (belki bir gün) bekleyecektim, ya da Messages API'yi doğrudan konuşacaktım. Endpoint HTTP. Streaming formatı Server-Sent Events. Daha önce OpenAI için bunu yapmıştım — ne kadar zor olabilir ki?

Sonuç: kullanılabilir bir client için yaklaşık 150 satır TypeScript. Üstelik benim yaptığım tool için SDK'dan daha temiz çıktı. Ne gerektirdi, neden tarayıcı tarafında Claude API'yle çalışan herhangi bir şey için bunu öneriyorum — yazının özü bu.

**TL;DR**

- Resmi SDK Node-only modüller çekiyor, tarayıcı bundle'larını kırıyor.
- Doğrudan `fetch` çalışıyor — yalnızca `anthropic-dangerous-direct-browser-access: true` header'ını göndermen lazım.
- Streaming formatı düz SSE — event'leri `\n\n` ile böl, `data:` satırlarını parse et.
- Tek ufak çetrefil yer: `tool_use` block'larının `input`'u `input_json_delta` chunk'ları olarak geliyor; `content_block_stop`'ta birleştirip parse ediyorsun.
- El yapımı olunca bundle ufak, soyutlama az, protokolün ne yaptığı şeffaf.

## CORS kilidini açmak

Tarayıcı varsayılan olarak `https://api.anthropic.com`'a `fetch()` etmene izin vermiyor. Anthropic bunu açan bir flag gönderiyor: `anthropic-dangerous-direct-browser-access: true` header'ı eklediğinde CORS açılıyor. Header'ın adı bizzat bir uyarı — tarayıcıda yazılan key DevTools açabilen herkese görünür. Bring-your-own-key bir developer tool için sorun değil; production'da server-side key servis eden bir uygulama için ise kabul edilemez.

Header yerine konunca minimum bir istek şuna benziyor:

```ts
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
```

`stream: true` sana bir Server-Sent Events stream'i veriyor. Response body bir `ReadableStream<Uint8Array>` — byte chunk'larını text'e decode ediyorsun. Event'ler boş bir satırla ayrılıyor; her event birkaç satırdan oluşuyor (`event: <type>` ve `data: <json>`), anlamlı yük `data:`'da yaşıyor.

## Stream gerçekte nasıl görünüyor

Düz bir text response için SSE event sequence'i şu:

```
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
```

Her `content_block_delta` bir parçayı taşıyor. `text` alanlarını `index`'e göre birleştirdiğinde stream'lenen mesajı elde ediyorsun. Düz text için iş bu kadar.

Üç şey bunu biraz daha ilginç yapıyor:

- Mesaj başına birden fazla content block (text + tool_use, ya da birkaç tool_use).
- `tool_use` block'unun `input`'u partial JSON delta dizisi olarak geliyor, toplu değil.
- Kullanıcı Stop'a bastığında temiz iptal.

## Stream'i parse etmek

Parser ufak. Chunk'ları oku, bir buffer'da birik, `\n\n`'de böl (SSE event separator'ı), her event'i işle:

```ts
const reader = res.body!.getReader();
const decoder = new TextDecoder();
let buffer = "";

while (true) {
  const { value, done } = await reader.read();
  if (done) break;
  buffer += decoder.decode(value, { stream: true });

  let sep: number;
  while ((sep = buffer.indexOf("\n\n")) !== -1) {
    const rawEvent = buffer.slice(0, sep);
    buffer = buffer.slice(sep + 2);

    const dataLine = rawEvent.split("\n").find((l) => l.startsWith("data:"));
    if (!dataLine) continue;

    const evt = JSON.parse(dataLine.slice(5).trim());
    handle(evt);
  }
}
```

`TextDecoder`'a `{ stream: true }` vermek önemli — vermediğinde, çok byte'lı bir karakter chunk sınırına denk düştüğünde UTF-8 bozuluyor. Anthropic bol em-dash gönderiyor; bana sorma nereden bildiğimi.

`handle(evt)` `evt.type`'a göre switch yapıyor ve state'i güncelliyor. Sadece text için, UI'yi hareket ettiren tek event'ler `content_block_delta` (mevcut text block'una text ekle) ve `message_delta` (final usage). Full client'ta `blocks: Block[]` dizisini `evt.index`'e göre tutuyorum ve delta geldiğinde matching block'u mutate ediyorum.

## Tool use: kısmi-JSON delta'ları

İşin biraz çetrefilleştiği yer burası. Model bir tool çağırmaya karar verdiğinde, `content_block_start` geliyor — `content_block: { type: "tool_use", id, name, input: {} }`. `input` boş. Argümanlar `content_block_delta` event'lerinde şöyle bir şekilde geliyor:

```
event: content_block_delta
data: { "type": "content_block_delta", "index": 1,
        "delta": { "type": "input_json_delta", "partial_json": "{\"cit" } }

event: content_block_delta
data: { "type": "content_block_delta", "index": 1,
        "delta": { "type": "input_json_delta", "partial_json": "y\":\"Ist" } }
```

Partial bir string'i `JSON.parse` edemezsin. Bu yüzden block index başına biriktirip ancak `content_block_stop`'ta parse ediyorum:

```ts
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
```

Tool-use için yapılan tüm uyum bu kadar. UI block tamamlandığında temiz bir callback alıyor, `input` parse edilmiş bir nesne olarak hazır.

Per-block birikimin güzel bir sonucu: text delta'ları canlı render edilebiliyor — typing animasyonu, caret blink, hepsi — ama `tool_use` kartları yalnızca input'u tam toplanınca beliriyor. Bu doğru bir his veriyor. Text sohbet; tool call komut.

## İptal

Bunu atlama. Kullanıcı Stop'a bastığında streaming isteğin arka planda finish'lenmemeli, gerçekten durmalı:

```ts
const ac = new AbortController();
await fetch(ENDPOINT, { ..., signal: ac.signal });
// daha sonra, kullanıcı Stop'a bastığında:
ac.abort();
```

`reader.read()` abort sonrası bir sonraki iteration'da exception fırlatıyor, `signal.aborted` true oluyor. Bunu yakala, gerçek bir hatadan ayır, temiz bir "stopped" state göster:

```ts
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
```

Kullanıcı zaten gördüğü partial response'u + bir "stopped" rozetini alıyor, generic crash yerine.

## Anlamlı hatalar

API'den gelen bir 401 birkaç şey anlamına gelebilir; bir 429 da öyle. Tarayıcı sana drill etmen gereken bir `Response` veriyor. Body'yi JSON olarak parse et, `error.message`'a bak, status code'a göre fallback'le, kullanıcının üzerinde aksiyon alabileceği bir şey göster:

```ts
async function readError(res: Response): Promise<string> {
  try {
    const body = await res.json();
    const msg = body?.error?.message ?? body?.message;
    if (msg) return `${res.status} · ${msg}`;
  } catch {
    /* devam */
  }
  if (res.status === 401) return "401 · Geçersiz API key.";
  if (res.status === 429) return "429 · Rate limit — biraz bekle.";
  return `${res.status} · İstek başarısız.`;
}
```

Sıkıcı, ama "uygulama çöktü" ile "key'in geçersiz, düzelt" arasındaki fark, bir tool ile bir oyuncak arasındaki fark.

## Bu sana ne kazandırıyor

Tüm SSE client — request, parsing, tool use, abort, errors — yaklaşık 150 satır TypeScript. Benim caseimde, React + Tailwind v4 + Framer Motion + diğerleri dahil **gzipped ~100 KB** bir browser bundle'ı ile geliyor. SDK tek başına bundan büyük.

Sana verdiği bir başka şey: dürüstlük. Claude API'yle çalışmanın en ilginç kısmı streaming davranışı — caching açıldığında, token'lar birikirken, tool call'lar tek tek geldiğinde. SDK soyutlaması bunu sakladığı için önce SDK'yı debug etmen gerekiyor, sonra uygulamayı. Doğrudan `fetch` ile, client'ın *protokolün kendisi* haline geliyor; bir şey ters gittiğinde SSE event'leri akarken okuyorsun.

Bu yaklaşımı [**claudoscope**](https://claudoscope-labs.vercel.app/?demo=1)'da kullandım — Claude API çağrıları için tarayıcı-only bir x-ray. Token ekonomisi görselleştirmesinin tamamı (cache read'leri, cache write'lar, uncached input, output, cost delta) yukarıdaki stream event'lerinden hesaplanıyor. SDK yok, backend yok, server-side proxy yok.

```
src/
  app/page.tsx              orchestration
  lib/anthropic.ts          bu yazıdaki ~150 satırlık client
  lib/pricing.ts            usage event'lerinden tier-aware cost
  components/XRayPanel.tsx  veriyi görünür kılan kısım
```

Aynı client şimdi üç kardeş tool'a güç veriyor — [agent-replay](https://agentreplay.vercel.app), [prompt-lab](https://prompt-lab-promptly.vercel.app), [tool-lab](https://tool-lab-bice.vercel.app) — değişiklik olmadan. SSE parsing senin olduğunda, kompoze edilebiliyor.

SDK seninle didişiyor diye Claude API'yi bir tarayıcı tool'una koymayı erteliyorsan: bir öğleden sonralık iş, ve sonuç ufak, debug-edilebilir ve senin.

---

Dört tool, hepsi açık kaynak ve BYOK: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).

Burada anlatılan SSE client'ın kaynağı: [github.com/ferhatatagun/claudoscope/blob/main/src/lib/anthropic.ts](https://github.com/ferhatatagun/claudoscope/blob/main/src/lib/anthropic.ts).
