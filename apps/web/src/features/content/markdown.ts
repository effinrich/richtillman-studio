import { Marked, Renderer } from "marked"

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => HTML_ESCAPES[character] ?? character)
}

/**
 * Raw HTML in a body is escaped rather than passed through. The bodies are
 * authored markdown that needs no HTML, so anything that looks like a tag is
 * content the renderer does not understand. Rendering it anyway would put
 * author-controlled markup on the page without anyone deciding to.
 */
const renderer = new Renderer()
renderer.html = ({ text }) => escapeHtml(text)

/**
 * A table in the article is wider than a phone. The default renderer puts the
 * table straight into the column, so the third column is clipped and cannot be
 * read. Wrapping it gives the table its own scroll.
 */
renderer.table = function (this: Renderer, token) {
  const head = token.header.map((cell) => this.tablecell(cell)).join("")
  const body = token.rows
    .map((row) => `<tr>${row.map((cell) => this.tablecell(cell)).join("")}</tr>`)
    .join("")

  return `<div class="table-scroll"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`
}

const parser = new Marked({ gfm: true, breaks: false, renderer })

export function renderMarkdown(markdown: string): string {
  return parser.parse(markdown, { async: false })
}

/**
 * The page header renders the title and the subtitle on its own, so the body
 * starts after them. The stored file keeps both, because the same file is the
 * published article and needs a title of its own.
 */
export function stripTitleBlock(markdown: string): string {
  const lines = markdown.split("\n")
  let index = 0

  if (lines[index]?.startsWith("# ")) index += 1
  while (lines[index]?.trim() === "") index += 1
  if (lines[index]?.trim().startsWith("*") && lines[index]?.trim().endsWith("*")) index += 1
  while (lines[index]?.trim() === "" || lines[index]?.trim() === "---") index += 1

  return lines.slice(index).join("\n").trim()
}
