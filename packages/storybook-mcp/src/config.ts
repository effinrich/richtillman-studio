import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { DEFAULT_CONFIG, type StorybookMcpConfig } from "./types.js"

const CONFIG_FILE = "storybook-mcp.config.json"

export function findRepoRoot(startDir: string): string {
  let dir = startDir
  while (true) {
    const turbo = path.join(dir, "turbo.json")
    const pkg = path.join(dir, "package.json")
    if (existsSync(turbo) && existsSync(pkg)) {
      return dir
    }
    const parent = path.dirname(dir)
    if (parent === dir) {
      return startDir
    }
    dir = parent
  }
}

export function packageDirFromMeta(metaUrl: string): string {
  return path.dirname(fileURLToPath(metaUrl))
}

function readJsonConfig(filePath: string): Partial<StorybookMcpConfig> {
  const raw = readFileSync(filePath, "utf8")
  const parsed: unknown = JSON.parse(raw)
  if (!parsed || typeof parsed !== "object") {
    return {}
  }
  return parsed
}

export function loadConfig(metaUrl: string): {
  repoRoot: string
  config: StorybookMcpConfig
} {
  const envRoot = process.env.STORYBOOK_MCP_ROOT?.trim()
  const thisDir = packageDirFromMeta(metaUrl)
  const packageRoot =
    thisDir.endsWith(`${path.sep}dist`) || thisDir.endsWith(`${path.sep}src`)
      ? path.resolve(thisDir, "..")
      : thisDir
  const repoRoot = envRoot ? path.resolve(envRoot) : findRepoRoot(packageRoot)

  const configPath = path.join(packageRoot, CONFIG_FILE)
  const fileConfig = existsSync(configPath) ? readJsonConfig(configPath) : {}
  const config: StorybookMcpConfig = {
    ...DEFAULT_CONFIG,
    ...fileConfig,
    libraries: fileConfig.libraries ?? DEFAULT_CONFIG.libraries,
  }

  const libraryOverride = process.env.STORYBOOK_MCP_LIBRARY?.trim()
  if (libraryOverride) {
    const existing = config.libraries[0]
    config.libraries = [
      {
        name: existing?.name ?? "ui",
        path: libraryOverride,
        storyTitlePrefix: existing?.storyTitlePrefix ?? "UI",
      },
    ]
  }

  return { repoRoot, config }
}

export function resolveLibraryPath(
  repoRoot: string,
  relativePath: string,
): string {
  return path.resolve(repoRoot, relativePath)
}
