import { existsSync } from "node:fs"
import { join } from "node:path"

import { describe, expect, it } from "vitest"

import { CASE_STUDIES, PROJECTS } from "./seed-data"

const PUBLIC_DIR = join(process.cwd(), "public")

const VARIANTS = [".avif", "-640.avif", ".webp", "-640.webp"]

function referencedImages(): string[] {
  const images = new Set<string>()

  for (const project of PROJECTS) {
    if (project.image) images.add(project.image)
  }
  for (const study of CASE_STUDIES) {
    if (study.image) images.add(study.image)
  }

  return [...images]
}

/**
 * The screenshots ship as AVIF and WebP next to the PNG. A new image that
 * skips the conversion would silently ship the PNG to every browser.
 */
describe("image variants", () => {
  it("has an AVIF and WebP variant for every referenced image", () => {
    const missing: string[] = []

    for (const image of referencedImages()) {
      const stem = image.replace(/\.png$/, "")

      for (const variant of VARIANTS) {
        const path = join(PUBLIC_DIR, `${stem}${variant}`)

        if (!existsSync(path)) missing.push(`${stem}${variant}`)
      }
    }

    expect(missing).toEqual([])
  })
})
