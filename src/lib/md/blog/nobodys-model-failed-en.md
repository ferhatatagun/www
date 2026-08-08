# Nobody's model failed. The interface did.

Three numbers, and they don't sit comfortably next to each other.

Postings for one job title — forward deployed engineer — went up roughly
**800% in 2025**. Total comp at the frontier labs settled somewhere around
**$350–550K** for mid-to-senior. And enterprise AI pilots still fail at a rate
that lands somewhere between **70% and 90%**, depending on whose survey you
read. One widely-cited figure has the share of companies abandoning AI
initiatives going from 17% to 42% in a single year.

If the models were the bottleneck, the fix would be a better model. Instead the
industry's answer has been to hire humans and put them inside the customer's
building. That is an unusual response to a technology problem. It's the response
you get when the thing that's broken isn't the technology.

So: what exactly keeps failing?

**TL;DR**

- The canonical FDE success story — OpenAI at Morgan Stanley — is about 6–8 weeks of technical scaffolding followed by roughly **four months** of getting advisors to actually use the thing. The reported win condition is **98% adoption**, not accuracy and not latency.
- An adoption number is not a model metric. It's a measure of whether a human decided to trust what was on their screen. That decision is made at the interface.
- The three places that trust reliably dies — hidden uncertainty, invisible cost, and a system that won't show its work — are all rendering decisions, not modelling decisions.
- FDE roles are written and staffed as backend/ML/infra roles. Read a dozen job specs and count how many mention what the operator sees. The failure surface and the hiring surface don't line up.
- This isn't an argument that the backend doesn't matter. It's an argument that the backend is the six weeks, and the last mile is the four months.

## The number that doesn't fit

Every write-up of the forward-deployed model eventually reaches for the same
case study: OpenAI's engineers embedded at Morgan Stanley, building an assistant
for wealth advisors.

The part everyone quotes is the ending — 98% adoption. The part worth staring at
is the shape of the timeline that produced it. Roughly six to eight weeks of
technical scaffolding: integration, data plumbing, evals. Then about four months
of running pilots with actual advisors.

Four months. After the system worked.

Whatever was happening in those four months, it wasn't model training. The model
was done. The integration was done. What remained was a group of experienced
professionals deciding, one at a time, whether they were willing to put their
name on an answer a machine produced.

That is the last mile. And notice how it's measured: not "the model scored 0.91
on our eval set" but "98% of them use it." A deployment that nobody opens is
indistinguishable from a deployment that doesn't work.

## Adoption is an interface number

Here's the reframe I'd argue for.

We treat adoption as a change-management problem — training sessions,
champions, executive mandates. Some of that is real. But most of what determines
whether a professional trusts a system is not a memo. It's the accumulated
experience of using it: what it showed them, what it hid, and whether it was
honest about the difference.

A wealth advisor doesn't trust a model because someone told them its F1 score.
They trust it because over three weeks it never confidently handed them
something wrong without warning them first — and when it *was* unsure, it said
so in a way they could act on.

That's not a model property. That's a rendering property. It's a decision
somebody made about what appears on screen when the confidence is 0.51 instead
of 0.98.

## Three places trust dies — all of them on screen

I'd argue there are three recurring failure modes in AI-powered interfaces, and
none of them is a model defect.

**1. Uncertainty is flattened.** The model returns something it half-guessed,
formatted identically to something it's certain about. Same font, same
confidence, same tone. The operator has no way to distinguish. They find out the
hard way — once — and after that they double-check everything, which means the
system has stopped saving them time, which means they stop using it.

The fix is a design decision: give low-confidence output a different affordance.
Not a scary red banner. Something that says *check this one* in a way a busy
person will actually parse at a glance.

**2. Cost is invisible until the invoice.** The people who approve the renewal
are not the people using the tool. If the only time the budget owner sees a
number is on the monthly bill, every conversation about the system is a
conversation about a surprise. I've written about
[why nobody measures prompt caching](https://ferhatatagun.com/blog/prompt-caching-nobody-measures)
and about
[pre-flighting a prompt before you send it](https://ferhatatagun.com/blog/see-the-prompt-before-you-ship-it),
and both of those posts were, in retrospect, about this: cost is a first-class
piece of interface state, and treating it as an ops metric hides it from the
person who decides whether the project survives.

**3. The system won't show its work.** When output is wrong and the operator
can't see *why*, they don't file a bug — they lose confidence in the whole
thing, including the parts that were right. A system that can't be inspected
can only be trusted or abandoned, and people abandon.

This is why I ended up building
[trace replay for agent runs](https://ferhatatagun.com/blog/debug-claude-agents-by-replaying-traces).
Not because traces are interesting, but because "why did it do that" is the
question that decides whether a deployment survives its first bad week.

Every one of these three is fixed in the interface layer. None of them is fixed
by a better model.

## The strongest version of the counter-argument

Let me argue the other side properly, because the weak version is easy to knock
down and I don't want to do that.

The serious objection goes: *the last mile isn't a UI problem, it's a data
problem.* The customer's schema is undocumented. Half the workflow lives in a
spreadsheet somebody's assistant maintains. The API you were promised doesn't
exist. Nothing renders correctly because nothing is correct upstream. The head
of OpenAI's FDE team has said more or less this — that what a customer describes
during scoping routinely fails to match the reality of the systems on the
ground.

That is true, and it's the hardest part of the job. I'm not disputing it.

But look at the timeline again. That work is the six weeks. It's necessary and
it is absolutely not sufficient, and the evidence is that the project didn't
succeed at week eight — it succeeded four months later, after a completely
different kind of work.

Both halves are real. My claim is narrower than "UI is what matters." It's:
the second half is the larger half, it's the half where projects actually die,
and it's the half almost nobody is being hired against.

## The hiring gap

Go read a batch of forward-deployed engineer job specs. You'll see: production
LLM experience, advanced prompt engineering, agent frameworks — LangGraph,
LangChain, CrewAI, DSPy — evaluation frameworks, deployment at scale,
multi-step tool-use chains, sometimes air-gapped and bare-metal provisioning.

All of it legitimate. All of it necessary.

Now count the lines about what the operator sees. About how uncertainty is
surfaced. About whether the person doing the work can tell the difference
between a confident answer and a guess.

The role was defined by people solving the integration problem, and it was
staffed by people who are excellent at the integration problem. Meanwhile the
number everyone reports as the win condition — adoption — is decided somewhere
else entirely.

I don't think this is a conspiracy or an oversight by unserious people. I think
it's what happens when a role gets invented under time pressure by the
discipline that noticed the problem first. Palantir invented this model in the
2000s for intelligence customers who literally could not describe what they
needed. The problem then really was mostly data and access. The problem now has
a large human-facing component, and the job description hasn't caught up.

## What I'd actually do this week

If you're shipping an AI feature into somebody else's workflow, three concrete
moves, in order of how cheap they are:

**1. Give uncertainty a visual identity.** Pick one signal your model already
emits — a confidence score, a refusal, a low-agreement result from two sampled
runs — and render it differently. One afternoon of work. It converts your
system from "trust it or don't" into "trust it here, check it there," and that
distinction is the entire difference between a tool people keep and a tool
people quietly stop opening.

**2. Put cost on screen for whoever signs the renewal.** Not in a dashboard they
have to remember to open. In the thing they already look at. A number that
updates is a number that never becomes a surprise, and surprises are what kill
renewals.

**3. Make one thing inspectable.** Pick the single most consequential decision
your system makes and give the operator a way to see how it got there. Not full
observability — one path, one explanation. The first time something goes wrong,
that path is the difference between a bug report and a lost account.

None of these require touching the model. All of them move the number the FDE
model says is the win condition.

## Where this goes next

If the argument holds — that the last mile is substantially an interface
problem — then there's a follow-on question worth taking seriously: what does an
engineer working that mile actually carry?

Because the constraints are brutal and specific. You're in someone else's
environment. You can't install anything without a six-week security review. The
data can't leave their boundary. Every dependency you bring is a question their
security team gets to ask. And you still need to answer "why did it do that"
while a stakeholder watches over your shoulder.

I've spent a year building tools under exactly those constraints, and until
recently I thought I was doing it for aesthetic reasons.

That's the next post.

---

*This is part one of a series on the last mile of enterprise AI. Part two —
"I accidentally built a forward-deployed engineer's field kit" — is about the
tools, and the constraint that turns out to define them.*
