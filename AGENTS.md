## Learned User Preferences

- Fix oxlint and TypeScript diagnostics with real rewrites (type narrowing, type predicates), not `oxlint-disable` comments — for both errors and warnings.
- Use Bun as the package manager; do not assume yarn is installed or emit `yarn run` tasks.
- Keep editor oxlint/oxfmt running for format-on-save; prefer real Oxc fixes over disable-comment code actions.
- Keep Storybook MCP reviewer setup to `bun run mcp:setup` plus enabling the server in Cursor; document it in README, with no local `dist` build.

## Learned Workspace Facts

- Monorepo packages: `@richtillman/ui` (JIT design system), `@richtillman/storybook-mcp` (stdio MCP), `@richtillman/web` (TanStack Start / Cloudflare Worker; only UI consumer). `apps/web` imports `@richtillman/ui`; colocated `*.stories.tsx` import sibling modules (`./badge`), not the package barrel — MCP `generate_story`/`validate_story` enforce that.
- Storybook MCP is stdio, not Storybook on `:6006`. Local Cursor: `bun run mcp:setup` writes gitignored `.cursor/mcp.json` to run Bun on `packages/storybook-mcp/src/cli.ts` (no `dist` build). Enable the `storybook` server in Cursor Settings → MCP; do not run the CLI in a terminal. `dist` is for CI/publish. Repo root is the workspace `package.json` with `workspaces`, not the first `turbo.json`.
- `list_components` coverage only counts a sibling `*.stories.tsx`; `catalog.stories.tsx` does not count for those screens.
- `@richtillman/ui` layers are primitives, layout, composites, and screens; primitive components currently live at `packages/ui/src/` (not `src/primitives/`). `InPageTabs` is sticky chrome closer to layout than to primitives.
- On Windows/Bun, Oxc editor binaries are `node_modules/.bin/oxlint.exe` and `node_modules/.bin/oxfmt.exe`.
- oxfmt does not support `extends`; use a single repo-root `.oxfmtrc.json` (`semi: false`). Nested oxlintrc should inherit with `"plugins": []`.
- Keep oxlint `typeAware: true` and `typeCheck: false` so TypeScript Quick Fix stays with the TS language service.
- The web app stylesheet is `@import "@richtillman/ui/styles.css"`; keep `@source` of `apps/web/src` in `packages/ui/src/styles/app.css` so app-only classes are not purged.
