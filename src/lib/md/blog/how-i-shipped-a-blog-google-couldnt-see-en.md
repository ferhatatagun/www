# How I shipped a blog Google couldn't see

Every blog post on my site looked fine. Open `/blog/something`, the
article was there — title, paragraphs, code blocks, the works.

Then I ran `curl https://ferhatatagun.com/blog/four-tools-in-two-weekends`
on a hunch, and the HTML had **zero** of the body text. Title in `<head>`,
layout chrome, a perfectly empty `<div class="markdown-container" />`, and
nothing else. The article only rendered after JavaScript loaded — meaning
the version Google indexed had no article in it.

This had been the case for *every blog post on the site, for months*.

**TL;DR**

- The site used `adapter-static` with `prerender = true`, which suggests "all routes are rendered to HTML at build time." That's true for the page chrome — but not the body.
- The Markdown component parsed `content` inside `onMount`, so the HTML on disk had a skeleton and nothing else. The article materialized only after hydration.
- Two ways this hides from you: every browser you test in runs the JS, so the page looks fine; and the page reports a healthy 200 response, so monitoring stays green.
- The fix is mechanical (parse markdown at module scope, inject via `{@html}`), but it cascaded: prerender OOMed on the worker heap, the prerender crawler followed embedded `.md` links and 404'd, and the static adapter's fallback was clobbering the prerendered home. Each problem appeared only because the previous one was fixed.

This is a write-up of the regression: what I missed, how it stayed hidden,
the actual code-level fix, and the three secondary failures that the fix
unblocked.

## What the page was actually serving

The Svelte component looked harmless:

```svelte
<script lang="ts">
    import { marked } from 'marked';
    import { gfmHeadingId } from 'marked-gfm-heading-id';
    import { mangle } from 'marked-mangle';
    import createSanitizer from 'dompurify';
    import Prism from 'prismjs';
    import { onMount } from 'svelte';

    let container: HTMLDivElement;
    export let content: string;

    onMount(() => {
        marked.use(gfmHeadingId());
        marked.use(mangle());
        const sanitizer = createSanitizer(window);
        const parsed = marked.parse(content);
        container.innerHTML = sanitizer.sanitize(parsed);
        Prism.highlightAllUnder(container);
    });
</script>

<div bind:this={container} class="markdown-container" />
```

The whole thing — parsing markdown, sanitising, highlighting — lives
inside `onMount`. That callback fires only in the browser, after
hydration. During SvelteKit's prerender pass, `onMount` never runs.
So the HTML on disk contains exactly what's in the template: an empty
`<div class="markdown-container" />`.

The article body was being added *imperatively to the DOM at runtime*.
That's invisible to Google. It's invisible to OG/Twitter card scrapers.
It's invisible to anyone who fetches the URL with `curl`.

Two checks that would have caught this and didn't:

1. **My browser tabs were always rendering the right thing**, because they
   ran the JS. Testing the live page by *looking at it* is testing the
   hydrated version, not the indexed version.
2. **The page returned 200.** Uptime monitors stayed green. Status pages
   stayed green. Lighthouse scored fine, because Lighthouse runs JS too.

The only way to see the regression is to bypass JS. `curl` does. So does
Googlebot's render preview. So does the View-source feature your browser
hides three menus deep. I'd been opening DevTools to inspect post-hydration
DOM for months, and never View Source on the raw response.

The numbers, once I looked:

```
$ curl -s https://ferhatatagun.com/blog/four-tools-in-two-weekends \
    | wc -c
32280
$ curl -s https://ferhatatagun.com/blog/four-tools-in-two-weekends \
    | grep -c "claudoscope"
0
$ curl -s https://ferhatatagun.com/blog/four-tools-in-two-weekends \
    | grep -c "TL;DR"
0
```

The page is 32 KB and contains no part of the article body. "claudoscope"
appears half a dozen times in the post; in the HTML, zero. Same for
"TL;DR". The HTML was 100% layout chrome.

## Why `prerender = true` wasn't enough

The static adapter's prerender pass walks every route, calls the page's
`load`, and renders the resulting component tree to HTML. It runs all the
top-level Svelte component code. What it does *not* do is run lifecycle
hooks like `onMount`, because those are explicitly contracted to be
browser-only.

So `prerender = true` was doing exactly what it advertises. The bug was
that the data dependency lived behind a lifecycle that prerender skips.

The fix is to make markdown parsing module-level, not lifecycle-level:

```svelte
<script lang="ts">
    import { marked } from 'marked';
    import { gfmHeadingId } from 'marked-gfm-heading-id';
    import { mangle } from 'marked-mangle';
    import { onMount } from 'svelte';
    import 'prismjs/themes/prism-tomorrow.css';

    marked.use(gfmHeadingId());
    marked.use(mangle());

    export let content: string;
    $: parsed = marked.parse(content) as string;

    let container: HTMLDivElement;

    onMount(async () => {
        const Prism = (await import('prismjs')).default;
        await import('prismjs/components/prism-typescript');
        if (container) Prism.highlightAllUnder(container);
    });
</script>

<div bind:this={container} class="markdown-container">{@html parsed}</div>
```

Three things changed:

1. `marked.use(...)` moved to module scope. It now runs both during
   prerender and during hydration, configuring the same extensions in
   both environments.
2. `parsed = marked.parse(content)` is a reactive top-level statement.
   It runs synchronously inside the component's render pass, so its
   output is in the HTML that goes to disk.
3. Prism syntax highlighting stays inside `onMount`, dynamic-imported.
   Prism touches `self` at import time, which is fine in the browser
   but not on the prerender worker. Highlighting is cosmetic — losing
   it on prerender is invisible until JS loads, which is acceptable.

I also dropped DOMPurify. The original code piped marked's output
through it before injecting. That was paying a sanitiser's bundle cost
plus a render-time cost, but the input was our own `?raw`-imported
markdown files, not user content. Defending against ourselves was
defensive theatre. If a hostile actor can write to my markdown source,
sanitising the output is the wrong layer to do it at.

The result of the fix:

```
$ wc -c www/build/blog/four-tools-in-two-weekends.html
45292
$ grep -c "claudoscope" www/build/blog/four-tools-in-two-weekends.html
3
$ grep -c "TL;DR" www/build/blog/four-tools-in-two-weekends.html
1
$ grep -c "<h1 id=" www/build/blog/four-tools-in-two-weekends.html
1
```

45 KB instead of 32 KB. The 13 KB difference is the article body —
the part Google had been seeing as empty.

## The home page was even worse

The home page had a different version of the same problem. SvelteKit's
`adapter-static` accepts a `fallback` option for SPA-style hosting; if
a path doesn't have a prerendered HTML file, the server can serve the
fallback and let the client-side router resolve it.

The config was:

```js
fallback: 'index.html'
```

Which writes the fallback shell *to `index.html`*. The home route at `/`
*also* prerenders to `index.html`. So you have two operations writing to
the same path. The fallback wins, because the adapter writes it after
the prerender. The 40 KB prerendered home gets overwritten with the
13 KB SPA shell.

```
$ wc -c www/build/index.html
13096
```

That's the bare HTML that the bundler emits as the SPA's entry point —
just the imports for the JS bundles, no body content. Anyone hitting `/`
with a non-JS user agent was getting *that*.

The fix is one character of intent:

```js
fallback: '200.html'
```

`200.html` is a convention some static hosts (Surge, Netlify with
configuration) use to mean "the SPA fallback." The static adapter
doesn't care about the name; it just writes the fallback to whatever
path you give it. Renaming to `200.html` keeps the fallback for unknown
paths without colliding with the prerendered home.

```
$ wc -c www/build/index.html
40871
```

3.1× growth, all of it actual rendered home content.

## The three problems the fix uncovered

Each of these only became visible *because the previous one was fixed*.

### 1. Prerender worker OOM

Once the markdown was actually being parsed during prerender, the
GitHub Actions build started failing with:

```
Error [ERR_WORKER_OUT_OF_MEMORY]: Worker terminated due to reaching
memory limit: JS heap out of memory
```

The default Node heap on `ubuntu-latest` is about 1.4 GB. The
prerender pass was now doing real work — `marked.parse` on every blog
post markdown source, each producing 10–15 KB of HTML. Across 14 blog
posts plus the markdown rendering inside other routes, that pushed the
worker over the line.

Two fixes:

```yaml
env:
  NODE_OPTIONS: --max-old-space-size=4096
```

That alone unblocked it. Belt-and-suspenders, I also guarded the
`marked.use(...)` calls so they only configure once per Node process,
in case Vite's SSR ever re-imports the module across routes:

```ts
const __markedKey = '__omni_marked_configured__';
const __markedScope = globalThis as unknown as Record<string, boolean>;
if (!__markedScope[__markedKey]) {
    marked.use(gfmHeadingId());
    marked.use(mangle());
    __markedScope[__markedKey] = true;
}
```

### 2. The prerender crawler followed every link in the rendered HTML

Several blog posts embed relative links to translations or `contributing.md`
files that live in the source repos they reference — `[/i18n/README.tr.md]`,
`[/contributing.md]`, that kind of thing. When markdown rendering was
client-side, those got hydrated into `<a>` tags but the prerender crawler
never saw them.

Now the crawler sees them, follows them, and treats the 404s as build
errors:

```
Error: 404 /contributing.md (linked from /skills/nextjs)
```

These are not site routes I own — they're content links inside post bodies.
The fix is to demote prerender 404s from errors to warnings:

```js
prerender: {
    handleHttpError: 'warn',
    handleMissingId: 'warn'
}
```

### 3. The shared host wasn't pulling from gh-pages

The repo's CI deploys to `gh-pages`. The `ferhatatagun.com` domain
points at a Spaceship shared host that I FTP-upload to. The two were
unrelated, which meant every CI deploy updated `gh-pages` and the live
site stayed exactly as it had been.

This wasn't a CI bug; it was a deployment-pipeline shape I'd let drift.
The fix isn't code — it's "manually FTP the `gh-pages` contents to the
shared host's `public_html`," or rebuild the deploy pipeline to push
directly. For one-shot remediation, I went with the FTP path.

## How to catch the next one before it ships

The reason this regression survived for months is that none of my
verification ran with JS disabled. To prevent the next one:

1. **Always view source on a critical route after a deploy.** Not
   DevTools — that shows the hydrated DOM. The browser's "View Source"
   shows what arrived on the wire. The two should differ in trivial
   ways (hydration markers, attribute order); they should not differ
   in *content*.
2. **`curl | grep` your most important sentinel.** For a blog: a phrase
   you know is in the body. For a product page: the price. For a
   marketing page: the value prop. Make it a 10-second post-deploy
   check.
3. **Test once with JavaScript disabled.** It's a one-time check per
   major template change. The first time a critical body of text is
   missing from the JS-disabled page, you have the answer.
4. **For static sites, diff the page sizes you ship over time.** A
   40 KB → 13 KB drop on a single route would have lit up. I had no
   alert because I'd never measured a baseline.

For SvelteKit specifically, the pattern is one rule: anything that
materializes data into the rendered DOM should be reactive or
top-level, not in `onMount`. `onMount` is for browser-only side
effects — DOM measurement, third-party widget init, anything that
needs `window`. As soon as you put content production in there, the
prerender stops seeing it. The same shape exists in React (`useEffect`),
Vue (`onMounted`), and every framework that distinguishes hydration
from render.

## What this cost

Two evenings to find it. Forty-five minutes to fix it. Three
follow-up commits to deal with the secondary failures the fix exposed.

The harder cost is the months of indexing where every post's body was
empty. Google's view of those pages now has the title and the OG image
and an empty `<div>`. The dev.to mirrors of seven of the posts, which I
published with `canonical_url` pointing back to my site, were *more*
indexable than the originals.

Search engines will recrawl. The mirrors will eventually catch up. But
this is the kind of bug that doesn't reverse itself instantly — the
right move after the fix is to submit a fresh sitemap, request reindex
on the most important URLs, and wait.

The win-condition I'm watching for is the same `curl | grep` that
revealed the bug, run against the production URL:

```
$ curl -s https://ferhatatagun.com/blog/four-tools-in-two-weekends \
    | grep -c "TL;DR"
1
```

Zero is the bug. One is the fix.
