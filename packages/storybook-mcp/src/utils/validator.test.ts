import path from "node:path"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"
import { DEFAULT_CONFIG } from "../types.js"
import { ComponentScanner } from "./scanner.js"
import { StoryValidator, validateStorySource } from "./validator.js"

const button = {
  name: "Button",
  filePath: "packages/ui/src/button.tsx",
}

const storyPath = "packages/ui/src/button.stories.tsx"

describe("validateStorySource", () => {
  it("accepts a colocated sibling import", () => {
    const source = `import type { Meta, StoryObj } from "@storybook/react-vite"
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
`
    const result = validateStorySource(source, button, storyPath, DEFAULT_CONFIG)
    expect(result.valid).toBe(true)
    expect(result.errors).toEqual([])
  })

  it("rejects the package barrel", () => {
    const source = `import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "@richtillman/ui"

const meta = {
  title: "UI/Button",
  component: Button,
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
`
    const result = validateStorySource(source, button, storyPath, DEFAULT_CONFIG)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain(
      "Colocated stories must import from a relative module, not @richtillman/ui",
    )
  })

  it("rejects repo-root internals paths", () => {
    const source = `import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "../../../packages/ui/src/button"

const meta = {
  title: "UI/Button",
  component: Button,
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
`
    const result = validateStorySource(source, button, storyPath, DEFAULT_CONFIG)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain(
      "Do not import UI internals with repo-root relative paths",
    )
  })
})

describe("StoryValidator against packages/ui", () => {
  it("accepts every colocated sibling story", async () => {
    const uiRoot = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "../../../ui",
    )
    const scanner = new ComponentScanner(uiRoot, DEFAULT_CONFIG)
    const validator = new StoryValidator(DEFAULT_CONFIG)
    const components = await scanner.scan()
    const withStories = components.filter((component) => component.hasStory)
    expect(withStories.length).toBeGreaterThan(0)

    const failures = withStories
      .map((component) => ({
        name: component.name,
        errors: validator.validate(component).errors,
      }))
      .filter((result) => result.errors.length > 0)

    expect(failures).toEqual([])
  })
})
