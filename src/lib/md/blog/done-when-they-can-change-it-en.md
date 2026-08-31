# You're not done when it works. You're done when they can change it.

The deployment I think about most didn't fail. It passed UAT, it went live, the customer was pleased, and there was a genuinely nice email at the end of it.

Six months later it was still running and nobody had touched it. Not once. The prompt was byte-identical to the one I'd left. A model version had been deprecated underneath it and the team had pinned the old one rather than test the new. Someone had asked for a small change to the output format and been told it wasn't worth the risk.

Nothing broke. That's the part that took me a while to understand. **The system didn't die when it stopped working. It died when it stopped being changed** — and it had been dead for about five of those six months while continuing to return responses.

That's the failure mode nobody writes a post-mortem for, because there's no incident. There's just a thing in the corner that everyone routes around, until a reorg or a contract renewal quietly removes it.

**TL;DR**

- A deployment's real end date is the last time someone modified it with confidence, not the last time it responded to a request.
- Documentation describes a *state*. Ownership requires being able to make a *change* and know it was safe. Those are different deliverables and only one of them survives contact with the first edit.
- Three questions decide whether the work outlives you: can they change it, can they tell if the change worked, and do they know why it's like that. Most handovers answer only the first.
- The *why* decays fastest and is written down least. Code records what, git records when, and the reason a strange clause exists lives in one person's memory until it looks like noise and gets deleted.
- As a forward-deployed engineer you are the bus factor by design. The job is to make yourself unnecessary on a schedule, and feeling indispensable is the signal that it's going wrong.

## The documentation trap

The instinct at the end of an engagement is to write everything down. Architecture diagram, sequence of calls, deployment runbook, a wiki page per component. It feels like diligence, and it produces an artifact you can point at in the final meeting.

It also goes stale the first time someone makes a change — and if nobody makes a change, it didn't matter that you wrote it.

The uncomfortable version: a thorough document can make things *worse*, because it substitutes for the thing that would actually have helped. The team reads it, understands the shape of the system, and still doesn't touch it, because understanding the architecture was never what was stopping them. What was stopping them is that they had no way to make a change and find out whether they'd broken something.

Documentation answers "what is this". Ownership needs an answer to "what happens if I change this". No amount of the first produces the second.

## The three questions

Whether a deployment survives handover comes down to three things, and they get progressively less likely to be addressed.

**1. Can they change it?**

The mechanical one. Do they have the credentials, the repo access, the deploy path, the ability to roll back. This is the question every handover checklist covers, and it's genuinely necessary.

It's also the easiest one, and clearing it feels like progress in a way that's slightly misleading — because a team with full production access and no confidence changes nothing, which is observationally identical to a team with no access at all.

**2. Can they tell if the change worked?**

This is [the previous post's whole argument](https://ferhatatagun.com/blog/the-eval-is-the-deliverable), and it's the hinge.

The frozen snapshot — a set of real inputs and the decisions the current system makes on them — isn't primarily a quality tool. Its real function is *permission*. It's the thing that converts "I think this prompt edit is fine" into "twelve of the fourteen cases are unchanged and here are the two that moved". The first sentence gets a change reverted in review. The second gets it merged.

A team without that will not edit the prompt. They'll be right not to. Editing a prompt with no way to check the blast radius is not caution, it's gambling with someone else's workflow, and sensible people decline.

**3. Do they know why it's like that?**

The one that almost never gets handled, and the one that quietly determines everything.

Every system that has met reality has clauses in it that look wrong. A sentence in the prompt insisting on a format that seems redundant. A retry with an oddly specific backoff. A field that gets stripped before it's shown. Each of those exists because something happened — a specific failure, on a specific day, with a specific customer record that broke a specific assumption.

Six months later, whoever inherits it sees an ugly clause with no explanation and does the reasonable thing: cleans it up. And the original failure comes back, except now nobody in the room remembers the first one, so it presents as a new bug.

Code records *what*. Git records *when* and, if you're lucky, a commit message records a compressed version of *why*. Nothing records the reasoning at the place where someone will encounter the decision.

## Attach the why to the thing, not beside it

The practice that has actually worked for me is unglamorous: **put the reason where the decision is, not in a document about the decision.**

For prompts, that means a comment block in the prompt file itself, naming the failure that produced each non-obvious instruction. Not "be concise" — *"be concise: the 2,400-word answers in week two were being pasted into a field with a 500-character limit downstream, which truncated mid-sentence and looked like a model failure."*

For behaviour, it means a test named after the incident rather than the function. A case called `keeps_the_account_number_when_the_name_is_missing` is a sentence about the business. A case called `test_parse_edge_case_3` is a sentence about nothing, and it's the one that gets deleted when it goes red.

This is the same move as the frozen eval set, applied to reasoning instead of behaviour. Both work because they're attached to something that runs. A wiki page can go stale silently; a named test goes red loudly, and the name tells the person staring at it what they're about to break.

The test is: someone who wasn't there reads the clause and can decide, on their own, whether the reason still applies. That's the whole bar. Not "they understand the system" — *they can safely disagree with me.*

## You are the bus factor, on purpose

There's an awkward thing about this role that's worth saying plainly.

A forward-deployed engineer is, structurally, a single point of failure introduced deliberately. You're embedded because the customer's team can't yet do the thing. Every week you're there, you accumulate context that exists nowhere else — which workflow diverges from its documentation, which stakeholder's objection is real and which is positioning, why the second data source can't be trusted on Mondays.

That context is what makes you effective. It's also, if you don't actively bleed it out, the reason the deployment dies when you leave.

And the incentives run the wrong way. Being the person who understands the system feels like doing well. Getting the call because nobody else can debug it feels like value. It reads as indispensable, and indispensable feels like success right up until it's the postmortem.

The metric that actually matters is uncomfortable to optimise for: **how quickly you become unnecessary.** Not how much you shipped. How fast the people who stay stopped needing you in the room.

Which is a strange thing to be measured on, and I don't think most engagements measure it at all — they measure delivery, and delivery is the part that happens while you're still there.

## What I'd actually leave

Concretely, stripped of the parts that sound good and don't survive:

- **The frozen set**, in the repo, with a one-command way to run it. Not a notebook, not a process someone has to remember. `npm run eval` or the equivalent, output that a non-author can read.
- **A decisions file**, but scoped hard: only decisions where the obvious choice was rejected, each one naming the thing that made it obvious-but-wrong. Ten entries that matter, not sixty that document the defaults.
- **The reasons inline** — in the prompt, in the test names, next to the retry constant. Anywhere someone will be standing when they consider changing it.
- **One change they make and I don't.** Sitting there while someone else edits the prompt, runs the eval, reads the diff, and ships it. Watching a team do it once is the only handover step I've never seen substituted successfully. Everything else can be faked with a good document; this one can't.

That last one is the whole thing, really. Everything before it is preparation for the moment where someone other than you changes the system and nothing bad happens. If that moment doesn't occur before you leave, you have no evidence it can.

And "no evidence it can" is, in practice, the same as "it won't" — which brings the six-month clock back around, and the system that's already dead while it's still answering.

---

The uncomfortable implication of all of this is that the work isn't really about the model, or the prompt, or even the interface — it's about whether one team can hand a capability to another. Which is a much older problem than anything in this field, and the subject of the last post in this series.

---

*Part four of a series on the last mile of enterprise AI.
Part one: [Nobody's model failed. The interface did.](https://ferhatatagun.com/blog/nobodys-model-failed) ·
Part two: [I accidentally built a forward-deployed engineer's field kit](https://ferhatatagun.com/blog/accidental-fde-field-kit) ·
Part three: [The deliverable isn't the prompt. It's the eval.](https://ferhatatagun.com/blog/the-eval-is-the-deliverable) ·
Part five: [The second customer tells you what you actually built](https://ferhatatagun.com/blog/the-second-customer)*
