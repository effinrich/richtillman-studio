import { existsSync, readdirSync, readFileSync } from "node:fs"
import { dirname, join, relative } from "node:path"

import { describe, expect, it } from "vitest"

/**
 * The lowest text colour the site uses on the black background is white at 50%,
 * which is a 5.3:1 contrast ratio against #000000. Anything dimmer fails
 * WCAG AA for the small text this design system uses. Icons may be dimmer, but
 * only when they are decorative and marked aria-hidden.
 */
const MINIMUM_TEXT_OPACITY = 50

function findRepoRoot(): string {
  let directory = process.cwd()

  for (;;) {
    if (existsSync(join(directory, "packages", "ui", "src"))) return directory

    const parent = dirname(directory)
    if (parent === directory) throw new Error("Could not locate the repository root")
    directory = parent
  }
}

const ROOT = findRepoRoot()
const UI_SRC = join(ROOT, "packages", "ui", "src")

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)

    if (entry.isDirectory()) return sourceFiles(path)
    if (!entry.name.endsWith(".tsx") || entry.name.endsWith(".stories.tsx")) return []

    return [path]
  })
}

const DIMMED_TEXT = /text-white\/(\d{1,3})/

/**
 * The class may sit on its own line, so the check follows the element it
 * belongs to rather than the line it was written on.
 */
function elementIsDecorative(lines: string[], index: number): boolean {
  const line = lines[index] ?? ""
  const match = DIMMED_TEXT.exec(line)
  if (!match) return false

  const afterClass = line.slice(match.index + match[0].length)

  if (afterClass.includes(">")) return line.includes("aria-hidden")

  const rest = lines.slice(index + 1)
  const end = rest.findIndex((candidate) => /^\s*\/?>/.test(candidate))
  const attributes = (end === -1 ? rest : rest.slice(0, end + 1)).join("\n")

  return attributes.includes("aria-hidden")
}

describe("text contrast", () => {
  it("keeps text at or above a 5.3:1 contrast ratio on the black background", () => {
    const offenders: string[] = []

    for (const file of sourceFiles(UI_SRC)) {
      const lines = readFileSync(file, "utf-8").split("\n")

      for (const [index, line] of lines.entries()) {
        const match = DIMMED_TEXT.exec(line)
        if (!match) continue

        const opacity = Number(match[1])
        if (opacity >= MINIMUM_TEXT_OPACITY) continue
        if (elementIsDecorative(lines, index)) continue

        offenders.push(
          `${relative(ROOT, file)}:${index + 1} uses text-white/${opacity} on text that is not aria-hidden`
        )
      }
    }

    expect(offenders).toEqual([])
  })
})
