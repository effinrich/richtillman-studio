import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import type { ComponentInfo, StorybookMcpConfig, ValidationResult } from "../types.js"

const STORYBOOK_IMPORT = "@storybook/react-vite"
const PACKAGE_BARREL = "@richtillman/ui"

function hasStorybookImport(source: string): boolean {
  return (
    source.includes(`from "${STORYBOOK_IMPORT}"`) ||
    source.includes(`from '${STORYBOOK_IMPORT}'`)
  )
}

function importsPackageBarrel(source: string): boolean {
  return (
    source.includes(`from "${PACKAGE_BARREL}"`) ||
    source.includes(`from '${PACKAGE_BARREL}'`)
  )
}

function hasNamedRelativeImport(source: string, exportName: string): boolean {
  const escaped = exportName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const re = new RegExp(
    String.raw`import\s+(?:type\s+)?(?:\{[\s\S]*?\b${escaped}\b[\s\S]*?\}|${escaped})\s+from\s+['"]\.[^'"]+['"]`,
  )
  return re.test(source)
}

function importsRepoRootInternals(source: string): boolean {
  return /from\s+['"][^'"]*packages\/ui[^'"]*['"]/.test(source)
}

function siblingStem(component: Pick<ComponentInfo, "filePath">): string {
  return path.basename(component.filePath).replace(/\.(tsx|jsx)$/, "")
}

export function validateStorySource(
  source: string,
  component: Pick<ComponentInfo, "name" | "filePath">,
  storyPath: string,
  config: StorybookMcpConfig,
): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  if (!source.includes("satisfies Meta") && !source.includes("const meta")) {
    errors.push("Missing CSF meta export")
  }
  if (!hasStorybookImport(source)) {
    errors.push(`Stories must import types from ${STORYBOOK_IMPORT}`)
  }
  if (importsPackageBarrel(source)) {
    errors.push(
      "Colocated stories must import from a relative module, not @richtillman/ui",
    )
  }
  if (!hasNamedRelativeImport(source, component.name)) {
    errors.push(
      `Stories must import ${component.name} from "./${siblingStem(component)}"`,
    )
  }
  if (importsRepoRootInternals(source)) {
    errors.push("Do not import UI internals with repo-root relative paths")
  }
  if (!storyPath.replaceAll("\\", "/").includes(".stories.")) {
    warnings.push(`Story path should match ${config.storyFilePattern}`)
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

export class StoryValidator {
  constructor(private readonly config: StorybookMcpConfig) {}

  validate(component: ComponentInfo): ValidationResult {
    if (!component.storyPath || !existsSync(component.storyPath)) {
      return {
        valid: false,
        errors: [`No story file for ${component.name}`],
        warnings: [],
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
    return validateStorySource(
      source,
      component,
      component.storyPath,
      this.config,
    )
  }
}
