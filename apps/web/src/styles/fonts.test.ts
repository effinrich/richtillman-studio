import { existsSync, readFileSync, statSync } from "node:fs"
import { dirname, join } from "node:path"

import { describe, expect, it } from "vitest"

function findRepoRoot(): string {
  let directory = process.cwd()

  for (;;) {
    const candidate = join(directory, "packages", "ui", "src", "styles", "app.css")

    if (existsSync(candidate)) return directory

    const parent = dirname(directory)
    if (parent === directory) throw new Error("Could not locate the repository root")
    directory = parent
  }
}

const ROOT = findRepoRoot()
const APP_CSS = join(ROOT, "packages", "ui", "src", "styles", "app.css")
const ROOT_ROUTE = join(ROOT, "apps", "web", "src", "routes", "__root.tsx")
const FONT_DIR = join(ROOT, "apps", "web", "public", "fonts")
const FONT_CSS = join(FONT_DIR, "fonts.css")

const FONT_FILES = ["inter-latin.woff2", "jetbrains-mono-latin.woff2"]
const FONT_LICENSES = ["OFL-Inter.txt", "OFL-JetBrainsMono.txt"]

const REMOTE_IMPORT = /@import\s+(?:url\()?\s*["']?https?:/i

describe("self-hosted fonts", () => {
  it("keeps the render-blocking application CSS free of remote imports", () => {
    const css = readFileSync(APP_CSS, "utf-8")

    expect(css).not.toMatch(REMOTE_IMPORT)
  })

  it("links the font stylesheet from the document head instead of a font origin", () => {
    const route = readFileSync(ROOT_ROUTE, "utf-8")

    expect(route).toContain("/fonts/fonts.css")
    expect(route).not.toContain("fonts.googleapis.com")
    expect(route).not.toContain("fonts.gstatic.com")
  })

  it("serves both font files and their licences from the site origin", () => {
    for (const file of [...FONT_FILES, ...FONT_LICENSES]) {
      const path = join(FONT_DIR, file)

      expect(existsSync(path), `${file} is missing from public/fonts`).toBe(true)
      expect(statSync(path).size, `${file} is empty`).toBeGreaterThan(0)
    }
  })

  it("declares the local faces with font-display swap", () => {
    const css = readFileSync(FONT_CSS, "utf-8")

    expect(css.match(/font-display:\s*swap/g)).toHaveLength(2)

    for (const file of FONT_FILES) {
      expect(css).toContain(`/fonts/${file}`)
    }
  })
})
