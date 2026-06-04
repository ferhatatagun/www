# How I debug Claude agents by replaying their trace

Your agent did something weird in production. A user reported it, you found the failed run in your logs, and you're now staring at a JSON file that's 400 messages long, half of them are `tool_result` blocks the size of small databases, and somewhere in there is the moment the agent decided to do the wrong thing.

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

When you save a Claude agent run, you usually persist the `messages` array — the full conversation including the model's responses and the tool results you fed back. A six-step agent run looks roughly like:

```jsonc
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
```

Every interesting moment of the agent's behaviour is in there: which tool it picked, what arguments it constructed, what it said about its own reasoning, how it interpreted the result. The structure is fundamentally a **sequence of discrete events**, not a "document."

But you read it as a document, because that's what an editor shows you. The brain has to do the work of converting "alternating role: assistant / role: user with tool_result content blocks" into "step 3 was a tool call to get_price with argument X, which returned Y, which the agent then interpreted as Z."

That conversion is what kills your debugging time. Doing it manually for a 12-step trace takes minutes. Doing it for a 60-step agent on a complex task takes hours.

## The right primitive: a timeline of decisions

The reframe is: stop reading the trace as JSON, start watching it as a sequence of decisions. Each step is one of:

- 💭 **Thought** — the model wrote text (the part of its response that isn't a tool call)
- 🔧 **Tool call** — the model invoked a tool with specific arguments
- 📥 **Tool result** — what came back, fed into the next turn
- ✅ **Final answer** — the model's `end_turn`, no more tools

Color-code those four event types. Lay them out in order, one card per event. You now have a timeline you can scrub, step through, and play back. The information density per card is high enough that you can read the entire trace at a glance, and zoom in only on the cards that look suspicious.

The structural insight: agent debugging is closer to debugging a script with breakpoints than to reading source code. You want to step through, not skim. JSON gives you no steps; the timeline gives you nothing else.

## The bugs that become obvious in this view

Three failure modes I see repeatedly when I drop a trace into the timeline:

**1. The wrong tool, picked silently.** The model called `search_archive` when it should have called `search_recent`. In JSON this is one line out of 200 that flies past your eye. In the timeline it's a card with a tool name you didn't expect, and you click on it.

**2. Hallucinated arguments.** The model called the right tool but with an argument shape that doesn't match the schema — usually because the schema is ambiguous. In JSON you see `{"q": "foo", "limit": "10"}` and don't notice that `limit` should have been an integer. In the timeline the tool result card right after shows a 400 error and you trace it back one step.

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

There's a sample trace seeded on `?demo=1` if you want to see what a 12-step agent looks like without copying your own data anywhere.

The thing I keep finding: the moment I'm debugging is no longer "where in the JSON did the agent screw up." It's "which card looks wrong, and what does the next card show as a consequence." A 30-minute investigation becomes a 30-second one. Not because the tool is doing anything clever — it's just showing the same data in the right shape.

## What I'd recommend you do this week

Three escalating moves:

1. **Today (5 minutes):** Find the last weird agent run you have a trace for. Paste it into agent-replay. See how long it takes to find the failure point. If it's faster than your usual JSON-scrolling approach, you just changed your debugging workflow.

2. **This week (an afternoon):** Add a trace-export endpoint to your agent. Every agent run, finished or failed, dumps the `messages` array to S3 or a database row. You need the trace before you need to debug it, not after.

3. **This quarter (a habit):** When a user reports "the agent did something weird," your first move is to pull the trace and open it in a timeline view, *before* you read the user's report carefully. Most of the time you'll know what happened before you finish reading the bug report.

Agent debugging is presented as an emerging engineering discipline. It isn't — it's a tooling problem we've solved many times before for non-AI systems. We just haven't built the tools yet for this one. Once the trace is in the right shape, the bugs are obvious. The work is laying out the data, not interpreting it.

---

I shipped this in [**agent-replay**](https://agentreplay.vercel.app) — paste a trace, scrub the timeline. No key, no backend, runs in the browser. Source: [github.com/ferhatatagun/agent-replay](https://github.com/ferhatatagun/agent-replay).

The same SSE client (for traces that include streaming events) also powers three sibling tools — [claudoscope](https://claudoscope-labs.vercel.app), [prompt-lab](https://prompt-lab-promptly.vercel.app), [tool-lab](https://tool-lab-bice.vercel.app). All open-source, all BYOK: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).
