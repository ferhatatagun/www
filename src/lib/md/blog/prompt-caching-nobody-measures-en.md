# Prompt caching is the cheapest Claude optimization. Nobody measures it.

Pull up the last week of Anthropic API bills from any team shipping a Claude-powered product. Two out of three of them are paying for context they could be reading from cache for one-tenth the price. Most of them don't know it, because the dashboard doesn't tell them and the SDKs don't either — by the time the response lands, the only number anyone looks at is `output_tokens`, and even then mostly when something seems expensive.

The information is in every response. Anthropic puts it in `usage`:

```json
"usage": {
  "input_tokens": 312,
  "cache_creation_input_tokens": 4180,
  "cache_read_input_tokens": 0,
  "output_tokens": 187
}
```

Four numbers. The first time a cached prompt runs you pay 1.25× the input price to *write* the cache. Every subsequent call within the TTL pays 0.1× to *read* it. The ratio between those two lines is the difference between a $3,000/month bill and a $300/month one. And almost no one is graphing it.

**TL;DR**

- Every Claude response carries cache-hit data in `usage`. Most apps log it nowhere.
- The first call after a cache miss costs `1.25× input` extra; every hit after costs `0.1× input`. Break-even is two reads.
- The cache TTL is 5 minutes by default. A request pattern that fires once every six minutes is paying the write penalty forever and getting zero benefit.
- The fix is observability, not code: graph cache hit ratio over time, alert when it dips, and you'll find the bug before the invoice does.
- A 150-line browser tool is enough to do this for any project that streams from the Messages API.

## What the four numbers actually mean

When you send a request with `cache_control: { type: "ephemeral" }` somewhere in your messages, the API checks if it's seen an identical prefix in the last 5 minutes. There are three outcomes:

1. **Cache miss, new content.** The full prompt is processed normally. `input_tokens` reflects the uncached portion; `cache_creation_input_tokens` reflects what got written into cache for next time.
2. **Cache hit.** The cached prefix is read at 10% the price. `cache_read_input_tokens` shows what was read; `input_tokens` is just the new suffix.
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

**2. Subtly drifting prompts.** Maybe you append the current timestamp, maybe a "today is" line, maybe you regenerate a list of available tools that arrives in a non-deterministic order. The cache key is the exact byte sequence; one character of drift and you've invalidated the whole prefix. Tools that serialize tool definitions before sending are an especially fun source of this — `JSON.stringify` on an object with shuffled keys produces different bytes, no hit.

**3. Wrong TTL for your traffic pattern.** A chatbot that gets ~one message every ten minutes has a structural mismatch with a 5-minute ephemeral cache. You're paying the write penalty on every conversation turn. Either bump to the 1-hour cache (more expensive write, way longer life) or accept that caching isn't economical for your traffic shape — but you need the data to make either decision.

All three of these are invisible from a code review. They're only visible in the usage telemetry.

## The minimum viable observability

You don't need a metrics stack for this. You need to log four fields per request and chart them. The unhelpful version is the one most teams have:

```ts
logger.info("claude response", { tokens: r.usage.output_tokens });
```

The version that pays for itself in one week is:

```ts
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
```

The `hit_rate` field is the one that matters. Group by route, by model, by user-agent — whatever your traffic dimensions are. Anything trending toward zero on a cache-using endpoint is a money leak.

The `cost_estimate` is what makes the dashboard land in conversations with non-engineers. Anthropic publishes pricing per token tier; the conversion is mechanical:

```ts
function estimateCost(u: Usage, model: string) {
  const p = pricing[model]; // { input, output, cache_write, cache_read }
  return (
    u.input_tokens * p.input +
    u.output_tokens * p.output +
    (u.cache_creation_input_tokens ?? 0) * p.cache_write +
    (u.cache_read_input_tokens ?? 0) * p.cache_read
  ) / 1_000_000;
}
```

That's it. Five lines of arithmetic and you've got per-request dollars on every Claude call your app makes.

## Why I built a tool for this anyway

I built [**claudoscope**](https://claudoscope-labs.vercel.app) because I wanted to see this data live, while the response was streaming, without instrumenting whatever app I was iterating on. The use case is "I'm about to ship a prompt change, did my cache behavior just regress?" — the slow, expensive way is deploying it and looking at logs an hour later; the fast way is pasting the request into a tool that tells you in 4 seconds.

The whole thing is a browser-only client. Bring your own key, no backend. Every event from the SSE stream is parsed and the `usage` object is broken out into a panel:

```
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
```

Hit "send" a second time within the TTL and the bars rearrange — cache write goes to zero, cache read fills, the cost number drops by 90%. It's the kind of thing that's obvious once you see it move and invisible if you don't.

It's about 100KB gzipped and the source is in [one file](https://github.com/ferhatatagun/claudoscope). The pricing tier logic is in another. There's no third file.

## What I'd actually recommend you do today

The order of operations, in increasing effort:

1. **Right now (5 minutes):** Open claudoscope, paste your most expensive prompt, run it twice. Look at the difference. If the hit ratio isn't ~99% on the second call, you have a cacheability bug, not an optimization opportunity.
2. **This week (an afternoon):** Add the usage logging block above to every Claude call site in your app. Ship it. Don't bother building a dashboard yet — `grep` your logs and you'll find the worst offenders in fifteen minutes.
3. **This month (a sprint):** Move the four `usage` fields into your real metrics pipeline (Datadog/Honeycomb/Grafana/whatever). Graph cache hit ratio by endpoint. Alert when it drops below your floor.
4. **Optional (if you're me):** Build the visualizer because seeing it move in real time is the thing that makes it stick.

Three out of four of those are configuration, not code. The interesting part isn't the implementation; it's that almost nobody has done it. The teams I've talked to who do have it — without exception — found a cache misconfiguration in the first week of dashboards and saved more than the work cost them. The teams who don't have it are usually paying the cache creation surcharge for nothing.

The Anthropic API gives you everything you need to know whether your caching is working. The only question is whether you look.

---

I shipped this visualization in [**claudoscope**](https://claudoscope-labs.vercel.app) — bring-your-own-key, no backend, runs in the browser. Source: [github.com/ferhatatagun/claudoscope](https://github.com/ferhatatagun/claudoscope).

The same SSE client also powers three sibling tools — [agent-replay](https://agentreplay.vercel.app), [prompt-lab](https://prompt-lab-promptly.vercel.app), [tool-lab](https://tool-lab-bice.vercel.app). All open-source, all BYOK: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).
