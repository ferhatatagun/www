# I accidentally built a forward-deployed engineer's field kit

A year ago I deleted `@anthropic-ai/sdk` from a project and wrote about 150
lines of TypeScript to replace it.

The reason I gave myself was honest and boring. The SDK pulled `node:fs/promises`
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
dependency surface to `fetch` and a `TextDecoder` — and the consequence of that,
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
tell someone to clone a repo and run `npm install`. What it actually is: zero
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
safely consume. You ask for `{"risk": "high"|"medium"|"low", "score": 0-100}`.
What actually comes back, across enough calls:

- the JSON wrapped in a markdown fence
- `"HIGH"` instead of `"high"` — enum drift
- `"very high"` — an enum value that doesn't exist, invented on the spot
- `"score": "85"` as a string, silently breaking arithmetic downstream
- `score` missing entirely
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

*Part two of a series on the last mile of enterprise AI. Part one is
[Nobody's model failed. The interface did.](https://ferhatatagun.com/blog/nobodys-model-failed)
Part three is about the thing I keep saying and haven't yet defended properly —
that on this kind of work, the deliverable isn't the prompt, it's the eval.*
