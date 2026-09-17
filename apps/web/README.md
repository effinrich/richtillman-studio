# @richtillman/web

TanStack Start site (React 19, file-based routing, SSR) on Cloudflare Workers. Routes are thin wrappers: they load data and pass props into `@richtillman/ui` screens.

```ts
import { HomeScreen } from "@richtillman/ui"
```

Storybook and Chromatic live in `packages/ui`, not here. The Storybook MCP is `@richtillman/storybook-mcp` (stdio), not this app.

## Dev

From the repo root:

```bash
bun install
cp apps/web/.env.example apps/web/.env.local
bun run dev                 # http://localhost:3000
```

Supabase URL + anon key are optional. The site falls back to seed data.

## Env

Local file: `apps/web/.env.local` (gitignored). Production secrets: `wrangler secret put` from this package, or dashboard Secrets on the `richtillman-studio` Worker.

| Variable                 | Role                 |
| ------------------------ | -------------------- |
| `VITE_SUPABASE_URL`      | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key    |

## Scripts

| Task           | Command                                   |
| -------------- | ----------------------------------------- |
| Dev            | `bun run dev` (from repo root)            |
| Typecheck      | `bun run typecheck`                       |
| Test           | `bun run test`                            |
| Build          | `bun run build`                           |
| Worker preview | `bun run preview:worker` (`wrangler dev`) |
| Deploy         | `bun run deploy` (`wrangler deploy`)      |

## Deploy

Cloudflare Workers via Wrangler. Config: `wrangler.jsonc` (`name`: `richtillman-studio`, `nodejs_compat`, TanStack Start server entry). Pattern matches portfolio-1 (`@cloudflare/vite-plugin`, `viteEnvironment: { name: "ssr" }`).

```bash
wrangler login          # once, if `wrangler whoami` fails
bun run build
bun run deploy
```

First ship lands on `https://richtillman-studio.<account>.workers.dev`. Do not attach `richtillman.xyz` here — that hostname belongs to the live `portfolio` Worker.
