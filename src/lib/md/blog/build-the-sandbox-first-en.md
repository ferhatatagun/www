# Build the sandbox before you write a single tool

The first time you ship a Claude agent that uses tools you'll do it the obvious way: design the schema, write the actual tool function, hit the API, parse the `tool_use` block, run the function, feed the result back, loop. It works. It also has a fundamental ordering bug:

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

```ts
const tools = [
  { name: "read_file", description: "read a file from the repo", ... },
  { name: "search_code", description: "grep across the repo", ... },
  { name: "get_diff", description: "show the diff for this PR", ... },
  { name: "post_comment", description: "leave a review comment", ... },
];
```

I implemented all four. Real filesystem access. Real git invocation. Real GitHub API call. Probably four hours total. Then I ran the agent on a real PR.

What happened: the agent called `get_diff` first (good), then called `search_code` for every single identifier in the diff (catastrophic — the diff had 200 lines, 50 unique identifiers, my rate limit ran out). It never called `read_file` because the diff already contained the context. It called `post_comment` once at the end with a 4,000-word essay instead of inline comments.

Three of my four "real" tools were either misused or unused. The agent design was wrong, not the implementations. If I'd run the loop with mocked responses first, I would have:

1. Noticed it called `search_code` 50 times → split the tool into `search_code(query, limit=5)` with an explicit budget
2. Noticed it never used `read_file` → deleted it, saved myself an hour
3. Noticed `post_comment` was being used as `post_essay` → split into `post_inline_comment(line, body)` and `post_summary(body)`

That intervention takes fifteen minutes when the tools are mocked. It takes a day when they're real.

## The role-play pattern

The trick is shockingly simple: write your tool schemas, send a real user message to Claude, and when the model produces a `tool_use` block, *you* hand-type the result and feed it back. The loop runs end-to-end, but you're playing every tool.

In code, this is the same agent loop everyone writes:

```ts
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
```

The only difference between this and a "real" agent loop is the `PROMPT_USER_FOR_RESULT` call — instead of executing a function, it shows you what the model called and what arguments it used, and waits for you to type the answer.

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

```
┌─ Tools (JSON editor) ─────────┬─ Conversation ────────────────────┐
│ [                             │  user: review this PR             │
│   { "name": "read_file", ... },│  assistant: I'll get the diff.    │
│   { "name": "search_code"...},│    → tool_use: get_diff()         │
│   { "name": "get_diff", ... },│    ← tool_result: <YOU TYPE>      │
│   { "name": "post_comment"...}│  assistant: ...                   │
│ ]                             │                                    │
└───────────────────────────────┴───────────────────────────────────┘
```

You paste your tool schemas on the left. Type the user message. The model streams its response into the right pane. When it lands a `tool_use` block, the conversation pauses with a text field for the result. You type whatever the tool would have returned — JSON, a string, an error, whatever. Hit continue. The loop runs again with your fake result included.

It's about 12KB of relevant logic on top of the shared SSE client I wrote about [here](https://ferhatatagun.com/blog/browser-only-claude-streaming). BYOK, no backend, your tool schemas and conversations live in `localStorage` only. There's a demo conversation seeded on `?demo=1` so you can see the loop run without writing tools yourself.

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
