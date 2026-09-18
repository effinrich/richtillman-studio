# @richtillman/storybook-mcp

Compiled MCP **stdio** server that scans `@richtillman/ui` and generates Storybook CSF. This is the Storybook MCP for the studio — not `@storybook/addon-mcp`, and not an HTTP server on `:6006`.

It is a **package**, not an app. `bin` points at `dist`. UI stays JIT/source; this package is compiled with `tsc`. It does **not** import `@richtillman/ui` internals. It reads `packages/ui` from env/config (filesystem). Generated stories import the colocated component module (`./button`), not the package barrel. Consumers (`apps/web`) still import `@richtillman/ui`.

## Build

From the repo root:

```bash
bunx turbo run build --filter=@richtillman/storybook-mcp
bunx turbo run typecheck --filter=@richtillman/storybook-mcp
bunx turbo run test --filter=@richtillman/storybook-mcp
```

`start` depends on `build` and is persistent (stdio). There is no `--help`.

```bash
node packages/storybook-mcp/dist/cli.js
```

## Env

Lives here (`.env.example`), not in a repo-root `.env`. `storybook-mcp.config.json` names the library path. Do not `cd` into this folder from root scripts.

| Variable                | Role                                                      |
| ----------------------- | --------------------------------------------------------- |
| `STORYBOOK_MCP_ROOT`    | Studio root (walks up to `turbo.json` if unset)           |
| `STORYBOOK_MCP_LIBRARY` | Library path relative to that root. Default `packages/ui` |

## Cursor

Do not auto-install an MCP server (Runlayer). Point Cursor at the compiled CLI after a Turbo build. Local config is `.cursor/mcp.json` at the repo root (gitignored):

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

## Publish shape (not published yet)

- `"bin": { "storybook-mcp": "./dist/cli.js" }`
- `"files": ["dist", "README.md"]`
- `"exports"` → `dist/index.js` + `dist/index.d.ts`
- Build with `tsc --project tsconfig.build.json` (Turbo caches `dist/**`)
- Do not add a root `cd packages/storybook-mcp && …` script
