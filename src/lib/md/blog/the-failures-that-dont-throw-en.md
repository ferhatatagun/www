# The failures that don't throw

You ask a model for `{"risk": "high" | "medium" | "low", "score": 0-100}`. You run it, you get exactly that, you wire it up and ship.

Six weeks later somebody notices that a handful of claims were auto-approved that obviously shouldn't have been. Nothing errored. There's no exception in the logs, no failed request, no alert. The rows just have the wrong value in them, and they've had it for six weeks.

What happened is that one call in forty came back with `"HIGH"` instead of `"high"`, and your code did this:

```ts
switch (result.risk) {
  case "high":   return escalate(claim);
  case "medium": return queue(claim);
  case "low":    return autoApprove(claim);
  default:       return autoApprove(claim);
}
```

The default branch is almost always the permissive one, because that's what keeps the queue moving. So the model said *maximum risk* and your system read it as *approve automatically*. The failure didn't degrade the decision. It inverted it.

That's the class of bug [**guard-lab**](https://guard-lab.vercel.app) exists to find: define a schema, run a prompt against it N times, and look at the distribution of ways it breaks.

**TL;DR**

- Schema failures are distributional. One clean run tells you nothing, and five tell you almost nothing.
- A single "94% compliant" number is worse than no number, because the interesting question isn't how many failed — it's what your code does about each one.
- Three buckets: **crash** (throws, already in your error rate), **recoverable** (right payload, wrapped), and **silent** (parses, is accepted, is wrong). Only the third is invisible, and it's the only one that needs a tool.
- Zero failures in fifty runs is not a zero failure rate. At n = 50 the data is still consistent with about 7%. Ruling out 1% takes 381 clean runs.
- Constrained decoding removes most of this and is the right first move. It does not tell you your rate, and it constrains shape rather than sense.

## Counting failures is the wrong instrument

The obvious way to build this is a compliance percentage. Run it fifty times, count how many matched, print 94%.

I built that first and it was useless within an hour, for a reason that took me longer to articulate than it should have: **the failures are not equally dangerous, and a single number averages over the only distinction that matters.**

Consider two runs that both report 94%.

In the first, the 6% is markdown fences — the model wrapped the object in ` ```json `. Your parser either strips fences or it doesn't. If it does, that 6% costs you nothing at all. If it doesn't, it costs you 6% of requests, loudly, on day one, and you fix it before lunch.

In the second, the 6% is enum drift and numbers arriving as strings. Nothing throws. Every one of those responses is accepted by your code, written to your database, and rendered on someone's screen. You will find out when a customer does.

Same number. Completely different situation. One is a morning; the other is the six weeks at the top of this post.

## The three buckets

So guard-lab sorts failures by what your code does about them rather than by what went wrong:

**Crash** — the output doesn't parse. `JSON.parse` throws, the request fails, and it appears in an error rate you're already watching. Genuinely fine. Loud failures get fixed.

**Recoverable** — the payload is correct but wrapped. A markdown fence, a sentence of preamble, a helpful trailing note. Free if you strip it, fatal if you assume the body is only JSON. Either way you find out immediately.

**Silent** — the output parses, your code accepts it, and the value is wrong.

The third bucket is the whole point, and it's bigger than it looks. It isn't only enum drift:

- **A missing field** reads as `undefined`. Templates render blank, comparisons quietly go false, nothing throws.
- **`"score": "85"`** as a string gives you `NaN` on arithmetic, or `"8510"` on `+ 10`. No error either way.
- **An invented enum** — `"very high"` — passes every check you wrote for the values you expected and hits the default branch as if it were routine.
- **`"score": 150`** on a 0–100 field is a valid number in an invalid position. It renders, it charts, it misleads.
- **`null` where a value was required** passes an existence check and fails a type check somewhere far away, at a distance from the cause.

Every one of these is accepted by JavaScript without complaint. None of them will ever appear in your error rate. That's not a gap in your monitoring — it's a category your monitoring cannot see, because from the outside nothing went wrong.

## Zero failures is not a zero failure rate

Here's the part I didn't expect to end up caring most about.

You run the tool, fifty times, and everything passes. Green across the board. That reads as proof, and it isn't one.

Fifty clean runs is a sample. The true failure rate is whatever it is, and your sample is consistent with a range of values — at n = 50 with zero observed failures, the 95% Wilson upper bound is **7.1%**. At a thousand calls a day, that's up to seventy-one bad records daily that your test run had no power to detect.

So guard-lab never shows a bare zero. A clean sweep gets an interval and a sentence saying what it does and doesn't rule out, because the reassuring version of that screen is the single most misleading thing the tool could do. The whole reason someone runs it is to stop trusting a sample of one; handing them a sample of fifty dressed up as certainty would just move the same mistake somewhere more expensive.

The deflating corollary: ruling out a 1% failure rate takes **381 clean runs**. Which is a real number that real teams will not run, and knowing that is still better than believing five runs settled it.

## The strongest version of the counter-argument

Let me argue the other side properly, because there's a good objection here and the weak version isn't worth knocking down.

*This is a solved problem. Use structured outputs.* Tool use with a JSON schema, or a constrained-decoding mode, forces the model's output to conform at the token level. Fences, prose, unparseable output, missing fields, wrong types — most of the taxonomy above simply cannot happen.

That's correct, and it should be your first move. If you can use constrained decoding, use it; a validator downstream of an unconstrained prompt is a worse design than not needing one.

Two things survive it.

**It constrains shape, not sense.** A schema that says `"risk"` is one of three strings will get you one of three strings. It will not tell you whether the model picked the right one, and it won't catch a range violation you didn't encode — most people write `"type": "number"` and not the 0–100 bound, so `150` passes. Constrained decoding turns a syntax problem into a semantics problem. That's a large improvement and not a solution.

**Plenty of production code isn't in a position to use it.** A prompt template inside a vendor product. An internal gateway that normalises requests and drops the tool-use block. An older endpoint someone integrated in 2024 and nobody has budget to revisit. A model behind a proxy that only forwards `messages`. These are not exotic; they're most of what an engineer walking into someone else's environment actually finds.

And underneath both: **constrained decoding doesn't give you a rate.** It reduces the failure probability, plausibly by a lot, to some number you still don't know. If the answer to "how often does this break" is "less than before", you haven't measured anything — you've just moved the number somewhere you can't see it.

## Two bugs I shipped into it

The useful part of building this was that I committed, twice, exactly the kind of error the tool is for.

**The first was a silent failure inside the silent-failure detector.** To be generous about what counts as recoverable, the parser salvages JSON out of surrounding prose by taking the widest span between the first `{` and the last `}` — which is roughly what defensive production code does. Then a test case handed it `[{...}, {...}]`: a model returning an array of results instead of one object.

The salvage worked. It pulled the first object out, reported a clean recovery, and silently discarded every element after it.

That is precisely the failure mode in the post you're reading — parses, is accepted, is wrong — committed inside the thing built to catch it. The fix is to parse the response as-is first, exactly as real code would, and only fall back to salvage when that fails. Valid JSON of the wrong shape now reaches the caller intact and gets judged as a crash, because that's what it is.

**The second was a statistical self-contradiction.** For "how many clean runs would it take to rule out a 1% failure rate" I used the rule of three: zero events in n trials bounds the rate near 3/n, so 300 runs. Textbook, correct, widely used.

Except everywhere else the tool reports a Wilson interval, and Wilson is slightly more conservative at zero. Run 300 clean and it would have told you **1.26%** — after promising 300 would get you to 1%. Two individually defensible methods, disagreeing, in a tool whose entire pitch is that you should trust its numbers.

It now inverts the same interval it displays. The answer is 381 rather than 300: less satisfying, and consistent with what the tool will say to you afterwards.

Neither bug was caught by using the app. Both were caught by tests written against reference values — seventeen classifier cases, and Wilson checked against published intervals. Which is its own small argument for [the thing I wrote about evals two posts ago](https://ferhatatagun.com/blog/the-eval-is-the-deliverable): looking at the screen and seeing plausible numbers is not verification.

## What it doesn't tell you

Anything about whether the answers are *good*.

A response can satisfy every field in the schema — correct enum, in-range score, all fields present — and be completely wrong about the claim. guard-lab measures whether the contract holds. Whether the judgement inside the contract is any good is the other kind of eval, the one that needs ground truth, and this doesn't touch it.

Contract compliance is the floor. It's just that most teams have never measured the floor, and it turns out not to be where they assumed it was.

---

**[guard-lab](https://guard-lab.vercel.app)** is free, open source, and browser-only — BYOK, and the key never leaves your tab because there's no backend to send it to. Source on [GitHub](https://github.com/ferhatatagun/guard-lab).

It's the sixth in a set of tools built under one constraint: they have to work in a room where you can't install anything and the data can't leave. [The rest are here.](https://ferhatatagun.com/tools)
