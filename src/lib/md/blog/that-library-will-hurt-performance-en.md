# "That library will hurt performance" is not a number

Somebody in the room says the marketing team's chat widget is making the site slow. Somebody else says it drives a third of the qualified leads. Both are probably right, neither has a number, and the decision gets made by whoever sounds more confident. Two sprints later the widget is still there and the page is still slow.

I've been on both sides of that conversation and I've never once seen it settled with evidence. Not because the evidence is hard to get — because the tool that would produce it doesn't exist. Every performance tool we have reports in the present tense. Lighthouse tells you what the page costs. WebPageTest tells you what the page costs, in more detail. CrUX and RUM tell you what the page costs, for real users. All of them answer "what is this page doing right now", and none of them answers the question the meeting is actually about, which is **"what would it cost without that"**.

So I built [**perf-lab**](https://perf-lab-topaz.vercel.app). Drop in a Lighthouse JSON report, switch resources off, and watch the score move. It turns *"that library will hurt performance"* into *"that library costs 0.4 s of LCP and 7 points"* — which is a sentence you can put in a ticket.

**TL;DR**

- Every performance tool is a measurement tool. The decisions teams argue about are counterfactual, and nothing measures counterfactuals.
- A projection is only worth arguing with if it lands on the scale the stakeholders already screenshot, so perf-lab reimplements Lighthouse's actual scoring — the log-normal curves, the published control points, the category weights. On a real report it recomputes 57 against Lighthouse's reported 57.
- Ranking by bytes is actively misleading. A 410 KB image that finishes loading after LCP is worth **zero points**; a 124 KB render-blocking script is worth **eleven**.
- Savings overlap. Four independent "+7 point" fixes do not add up to 28, and a tool that implies they do is setting up a disappointing retro.
- Everything is a delta against measured values, never an invented absolute — and where a number is modelled rather than measured, the UI says so.

## Why the score has to be Lighthouse's score

The first version of this idea I sketched had its own 0–100 index. It was useless within a day.

The whole point is to end an argument, and the argument is being had by people who look at Lighthouse. If my tool says "this saves you 12 points" on a scale I invented, the reply is "twelve of *what*", and now we're arguing about my scale instead of about the chat widget. The projection has to arrive in the same units as the screenshot in the ticket.

So `scoring.ts` is a reimplementation of the real thing. Lighthouse doesn't score metrics linearly — it maps each one through a log-normal curve calibrated to two control points, the 10th percentile of real sites and the median:

```ts
export const METRIC_WEIGHTS = {
  fcp: 0.1, si: 0.1, lcp: 0.25, tbt: 0.3, cls: 0.25
} as const;

export const CONTROL_POINTS = {
  fcp: { p10: 1800, median: 3000 },
  si:  { p10: 3387, median: 5800 },
  lcp: { p10: 2500, median: 4000 },
  tbt: { p10: 200,  median: 600  },
  cls: { p10: 0.1,  median: 0.25 }
};
```

Two things fall out of those numbers that are worth internalising even if you never open the tool.

**TBT is 30% of your score and CLS is 25%.** Together, two metrics that have nothing to do with how fast the page *looks* are 55% of the number. LCP — the one everybody talks about — is 25%.

**The curve is brutal near the top and forgiving in the middle.** Going from 4.0 s to 3.5 s of LCP buys you very little. Going from 2.8 s to 2.4 s buys you a lot. Which means "we improved LCP by half a second" is not a fact you can price without knowing where you started.

I did eventually verify the reimplementation rather than trusting it, which I should have done far earlier than I did. I ran real Lighthouse against my own site and fed the JSON straight into the parser:

```
reported: 57   recomputed: 57
```

That agreement is the entire credibility of the tool. There's a `scripts/probe.ts` in the repo whose first line of output is exactly that comparison, so if the implementation ever drifts from Lighthouse's, it fails loudly instead of quietly producing plausible numbers on the wrong scale.

## The inversion that makes byte-sorted reports lie

Here's the demo page perf-lab ships with — a fairly ordinary marketing page, 1.1 MB, scoring 57. Sorted by what removing each resource is actually worth:

| Resource | Size | Worth |
|---|---|---|
| `consent-banner.js` | 124 KB | **+11** |
| `intercom.js` | 168 KB | **+11** |
| `framework.bundle.js` | 178 KB | **+10** |
| `gtm.js` | 92 KB | **+7** |
| `below-fold-gallery.webp` | **410 KB** | **0** |

The biggest file on the page is worth nothing. It's a gallery image below the fold that finishes loading after LCP has already fired, so it was never on the critical path — removing it makes the page lighter and doesn't make it faster. Meanwhile the third-smallest file in that list is worth eleven points, because it blocks rendering.

This is not an exotic edge case. It's the normal shape of a web page, and it's why the "largest assets" table in every performance report sends teams to optimise the wrong thing. The question was never *what is heavy*. It's *what is heavy **and** on the critical path*.

## The bug that proves the point

I want to be straight about this one, because it's the most useful thing in the post.

I shipped the tool, opened it, and the demo showed `below-fold-gallery.webp` at **+12 points** — the exact inversion the tool exists to correct, in the tool, on the first screen. Removing any resource shrank the total transfer, and I was applying the transfer saving to FCP and LCP without first checking whether the resource had anything to do with them.

I fixed that, and then found a second version of the same mistake hiding one layer down, in the parser:

```ts
beforeLcp: endTime <= metrics.lcp || startTime <= metrics.lcp
```

Almost every request on a page *starts* before LCP fires. That second clause marked nearly everything as critical-path, which quietly dismantles the tool's central claim on every real report.

It survived because the sample data sets `beforeLcp` by hand, so the demo — the thing I kept looking at — never went through that code path. The only way to catch it was to run a real Lighthouse report through the parser, which I hadn't done until the tool was already live. **The demo data that makes a tool easy to show off is the same data that stops you testing the part that matters.**

## Savings don't add up, and pretending they do is worse than useless

First version ranked every resource against the untouched report. Which reads fine, until you notice it's promising each removal the full win independently — four "+7 point" fixes that sum to 28 on the slide and 11 in production, because they overlap. Once you've dropped two analytics tags, TBT has already come down, and the third tag has less left to give back.

So the ranking is now marginal: it re-simulates against whatever you've already switched off. In the demo, removing Intercom drops the hero image from **+11 to +6** — same file, same bytes, worth half as much once LCP has already moved.

That behaviour turned out to be the most persuasive thing in the tool. Watching the list re-sort as you strip things out teaches the overlap in about fifteen seconds, and it's the sort of thing teams normally learn in a retro.

## What's measured and what's modelled

A tool that projects the future can very easily become a tool that makes things up confidently. The rule I held to: **never invent an absolute number when a measured one exists.** Everything works on deltas applied to the metrics Lighthouse actually recorded, so the baseline is always ground truth and only the difference is modelled.

Taken straight from the report: transfer size and timing per request (`network-requests`), parse and execute time per script (`bootup-time`), render-blocking status *and its measured saving* (`render-blocking-resources`), third-party attribution (`third-party-summary`).

Modelled, and therefore approximate: transfer time recovered on a throttled connection, how much of a script's execution lands inside the TBT window, and whether removing something moves LCP. Even the TBT fraction is anchored to the report rather than to an industry average — it uses the ratio *this page* exhibited, measured TBT over total measured CPU.

Every projection carries a confidence label — `measured`, `modelled`, or `speculative` — that degrades as you move away from the conditions the report was captured under. Change the throttling preset and remove something Lighthouse never measured, and the tool tells you it's directional only, rather than handing you a number with false authority.

## It found a bug on the site it's published from

The real Lighthouse run I'd done to verify the scoring was against my own `/tools` page. Having gone to the trouble, I read the rest of it.

Mobile score 57. LCP 7.2 s, which the curves price at roughly 23 of the 43 points I was losing. And the LCP element — named right there in the report — was the first tool card's screenshot.

Every card image on that page was marked `loading="lazy"`.

The one image the score is measured on was the one I was deliberately deferring. Lazy-loading is good practice, I'd applied it uniformly, and applying it uniformly is exactly the mistake: the LCP element must never be lazy. First card is now `eager` with `fetchpriority="high"`, the rest stay lazy.

The tool also flagged 238 KiB sitting in PNGs that should have been WebP. Converting them saved 620 KB.

I'd been working on that page for weeks, with SEO and performance explicitly in mind, and I'd have kept not seeing it. That's the argument for the whole category, really. Measurement tells you the page is slow. You already suspected that. What changes a decision is knowing what it would cost to be otherwise — and until you can put a number on the counterfactual, the loudest person in the room is going to keep being right.

---

**[perf-lab](https://perf-lab-topaz.vercel.app)** is free, open source, and browser-only — the report is parsed in your tab and nothing is uploaded, which matters when the report came from a client's staging environment. Source on [GitHub](https://github.com/ferhatatagun/perf-lab).

Generate a report with:

```
npx lighthouse https://example.com --only-categories=performance \
  --output=json --output-path=./report.json
```

Or DevTools → Lighthouse → run → ⋮ → *Save as JSON*. No report handy? There's sample data one click in.
