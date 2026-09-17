import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import fg from "fast-glob"
import { FILE_EXTENSIONS, NON_COMPONENT_FILES, THRESHOLDS } from "../constants.js"
import type {
  ComponentInfo,
  CoverageReport,
  DependencyInfo,
  StorybookMcpConfig,
} from "../types.js"

function isNonComponentFile(filePath: string): boolean {
  const base = path.basename(filePath)
  return (NON_COMPONENT_FILES as readonly string[]).includes(base)
}

function isStoryOrTest(filePath: string): boolean {
  return (
    FILE_EXTENSIONS.STORY.some((ext) => filePath.endsWith(ext)) ||
    FILE_EXTENSIONS.TEST.some((ext) => filePath.endsWith(ext))
  )
}

function pascalFromFile(filePath: string): string | undefined {
  const stem = path.basename(filePath).replace(/\.(tsx|jsx)$/, "")
  if (!stem || stem.includes(".")) return undefined
  const pascal = stem
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
  return pascal || undefined
}

function storySibling(componentPath: string): string | undefined {
  const dir = path.dirname(componentPath)
  const stem = path.basename(componentPath).replace(/\.(tsx|jsx)$/, "")
  const candidates = FILE_EXTENSIONS.STORY.map((ext) =>
    path.join(dir, `${stem}${ext}`),
  )
  return candidates.find((candidate) => existsSync(candidate))
}

function parseExportName(source: string, fallback: string): string {
  const fn = source.match(/export\s+function\s+([A-Z][A-Za-z0-9]+)/)
  if (fn?.[1]) return fn[1]
  const named = source.match(/export\s+\{[^}]*\b([A-Z][A-Za-z0-9]+)\b/)
  if (named?.[1]) return named[1]
  return fallback
}

function parseProps(source: string): ComponentInfo["props"] {
  const block = source.match(
    /(?:type|interface)\s+\w*Props[^{]*\{([^}]+)\}/,
  )
  if (!block?.[1]) return []
  const props: ComponentInfo["props"] = []
  for (const line of block[1].split("\n")) {
    const match = line.trim().match(/^([A-Za-z0-9_]+)(\?)?:\s*([^;/,]+)/)
    const name = match?.[1]
    if (!name) continue
    props.push({
      name,
      type: match[3]?.trim() ?? "unknown",
      required: match[2] !== "?",
    })
  }
  return props
}

function analyzeDependencies(source: string, propCount: number): DependencyInfo {
  const usesCVA = source.includes("cva(") || source.includes("class-variance-authority")
  const complexity: DependencyInfo["complexity"] =
    propCount <= THRESHOLDS.SIMPLE_MAX_PROPS
      ? "simple"
      : propCount <= THRESHOLDS.MEDIUM_MAX_PROPS
        ? "medium"
        : "complex"
  return {
    usesCVA,
    usesRadix: source.includes("radix-ui") || source.includes("Slot"),
    usesReactHookForm: source.includes("react-hook-form"),
    usesShadcnUI: usesCVA,
    usesRouter: source.includes("@tanstack/react-router"),
    usesMSW: source.includes("msw"),
    usesReactNative: false,
    usesTamagui: false,
    usesNativeWind: false,
    usesSafeArea: false,
    usesExpoVectorIcons: false,
    usesStyleSheet: false,
    hasVariants: usesCVA || source.includes("variant"),
    hasCompoundVariants: source.includes("compoundVariants"),
    complexity,
  }
}

export class ComponentScanner {
  constructor(
    private readonly libraryRoot: string,
    private readonly config: StorybookMcpConfig,
  ) {}

  async scan(): Promise<ComponentInfo[]> {
    const files = await fg(this.config.componentPatterns, {
      cwd: this.libraryRoot,
      ignore: this.config.excludePatterns,
      absolute: false,
    })

    const components: ComponentInfo[] = []
    for (const file of files) {
      if (isStoryOrTest(file) || isNonComponentFile(file)) continue
      const fullPath = path.join(this.libraryRoot, file)
      const fallback = pascalFromFile(file)
      if (!fallback) continue
      const source = readFileSync(fullPath, "utf8")
      const name = parseExportName(source, fallback)
      const props = parseProps(source)
      const storyPath = storySibling(fullPath)
      const relativePath = file.replaceAll("\\", "/")
      components.push({
        name,
        filePath: fullPath,
        relativePath,
        directory: path.dirname(relativePath),
        isDefaultExport: /export\s+default/.test(source),
        props,
        events: [],
        slots: [],
        dependencies: analyzeDependencies(source, props.length),
        hasStory: Boolean(storyPath),
        storyPath,
      })
    }

    return components.sort((a, b) => a.name.localeCompare(b.name))
  }

  async getComponent(name: string): Promise<ComponentInfo | undefined> {
    const components = await this.scan()
    return components.find((component) => component.name === name)
  }

  async getCoverage(): Promise<CoverageReport> {
    const components = await this.scan()
    const byDirectory: CoverageReport["byDirectory"] = {}
    for (const component of components) {
      const bucket = byDirectory[component.directory] ?? {
        total: 0,
        withStories: 0,
        percentage: 0,
      }
      bucket.total += 1
      if (component.hasStory) bucket.withStories += 1
      bucket.percentage =
        bucket.total === 0 ? 0 : (bucket.withStories / bucket.total) * 100
      byDirectory[component.directory] = bucket
    }
    const withStories = components.filter((component) => component.hasStory).length
    return {
      totalComponents: components.length,
      componentsWithStories: withStories,
      coveragePercentage:
        components.length === 0 ? 0 : (withStories / components.length) * 100,
      missingStories: components
        .filter((component) => !component.hasStory)
        .map((component) => component.name),
      byDirectory,
    }
  }
}
