import { existsSync, readdirSync, readFileSync } from "node:fs"
import { dirname, join, relative } from "node:path"

import { describe, expect, it } from "vitest"

function findSrcRoot(): string {
  let directory = process.cwd()

  for (;;) {
    const candidate = join(directory, "src")

    if (existsSync(join(candidate, "features", "content", "seed-data.ts"))) return candidate

    const parent = dirname(directory)
    if (parent === directory) throw new Error("Could not locate the web app src root")
    directory = parent
  }
}

const SRC_ROOT = findSrcRoot()
const CONTENT_DIR = join(SRC_ROOT, "features", "content")

const SEED_IMPORT =
  /import\s+(type\s+)?(\{[^}]*\}|\*\s+as\s+\w+|\w+)\s+from\s+["'][^"']*seed-data["']/g

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)

    if (entry.isDirectory()) return sourceFiles(path)
    if (!/\.tsx?$/.test(entry.name) || entry.name.endsWith(".test.ts")) return []

    return [path]
  })
}

function valueImportsOfSeedData(source: string): string[] {
  const found: string[] = []

  for (const match of source.matchAll(SEED_IMPORT)) {
    if (match[1]) continue
    found.push(match[0].replace(/\s+/g, " "))
  }

  return found
}

/**
 * The seed content carries the download-count tokens, so it has to be read
 * through the content layer, which interpolates them. A value import from
 * anywhere else renders the raw token on the page.
 */
describe("seed content boundary", () => {
  it("keeps content values behind the content layer", () => {
    const offenders: string[] = []

    for (const file of sourceFiles(SRC_ROOT)) {
      if (file.startsWith(CONTENT_DIR)) continue

      const source = readFileSync(file, "utf-8")

      for (const clause of valueImportsOfSeedData(source)) {
        offenders.push(`${relative(SRC_ROOT, file)} imports ${clause} as a value`)
      }
    }

    expect(offenders).toEqual([])
  })
})
