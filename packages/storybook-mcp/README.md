# @richtillman/storybook-mcp

Compiled MCP **stdio** server that scans `@richtillman/ui` and generates Storybook CSF. This is the Storybook MCP for the studio — not `@storybook/addon-mcp`, and not an HTTP server on `:6006`.

It is a **package**, not an app. `bin` points at `dist`. UI stays JIT/source; this package is compiled with `tsc` for publish/CI. It does **not** import `@richtillman/ui` internals. It reads `packages/ui` from env/config (filesystem). Generated stories import the colocated component module (`./button`), not the package barrel. Consumers (`apps/web`) still import `@richtillman/ui`.

## Cursor (reviewers)

Cursor launches the server. Do **not** run the CLI in a terminal to attach it to chat. From the **repo root**:

```bash
bun install
bun run mcp:setup
```

That writes gitignored `.cursor/mcp.json` (merges the `storybook` server, leaves any other servers alone). Then enable **storybook** in Cursor Settings → MCP.

Local Cursor uses Bun on the source CLI — no Turbo `build` first:

```json
{
  "mcpServers": {
    "storybook": {
      "command": "bun",
      "args": ["packages/storybook-mcp/src/cli.ts"],
      "env": {
        "STORYBOOK_MCP_ROOT": "${workspaceFolder}",
        "STORYBOOK_MCP_LIBRARY": "packages/ui"
      }
    }
  }
}
```

The checked-in copy of that block is `mcp.json` in this package. Do not auto-install a second Storybook MCP from the marketplace.

## Env

Lives here (`.env.example`), not in a repo-root `.env`. `storybook-mcp.config.json` names the library path. Do not `cd` into this folder from root scripts. Cursor config already sets these; they also have defaults (`STORYBOOK_MCP_ROOT` walks up to `turbo.json`).

| Variable                | Role                                                      |
| ----------------------- | --------------------------------------------------------- |
| `STORYBOOK_MCP_ROOT`    | Studio root (walks up to `turbo.json` if unset)           |
| `STORYBOOK_MCP_LIBRARY` | Library path relative to that root. Default `packages/ui` |

## Tools

| Tool                     | Writes files? |
| ------------------------ | ------------- |
| `list_components`        | No            |
| `analyze_component`      | No            |
| `get_component_coverage` | No            |
| `list_templates`         | No            |
| `get_story_template`     | No            |
| `suggest_stories`        | No            |
| `validate_story`         | No            |
| `generate_story`         | Yes           |
| `update_story`           | Yes           |

Templates: `basic`, `with-controls`, `with-variants`, `interactive`, `form`.

Storybook in this repo is `@storybook/react-vite` 10.6.0. Chromatic is `bun run chromatic` from the **repo root** (cds into `packages/ui`). One GitHub Action: `.github/workflows/chromatic.yml` (`workingDir: packages/ui`).

## Build (CI / publish)

From the repo root:

```bash
bunx turbo run build --filter=@richtillman/storybook-mcp
bunx turbo run typecheck --filter=@richtillman/storybook-mcp
bunx turbo run test --filter=@richtillman/storybook-mcp
```

`start` depends on `build` and is persistent (stdio). There is no `--help`. Do not use this to attach the server to Cursor:

```bash
node packages/storybook-mcp/dist/cli.js
```

## Publish shape (not published yet)

- `"bin": { "storybook-mcp": "./dist/cli.js" }`
- `"files": ["dist", "README.md"]`
- `"exports"` → `dist/index.js` + `dist/index.d.ts`
- Build with `tsc --project tsconfig.build.json` (Turbo caches `dist/**`)
- Do not add a root `cd packages/storybook-mcp && …` script
