# @richtillman/ui

JIT design-system package for **richtillman.xyz**: primitives, layout, composites, and screens. App pages in `@richtillman/web` are thin wrappers that pass props and data. Import by package name only:

```ts
import { Button, GlassPanel } from "@richtillman/ui"
```

This package does **not** depend on `@richtillman/storybook-mcp`. The MCP scans this folder from env/config and writes colocated stories that import the sibling module (`./button`), not the package barrel.

## Storybook

Colocated at `packages/ui/.storybook` on **`@storybook/react-vite` 10.6.0**. Isolated Vite — no TanStack Start / Cloudflare Worker app config. Addons: docs, a11y, Chromatic. Official `@storybook/addon-mcp` is not installed. Interaction checks live in story `play` functions (`storybook/test`); Chromatic runs those when it snapshots. There is no Vitest or Playwright install in this package.

From the repo root:

```bash
bun run storybook          # http://localhost:6006
```

## Chromatic

Chromatic config lives at the **monorepo root** (`chromatic.config.json`). The CLI lives here. From the repo root:

```bash
bun run chromatic          # bun run --cwd packages/ui chromatic
```

That is the only supported Chromatic command. Do not `npx chromatic` / `bunx chromatic` from the repo root. Set `CHROMATIC_PROJECT_TOKEN` in the environment; never pass `--project-token` or commit it.

One GitHub Action: `.github/workflows/chromatic.yml`. CI installs at the repo root, then `chromaui/action` uses `workingDir: packages/ui` and `buildScriptName: chromatic-build` (`storybook build`). PRs are a required check; pushes to `main` auto-accept the baseline. Chromatic a11y is on via `@storybook/addon-a11y` plus the project dashboard toggle.

## Scripts

Run from the repo root (`turbo`) unless noted.

| Task      | Command                                                  |
| --------- | -------------------------------------------------------- |
| Typecheck | `bun run typecheck`                                      |
| Lint      | `bun run lint`                                           |
| Storybook | `bun run storybook`                                      |
| Chromatic | `bun run chromatic` (snapshots + story `play` functions) |

No `build` script — this package is source/JIT. `ButtonLink` stays in the app (`createLink` around `ButtonAnchor`).
