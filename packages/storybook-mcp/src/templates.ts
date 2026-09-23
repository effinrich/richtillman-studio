import type { ComponentInfo, StoryGenerationOptions } from "./types.js"

const STORYBOOK_IMPORT = "@storybook/react-vite"

function siblingImport(component: ComponentInfo): string {
  const file = component.relativePath.replaceAll("\\", "/")
  const slash = file.lastIndexOf("/")
  const basename = slash === -1 ? file : file.slice(slash + 1)
  const stem = basename.replace(/\.(tsx|jsx)$/, "")
  return `./${stem}`
}

function storyTitle(component: ComponentInfo): string {
  return `UI/${component.name}`
}

function escapeForTemplate(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${")
}

function defaultArgs(component: ComponentInfo): string {
  const entries = component.props
    .filter((prop) => prop.required && prop.defaultValue === undefined)
    .map((prop) => {
      if (prop.type.includes("string")) return `    ${prop.name}: "${prop.name}",`
      if (prop.type.includes("number")) return `    ${prop.name}: 0,`
      if (prop.type.includes("boolean")) return `    ${prop.name}: false,`
      return `    ${prop.name}: undefined,`
    })
  if (entries.length === 0) return "  },"
  return `${entries.join("\n")}\n  },`
}

function argTypesBlock(component: ComponentInfo): string {
  if (component.props.length === 0) return ""
  const lines = component.props.map((prop) => {
    const control = prop.type.includes("boolean")
      ? "boolean"
      : prop.type.includes("number")
        ? "number"
        : "text"
    return `    ${prop.name}: { control: "${control}" },`
  })
  return `\n  argTypes: {\n${lines.join("\n")}\n  },`
}

export function generateBasicTemplate(
  component: ComponentInfo,
  _options: StoryGenerationOptions,
): string {
  return `import type { Meta, StoryObj } from "${STORYBOOK_IMPORT}"
import { ${component.name} } from "${siblingImport(component)}"

const meta = {
  title: "${storyTitle(component)}",
  component: ${component.name},
  tags: ["autodocs"],
} satisfies Meta<typeof ${component.name}>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
${defaultArgs(component)}
}
`
}

export function generateWithControlsTemplate(
  component: ComponentInfo,
  _options: StoryGenerationOptions,
): string {
  return `import type { Meta, StoryObj } from "${STORYBOOK_IMPORT}"
import { ${component.name} } from "${siblingImport(component)}"

const meta = {
  title: "${storyTitle(component)}",
  component: ${component.name},
  tags: ["autodocs"],${argTypesBlock(component)}
} satisfies Meta<typeof ${component.name}>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
${defaultArgs(component)}
}
`
}

export function generateWithVariantsTemplate(
  component: ComponentInfo,
  _options: StoryGenerationOptions,
): string {
  const variantStories = component.dependencies.hasVariants
    ? `
export const Primary: Story = {
  args: {
    variant: "primary",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
  },
}
`
    : ""

  return `import type { Meta, StoryObj } from "${STORYBOOK_IMPORT}"
import { ${component.name} } from "${siblingImport(component)}"

const meta = {
  title: "${storyTitle(component)}",
  component: ${component.name},
  tags: ["autodocs"],${argTypesBlock(component)}
} satisfies Meta<typeof ${component.name}>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
${defaultArgs(component)}
}
${variantStories}`
}

export function generateInteractiveTemplate(
  component: ComponentInfo,
  options: StoryGenerationOptions,
): string {
  const play = options.includePlayFunction
    ? `
export const Interactive: Story = {
  play: async ({ canvas, userEvent }) => {
    const element = canvas.getByRole("button")
    await userEvent.click(element)
  },
}
`
    : ""

  return `import type { Meta, StoryObj } from "${STORYBOOK_IMPORT}"
import { ${component.name} } from "${siblingImport(component)}"

const meta = {
  title: "${storyTitle(component)}",
  component: ${component.name},
  tags: ["autodocs"],
} satisfies Meta<typeof ${component.name}>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
${defaultArgs(component)}
}
${play}`
}

export function generateFormTemplate(
  component: ComponentInfo,
  _options: StoryGenerationOptions,
): string {
  return `import type { Meta, StoryObj } from "${STORYBOOK_IMPORT}"
import { ${component.name} } from "${siblingImport(component)}"

const meta = {
  title: "${storyTitle(component)}",
  component: ${component.name},
  tags: ["autodocs"],
} satisfies Meta<typeof ${component.name}>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
${defaultArgs(component)}
}

export const Filled: Story = {
  args: {
    defaultValue: "example",
  },
}
`
}

export function getTemplateSource(name: string): string {
  const samples: Record<string, string> = {
    basic: escapeForTemplate(generateBasicTemplate(SAMPLE, SAMPLE_OPTIONS)),
    "with-controls": escapeForTemplate(generateWithControlsTemplate(SAMPLE, SAMPLE_OPTIONS)),
    "with-variants": escapeForTemplate(generateWithVariantsTemplate(SAMPLE, SAMPLE_OPTIONS)),
    interactive: escapeForTemplate(
      generateInteractiveTemplate(SAMPLE, {
        ...SAMPLE_OPTIONS,
        includePlayFunction: true,
      }),
    ),
    form: escapeForTemplate(generateFormTemplate(SAMPLE, SAMPLE_OPTIONS)),
  }
  return samples[name] ?? samples.basic ?? ""
}

const SAMPLE: ComponentInfo = {
  name: "Button",
  filePath: "packages/ui/src/button.tsx",
  relativePath: "src/button.tsx",
  directory: "src",
  isDefaultExport: false,
  props: [{ name: "children", type: "ReactNode", required: false }],
  events: [],
  slots: [],
  dependencies: {
    usesCVA: true,
    usesRadix: true,
    usesReactHookForm: false,
    usesShadcnUI: true,
    usesRouter: false,
    usesMSW: false,
    usesReactNative: false,
    usesTamagui: false,
    usesNativeWind: false,
    usesSafeArea: false,
    usesExpoVectorIcons: false,
    usesStyleSheet: false,
    hasVariants: true,
    hasCompoundVariants: false,
    complexity: "medium",
  },
  hasStory: true,
}

const SAMPLE_OPTIONS: StoryGenerationOptions = {
  componentName: "Button",
  includePlayFunction: false,
  includeA11yTests: true,
  includeControls: true,
}
