# @richtillman/storybook-mcp

Compiled MCP stdio server that generates Storybook CSF for `@richtillman/ui`. This is the Storybook MCP to use — not `@storybook/addon-mcp`. This is a **package**, not an app and not a root script.

Turborepo: non-bundler Node tools are **compiled**. `bin` points at `dist`, `build` emits `dist/**`, UI stays JIT/source. This package does **not** import `@richtillman/ui` internals. It scans `packages/ui` from config/env (filesystem), and generated stories import the public export `@richtillman/ui`.

## Tasks

```bash
# from repo root
bunx turbo run build --filter=@richtillman/storybook-mcp
bunx turbo run start --filter=@richtillman/storybook-mcp
bunx turbo run typecheck --filter=@richtillman/storybook-mcp
bunx turbo run test --filter=@richtillman/storybook-mcp
```

`start` depends on `build` and is persistent (stdio). Env lives here (`.env.example`), not in a repo-root `.env`.

| Variable | Role |
|----------|------|
| `STORYBOOK_MCP_ROOT` | Studio root (walks up to `turbo.json` if unset) |
| `STORYBOOK_MCP_LIBRARY` | Library path relative to that root. Default `packages/ui` |

`storybook-mcp.config.json` in this package names the library path. Do not `cd` into this folder from root scripts.

## Cursor MCP (document only — do not auto-install)

Runlayer governance: do not add unmanaged MCP servers without approval. Point Cursor at the compiled bin after a Turbo build:

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

Build first: `bunx turbo run build --filter=@richtillman/storybook-mcp`.

## npm packaging pointers (not published yet)

ForgeKit shipped this as `forgekit-storybook-mcp`. Keep the same shape if you ever publish `@richtillman/storybook-mcp`:

- `"bin": { "storybook-mcp": "./dist/cli.js" }`
- `"files": ["dist", "README.md"]`
- `"exports"` → `dist/index.js` + `dist/index.d.ts`
- `"prepublishOnly": "tsc --project tsconfig.build.json"` (already the `build` script)
- Publish with `npm publish --access public` from this package **after** `bunx turbo run build --filter=@richtillman/storybook-mcp`
- Use `tsc`, not tsup — Turbo compiled internal packages cache `dist/**` from `tsc`

Do not add Nx tags. Do not add a root `cd packages/storybook-mcp && …` script.

## Keep / strip (from ForgeKit `packages/storybook-mcp`)

**Keep**

- Tools: `list_components`, `analyze_component`, `generate_story`, `update_story`, `validate_story`, `get_story_template`, `list_templates`, `get_component_coverage`, `suggest_stories`
- Scanner, generator, validator, story-merger
- Templates: `basic`, `with-controls`, `with-variants`, `interactive`, `form`
- npm `bin` / `exports` / `files` / `prepublishOnly` pointers
- Compiled `dist` + shebang CLI

**Strip**

- License / Polar / `LicenseError` / `FEATURE_NOT_AVAILABLE`
- `generate_test`, `generate_docs`, `generate_code_connect`
- `sync_all`, `sync_component`, `check_health`
- Auto-sync initializer on server start
- `story-history`, `.forgekit`
- Nx autodetection and `nx.tags`
- Templates `with-msw`, `with-router`, `page`
- React Native / Tamagui / NativeWind paths
- `as any`
- Root-level `.env` and relative imports into `packages/ui/src`
