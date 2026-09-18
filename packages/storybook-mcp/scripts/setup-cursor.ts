import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { findRepoRoot } from "../src/config.ts"

function readServers(filePath: string): Record<string, unknown> {
  if (!existsSync(filePath)) return {}
  const parsed: unknown = JSON.parse(readFileSync(filePath, "utf8"))
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`Invalid MCP config: ${filePath}`)
  }
  if (!("mcpServers" in parsed) || parsed.mcpServers === undefined) return {}
  const servers = parsed.mcpServers
  if (!servers || typeof servers !== "object" || Array.isArray(servers)) {
    throw new Error(`Invalid mcpServers in ${filePath}`)
  }
  return { ...servers }
}

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const repoRoot = findRepoRoot(packageRoot)
const templatePath = path.join(packageRoot, "mcp.json")
const destPath = path.join(repoRoot, ".cursor", "mcp.json")

const next = {
  mcpServers: {
    ...readServers(destPath),
    ...readServers(templatePath),
  },
}

mkdirSync(path.dirname(destPath), { recursive: true })
writeFileSync(destPath, `${JSON.stringify(next, null, 2)}\n`)

const relativeDest = path.relative(repoRoot, destPath).replaceAll("\\", "/")
console.log(`Wrote ${relativeDest}`)
console.log("Enable “storybook” in Cursor Settings → MCP. Do not run the CLI in a terminal.")
