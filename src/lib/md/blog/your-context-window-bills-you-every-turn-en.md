# Your context window bills you every turn

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

I pulled this from three Claude Code project transcripts — `.jsonl` files sitting in `~/.claude/projects/`, one line per event, a `usage` object on every assistant message.

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
