# Rich Tillman Studio

Turborepo for the studio site: the TanStack Start app (`@richtillman/web`), design-system primitives (`@richtillman/ui`), and a compiled Storybook MCP (`@richtillman/storybook-mcp`). The app deploys as a Cloudflare Worker named `richtillman-studio`.

## Stack

- **Monorepo:** Turborepo + Bun workspaces
- **App:** TanStack Start (React 19, file-based routing, SSR) on Cloudflare Workers via Wrangler
- **UI:** `@richtillman/ui` — JIT source exports, shadcn new-york API (CVA + Slot), OLED/gold tokens
- **MCP:** `@richtillman/storybook-mcp` — compiled `bin` → `dist` stdio server (not JIT)
- **Data:** Supabase with local seed fallback
- **Visual QA:** Storybook 10 (`@storybook/react-vite` 10.6.0) + Chromatic (primitives and screens in `packages/ui`). Story interaction tests are `play` functions, not Vitest/Playwright.
- **Tooling:** oxlint, oxfmt, lefthook

## Design

[Figma design system](https://www.figma.com/design/2XfLIqqD1ztAmD5L9E480v/Rich-Tillman-Studio-%25E2%2580%2594-Design-System?node-id=0-1&p=f&t=hFuyF4DR3iAsKoxJ-0)

## Packages

```
richtillman-studio/
  apps/web/                    # @richtillman/web — thin route wrappers, loaders, Worker
  packages/ui/                 # @richtillman/ui — primitives, screens, Storybook
  packages/storybook-mcp/      # @richtillman/storybook-mcp — compiled Storybook MCP
```

Import UI by package name only:

```ts
import { Button, GlassPanel } from "@richtillman/ui"
```

`ButtonLink` stays in the app (`createLink` around `ButtonAnchor`). `ProjectCard` stays in the app (router + seed types). `packages/ui` must not depend on the MCP. The MCP does not import UI internals; it reads `packages/ui` from env/config and generated stories import the colocated module.

## Getting started

```bash
bun install
cp apps/web/.env.example apps/web/.env.local
# Optional: add Supabase URL + anon key. The site falls back to seed data.

bun run dev
# turbo run dev → apps/web on http://localhost:3000

bun run mcp:setup
# writes .cursor/mcp.json — enable “storybook” in Cursor Settings → MCP
```

## Scripts

Root `package.json` delegates to Turbo except Chromatic, which cds into `packages/ui`. Run from the repo root:

| Task       | Command                                                                         |
| ---------- | ------------------------------------------------------------------------------- |
| Dev        | `bun run dev` (`turbo run dev`)                                                 |
| Typecheck  | `bun run typecheck`                                                             |
| Lint       | `bun run lint`                                                                  |
| Test       | `bun run test` (MCP + web unit tests; UI uses Storybook `play` + Chromatic)     |
| Build      | `bun run build` (web + compiled MCP; UI is JIT and has no `build`)              |
| Storybook  | `bun run storybook`                                                             |
| Chromatic  | `bun run chromatic` (`bun run --cwd packages/ui chromatic`)                     |
| Deploy     | `bun run deploy` (`turbo run deploy` → `wrangler deploy` in apps/web)           |
| MCP setup  | `bun run mcp:setup` (writes `.cursor/mcp.json`; Cursor launches via Bun, no build) |
| MCP stdio  | `bun run start` (`turbo run start` → MCP `dist/cli.js`, depends on MCP `build`) |
| Boundaries | `bun run boundaries` (`turbo boundaries`)                                       |

## Storybook + Chromatic

UI Storybook lives with the primitives **and screens** at `packages/ui/.storybook` on `@storybook/react-vite` 10.6.0 (isolated Vite — no TanStack Start / Cloudflare Worker app config). Other root scripts `turbo run`; Chromatic is the exception and cds into `packages/ui`. Chromatic CLI lives in `@richtillman/ui`, never at the repo root.

Chromatic’s CLI appends a temp `--output-dir` (and stats-json flags) to the build script. That is normal — do not pin `outputDir`. Those flags must hit `packages/ui` (`storybook build`), not root `turbo run build-storybook`. Config uses `buildScriptName: chromatic-build`, which exists only on `@richtillman/ui`. Set `CHROMATIC_PROJECT_TOKEN` in the environment; never pass `--project-token` on the command line or commit it.

```bash
bun run storybook          # http://localhost:6006  (packages/ui)
bun run chromatic          # bun run --cwd packages/ui chromatic
```

Do **not** `npx chromatic` / `bunx chromatic` from the repo root: that reads root `package.json`. From the repo root use `bun run chromatic`. From `packages/ui` use `bun run chromatic` (same UI script).

CI reads `CHROMATIC_PROJECT_TOKEN` from the GitHub secret. Never commit the real token.

One workflow (`.github/workflows/chromatic.yml`) covers both: PRs are a required check (`exitZeroOnChanges: false`); pushes to `main` auto-accept the baseline. Checkouts use `fetch-depth: 0` for TurboSnap. CI installs at the repo root, then `chromaui/action` uses `workingDir: packages/ui` so Chromatic runs the UI `chromatic-build` script (`storybook build`) with its usual temp output dir.

## Storybook MCP

`@richtillman/storybook-mcp` (`packages/storybook-mcp`) is the Storybook MCP for this repo — a stdio server. Official `@storybook/addon-mcp` is not installed. Storybook on `:6006` has no `/mcp` endpoint.

Cursor launches it. Do **not** run the CLI in a terminal to attach it to chat:

```bash
bun install
bun run mcp:setup
```

Enable **storybook** in Cursor Settings → MCP. Local use is Bun on `packages/storybook-mcp/src/cli.ts` (no Turbo build). The command writes gitignored `.cursor/mcp.json` from `packages/storybook-mcp/mcp.json` and will not remove other MCP servers you already have.

Nine tools: `list_components`, `analyze_component`, `generate_story`, `update_story`, `validate_story`, `get_story_template`, `list_templates`, `get_component_coverage`, `suggest_stories`. `generate_story` and `update_story` write files.

`dist/` is the publish/CI artifact (`bunx turbo run build --filter=@richtillman/storybook-mcp`). The compiled CLI has no `--help`. Details: `packages/storybook-mcp/README.md`.

## Deploy (Cloudflare Workers)

Same target style as portfolio-1: `@cloudflare/vite-plugin` + `wrangler.jsonc` + `nodejs_compat`. This repo ships a **new** Worker named `richtillman-studio`. It does not overwrite the live `portfolio` Worker or attach `richtillman.xyz`.

From the repo root (requires `wrangler login` once):

```bash
bun install
bun run deploy
```

That runs `turbo run deploy` → `vite build` then `wrangler deploy` in `apps/web`. From the package:

```bash
cd apps/web
bun run build
bun run deploy
```

Preview the Worker locally with `bun run preview:worker` in `apps/web`. Secrets go in `apps/web/.dev.vars` (local) or `wrangler secret put` (prod) — never in `wrangler.jsonc`. Optional Vite env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` in `apps/web/.env.local`.

Workers.dev URL after the first deploy: `https://richtillman-studio.<account>.workers.dev`. Custom domains are dashboard-only (portfolio-1 binds `richtillman.xyz` there, not in git). Do not point that hostname at this Worker unless you intend to replace the live site.

## Supabase

```bash
# from apps/web, after linking the Supabase project:
supabase db push
supabase db seed
```

## Design system

`/design-system` imports the same `@richtillman/ui` modules as Storybook. Tokens are gold `#ffd700`, cyan, magenta, true black — not zinc.
