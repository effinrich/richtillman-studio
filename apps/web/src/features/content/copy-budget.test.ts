import { existsSync, readdirSync, readFileSync } from "node:fs"
import { dirname, join, relative } from "node:path"

import {
  CONTACT_AVAILABILITY,
  CONTACT_DELIVERY_FAILED,
  CONTACT_ENGAGEMENT_OPTIONS
} from "@richtillman/ui/contact-copy.ts"
import ts from "typescript"
import { describe, expect, it } from "vitest"

import { CASE_STUDY_DETAIL_SECTIONS } from "#/features/content/case-study-details"
import {
  ARTICLES,
  CASE_STUDIES,
  FAQ_ITEMS,
  PROJECTS,
  RESOURCES,
  RESUME_SECTIONS,
  SERVICES
} from "#/features/content/seed-data"

/**
 * A budget on the length of the copy, in characters, per surface.
 *
 * The budget is a function of where the copy renders, not of taste. A project
 * description sits under a title in a narrow grid cell, so it gets a tight
 * budget. A lead paragraph gets more room. A bullet in a list gets less than a
 * paragraph, because a bullet that runs long stops being scannable, which is
 * the only reason to write it as a bullet.
 *
 * These are the numbers the site already met everywhere except for the
 * resume, the case studies, and a handful of card descriptions. Tightening
 * those to the same budget is what makes the whole site read at one speed.
 */
const BUDGET = {
  /** A card cell beside a title: project, article, service, resource. */
  card: 200,
  /** The lead paragraph of a resume. */
  lead: 400,
  /** A bullet in a list. */
  bullet: 220,
  /** A body paragraph: resume project detail, case study summary and section. */
  prose: 320
} as const

type Offender = {
  where: string
  length: number
  budget: number
  text: string
}

function check(offenders: Offender[], where: string, text: string, budget: number): void {
  if (text.length > budget) {
    offenders.push({ where, length: text.length, budget, text })
  }
}

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

/** The props that carry prose rather than a class name or an identifier. */
const PROSE_PROPS = new Set([
  "alt",
  "body",
  "copy",
  "description",
  "eyebrow",
  "heading",
  "label",
  "placeholder",
  "summary",
  "text",
  "title"
])

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)

    if (entry.isDirectory()) {
      if (["node_modules", "dist", ".output"].includes(entry.name)) return []
      return sourceFiles(path)
    }

    if (!entry.name.endsWith(".tsx")) return []
    if (entry.name.endsWith(".stories.tsx")) return []
    if (entry.name.endsWith(".test.tsx")) return []
    if (entry.name === "routeTree.gen.ts") return []

    return [path]
  })
}

/**
 * Every piece of prose written directly into a component, read off the
 * syntax tree rather than off a regular expression, so a class name or a
 * code fragment is never mistaken for a sentence.
 *
 * Two surfaces, because they render differently. Body copy is JSX text inside
 * a page, and gets the prose budget. A copy prop is a lede or a card summary
 * passed into a component, and gets the card budget.
 */
function componentProse(): { where: string; text: string; budget: number }[] {
  const found: { where: string; text: string; budget: number }[] = []

  for (const file of sourceFiles(join(ROOT, "packages", "ui", "src"))) {
    const source = ts.createSourceFile(
      file,
      readFileSync(file, "utf-8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX
    )

    const visit = (node: ts.Node): void => {
      if (ts.isJsxText(node)) {
        const text = node.text.replace(/\s+/g, " ").trim()
        if (text.length > 0) {
          found.push({ where: relative(ROOT, file), text, budget: BUDGET.prose })
        }
      }

      if (
        ts.isJsxAttribute(node) &&
        ts.isIdentifier(node.name) &&
        PROSE_PROPS.has(node.name.text) &&
        node.initializer &&
        ts.isStringLiteral(node.initializer)
      ) {
        found.push({
          where: `${relative(ROOT, file)} (${node.name.text})`,
          text: node.initializer.text.replace(/\s+/g, " ").trim(),
          budget: BUDGET.card
        })
      }

      ts.forEachChild(node, visit)
    }

    visit(source)
  }

  return found
}

describe("copy budget", () => {
  it("keeps card copy inside the card budget", () => {
    const offenders: Offender[] = []

    for (const project of PROJECTS) {
      check(offenders, `project ${project.slug}`, project.description, BUDGET.card)
    }

    for (const article of ARTICLES) {
      check(offenders, `article ${article.slug}`, article.excerpt, BUDGET.card)
    }

    for (const service of SERVICES) {
      check(offenders, `service ${service.id}`, service.description, BUDGET.card)
    }

    for (const resource of RESOURCES) {
      check(offenders, `resource ${resource.id}`, resource.description, BUDGET.card)
    }

    for (const prose of componentProse()) {
      check(offenders, prose.where, prose.text, prose.budget)
    }

    expect(
      offenders.map((o) => `${o.where} is ${o.length} characters (budget ${o.budget})`)
    ).toEqual([])
  })

  it("keeps list items inside the bullet budget", () => {
    const offenders: Offender[] = []

    for (const job of RESUME_SECTIONS.experience) {
      for (const highlight of job.highlights) {
        check(offenders, `resume ${job.company}`, highlight, BUDGET.bullet)
      }
    }

    expect(
      offenders.map((o) => `${o.where} is ${o.length} characters (budget ${o.budget})`)
    ).toEqual([])
  })

  it("keeps body copy inside the prose budget", () => {
    const offenders: Offender[] = []

    for (const article of ARTICLES) {
      for (const paragraph of article.content) {
        check(offenders, `article ${article.slug}`, paragraph, BUDGET.prose)
      }
    }

    for (const item of FAQ_ITEMS) {
      check(offenders, `faq ${item.id}`, item.answer, BUDGET.prose)
    }

    for (const study of CASE_STUDIES) {
      check(offenders, `case study ${study.slug}`, study.summary, BUDGET.prose)
    }

    for (const [slug, sections] of Object.entries(CASE_STUDY_DETAIL_SECTIONS)) {
      for (const section of sections) {
        check(offenders, `case study ${slug} ${section.label}`, section.body, BUDGET.prose)
      }
    }

    for (const project of RESUME_SECTIONS.projects) {
      check(offenders, `resume project ${project.title}`, project.detail, BUDGET.prose)
    }

    expect(
      offenders.map((o) => `${o.where} is ${o.length} characters (budget ${o.budget})`)
    ).toEqual([])
  })

  it("keeps the resume lead inside the lead budget", () => {
    expect(RESUME_SECTIONS.summary.length).toBeLessThanOrEqual(BUDGET.lead)
  })

  it("keeps the contact copy inside the card budget", () => {
    const offenders: Offender[] = []

    check(offenders, "contact availability", CONTACT_AVAILABILITY, BUDGET.card)
    check(offenders, "contact engagement", CONTACT_ENGAGEMENT_OPTIONS, BUDGET.card)
    check(offenders, "contact delivery failed", CONTACT_DELIVERY_FAILED, BUDGET.card)

    expect(
      offenders.map((o) => `${o.where} is ${o.length} characters (budget ${o.budget})`)
    ).toEqual([])
  })
})
