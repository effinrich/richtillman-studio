# Rich Tillman Studio

Turborepo for the live portfolio at **richtillman.xyz**. Three packages: the TanStack Start site (`@richtillman/web`), design-system primitives (`@richtillman/ui`), and a compiled Storybook MCP (`@richtillman/mcp-storybook`).

`portfolio-v2` stays on Cloudflare until this Vercel project is linked, the domain is pointed, and the Worker is retired.

## Stack

- **Monorepo:** Turborepo + Bun workspaces
- **App:** TanStack Start (React 19, file-based routing, SSR) on Vercel via Nitro
- **UI:** `@richtillman/ui` — JIT source exports, shadcn new-york API (CVA + Slot), OLED/gold tokens
- **MCP:** `@richtillman/mcp-storybook` — compiled `bin` → `dist` stdio server (not JIT)
- **Data:** Supabase with local seed fallback
- **Visual QA:** Storybook 10 + Chromatic (primitives and page stories)
- **Tooling:** oxlint, oxfmt, lefthook

## Packages

```
richtillman-studio/
  apps/web/                    # @richtillman/web — routes, features, Storybook, Vercel
  packages/ui/                 # @richtillman/ui — primitives, tokens CSS, primitive stories
  packages/mcp-storybook/      # @richtillman/mcp-storybook — compiled Storybook MCP
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

Root `package.json` only delegates to Turbo. Run from the repo root:

| Task | Command |
|------|---------|
| Dev | `bun run dev` (`turbo run dev`) |
| Typecheck | `bun run typecheck` |
| Lint | `bun run lint` |
| Test | `bun run test` |
| Build | `bun run build` (web + compiled MCP; UI is JIT and has no `build`) |
| Storybook | `bun run storybook` |
| Chromatic | `bun run chromatic` |
| Deploy | `bun run deploy` (`turbo run deploy` → `vercel deploy` in apps/web) |
| MCP stdio | `bun run start` (`turbo run start` → MCP `dist/cli.js`, depends on MCP `build`) |
| Boundaries | `bun run boundaries` (`turbo boundaries`) |

## Storybook + Chromatic

One Storybook, isolated Vite (no TanStack Start / Nitro in the Storybook config). Dual glob:

- `packages/ui/src/**/*.stories.tsx` — primitives
- `apps/web/src/**/*.stories.tsx` — page and layout stories

```bash
bun run storybook          # http://localhost:6006
bun run build-storybook
CHROMATIC_PROJECT_TOKEN=... bun run chromatic
```

Create a **new Chromatic project** for this repo (do not reuse the v2 token). Add the token as GitHub secret `CHROMATIC_PROJECT_TOKEN`. Never commit the real token.

Turbo does not cache `chromatic` or `build-storybook`. PR workflow is a required check (`exitZeroOnChanges: false`). `main` auto-accepts the baseline. Checkouts use `fetch-depth: 0` for TurboSnap.

## Storybook MCP

Compiled package. Build, then point Cursor at the bin. Do not auto-install an MCP server (Runlayer). Env belongs in `packages/mcp-storybook/.env.example`, not a root `.env`.

```bash
bunx turbo run build --filter=@richtillman/mcp-storybook
```

Cursor config (manual):

```json
{
  "mcpServers": {
    "storybook": {
      "command": "node",
      "args": ["packages/mcp-storybook/dist/cli.js"],
      "env": {
        "STORYBOOK_MCP_ROOT": "${workspaceFolder}",
        "STORYBOOK_MCP_LIBRARY": "packages/ui"
      }
    }
  }
}
```

See `packages/mcp-storybook/README.md` for the keep/strip list from ForgeKit.

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

- Create the Chromatic project and set `CHROMATIC_PROJECT_TOKEN`
- `vercel login` / `vercel link` (not done in this scaffold)
- DNS for richtillman.xyz after the Vercel project exists
- Figma Code Connect later
- Cursor MCP config is documented, not installed
