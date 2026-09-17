import type { StorybookMcpConfig } from "./types.js"
import { ComponentScanner } from "./utils/scanner.js"
import { StoryGenerator } from "./utils/generator.js"
import { StoryValidator } from "./utils/validator.js"
import { mergeStoryContent } from "./utils/story-merger.js"
import {
  STORY_TEMPLATES,
  TEMPLATE_DESCRIPTIONS,
  TOOL_NAMES,
} from "./constants.js"
import { getTemplateSource } from "./templates.js"
import { resolveLibraryPath } from "./config.js"
import { readFileSync, writeFileSync } from "node:fs"
import type { StoryTemplateName } from "./types.js"

function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object") {
    return value as Record<string, unknown>
  }
  return {}
}

function readString(args: unknown, key: string): string | undefined {
  const value = asRecord(args)[key]
  return typeof value === "string" ? value : undefined
}

function readBoolean(args: unknown, key: string, fallback: boolean): boolean {
  const value = asRecord(args)[key]
  return typeof value === "boolean" ? value : fallback
}

function isTemplateName(value: string | undefined): value is StoryTemplateName {
  return (
    value === "basic" ||
    value === "with-controls" ||
    value === "with-variants" ||
    value === "interactive" ||
    value === "form"
  )
}

function textResult(text: string) {
  return {
    content: [{ type: "text" as const, text }],
  }
}

function jsonResult(value: unknown) {
  return textResult(`${JSON.stringify(value, null, 2)}`)
}

export function createTools(options: {
  repoRoot: string
  config: StorybookMcpConfig
}) {
  const library = options.config.libraries[0]
  const libraryRoot = resolveLibraryPath(
    options.repoRoot,
    library?.path ?? "packages/ui",
  )
  const scanner = new ComponentScanner(libraryRoot, options.config)
  const generator = new StoryGenerator(libraryRoot, options.config)
  const validator = new StoryValidator(options.config)

  return {
    [TOOL_NAMES.LIST_COMPONENTS]: {
      description:
        "List @richtillman/ui components and whether each has a Storybook story.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      handler: async () => {
        const components = await scanner.scan()
        return jsonResult(
          components.map((component) => ({
            name: component.name,
            relativePath: component.relativePath,
            hasStory: component.hasStory,
            storyPath: component.storyPath,
            complexity: component.dependencies.complexity,
          })),
        )
      },
    },
    [TOOL_NAMES.ANALYZE_COMPONENT]: {
      description: "Parse a UI component for props, variants, and story status.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Component export name" },
        },
        required: ["name"],
        additionalProperties: false,
      },
      handler: async (args: unknown) => {
        const name = readString(args, "name")
        if (!name) {
          return textResult("name is required")
        }
        const component = await scanner.getComponent(name)
        if (!component) {
          return textResult(`Component not found: ${name}`)
        }
        return jsonResult(component)
      },
    },
    [TOOL_NAMES.GENERATE_STORY]: {
      description:
        "Write a Storybook CSF file next to a UI component. Imports @richtillman/ui, never relative internals.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string" },
          template: {
            type: "string",
            enum: [...STORY_TEMPLATES],
          },
          includePlayFunction: { type: "boolean" },
          includeControls: { type: "boolean" },
        },
        required: ["name"],
        additionalProperties: false,
      },
      handler: async (args: unknown) => {
        const name = readString(args, "name")
        if (!name) {
          return textResult("name is required")
        }
        const templateArg = readString(args, "template")
        const generated = await generator.generateStory(name, {
          includePlayFunction: readBoolean(args, "includePlayFunction", false),
          includeControls: readBoolean(args, "includeControls", true),
          includeA11yTests: true,
          template: isTemplateName(templateArg) ? templateArg : undefined,
        })
        return jsonResult({
          storyPath: generated.storyPath,
          stories: generated.stories,
        })
      },
    },
    [TOOL_NAMES.UPDATE_STORY]: {
      description:
        "Merge a new story export into an existing CSF file without clobbering Default.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string" },
          storyName: { type: "string" },
          storySource: { type: "string" },
        },
        required: ["name", "storyName", "storySource"],
        additionalProperties: false,
      },
      handler: async (args: unknown) => {
        const name = readString(args, "name")
        const storyName = readString(args, "storyName")
        const storySource = readString(args, "storySource")
        if (!name || !storyName || !storySource) {
          return textResult("name, storyName, and storySource are required")
        }
        const component = await scanner.getComponent(name)
        if (!component?.storyPath) {
          return textResult(`No existing story for ${name}`)
        }
        const existing = readFileSync(component.storyPath, "utf8")
        const merged = mergeStoryContent(existing, storySource, storyName)
        writeFileSync(component.storyPath, merged, "utf8")
        return jsonResult({ storyPath: component.storyPath, storyName })
      },
    },
    [TOOL_NAMES.VALIDATE_STORY]: {
      description: "Lint a generated or existing CSF story for @richtillman/ui.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string" },
        },
        required: ["name"],
        additionalProperties: false,
      },
      handler: async (args: unknown) => {
        const name = readString(args, "name")
        if (!name) {
          return textResult("name is required")
        }
        const component = await scanner.getComponent(name)
        if (!component) {
          return textResult(`Component not found: ${name}`)
        }
        return jsonResult(validator.validate(component))
      },
    },
    [TOOL_NAMES.GET_STORY_TEMPLATE]: {
      description: "Return a CSF template source string.",
      inputSchema: {
        type: "object",
        properties: {
          template: {
            type: "string",
            enum: [...STORY_TEMPLATES],
          },
        },
        required: ["template"],
        additionalProperties: false,
      },
      handler: async (args: unknown) => {
        const template = readString(args, "template") ?? "basic"
        return textResult(getTemplateSource(template))
      },
    },
    [TOOL_NAMES.LIST_TEMPLATES]: {
      description: "List CSF templates this server can emit.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      handler: async () => {
        return jsonResult(
          STORY_TEMPLATES.map((template) => ({
            name: template,
            description: TEMPLATE_DESCRIPTIONS[template],
          })),
        )
      },
    },
    [TOOL_NAMES.GET_COMPONENT_COVERAGE]: {
      description: "Story coverage for packages/ui.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      handler: async () => {
        return jsonResult(await scanner.getCoverage())
      },
    },
    [TOOL_NAMES.SUGGEST_STORIES]: {
      description: "Recommend story templates for a UI component.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string" },
        },
        required: ["name"],
        additionalProperties: false,
      },
      handler: async (args: unknown) => {
        const name = readString(args, "name")
        if (!name) {
          return textResult("name is required")
        }
        const component = await scanner.getComponent(name)
        if (!component) {
          return textResult(`Component not found: ${name}`)
        }
        const suggestions = []
        suggestions.push({
          name: "Default",
          template: "basic",
          reason: "Every primitive needs a Default story.",
        })
        if (component.dependencies.hasVariants) {
          suggestions.push({
            name: "Variants",
            template: "with-variants",
            reason: "CVA variants should each have a story.",
          })
        }
        if (component.dependencies.usesReactHookForm) {
          suggestions.push({
            name: "Form",
            template: "form",
            reason: "Field-like components need filled and empty states.",
          })
        }
        suggestions.push({
          name: "Controls",
          template: "with-controls",
          reason: "ArgTypes keep Chromatic and the addon panel honest.",
        })
        return jsonResult(suggestions)
      },
    },
  }
}
