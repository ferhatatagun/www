# The second customer tells you what you actually built

There's a sentence that gets repeated about forward-deployed work, usually attributed to Palantir's model, and it sounds like a slogan until you've been on the wrong side of it: **one customer, many capabilities** — as opposed to the SaaS shape, which is many customers, one capability.

The SaaS shape is well understood. Find one thing a lot of people need, build it once, sell it repeatedly, and every additional customer costs you almost nothing. The whole discipline of product management is built around identifying that one thing.

Forward-deployed work runs the other way. You embed with one organisation and build whatever that organisation actually needs, which turns out to be eleven things, most of which nobody outside the building would recognise as a product. And then somebody asks the question that decides whether you're a software company or a consultancy in a company's clothing: **which of those eleven is a capability, and which is bespoke work you'll never sell twice?**

Getting that wrong in either direction is fatal, and the two failures look nothing alike.

**TL;DR**

- FDE work inverts the SaaS shape: depth with one customer instead of breadth across many. That produces capabilities faster than product discovery does, and no way to tell which ones generalise.
- Generalise too early and you ship a configurable abstraction fitted to a sample size of one. It has settings for the axis that varied and hardcodes the one that didn't.
- Generalise never and every deployment is bespoke. Margins go, the second engagement is as expensive as the first, and you're a consultancy that files its revenue under "platform".
- Two customers asking for the same feature is not the signal. Two customers arriving at the same feature **for the same underlying reason** is. Same request, different causes, is a coincidence that will diverge the moment you build it.
- The most reliable evidence isn't the request. It's the workaround: what both teams already built by hand before anyone asked you.

## The two failures

**Generalising too early** is the one engineers do, because abstraction feels like craftsmanship. You've solved a problem for one customer, you can see the shape of it, and the shape looks reusable. So you pull the specifics out into configuration and ship a general version.

The thing you can't see from inside a single deployment is which axis actually varies. You had one data source, so you made the data source pluggable. You had one approval flow, so you left the approval flow hardcoded. Customer two arrives with the same data source and a completely different approval flow, and now you have an abstraction that is flexible in the direction nothing moves and rigid in the direction everything does. Both customers get a worse system than a bespoke build, and the abstraction is now load-bearing so removing it is a project.

**Never generalising** is quieter and takes longer to hurt. Every engagement is a fresh build. Each one goes fine. The engineers get very good and the delivery gets very reliable, and the cost of the tenth deployment is roughly the cost of the first. That's a viable business — it's just consultancy, and it's usually being valued and staffed as though it were a product, which is where it comes apart. The gap shows up as margin, then as hiring, then as an inability to explain to anyone what the company sells.

Both failures come from the same missing thing, which is a test for when a capability is real.

## The request is not the signal

The intuitive test is repetition. Two customers ask for the same feature, so build it properly.

I don't think that holds, and the reason is the more interesting half of this.

Two organisations can ask for the same thing for entirely unrelated reasons. Both want an export to CSV: one because their analysts live in Excel, the other because their compliance team needs an immutable artifact for an audit trail. Same request, same three words in the ticket. Build the general version and you'll discover the first one wants live data and column reordering, and the second needs a frozen file with a checksum and a retention policy. The feature that satisfies both is two features with a shared name.

What actually predicts generalisation isn't the request converging. It's the *constraint* converging.

This is the same argument I made [two posts ago about my own tools](https://ferhatatagun.com/blog/accidental-fde-field-kit), from the other end. I built five things browser-only and BYOK out of what felt like personal preference, and later noticed those are precisely the constraints of working inside someone else's regulated environment — nothing to install, no data crossing the boundary, nothing for a security team to threat-model. I hadn't copied that from anywhere. Two problems with the same *shape* produce the same engineering decisions independently, without the people involved ever talking.

That independence is the whole signal. When two customers land on the same design because their situations share a structural constraint — a boundary the data can't cross, a regulator who needs the reasoning preserved, a workflow that has to survive its owner going on leave — the thing you build for both is genuinely one thing. When they land on the same request through different constraints, you're looking at a naming collision.

So the question to ask about a repeated request isn't *how many customers want this*. It's **what makes them want it, and is it the same thing.**

## Look at the workaround, not the ask

The most useful evidence I've found isn't in what customers ask for at all. It's in what they've already built by hand.

Every organisation running a real workflow has accumulated a layer of manual compensation: a spreadsheet someone maintains, a Slack channel that functions as a queue, a person who checks a thing every morning at nine. Those exist because something in the system doesn't do a job that needs doing, and somebody cared enough to fill the gap with their own time.

Two customers who've independently built the same workaround are telling you something much stronger than two customers asking for the same feature. A request can be aspirational, or repeated back to you from a conference talk, or a stakeholder's preference. A workaround is *paid for*. Somebody spends an hour a day on it. Nobody sustains that for a nice-to-have.

And workarounds are legible about the underlying constraint in a way requests aren't. The morning check exists because the process is asynchronous and nobody trusts it to fail loudly. The spreadsheet exists because the system's model of the work is one field short of reality. That's the constraint, stated in a form you can compare across customers — and comparing constraints is the thing the feature-request list can't do for you.

## The FDE is the sensor, and the reporting line is the problem

If this is right, the person embedded in the deployment is the highest-bandwidth product-discovery instrument the company has. They're not reading a survey. They're watching the workaround get used, at nine in the morning, by the person who built it.

Which raises a structural question that I think is underrated: **who reads what that person learns?**

In most arrangements, the forward-deployed engineer reports through delivery. Delivery is measured on shipping this deployment, on time. The observation that customer three has independently rebuilt the same spreadsheet as customer one is not a delivery artifact. There's usually no field for it, no forum where it lands, and no incentive for a busy engineer to write it up.

So it stays in one person's head, which — as [the previous post argued about customer handover](https://ferhatatagun.com/blog/done-when-they-can-change-it) — is the same as it not existing. The failure mode is identical, just pointed inward: context accumulates in an individual, doesn't get bled out to the organisation, and leaves when they do. A company can lose its product roadmap this way without ever noticing it had one.

The fix isn't complicated, it's just nobody's job: a standing, low-ceremony way for embedded engineers to report *constraints* rather than *requests*. Not "customer wants export" but "third customer this year whose data can't leave the boundary, all three built a manual extract". Three of those in a row is a product decision that made itself.

## What the series has actually been about

Five posts, and the pattern underneath them is more consistent than I expected when I started.

Pilots fail at the interface, not the model. The tools that survive are the ones with an articulated constraint. The deliverable is the eval, because the eval is what lets someone else change the thing. The handover works when a team can make a change and know it was safe. And the capability generalises when two customers reach it through the same constraint rather than the same words.

Every one of those is the same claim in a different setting: **the hard part is the transfer, not the build.** From a model to a person, from a prototype to a workflow, from you to the team that stays, from one customer to the next. The model was never the bottleneck, and it's less of one every quarter.

Which is, I think, why the role exists at all, and why it's being hired for eight times as often as it was — not because the technology got harder, but because the transfer never got easier, and it turns out that was always the expensive part.

---

*Part five, and the last, of a series on the last mile of enterprise AI.
Part one: [Nobody's model failed. The interface did.](https://ferhatatagun.com/blog/nobodys-model-failed) ·
Part two: [I accidentally built a forward-deployed engineer's field kit](https://ferhatatagun.com/blog/accidental-fde-field-kit) ·
Part three: [The deliverable isn't the prompt. It's the eval.](https://ferhatatagun.com/blog/the-eval-is-the-deliverable) ·
Part four: [You're not done when it works. You're done when they can change it.](https://ferhatatagun.com/blog/done-when-they-can-change-it)*
