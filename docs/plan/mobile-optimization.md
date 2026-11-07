# Mobile performance and portfolio trust plan

## Goal

Cut the mobile Lighthouse performance score of `richtillman.xyz` from 70 to at least 90 by
removing the third-party script and the render-blocking chain that dominate the current
load, and make every published number on the site checkable by a third party.

## Baseline

Measured 2026-11-07 against the deployed Worker `richtillman-studio` with Lighthouse 12.8.2,
mobile preset (simulated throttling), Chromium from the Playwright install. Byte attribution
comes from sourcemap mapping of an uncached production bundle whose asset hashes match the
deployed site byte for byte.

| Metric                    | Baseline                                                      |
| ------------------------- | ------------------------------------------------------------- |
| Lighthouse performance    | 70 (accessibility 100, best-practices 82, seo 100)            |
| FCP                       | 4,092 ms                                                      |
| LCP                       | 4,531 ms                                                      |
| TBT                       | 230 ms                                                        |
| CLS                       | 0                                                             |
| Speed Index               | 4,092 ms                                                      |
| Total byte weight         | 487 KiB                                                       |
| Client JS, all routes     | 484,885 B raw / 154,999 B gzip                                |
| Client JS, home route     | 473,338 B raw / 148,203 B gzip                                |
| Render-blocking savings   | 1,130 ms (fonts.googleapis.com 788 ms, app CSS 524 ms)        |
| Unused JavaScript savings | 166 KiB (tubes1.min.js 118 KiB, entry chunk 51.6 KiB)         |
| Bootup time               | 7.5 s                                                         |
| Main-thread work          | 9.1 s (script evaluation 7,489 ms)                            |
| Third-party bytes on home | 208,540 B from cdn.jsdelivr.net, 243.6 ms blocking            |
| Web fonts                 | 79,833 B from fonts.gstatic.com, reached through an `@import` |
| Document cache            | no `Cache-Control`, no `CF-Cache-Status`                      |
| Hashed asset cache        | `public, max-age=0, must-revalidate`                          |

## Targets

All of these are pass/fail and are checked by a Lighthouse run against production, not by
inspection.

| #   | Target                              | Pass condition                                                            |
| --- | ----------------------------------- | ------------------------------------------------------------------------- |
| 1   | Lighthouse mobile performance       | 90 or higher, measured with Lighthouse 12.8.2 mobile preset               |
| 2   | Total blocking time                 | under 100 ms                                                              |
| 3   | First contentful paint              | under 2,500 ms                                                            |
| 4   | Largest contentful paint            | under 2,500 ms                                                            |
| 5   | Total byte weight                   | under 200 KiB                                                             |
| 6   | Third-party bytes on the home route | 0                                                                         |
| 7   | Render-blocking savings             | under 200 ms                                                              |
| 8   | Unused JavaScript savings           | under 40 KiB                                                              |
| 9   | Route preload hygiene               | the home route preloads no screen module it does not render               |
| 10  | Asset caching                       | hashed assets return `Cache-Control: public, max-age=31536000, immutable` |
| 11  | npm snapshot freshness              | the counts on the site match `api.npmjs.org` within 24 hours              |
| 12  | Number provenance                   | every measured figure on the site carries its measurement date            |

## Step 1 — Move the three.js tubes cursor off the critical path

**Intent**: The ambient canvas background loads `tubes1.min.js` from cdn.jsdelivr.net at
runtime, injecting a third-party script that costs 203.7 KiB of transfer, 7,722 ms of
main-thread scripting and 243.6 ms of blocking time on every page view. Implement a deferred
load that starts after first paint, skips the network entirely on a constrained device or
under `prefers-reduced-motion`, and keeps the existing timeout and fallback so the page still
renders when the library never arrives. Assert the canvas script is not
requested during the first paint.

**Acceptance criteria**:

- No request to `cdn.jsdelivr.net` appears in the network log of the first 3 seconds of a home
  page load.
- Lighthouse mobile bootup time is under 1.5 s and total blocking time is under 100 ms.
- With the network request blocked, the home route renders without a console error and the
  canvas degrades to its fallback background.

**Out of scope**: The canvas visual, its colours, and the effect itself stay as they are.

## Step 2 — Unblock the font and stylesheet chain

**Intent**: The Inter and JetBrains Mono stylesheet is reached through an `@import` inside the
render-blocking application CSS, so the browser serialises application CSS, then the Google
Fonts CSS, then two woff2 files, before the first paint. Implement the stylesheet as a
preloaded `<link>` in the document head and self-host the woff2 files so the font request no
longer depends on a third-party origin. Assert the font stylesheet is not
inside the CSS bundle.

**Acceptance criteria**:

- The built CSS file contains no `@import` of a remote stylesheet.
- Lighthouse mobile render-blocking savings are under 200 ms.
- Inter and JetBrains Mono still render with `font-display: swap`, and no layout shift is
  introduced (CLS stays at 0).

**Out of scope**: The typefaces, weights, and the type scale stay as they are.

## Step 3 — Import screens directly instead of through the UI barrel

**Intent**: The UI package barrel re-exports every screen, and all sixteen screens import
`PortfolioLayout`, so Rollup hoists the whole export surface into one shared chunk of 99,496 B
that every route modulepreloads. Refactor the web app to import screen modules by their direct
path, leaving the barrel for Storybook only, so each route pulls only the screens it renders.
Assert the home route's preload list contains no module from a screen the
route does not render.

**Acceptance criteria**:

- The home route's modulepreload list contains no `design-system-screen`, `resume-screen`,
  `case-study-detail-screen`, or `contact-form` module.
- Lighthouse mobile unused JavaScript savings are under 40 KiB.
- Every route still renders, and Storybook still works with the barrel intact.

**Out of scope**: `PortfolioLayout` itself, and a separate package for the design system, stay
out of scope.

## Step 4 — Ship only the content the route needs

**Intent**: `seed-data.ts` is 26,901 B and is modulepreloaded on every route, while the home
route uses only the six-entry `METRICS` list. Refactor the content module into per-route
modules so the client receives only the collection its route renders, while the server keeps
the full seed as the fallback when Supabase is not configured. Assert the
seed chunk on the home route carries only the metrics collection.

**Acceptance criteria**:

- The home route ships no more than 5 KiB gzip of content module.
- Every route still falls back to the seed data when `VITE_SUPABASE_URL` is unset.
- No loader performs a network call during server rendering in the production bundle.

**Out of scope**: Supabase, new content collections, and copy edits stay out of scope.

## Step 5 — Share the npm download snapshot across Worker isolates

**Intent**: The npm download counts are cached in module state, which is per Worker isolate, so
every cold isolate in every colo issues its own six requests to the npm downloads API. Design
and implement a shared cache using the Cloudflare Cache API, so the snapshot is fetched at
most once per hour per colo rather than once per isolate, while keeping the measured seed as
the fallback when the API is unreachable. Assert two reads inside the cache
window make one set of upstream requests.

**Acceptance criteria**:

- Two reads inside the cache window produce one set of upstream requests.
- When the npm API fails, the site still renders the measured seed with its measurement date.
- The page never renders an unresolved token or a partially summed total.

**Out of scope**: A KV binding, a new Worker, the package set, and the twelve-month measurement
window stay as they are.

## Step 6 — Set cache headers and add a bundle budget

**Intent**: The document carries no `Cache-Control` and hashed assets carry
`public, max-age=0, must-revalidate`, so every repeat view re-renders in the Worker and pays
seven conditional round trips for content that is already content-hashed. Implement immutable
caching for hashed assets and a short, explicit policy for the document, and add a CI gate
that rejects a client bundle over 160 KiB gzip. The budget also guards the TanStack
devtools packages, which cost zero bytes today only because the devtools Vite plugin strips
them; removing that plugin would add 244,686 B.

**Acceptance criteria**:

- Hashed assets return `Cache-Control: public, max-age=31536000, immutable`, and a repeat
  view transfers 0 bytes for them without a revalidation round trip.
- The document is either not cached or cached for under 300 seconds.
- CI rejects a client JavaScript bundle over 160 KiB gzip, and the current bundle passes.

**Out of scope**: The hosting provider, the Worker runtime, and the deployment pipeline stay as
they are.

## Step 7 — Re-measure the published numbers and refresh the copy

**Intent**: The Lighthouse scores and the npm download counts on the site decay, and the site
quotes them with a measurement date. After the changes above land, verify every published
figure against its source, modify the site copy with the new numbers and the new measurement date,
and confirm the whole site still returns 200 on every route with no console errors and no stale
strings.

**Acceptance criteria**:

- The Lighthouse run against production is recorded with its date, and the scores quoted on the
  site match that run.
- The npm counts rendered on the site match `api.npmjs.org` for the same window.
- Every route returns 200 with zero console errors, and no stale figure remains anywhere in
  the rendered HTML.

**Out of scope**: Deploying to production, video or screenshot recording, and the design system
stay out of scope.
