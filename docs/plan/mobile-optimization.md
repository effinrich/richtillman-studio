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

## Results after steps 1 to 6

Measured 2026-11-09 against the deployed Worker `richtillman-studio`, version
`134670dc-4f17-4b8e-b972-c04fd4aded71`, with Lighthouse 12.8.2 and the mobile preset. Five runs,
because the score moves a few points between runs on a shared connection. The Web Analytics
beacon was turned off in the Cloudflare dashboard between the two measurements on the right, so
the last two columns are not the same build.

| Metric                   | Baseline (2026-11-07) | After steps 1 and 2 (2026-11-08) | After steps 3 to 6 (2026-11-08) | After the beacon was off (2026-11-09) | Target         | Result            |
| ------------------------ | --------------------- | -------------------------------- | ------------------------------- | ------------------------------------- | -------------- | ----------------- |
| Lighthouse performance   | 69                    | 88, 89, 90, 91, 91               | 91, 93, 93, 91, 93              | 94 in all 5 runs                      | 90 or higher   | met in all 5 runs |
| Accessibility            | 100                   | 100 in every run                 | 100 in every run                | 100 in every run                      | 100            | met               |
| Best practices           | 82                    | 82                               | 82                              | 82                                    |                | unchanged         |
| First contentful paint   | 4,178 ms              | 2,446 to 2,516 ms                | 1,681 to 1,732 ms               | 1,242 to 1,253 ms                     | under 2,500 ms | met               |
| Largest contentful paint | 4,855 ms              | 3,082 to 3,404 ms                | 3,070 to 3,432 ms               | 3,063 to 3,080 ms                     | under 2,500 ms | not met           |
| Total blocking time      | 184 ms                | 0 to 42 ms                       | 7 to 26 ms                      | 33 to 50 ms                           | under 100 ms   | met               |
| Cumulative layout shift  | 0                     | 0                                | 0                               | 0                                     | 0              | met               |
| Speed index              | 4,092 ms              | 2,446 to 2,516 ms                | 1,692 to 2,002 ms               | 1,431 to 1,587 ms                     |                |                   |
| Total byte weight        | 488 KiB               | 287 KiB                          | 268 KiB                         | 258 KiB                               | under 200 KiB  | not met           |
| Third-party bytes        | 300,295 B             | 10,478 B                         | 10,478 B                        | 0                                     | 0              | met               |
| Render-blocking savings  | 1,200 ms              | 150 ms                           | 0 ms                            | 0 ms                                  | under 200 ms   | met               |
| Unused JavaScript        | 166 KiB               | 50.2 KiB                         | 51.1 KiB                        | 39.6 KiB                              | under 40 KiB   | met by 0.4 KiB    |
| Bootup time              | 7,400 ms              | 312 ms                           | 263 to 360 ms                   | 353 to 403 ms                         | under 1.5 s    | met               |

The client JavaScript the home route loads fell from 138.2 KiB to 129.0 KiB gzip across steps 3
and 4, and the entry chunk from 372,978 B to 235,325 B raw. The final build carries 128.6 KiB.

### What the remaining gap is

The first paint is gated by the client JavaScript, and it still is. The deferred module scripts
finish after the document and the stylesheet are in, and Chrome holds the first paint until they
have run, so the first paint lands on the far side of the script download. Under the simulated 4G
that download is about 950 ms, and the measured first contentful paint of 1,242 to 1,253 ms sits
just after it. Cutting the bundle in steps 3 and 4 moved the first paint from 2,446 to 2,516 ms
down to 1,681 to 1,732 ms without moving the download time much, because what is left is React
itself: the entry chunk is 101,596 B transferred and the chunk holding the client runtime is
12,828 B.

The largest contentful paint is the same story seen from the other side. It is the `h1` of the
home page, and 85% of its time is render delay. In an unthrottled browser the `h1` is painted
with the first paint, so the delay is not the element waiting for a resource: it is the element
waiting for a main thread that the module scripts are holding.

The 258 KiB of total byte weight is 134 KiB of JavaScript, 79 KiB of the two self-hosted web
fonts, 17 KiB of the Bot Fight Mode script Cloudflare still injects, 10 KiB of CSS, and 7 KiB of
document. The fonts are the second largest item on the page and the only one of the five that
the repository controls.

The third-party bytes are zero now. The Web Analytics beacon was turned off in the dashboard on
2026-11-09, and the 17 KiB of Bot Fight Mode script is served from the site's own origin, so the
audit counts it as first-party rather than third-party. It is still 17 KiB on the critical path
and it still runs on the main thread.

The unused JavaScript is the entry chunk, 40 KiB of 99 KiB. It is code the page runs, not code
the page throws away: the audit counts what has not run by the time of the first paint. It is
under the 40 KiB target by 0.4 KiB, which is not much of a margin.

### What changed for the visitor

Phones no longer fetch the tubes cursor, so the ambient tube animation is gone on touch devices.
The cursor is a pointer affordance that follows a mouse, and it cost 203.7 KiB of transfer and
7.7 s of main-thread scripting on every phone that loaded the page. The gate is one line in
`shouldLoadTubesCursor`.

The fonts are now served from the site origin instead of two Google origins. Inter and JetBrains
Mono render exactly as before, at the same weights, with the same latin subset.

The screenshots are now served as AVIF and WebP with responsive widths, with the PNG kept as the
fallback. The project cards on the home route pick the 640 B AVIF variant on a phone.

The home route now downloads no seed content at all. It used to receive the whole corpus of
projects, articles, case studies and resume copy so that it could render six metrics.

The page no longer loads the Cloudflare Web Analytics beacon, so a third-party script is gone
from the critical path.

## Step 1: Move the three.js tubes cursor off the critical path

**Intent**: The ambient canvas background loads `tubes1.min.js` from cdn.jsdelivr.net at
runtime, injecting a third-party script that costs 203.7 KiB of transfer, 7,722 ms of
main-thread scripting and 243.6 ms of blocking time on every page view. Implement a deferred
load that starts after first paint, skips the network entirely on a constrained device or
under `prefers-reduced-motion`, and skips it on a touch device, where a pointer-following
cursor has no pointer to follow, and keeps the existing timeout and fallback so the page still
renders when the library never arrives. Assert the canvas script is not
requested during the first paint.

**Acceptance criteria**:

- No request to `cdn.jsdelivr.net` appears in the network log of the first 3 seconds of a home
  page load.
- Lighthouse mobile bootup time is under 1.5 s and total blocking time is under 100 ms.
- With the network request blocked, the home route renders without a console error and the
  canvas degrades to its fallback background.

**Out of scope**: The canvas visual, its colours, and the effect itself stay as they are on a
device that can run the cursor.

## Step 2: Unblock the font and stylesheet chain

**Intent**: The Inter and JetBrains Mono stylesheet is reached through an `@import` inside the
render-blocking application CSS, so the browser serialises application CSS, then the Google
Fonts CSS, then two woff2 files, before the first paint. Implement the font stylesheet as a
`<link>` in the document head with the woff2 files preloaded, and self-host the woff2 files so
the font request no longer depends on a third-party origin. Assert the font stylesheet is not
inside the CSS bundle.

**Acceptance criteria**:

- The built CSS file contains no `@import` of a remote stylesheet.
- Lighthouse mobile render-blocking savings are under 200 ms.
- Inter and JetBrains Mono still render with `font-display: swap`, and no layout shift is
  introduced (CLS stays at 0).

**Out of scope**: The typefaces, weights, and the type scale stay as they are.

## Step 3: Import screens directly instead of through the UI barrel

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

## Step 4: Ship only the content the route needs

**Intent**: `seed-data.ts` is 32,842 B and is modulepreloaded on every route, while the home
route uses only the six-entry `METRICS` list. Split the seed into one module per collection and
the content layer into one accessor per collection, and make the accessors a route loader calls
server functions, so the compiler keeps their implementation out of the client bundle. The
server keeps the full seed as the fallback when Supabase is not configured, and a collection a
page renders directly still ships in that page's own chunk. Assert the home route ships no seed
content at all.

**Acceptance criteria**:

- The home route ships no more than 5 KiB gzip of content module.
- Every route still falls back to the seed data when `VITE_SUPABASE_URL` is unset.
- No loader performs a network call during server rendering in the production bundle.

**Out of scope**: Supabase, new content collections, and copy edits stay out of scope.

## Step 5: Share the npm download snapshot across Worker isolates

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

## Step 6: Set cache headers and add a bundle budget

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

## Step 7: Re-measure the published numbers and refresh the copy

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

## Step 7 results

Measured 2026-11-09 against the deployed Worker `richtillman-studio`, version
`134670dc-4f17-4b8e-b972-c04fd4aded71`.

**The Lighthouse run**: five mobile runs against production, scores 94, 94, 94, 94 and 94 with
accessibility 100 in every run. The full table is above. The site does not quote its own
Lighthouse score, so there is no figure on the page to correct. The Lighthouse figures the site
does quote belong to other projects, TokenCast, MCP Atlas and the design system case study, and
they are dated in the resume copy.

**The npm counts**: `api.npmjs.org` was read directly for the same twelve-month window the site
uses, 2025-11-08 to 2026-11-07, on 2026-11-08 and again on 2026-11-09. Both readings agree.

| Package                   | Downloads |
| ------------------------- | --------- |
| forgekit-figma-mcp        | 330       |
| forgekit-storybook-mcp    | 7,675     |
| forgekit-radix-mcp        | 367       |
| @effinrich/figma-drift    | 292       |
| @effinrich/nx-storybook   | 256       |
| @effinrich/ui             | 488       |
| Total across the six      | 9,408     |
| The two featured MCP ones | 8,005     |

The deployed site rendered 8,005 for the featured figure and 9,408 for the total, so the live
counts match the registry exactly. The bundled fallback seed was refreshed to the same numbers
with the same measurement date, so the site agrees with itself when the API cannot be reached.

**The routes**: every route returns 200 with zero console errors and no failed request. The
unresolved token check passes on every route, so no page renders a raw `{{npm_downloads}}`.

## Acceptance criteria status

| Step | Criterion                                                                   | Result                                                                                                                                                                                                                                               |
| ---- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3    | The home route preloads no screen it does not render                        | met. The list is index, jsx-runtime, createServerFn, routes, portfolio-layout, arrow-right, arrow-up-right, button, glass-panel and button-link                                                                                                      |
| 3    | Lighthouse mobile unused JavaScript savings under 40 KiB                    | met, 39.6 KiB, by 0.4 KiB. The unused part is the hydration path, which the audit counts as unused because it has not run at the first paint                                                                                                         |
| 3    | Every route still renders, and Storybook still works with the barrel intact | met. Storybook 10.6.2 builds with the barrel unchanged                                                                                                                                                                                               |
| 4    | The home route ships no more than 5 KiB gzip of content module              | met. It ships none, and a CI check fails the build if it starts to                                                                                                                                                                                   |
| 4    | Every route falls back to the seed when `VITE_SUPABASE_URL` is unset        | met. Every route rendered its content from a local build with no Supabase configured                                                                                                                                                                 |
| 4    | No loader performs a network call during server rendering                   | not met. The npm downloads API is still called during rendering, which is what step 5 caches for an hour at the edge and what the measured seed covers when it fails. No other loader calls out, and the content itself resolves from the local seed |
| 5    | Two reads inside the cache window produce one set of upstream requests      | met, covered by the edge cache test                                                                                                                                                                                                                  |
| 5    | When the npm API fails, the site still renders the measured seed            | met, covered by the fallback test                                                                                                                                                                                                                    |
| 5    | The page never renders an unresolved token or a partially summed total      | met, covered by the token tests and checked on every route                                                                                                                                                                                           |
| 6    | Hashed assets return `public, max-age=31536000, immutable`                  | met, verified on the deployed assets                                                                                                                                                                                                                 |
| 6    | The document is either not cached or cached for under 300 seconds           | met, the document carries no `Cache-Control`                                                                                                                                                                                                         |
| 6    | CI rejects a client bundle over 160 KiB gzip, and the current one passes    | met, 128.6 KiB                                                                                                                                                                                                                                       |
| 7    | The Lighthouse run is recorded with its date                                | met, above                                                                                                                                                                                                                                           |
| 7    | The npm counts rendered match `api.npmjs.org` for the same window           | met, 8,005 and 9,408 against the registry                                                                                                                                                                                                            |
| 7    | Every route returns 200 with zero console errors and no stale figure        | met                                                                                                                                                                                                                                                  |
