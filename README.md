# Rich Tillman Studio

Turborepo for the live portfolio at **richtillman.xyz**. Three packages: the TanStack Start site (`@richtillman/web`), design-system primitives (`@richtillman/ui`), and a compiled Storybook MCP (`@richtillman/storybook-mcp`).

`portfolio-v2` stays on Cloudflare until this Vercel project is linked, the domain is pointed, and the Worker is retired.

## Stack

- **Monorepo:** Turborepo + Bun workspaces
- **App:** TanStack Start (React 19, file-based routing, SSR) on Vercel via Nitro
- **UI:** `@richtillman/ui` — JIT source exports, shadcn new-york API (CVA + Slot), OLED/gold tokens
- **MCP:** `@richtillman/storybook-mcp` — compiled `bin` → `dist` stdio server (not JIT)
- **Data:** Supabase with local seed fallback
- **Visual QA:** Storybook 10 + Chromatic (primitives and screens in `packages/ui`)
- **Tooling:** oxlint, oxfmt, lefthook

## Packages

```
richtillman-studio/
  apps/web/                    # @richtillman/web — thin route wrappers, loaders, Vercel
  packages/ui/                 # @richtillman/ui — primitives, screens, Storybook
  packages/storybook-mcp/      # @richtillman/storybook-mcp — compiled Storybook MCP
```

Import UI by package name only:

```ts
import { Button, GlassPanel } from "@richtillman/ui"
```

`ButtonLink` stays in the app (`createLink` around `ButtonAnchor`). `ProjectCard` stays in the app (router + seed types). `packages/ui` must not depend on the MCP. The MCP does not import UI internals; it reads `packages/ui` from env/config and generated stories import `@richtillman/ui`.

## Getting started

```bash
bun install
cp apps/web/.env.example apps/web/.env.local
# Optional: add Supabase URL + anon key. The site falls back to seed data.

bun run dev
# turbo run dev → apps/web on http://localhost:3000
```

## Scripts

Root `package.json` delegates to Turbo except Chromatic, which cds into `packages/ui`. Run from the repo root:

| Task       | Command                                                                         |
| ---------- | ------------------------------------------------------------------------------- |
| Dev        | `bun run dev` (`turbo run dev`)                                                 |
| Typecheck  | `bun run typecheck`                                                             |
| Lint       | `bun run lint`                                                                  |
| Test       | `bun run test`                                                                  |
| Build      | `bun run build` (web + compiled MCP; UI is JIT and has no `build`)              |
| Storybook  | `bun run storybook`                                                             |
| Chromatic  | `bun run chromatic` (`bun run --cwd packages/ui chromatic`)                     |
| Deploy     | `bun run deploy` (`turbo run deploy` → `vercel deploy` in apps/web)             |
| MCP stdio  | `bun run start` (`turbo run start` → MCP `dist/cli.js`, depends on MCP `build`) |
| Boundaries | `bun run boundaries` (`turbo boundaries`)                                       |

## Storybook + Chromatic

UI Storybook lives with the primitives **and screens** at `packages/ui/.storybook` (isolated Vite — no TanStack Start / Nitro / Vercel app config). Other root scripts `turbo run`; Chromatic is the exception and cds into `packages/ui`. Chromatic CLI lives in `@richtillman/ui`, never at the repo root.

Chromatic’s CLI appends a temp `--output-dir` (and stats-json flags) to the build script. That is normal — do not pin `outputDir`. Those flags must hit `packages/ui` (`storybook build`), not root `turbo run build-storybook`. Config uses `buildScriptName: chromatic-build`, which exists only on `@richtillman/ui`. Set `CHROMATIC_PROJECT_TOKEN` in the environment; never pass `--project-token` on the command line or commit it.

```bash
bun run storybook          # http://localhost:6006  (packages/ui)
bun run chromatic          # bun run --cwd packages/ui chromatic
```

Do **not** `npx chromatic` / `bunx chromatic` from the repo root: that reads root `package.json`. From the repo root use `bun run chromatic`. From `packages/ui` use `bun run chromatic` (same UI script).

CI reads `CHROMATIC_PROJECT_TOKEN` from the GitHub secret. Never commit the real token.

One workflow (`.github/workflows/chromatic.yml`) covers both: PRs are a required check (`exitZeroOnChanges: false`); pushes to `main` auto-accept the baseline. Checkouts use `fetch-depth: 0` for TurboSnap. CI installs at the repo root, then `chromaui/action` uses `workingDir: packages/ui` so Chromatic runs the UI `chromatic-build` script (`storybook build`) with its usual temp output dir.

## Storybook MCP

`@richtillman/storybook-mcp` is the Storybook MCP to use — a compiled stdio server. Do not install `@storybook/addon-mcp` and do not point Cursor at `http://localhost:6006/mcp`.

Build, then point Cursor at the bin. Do not auto-install an MCP server (Runlayer). Env belongs in `packages/storybook-mcp/.env.example`, not a root `.env`. Local Cursor config is `.cursor/mcp.json` (gitignored).

```bash
bunx turbo run build --filter=@richtillman/storybook-mcp
```

Cursor config (manual):

```json
{
  "mcpServers": {
    "storybook": {
      "command": "node",
      "args": ["packages/storybook-mcp/dist/cli.js"],
      "env": {
        "STORYBOOK_MCP_ROOT": "${workspaceFolder}",
        "STORYBOOK_MCP_LIBRARY": "packages/ui"
      }
    }
  }
}
```

See `packages/storybook-mcp/README.md` for the keep/strip list from ForgeKit.

## Vercel + richtillman.xyz

This repo is the Vercel cutover. Do not use Wrangler or the `rich-tillman-portfolio` Worker here.

1. Push the repo and import it in the Vercel dashboard (or `vercel link` from the repo root).
2. Framework preset: **TanStack Start**. Install: `bun install`. Root directory: repo root (Nitro writes `.vercel/output`).
3. Ignored Build Step (optional): `npx turbo-ignore @richtillman/web`
4. Env vars on the **project** (not a root `.env`): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. Pull locally with `vercel env pull apps/web/.env.local`.
5. Domains: add `richtillman.xyz` and `www.richtillman.xyz` in Project → Settings → Domains. Point DNS at Vercel when you are ready to leave Cloudflare.

CLI from this repo:

```bash
bun run deploy
```

`apps/web` `deploy` script is `vercel deploy` (preview). Promote or `vercel deploy --prod` after the project is linked.

## Vercel Agent

Vercel Agent is platform-level. Enable code review at `https://vercel.com/{team}/{project}/settings` → **AI**. There is no npm package to install and no `@vercel` mention bot in this app.

## AI Gateway

This site has no chatbot. If you add AI later:

- Enable AI Gateway on the Vercel project
- Use the AI SDK with `model: 'provider/model'` (check current slugs at https://vercel.com/docs/ai-gateway)
- Auth via OIDC (`vercel env pull apps/web/.env.local`) or `AI_GATEWAY_API_KEY` in **apps/web** env — never a root `.env`, never hardcoded keys

## Supabase

```bash
# from apps/web, after linking the same project as v2:
supabase db push
supabase db seed
```

## Design system

`/design-system` imports the same `@richtillman/ui` modules as Storybook. Tokens are gold `#ffd700`, cyan, magenta, true black — not zinc.

## Remaining gaps

- `vercel login` / `vercel link` (not done in this scaffold)
- DNS for richtillman.xyz after the Vercel project exists
- Figma Code Connect later
