# Your prompt isn't better. You just remember it being better.

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

```ts
const [outA, outB] = await Promise.all([
  runClaude({ system: promptA, messages, model }),
  runClaude({ system: promptB, messages, model }),
]);
```

That's the core. Two requests fired in parallel against the same `messages`. The trick is that both streams are happening simultaneously — same network conditions, same API load, same time-of-day cache warmth. Sequential A→B isn't a fair comparison; if the API was congested for the first call and cached the second, you're measuring weather, not signal.

What you do with the two outputs is where it gets interesting. The boring version: log both, eyeball, pick one. The version that actually works: side-by-side render, each with its own latency clock, each with its own token count and cost dollars, each with a diff highlight if you want to see exactly where they disagree.

The thing I've found is that 80% of the time both prompts produce *substantively equivalent* outputs. The reason to pick one is purely on cost or latency — there's no semantic improvement, you just got a 4× cheaper version of the same answer. The remaining 20% is where the outputs actually diverge meaningfully, and that's where eyeballs are needed, but at least now you know to look.

## What "better" looks like in numbers

A concrete example from last week. I had two versions of a system prompt for a code-review tool:

**Version A** — 1,800 tokens, full taxonomy of issue types, examples for each, explicit JSON schema:

```
You are a senior staff engineer reviewing a pull request. For each
issue you find, classify it under one of:
- correctness (the code is wrong)
- security (the code is exploitable)
- performance (the code is slow)
- maintainability (the code is hard to read)
...
```

**Version B** — 280 tokens, no taxonomy, schema implied by an example:

```
Review this code. For each problem, return JSON like:
[{"severity": "high"|"medium"|"low", "line": 42, "issue": "..."}]
Don't comment on style; focus on bugs and security.
```

Same input (a 600-line Python file). Both went to Sonnet 4.5. Side-by-side run:

|                   | Version A         | Version B         |
|-------------------|-------------------|-------------------|
| Input tokens      | 2,640             | 1,120             |
| Output tokens     | 820               | 740               |
| Latency           | 5.3s              | 3.1s              |
| Cost              | $0.0202           | $0.0145           |
| Issues found      | 7                 | 6                 |

Looking at the diff: both flagged the same 5 critical issues. Version A also flagged a `# TODO` as a maintainability issue and split a complex function into two suggested refactors. Version B was tighter — it caught fewer minor things but every single thing it caught was actionable.

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
