import { describe, expect, it } from "vitest"
import {
  extractStoryBlock,
  mergeStoryContent,
  mergeStories,
  parseStoryExports,
} from "./story-merger.js"

const existing = `import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "./button"

const meta = {
  title: "UI/Button",
  component: Button,
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Primary: Story = {
  args: { variant: "primary" },
}
`

describe("parseStoryExports", () => {
  it("returns CSF story names", () => {
    expect(parseStoryExports(existing)).toEqual(["Default", "Primary"])
  })
})

describe("extractStoryBlock", () => {
  it("returns one export block", () => {
    expect(extractStoryBlock(existing, "Primary")).toContain('variant: "primary"')
  })
})

describe("mergeStories", () => {
  it("keeps user-added exports", () => {
    const generated = existing.replace(
      /export const Primary:[\s\S]*$/,
      "export const Default: Story = {\n  args: {},\n}\n",
    )
    const result = mergeStories(generated, existing, ["Default"])
    expect(result.preserved).toEqual(["Primary"])
    expect(result.content).toContain("User-added stories")
  })
})

describe("mergeStoryContent", () => {
  it("appends a new story", () => {
    const next = mergeStoryContent(
      existing,
      `export const Outline: Story = {\n  args: { variant: "outline" },\n}\n`,
      "Outline",
    )
    expect(parseStoryExports(next)).toEqual(["Default", "Primary", "Outline"])
  })
})
