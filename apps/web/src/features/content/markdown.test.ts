import { describe, expect, it } from "vitest"

import { CASE_STUDY_BODIES, readCaseStudyBody } from "./case-study-bodies"
import { renderMarkdown, stripTitleBlock } from "./markdown"

describe("renderMarkdown", () => {
  it("escapes raw HTML instead of passing it through", () => {
    const html = renderMarkdown("Before\n\n<script>alert(1)</script>\n\nAfter")

    expect(html).not.toContain("<script>")
    expect(html).toContain("&lt;script&gt;")
  })

  it("renders the constructs the long-form bodies use", () => {
    const html = renderMarkdown(
      [
        "## A heading",
        "",
        "A paragraph with `code` and a [link](https://example.com).",
        "",
        "- one",
        "- two",
        "",
        "> A quotation.",
        "",
        "```sh",
        "git log --oneline",
        "```",
        "",
        "| Figure | Command |",
        "| --- | --- |",
        "| 137 | `git show` |"
      ].join("\n")
    )

    expect(html).toContain("<h2>A heading</h2>")
    expect(html).toContain("<code>code</code>")
    expect(html).toContain('<a href="https://example.com">link</a>')
    expect(html).toContain("<li>one</li>")
    expect(html).toContain("<blockquote>")
    expect(html).toContain("<pre>")
    expect(html).toContain("<table>")
    expect(html).toContain("<th>Figure</th>")
  })
})

describe("stripTitleBlock", () => {
  it("removes the title and the subtitle the page header already shows", () => {
    const body = stripTitleBlock(
      ["# A title", "", "*A subtitle.*", "", "---", "", "The first paragraph."].join("\n")
    )

    expect(body).not.toContain("# A title")
    expect(body).not.toContain("A subtitle.")
    expect(body).toBe("The first paragraph.")
  })

  it("keeps a body that has no title block", () => {
    expect(stripTitleBlock("Only a paragraph.")).toBe("Only a paragraph.")
  })
})

describe("the case study bodies", () => {
  it("keeps the figures the case study card claims", () => {
    const body = readCaseStudyBody("prose-does-not-bind-agents")

    expect(body).not.toBeNull()
    expect(body).toContain("137 files")
    expect(body).toContain("10,097 lines")
    expect(body).toContain("453 lines")
  })

  it("carries the AI use disclosure", () => {
    const body = readCaseStudyBody("prose-does-not-bind-agents")

    expect(body).toContain("AI use disclosure")
  })

  it("reports an unknown slug rather than an empty page", () => {
    expect(readCaseStudyBody("no-such-case-study")).toBeNull()
  })

  it("registers every body under a slug that has a case study entry", () => {
    for (const slug of Object.keys(CASE_STUDY_BODIES)) {
      expect(slug).toMatch(/^[a-z0-9-]+$/)
    }
  })
})
