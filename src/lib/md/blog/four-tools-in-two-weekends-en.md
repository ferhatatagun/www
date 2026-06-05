# What I learned shipping four open-source Claude dev-tools in two weekends

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
- A `<150-line` shared protocol client across four projects is a more interesting reuse pattern than "extract into a library." It travels by copy-paste, but with intent.
- The articles are not promotion; they're scaffolding. Every tool needs a long-form artifact that explains *why* it exists, not what it does.

## The constraint that made the work possible

If the Anthropic SDK had imported cleanly into my Next.js bundle, none of this exists. I would have used the SDK, never seen the SSE event stream, never realized that the four `usage` fields are sitting there in every response, and shipped some boring product feature instead.

What broke first was the bundler — `node:fs/promises` from inside an agent-toolset module, deep in the SDK's transitive imports. The fix wasn't subtle: don't use the SDK. Talk to `api.anthropic.com` directly with `fetch`. Add the `anthropic-dangerous-direct-browser-access` header. Parse the SSE stream by hand. About 150 lines.

The interesting part wasn't the parser — it was what I saw *because* of the parser. I'd been calling Claude for months without ever noticing that `cache_creation_input_tokens` and `cache_read_input_tokens` were distinct fields. I'd never looked at the granular order of `content_block_delta` events. I'd never noticed that `tool_use` inputs arrive as partial-JSON deltas you have to accumulate. The SDK had been doing me a favor by hiding this stuff, and I'd been doing my apps a disservice by letting it.

The lesson, restated: when an SDK fights you, the fight is the gift. The work to bypass it gives you ground-truth visibility you'd never have bought yourself.

## One tool, one thing it makes visible

The temptation, once I had the SSE parser, was to build "a Claude developer dashboard" — one tool that did everything. I almost did. The reason I didn't is that the most useful diagnostic tools I've ever used (Wireshark, Chrome DevTools' specific panels, the React Profiler) all share a property: each panel makes *exactly one thing* visible in a way no other tool does.

So I broke the work into four:

| Tool | Makes visible |
|------|----------------|
| claudoscope | The four `usage` fields, live, as cost in dollars |
| agent-replay | The decision sequence inside a `messages` array |
| prompt-lab | The latency/cost/output diff between two variants |
| tool-lab | What the model actually does with your tool schemas |

Each is a small surface area. None of them does the other three's job. They're all the same shape — paste-some-JSON, watch-some-output, see-the-thing — but the "thing" is intentionally different in each.

This decomposition cost me something: I have four landing pages to maintain, four READMEs, four sets of cross-links. But it bought me an asymmetric thing: a clear pitch per tool. "X-ray a Claude API call" is easier to share than "an all-in-one Claude developer console." On a Show HN front page or a Twitter timeline, the small specific claim wins.

## BYOK + browser-only as a trust multiplier

The first version of each tool, in my head, had a backend. A small Node service, an API key kept server-side, maybe a rate limiter. I started building the first one this way, then stopped at the deploy step and asked: why am I making the user trust me with their key?

There is no good answer. For a developer tool that the user is going to use for ten minutes to debug their own work, no backend is necessary. Their key, their requests, their data. The browser is the right runtime; `localStorage` is the right persistence layer; "nothing leaves your tab" is the right privacy guarantee.

What this changed: the "try it" threshold collapsed. No account creation. No OAuth dance. No "should I trust this site with my key?" hesitation. Open the URL, paste a key, hit send. The tool is yours in under thirty seconds. The Anthropic header named `anthropic-dangerous-direct-browser-access` was clearly built for exactly this kind of usage — a developer wants to look at the protocol directly, on their own machine, with their own credentials.

The flip side: this design only works for *developer tools used by their own creator*. A production app that ships keys to users would still need a backend. But for the diagnostic case, BYOK + browser-only is the right architecture.

## A 150-line client, copied four times

The shared SSE streaming client is `src/lib/anthropic.ts` in all four repos. Same file. Same 150ish lines. I considered extracting it to an npm package — `@ferhatatagun/claude-fetch` or similar — and decided against it three times.

The case against extraction is intuitive once you've worked at scale: a shared library across four tools creates a fan-out problem. A breaking change in the library breaks all four; a non-breaking change requires version-pinning logic; a hotfix requires four PR's to deploy. Meanwhile the four tools are *small enough that the file is reviewable in five minutes*. There's nothing to abstract over.

What I do instead: the file at the top of `src/lib/anthropic.ts` in each repo says, in a comment, where it was last synced from. When I improve the parser in one tool, I diff the file across the four repos and reconcile. It takes minutes, not hours, and the four tools stay in sync without the ceremony of a published package.

This isn't a universal pattern — for ten projects it would break down, for a hundred it's clearly wrong. But for four tools shipped by one person on weekends, it's strictly better than the npm-and-versioning alternative.

## The articles aren't marketing — they're scaffolding

Each of the four tools has a long-form post that explains why it exists. claudoscope has two (one on the streaming client itself, one on cache observability). prompt-lab, tool-lab, and agent-replay each have one. There are also five matching Turkish translations on ferhatatagun.com.

These posts are not promotion in the marketing sense. I'm not optimizing them for SEO and I'm not pumping them on LinkedIn for impressions. (OK, I'm pumping them on LinkedIn a little. But that's not the point.)

The point is: a tool that does one specific thing benefits massively from an artifact that explains *why* that specific thing is worth doing. "Here's a tool to A/B test Claude prompts" is a less convincing pitch than "you're choosing prompts by vibes; here's what side-by-side reveals that sequential doesn't, with a worked example, and a tool for it." The article does the persuasion; the tool catches the convinced reader.

Without the writing, the tools look like toys. With the writing, they look like the natural conclusion of an argument. The two work as a pair.

## What I'd do differently

A handful of small things I'd front-load if I were starting over:

1. **Demo mode from day one.** I added `?demo=1` to three of the four tools as an afterthought. It's the single highest-conversion feature — users who land on a tool and don't have a key still need something to look at, or they bounce. Should have been there at first commit.

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
