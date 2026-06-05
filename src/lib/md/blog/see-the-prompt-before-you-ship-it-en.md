# See the prompt before you ship it

The way most teams find out their prompt is too long is in the bill. The way most teams find out their prompt is approaching the context window is when the model starts dropping the system instructions. The way most teams find out their prompt-caching boundary is in the wrong place is by graphing a hit ratio that won't climb above 30%.

All three of these are diagnosable in advance, in about four seconds, for free. The reason they keep happening is that the tools every Claude developer reaches for — chat playgrounds, IDE plugins, the official SDK — are *post-hoc*. They show you what just happened. None of them shows you what your prompt looks like *before* you press send.

The other four tools I've shipped in this suite are all post-hoc too. [claudoscope](https://claudoscope-labs.vercel.app) x-rays a finished response. [agent-replay](https://agentreplay.vercel.app) scrubs a finished trace. [prompt-lab](https://prompt-lab-promptly.vercel.app) compares two finished runs. [tool-lab](https://tool-lab-bice.vercel.app) sandboxes the agent loop. They're all "look at what just happened" microscopes. None of them is a "look at what you're about to do" lens.

[**context-lens**](https://context-lens.vercel.app) is. Paste a system prompt and a user message; see exactly how the API will count them, where in the 200K window you sit, where caching boundaries fall, and what each call will cost. The pre-flight check that turns a guess into a measurement.

**TL;DR**

- Token cost, context-window position, and prompt-caching layout are all knowable from the prompt alone — you don't need to send the request.
- Anthropic's `count_tokens` endpoint gives you the exact number; a `~3.7 chars/token` heuristic gives you a good-enough number while you type.
- The most useful single number is "tokens × calls/day × dollars/token" — once you can compute it before deploying, "ship this prompt" stops being an aesthetic call and becomes a budget call.
- A 4× difference in input length between two equivalent prompts is normal. Catching it before it goes to production saves more than the tool costs to build.

## What you can actually pre-flight

Three things, all derivable from the prompt text alone:

**1. Exact token count.** Not an estimate. Anthropic ships a `/v1/messages/count_tokens` endpoint that takes the exact same shape as `/v1/messages` (system, messages, tools) and returns just the `input_tokens` number. Same tokenization as the actual API call would use. No model invocation, no output, no cost beyond a single tiny request.

**2. Position in the context window.** Sonnet 4.5 has a 200K-token window. Going past it doesn't error; the model silently drops the oldest content, which usually means dropping your system instructions, which usually means the model stops doing what you asked. The math is `(input + max_output) / 200_000`. You should never see "78% of window" in production without knowing about it.

**3. Cost per call.** Multiply input tokens by input price (`$3/M` on Sonnet), output tokens by output price (`$15/M`), and you have one number for the cost of one call. Multiply by your traffic and you have the bill. The interesting move: do this *before* you commit to a prompt design, not after.

The fourth thing — where prompt-caching boundaries should sit — is harder to derive purely from text, but it's still pre-flight: you choose where to put `cache_control` based on which prefix is *stable* across your real traffic. context-lens won't choose for you, but it will show you the boundaries you've chosen so you can sanity-check them.

## The four-fold cost difference no one was looking for

A real example, the worked-out kind. Two versions of the same agent system prompt:

| Version | Approach | Input tokens (counted) |
|---------|----------|----------------------|
| A | Markdown headings, examples, long taxonomy, JSON schema embedded | **3,847** |
| B | Single paragraph, schema implied by one example, no preamble | **612** |

Same model (Sonnet 4.5). Same user inputs (a code review task). The output was substantively equivalent on five real traffic samples — both caught the same critical bugs, both produced valid JSON, both came in under 800 output tokens.

The cost differential is mechanical:

- A: `(3847 × 3 + 800 × 15) / 1_000_000` = **$0.0235** per call
- B: `(612 × 3 + 800 × 15) / 1_000_000` = **$0.0138** per call

At 10,000 calls per day, that's **$97/day saved**, or **$3,000/month**. For a single prompt rewrite that took two hours to test in context-lens.

The salient detail: I didn't *intend* version B to be cheaper. I intended it to be more readable. The cost reduction was a side-effect that I would not have noticed without the pre-flight number, because both prompts felt "about the same length" to me in an editor. context-lens told me one was 6.3× the length of the other, in the only metric that matters: the metric the API uses.

The lesson is that "feels about the same" is a uniformly bad estimator for token count, and you stop making the mistake the day you start measuring before you ship.

## Why the heuristic mode exists

context-lens does two things:

- Live as you type: a fast heuristic, roughly `3.7 chars/token` for English-ish text, that updates with every keystroke. No API call, no key required, instant.
- On demand: a real API call to `count_tokens` that gives you the exact number Anthropic will use.

The heuristic isn't quite right — Turkish, code, and JSON all tokenize differently than English prose, sometimes by 30%. But it's a real-time signal while you iterate, which is more useful than an accurate-but-asynchronous one while you write. When you're ready to commit, you click the button and get the exact number. The two modes are intentional: one for the iteration phase, one for the verification phase.

The pattern generalizes. Every place you have a fast-approximate metric and a slow-exact one, ship both, label them clearly, default to the fast one. The fast metric should never be wrong by more than ~30%; otherwise it's not a useful approximation. ~3.7 chars/token meets that bar for the languages context-lens has to handle.

## What about prompt caching

Caching is the lever most teams underuse — and the one context-lens helps with most by surfacing where the boundaries are. Anthropic lets you mark any segment of your prompt as cacheable with `cache_control: { type: "ephemeral" }`. The next 5 minutes, requests that share that exact prefix get the cached portion at **10% of the input price**. The math flips: a 4,000-token system prompt that costs `$0.012` per cold call costs `$0.0012` per warm call. That's 10×.

The catch: every byte before the `cache_control` boundary must be identical. If you interpolate the user's name into the system prompt — gone. If your tool list reorders between requests — gone. If you append a timestamp — gone.

context-lens shows you the structure you're sending. It doesn't auto-detect cacheability for you, but it does let you toggle "assume input is cache-read" and see what the cost would be if your caching worked. If `$0.012 → $0.0012` is interesting at your traffic level, the path to verify it works is in [claudoscope](https://claudoscope-labs.vercel.app), which shows you the actual cache-read and cache-write breakdown on a live call. The two tools are complementary: context-lens predicts, claudoscope measures.

I wrote a longer piece on the caching observability case in [Prompt caching is the cheapest Claude optimization. Nobody measures it.](https://ferhatatagun.com/blog/prompt-caching-nobody-measures) if you want the full argument.

## What I'd recommend you do this week

Three escalating moves:

1. **Today (5 minutes):** Take whatever prompt your team is shipping right now. Paste it into context-lens with a representative user message. Note the token count. Now write a 1-paragraph version of the same prompt and paste that. If the count drops by 50% with no quality regression on three real inputs, you have a free production cost cut.

2. **This sprint (an afternoon):** Add a pre-merge step to your prompt-change workflow: every PR that touches a prompt must include the context-lens token counts (before / after) in the description. Same energy as showing test results. If a PR triples your input tokens, that should be a conversation, not a stealth deploy.

3. **This quarter (a habit):** Track the prompt-cost-per-feature number across your product as a real metric. If feature X costs `$0.02/call` and feature Y costs `$0.20/call`, that's information you should know about before the bill teaches you. context-lens is the cheapest place to start collecting it — `count_tokens` is free to call.

The economics of LLM apps in 2026 are not about model selection, mostly. They're about prompt design. Teams that can see their prompts before they ship them will out-compete teams that can't, on cost first and on quality second. The "see them" part is what's missing in most setups, and what context-lens is for.

---

I shipped this in [**context-lens**](https://context-lens.vercel.app) — paste a Claude prompt, see what it costs before you ship. BYOK, no backend, runs in the browser. Source: [github.com/ferhatatagun/context-lens](https://github.com/ferhatatagun/context-lens).

The same protocol-level approach also powers four sibling tools — [claudoscope](https://claudoscope-labs.vercel.app), [agent-replay](https://agentreplay.vercel.app), [prompt-lab](https://prompt-lab-promptly.vercel.app), [tool-lab](https://tool-lab-bice.vercel.app). All open source, all BYOK: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).
