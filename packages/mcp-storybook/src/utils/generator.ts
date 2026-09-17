import { mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"
import type {
  ComponentInfo,
  GeneratedStory,
  StorybookMcpConfig,
  StoryGenerationOptions,
  StoryTemplateName,
} from "../types.js"
import {
  generateBasicTemplate,
  generateFormTemplate,
  generateInteractiveTemplate,
  generateWithControlsTemplate,
  generateWithVariantsTemplate,
} from "../templates.js"
import { ComponentScanner } from "./scanner.js"
import { GenerationError, ErrorCode } from "./errors.js"

function pickTemplate(component: ComponentInfo, requested?: StoryTemplateName) {
  if (requested) return requested
  if (component.dependencies.usesReactHookForm) return "form"
  if (component.dependencies.hasVariants) return "with-variants"
  return "with-controls"
}

function render(
  component: ComponentInfo,
  options: StoryGenerationOptions,
): string {
  const template = pickTemplate(component, options.template)
  switch (template) {
    case "basic":
      return generateBasicTemplate(component, options)
    case "with-controls":
      return generateWithControlsTemplate(component, options)
    case "with-variants":
      return generateWithVariantsTemplate(component, options)
    case "interactive":
      return generateInteractiveTemplate(component, options)
    case "form":
      return generateFormTemplate(component, options)
    default: {
      const exhaustive: never = template
      return exhaustive
    }
  }
}

function storyFilePath(component: ComponentInfo): string {
  const dir = path.dirname(component.filePath)
  const stem = path.basename(component.filePath).replace(/\.(tsx|jsx)$/, "")
  return path.join(dir, `${stem}.stories.tsx`)
}

export class StoryGenerator {
  private readonly scanner: ComponentScanner

  constructor(
    libraryRoot: string,
    config: StorybookMcpConfig,
  ) {
    this.scanner = new ComponentScanner(libraryRoot, config)
  }

  async generateStory(
    name: string,
    options: Omit<StoryGenerationOptions, "componentName"> & {
      template?: StoryTemplateName
    },
  ): Promise<GeneratedStory> {
    const component = await this.scanner.getComponent(name)
    if (!component) {
      throw new GenerationError(
        `Component not found: ${name}`,
        ErrorCode.COMPONENT_NOT_FOUND,
      )
    }

    const fullOptions: StoryGenerationOptions = {
      componentName: name,
      includePlayFunction: options.includePlayFunction,
      includeA11yTests: options.includeA11yTests,
      includeControls: options.includeControls,
      template: options.template,
    }
    const content = render(component, fullOptions)
    const storyPath = storyFilePath(component)
    mkdirSync(path.dirname(storyPath), { recursive: true })
    writeFileSync(storyPath, content, "utf8")

    const stories = [...content.matchAll(/^export const (\w+):/gm)].flatMap(
      (match) => (match[1] ? [match[1]] : []),
    )

    return {
      componentName: name,
      storyPath,
      content,
      stories,
    }
  }
}
