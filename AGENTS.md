## Learned User Preferences

- Fix oxlint and TypeScript diagnostics with real rewrites (type narrowing, type predicates), not `oxlint-disable` comments — for both errors and warnings.
- Use Bun as the package manager; do not assume yarn is installed or emit `yarn run` tasks.
- Keep editor oxlint/oxfmt running for format-on-save; prefer real Oxc fixes over disable-comment code actions.

## Learned Workspace Facts

- Monorepo packages: `@richtillman/ui` (JIT design system, import by package name only), `@richtillman/storybook-mcp` (compiled stdio MCP), `@richtillman/web` (TanStack Start / Cloudflare Worker; only UI consumer).
- Storybook MCP is stdio, not Storybook on `:6006`: build `packages/storybook-mcp/dist/cli.js`, then let Cursor launch it via gitignored `.cursor/mcp.json`; do not run the CLI in a terminal to attach it to chat.
- `list_components` coverage only counts a sibling `*.stories.tsx`; `catalog.stories.tsx` does not count for those screens.
- `@richtillman/ui` layers are primitives, layout, composites, and screens; primitive components currently live at `packages/ui/src/` (not `src/primitives/`). `InPageTabs` is sticky chrome closer to layout than to primitives.
- On Windows/Bun, Oxc editor binaries are `node_modules/.bin/oxlint.exe` and `node_modules/.bin/oxfmt.exe`.
- oxfmt does not support `extends`; use a single repo-root `.oxfmtrc.json` (`semi: false`). Nested oxlintrc should inherit with `"plugins": []`.
- Keep oxlint `typeAware: true` and `typeCheck: false` so TypeScript Quick Fix stays with the TS language service.
