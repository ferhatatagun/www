# Building a streaming Claude client in the browser — without the SDK

I wanted to call Claude from a browser. The Anthropic SDK said no — sort of.

When I tried `import Anthropic from "@anthropic-ai/sdk"` in a Next.js app, the bundler crashed. The error pointed at `node:fs/promises`, deep inside the package — an agent-toolset module that reads files from disk and obviously cannot run in a browser. It isn't optional code; it's pulled in by the SDK's main client entry.

So either I waited for a browser-clean entry point (eventually, maybe), or I talked to the Messages API directly. The endpoint is HTTP. The streaming format is Server-Sent Events. I'd done this for OpenAI before — how hard could it be?

Turns out: about 150 lines of TypeScript for a usable client, and the result is cleaner than the SDK for the kind of tool I was building. Here's what that took and why I'd recommend it for anything browser-side that touches the Claude API.

**TL;DR**

- The official SDK pulls in Node-only modules and breaks browser bundles.
- Direct `fetch` works once you send `anthropic-dangerous-direct-browser-access: true`.
- The streaming format is straightforward SSE — split events on `\n\n`, parse `data:` lines.
- The only mild gotcha is `tool_use` blocks: their `input` arrives as `input_json_delta` chunks you accumulate and parse at `content_block_stop`.
- Hand-rolled means tiny bundle, fewer abstractions, full visibility into what the protocol is doing.

## The CORS unlock

Browsers won't let you `fetch()` `https://api.anthropic.com` by default. Anthropic ships a flag to allow it: send `anthropic-dangerous-direct-browser-access: true` and CORS opens up. The header's name is a warning — keys typed into a browser are visible to anyone with devtools open. For a bring-your-own-key developer tool that's fine; for a production app shipping a server-side key, it isn't.

With the header in place, a minimal request looks like this:

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

`stream: true` gives back a Server-Sent Events stream. The response body is a `ReadableStream<Uint8Array>` — chunks of bytes you decode as text. Events are delimited by a blank line; each event is a couple of lines (`event: <type>` and `data: <json>`), and the meaningful payload lives in `data:`.

## What the stream actually looks like

For a plain text response, the SSE event sequence is:

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

Each `content_block_delta` carries a partial token. Concatenate the `text` fields per `index` and you have the streamed message. Done — for plain text.

Three things make this slightly more interesting:

- Multiple content blocks per message (text plus tool_use, or several tool_use blocks).
- The `tool_use` block's `input` arrives as a sequence of partial-JSON deltas, not all at once.
- Aborting cleanly when the user clicks Stop.

## Parsing the stream

The parser is small. Read chunks, accumulate them in a buffer, split on `\n\n` (the SSE event separator), and process each event:

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

`TextDecoder` with `{ stream: true }` matters — without it you'll get garbled UTF-8 when a multi-byte character lands on a chunk boundary. Anthropic sends a lot of em-dashes; ask me how I know.

`handle(evt)` switches on `evt.type` and updates state. For text-only, the only events that move the UI are `content_block_delta` (append text to the current text block) and `message_delta` (final usage). For a full client, I keep a `blocks: Block[]` array indexed by `evt.index` and mutate the matching block as deltas arrive.

## Tool use: partial-JSON deltas

Tool calling is where this gets a little trickier. When the model decides to call a tool, you get a `content_block_start` with `content_block: { type: "tool_use", id, name, input: {} }` — the `input` is empty. The arguments arrive in `content_block_delta` events shaped like this:

```
event: content_block_delta
data: { "type": "content_block_delta", "index": 1,
        "delta": { "type": "input_json_delta", "partial_json": "{\"cit" } }

event: content_block_delta
data: { "type": "content_block_delta", "index": 1,
        "delta": { "type": "input_json_delta", "partial_json": "y\":\"Ist" } }
```

You can't `JSON.parse` a partial string. So I accumulate them per block index and only parse at `content_block_stop`:

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

This is the entire tool-use accommodation. The UI gets a clean callback when the block completes, with a parsed object as `input` ready to render.

A nice consequence of the per-block accumulation: text deltas can be rendered live — typing animation, caret blink, the whole thing — while `tool_use` cards appear only when their input is fully assembled. That feels right. Text is conversational; tool calls are commands.

## Abort

Don't skip this. A streaming request that the user has clicked Stop on should actually stop, not run to completion in the background:

```ts
const ac = new AbortController();
await fetch(ENDPOINT, { ..., signal: ac.signal });
// later, when the user clicks Stop:
ac.abort();
```

`reader.read()` throws on the next iteration after abort, and `signal.aborted` becomes true. Catch it, distinguish it from a real error, and surface a clean "stopped" state:

```ts
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
```

The user gets the partial response they've already seen plus a "stopped" badge, instead of a generic crash.

## Errors that mean something

A 401 from the API can mean several things; a 429 can mean several things. The browser hands you a `Response` you have to drill into. Parse the body as JSON, look for `error.message`, fall back to status-code messages, and present something the user can act on:

```ts
async function readError(res: Response): Promise<string> {
  try {
    const body = await res.json();
    const msg = body?.error?.message ?? body?.message;
    if (msg) return `${res.status} · ${msg}`;
  } catch {
    /* fall through */
  }
  if (res.status === 401) return "401 · Invalid API key.";
  if (res.status === 429) return "429 · Rate limited — wait a moment.";
  return `${res.status} · Request failed.`;
}
```

Boring, but the difference between "the app crashed" and "your key is invalid, fix it" is the difference between a tool and a toy.

## What this gets you

The whole SSE client — request, parsing, tool use, abort, errors — fits in about 150 lines of TypeScript and ships in a browser bundle that is, in my case, around 100 KB gzipped *including* React, Tailwind v4, Framer Motion, and the rest. The SDK alone is larger than that.

The other thing it gets you is honesty. The most interesting part of working with the Claude API is the streaming behaviour — caching turning on, tokens accumulating, tool calls landing one block at a time. Hiding that behind an SDK abstraction means you have to debug the SDK before you can debug your app. With direct `fetch`, your client *is* the protocol, and when something goes wrong you read the SSE events as they arrive.

I shipped this approach in [**claudoscope**](https://claudoscope-labs.vercel.app/?demo=1), a browser-only x-ray for Claude API calls. The whole token-economics visualization — cache reads, cache writes, uncached input, output, cost delta — is computed straight from the stream events described above. No SDK, no backend, no server-side proxy.

```
src/
  app/page.tsx              orchestration
  lib/anthropic.ts          the ~150-line client from this post
  lib/pricing.ts            tier-aware cost from usage events
  components/XRayPanel.tsx  what makes the data visible
```

The same client now powers three sibling tools — [agent-replay](https://agentreplay.vercel.app), [prompt-lab](https://prompt-lab-promptly.vercel.app), [tool-lab](https://tool-lab-bice.vercel.app) — without modification. Once the SSE parsing is yours, it composes.

If you've been waiting to put the Claude API in a browser tool because the SDK fights you: it's about an afternoon's work, and the result is small, debuggable, and yours.

---

The four tools, all open-source and BYOK: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).

Source for the SSE client described here: [github.com/ferhatatagun/claudoscope/blob/main/src/lib/anthropic.ts](https://github.com/ferhatatagun/claudoscope/blob/main/src/lib/anthropic.ts).
