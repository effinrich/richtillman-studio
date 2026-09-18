import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { describe, expect, it } from "vitest"
import { findRepoRoot, loadConfig } from "./config.js"

const srcDir = path.dirname(fileURLToPath(import.meta.url))

describe("findRepoRoot", () => {
  it("walks past a package turbo.json to the workspace root", () => {
    const root = findRepoRoot(srcDir)
    expect(root.replaceAll("\\", "/")).toMatch(/\/richtillman-studio$/)
    expect(root.replaceAll("\\", "/")).not.toMatch(/storybook-mcp$/)
  })
})

describe("loadConfig", () => {
  it("resolves the studio root from the source CLI without env", () => {
    const cliMeta = pathToFileURL(path.join(srcDir, "cli.ts")).href
    const previous = process.env.STORYBOOK_MCP_ROOT
    delete process.env.STORYBOOK_MCP_ROOT
    try {
      const { repoRoot, config } = loadConfig(cliMeta)
      expect(repoRoot).toBe(findRepoRoot(srcDir))
      expect(config.libraries[0]?.path).toBe("packages/ui")
    } finally {
      if (previous === undefined) delete process.env.STORYBOOK_MCP_ROOT
      else process.env.STORYBOOK_MCP_ROOT = previous
    }
  })
})
