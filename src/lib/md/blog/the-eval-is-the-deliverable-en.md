# The deliverable isn't the prompt. It's the eval.

Every field guide to forward-deployed work says a version of the same thing:
define your evaluation framework *before* you build anything.

And every engineer who has actually landed in a customer's environment has had
the same reaction, which is: with what?

On day three you don't have labelled data. You don't have domain expertise —
the people who do are the ones you're building for, and they're busy. You have
five examples someone showed you on a shared screen, a workflow that diverges
from its documentation in ways nobody has written down, and a rough sense that
the current process takes too long. Building a golden dataset off that is not a
task. It's a fantasy.

So the advice gets skipped. Not out of laziness — out of practicality. And then
about ninety days later the system starts drifting, quietly, and nobody notices
until the customer does.

I think the advice is right and the framing is wrong. You're not being told to
skip evals. You're being told to build the wrong kind first.

**TL;DR**

- Standard eval guidance — golden datasets, rubrics, labelled examples — is correct and close to unusable in week one, which is exactly when it's prescribed.
- "Eval" is doing double duty for two different questions. *Is this output good?* needs ground truth. *Did this change?* needs only a snapshot.
- The second one is buildable on day three, and it catches most of what actually kills deployments: silent drift after a prompt edit, a model version bump, a parameter change nobody logged.
- Don't diff prose — LLM output is nondeterministic and you'll drown in noise. Diff the **decision**: the structured claim underneath the words.
- The regression harness then writes your golden dataset for you. Every failure it catches is a labelled example you didn't have to imagine.
- This is why the eval is the deliverable. When you leave, the prompt is a text file anyone can edit — and someone will. The eval is what tells them whether the edit was safe.

## Two different questions wearing the same word

Here's the distinction that unlocked this for me.

| | Quality eval | Regression eval |
|---|---|---|
| Question | Is this output correct? | Did this change from what we accepted? |
| Needs | Ground truth, domain expertise, rubric | A frozen snapshot |
| Buildable on day 3 | No | Yes |
| Catches | Bad design | Silent drift |
| Cost to build | Weeks | An afternoon |

We call both of them "evals," which is how the cheap one gets postponed
alongside the expensive one.

The expensive one is genuinely expensive and genuinely later. The cheap one has
no prerequisites at all, and skipping it is what turns a working deployment into
a mysteriously-degraded one.

## What you can actually build on day three

Concretely, five steps, none of which require you to know what "good" means:

**1. Collect real inputs.** Not synthetic ones. Sit with whoever does the work
and take five to ten actual cases off their screen — including the two weird
ones they apologise for. The weird ones are the whole point; they're where the
system will break and where the documentation is silent.

**2. Run them and print the output.** No scoring, no rubric.

**3. Get a binary from the person who owns the workflow.** Not "rate this 1–5."
Just: *would you have been comfortable if the system did this on its own?* Yes
or no. People are fast and reliable at this and slow and unreliable at rubrics.

**4. Freeze the yeses.** That file is your eval. It is not a prototype of an
eval, it is the thing.

**5. Re-run it on every change.** Prompt edit, model bump, parameter tweak,
context restructure. Anything.

The frozen file is boring on purpose:

```json
[
  {
    "id": "claim-2024-0871",
    "input": "…the actual case, verbatim…",
    "decision": { "risk": "high", "route": "manual-review" },
    "acceptedBy": "ops lead",
    "acceptedOn": "2026-03-04"
  }
]
```

And the runner is about twenty lines:

```ts
for (const c of frozen) {
  const output   = await run(currentPrompt, c.input);
  const decision = extractDecision(output);      // structured claim only

  if (!deepEqual(decision, c.decision)) {
    report({ id: c.id, was: c.decision, now: decision });
  }
}
```

That's it. There's no framework here, and there shouldn't be. It's a habit with
a file attached.

## Diff decisions, not prose

The obvious objection: LLM output is nondeterministic. Diffing it produces
nothing but noise. Correct — if you diff the wrong thing.

Run the same prompt twice and the prose will differ. Word order, hedging, how
the explanation is structured. None of that is a regression. If you string-diff
the response body, every run fails and you'll turn the harness off inside a week.

So don't. Extract the **decision** and diff that.

Almost every useful LLM step in a production workflow reduces to a small
structured claim buried in the prose: a category, a number, a routing choice, a
yes/no. The prose around it is presentation. The claim is the behaviour.

```ts
// prose varies; this must not
type Decision = {
  risk: 'high' | 'medium' | 'low';
  route: 'auto' | 'manual-review';
};
```

If the model routes claim-0871 to `manual-review` on Monday and `auto` on
Friday, that is a regression regardless of how nicely it explained itself. If it
routes it to `manual-review` both times using completely different sentences,
nothing happened.

This also has a side benefit I didn't anticipate: forcing yourself to name the
decision type clarifies the design. If you can't write that type down, you don't
yet know what the model is for — and a step whose output can't be reduced to a
claim is usually a step that should have been two steps.

## What this catches that nothing else does

Every one of these is real, silent, and invisible without a frozen set:

- **The prompt edit that fixes case A and breaks case D.** The most common one. You improve something in response to a complaint, ship it, and quietly regress a case nobody complained about *yet*.
- **A model version bump.** Behaviour shifts at the margins. Your happy path is fine. Your two weird cases aren't.
- **Parameter drift.** Somebody changes temperature during debugging and doesn't change it back.
- **Length-induced behaviour change.** Input grows over months; the model starts truncating or de-prioritising instructions that used to hold. I've written about [seeing this before you ship](https://ferhatatagun.com/blog/see-the-prompt-before-you-ship-it) — the frozen set is how you find out it already happened.
- **A caching boundary move.** Someone interpolates a timestamp into what used to be a stable prefix. Cost triples. [Nobody's watching that number either.](https://ferhatatagun.com/blog/prompt-caching-nobody-measures)

None of these announce themselves. All of them show up as a diff in a
twenty-line script.

## Where this is weaker than it sounds

I'd rather say this than have you find out.

**You can freeze a bug.** If the day-three output was subtly wrong and got a
yes, you've now enshrined it and your harness will defend it. The mitigation is
unglamorous: revisit the frozen set once you know more, and treat early
acceptance as provisional rather than permanent.

**Small N misses things.** Ten cases will not cover a workflow with real
variety. It's a floor, not a ceiling — but a floor you have on day three beats a
ceiling you get in month three.

**It says nothing about quality.** A regression harness will happily confirm
that your mediocre system is still exactly as mediocre as it was. That's a real
limitation, and it's why this is the *first* eval rather than the only one.

## The upgrade path is free

Here's the part I like.

Every failure the regression harness catches is a labelled example. Case D broke
when you fixed case A? You now have a case with a known-correct answer and a
known failure mode, discovered from real behaviour rather than imagined during a
planning meeting.

After a month of this you're not starting a golden dataset from zero. You're
curating one that assembled itself out of actual failures — which is a
substantially better dataset than one written in advance by someone guessing at
what might go wrong.

The cheap eval isn't a compromise you eventually replace. It's the collection
mechanism for the expensive one.

## Why this is the deliverable

I've made a version of this argument before, for a solo developer choosing
between two prompts — that [you don't remember your prompt being better, you
just remember it being better](https://ferhatatagun.com/blog/stop-choosing-prompts-by-vibes).
That post was about self-deception on a personal scale, and the stakes were an
afternoon.

The stakes change when you hand something over.

When you leave, the prompt is a text file. Someone will edit it — reasonably,
for a good reason, in response to a real complaint. That's not a failure mode,
that's the system working. The failure mode is that they have no way to know
what their edit cost somewhere else.

A prompt without an eval is a config file nobody is allowed to touch, which
means either it never improves or it degrades unpredictably. Both are how a
deployment dies quietly. A prompt *with* a frozen set is something a team can
actually own after you're gone — and whether they can own it is the thing that
decides if the work survives.

Which is the real subject of the next post: not what you build, but what you
leave behind.

---

*Part three of a series on the last mile of enterprise AI.
Part one: [Nobody's model failed. The interface did.](https://ferhatatagun.com/blog/nobodys-model-failed) ·
Part two: [I accidentally built a forward-deployed engineer's field kit](https://ferhatatagun.com/blog/accidental-fde-field-kit)*
