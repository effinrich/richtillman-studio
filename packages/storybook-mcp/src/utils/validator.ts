import { existsSync, readFileSync } from "node:fs"
import type { ComponentInfo, StorybookMcpConfig, ValidationResult } from "../types.js"

const STORYBOOK_IMPORT = "@storybook/react-vite"

export class StoryValidator {
  constructor(private readonly config: StorybookMcpConfig) {}

  validate(component: ComponentInfo): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    if (!component.storyPath || !existsSync(component.storyPath)) {
      return {
        valid: false,
        errors: [`No story file for ${component.name}`],
        warnings,
        coverage: {
          hasDefaultStory: false,
          hasPlayFunction: false,
          hasA11yTests: false,
          hasControls: false,
          storyCount: 0,
        },
      }
    }

    const source = readFileSync(component.storyPath, "utf8")
    if (!source.includes("satisfies Meta") && !source.includes("const meta")) {
      errors.push("Missing CSF meta export")
    }
    if (
      !source.includes(`from "${STORYBOOK_IMPORT}"`) &&
      !source.includes(`from '${STORYBOOK_IMPORT}'`)
    ) {
      errors.push(`Stories must import types from ${STORYBOOK_IMPORT}`)
    }
    if (!source.includes('from "@richtillman/ui"') && !source.includes("from '@richtillman/ui'")) {
      errors.push(
        "Stories must import the component from @richtillman/ui, not a relative internals path",
      )
    }
    if (source.includes("../") && source.includes("packages/ui")) {
      errors.push("Do not import UI internals with relative paths")
    }
    if (!component.storyPath.replaceAll("\\", "/").includes(".stories.")) {
      warnings.push(`Story path should match ${this.config.storyFilePattern}`)
    }

    const storyCount = [...source.matchAll(/^export const \w+:\s*Story\b/gm)].length
    const hasDefaultStory = /export const Default:\s*Story\b/.test(source)
    const hasPlayFunction = source.includes("play:")
    const hasA11yTests = source.includes("a11y") || source.includes("axe")
    const hasControls = source.includes("argTypes")

    if (!hasDefaultStory) {
      warnings.push("Add a Default story")
    }
    if (storyCount === 0) {
      errors.push("No story exports found")
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      coverage: {
        hasDefaultStory,
        hasPlayFunction,
        hasA11yTests,
        hasControls,
        storyCount,
      },
    }
  }
}
