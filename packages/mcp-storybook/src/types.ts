export type Framework = "shadcn" | "vanilla"

export type StoryTemplateName =
  | "basic"
  | "with-controls"
  | "with-variants"
  | "interactive"
  | "form"

export interface ComponentProp {
  name: string
  type: string
  required: boolean
  defaultValue?: string
  description?: string
}

export interface ComponentEvent {
  name: string
  payload?: string
  description?: string
}

export interface ComponentSlot {
  name: string
  description?: string
}

export interface DependencyInfo {
  usesCVA: boolean
  usesRadix: boolean
  usesReactHookForm: boolean
  usesShadcnUI: boolean
  usesRouter: boolean
  usesMSW: boolean
  usesReactNative: boolean
  usesTamagui: boolean
  usesNativeWind: boolean
  usesSafeArea: boolean
  usesExpoVectorIcons: boolean
  usesStyleSheet: boolean
  hasVariants: boolean
  hasCompoundVariants: boolean
  complexity: "simple" | "medium" | "complex"
}

export interface ComponentInfo {
  name: string
  filePath: string
  relativePath: string
  directory: string
  isDefaultExport: boolean
  props: ComponentProp[]
  events: ComponentEvent[]
  slots: ComponentSlot[]
  dependencies: DependencyInfo
  description?: string
  hasStory: boolean
  storyPath?: string
}

export interface LibraryConfig {
  name: string
  path: string
  storyTitlePrefix?: string
}

export interface StorybookMcpConfig {
  framework: Framework
  storyFilePattern: string
  componentPatterns: string[]
  excludePatterns: string[]
  libraries: LibraryConfig[]
}

export interface StoryGenerationOptions {
  componentName: string
  includePlayFunction: boolean
  includeA11yTests: boolean
  includeControls: boolean
  template?: StoryTemplateName
}

export interface GeneratedStory {
  componentName: string
  storyPath: string
  content: string
  stories: string[]
}

export interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
  coverage: {
    hasDefaultStory: boolean
    hasPlayFunction: boolean
    hasA11yTests: boolean
    hasControls: boolean
    storyCount: number
  }
}

export interface CoverageReport {
  totalComponents: number
  componentsWithStories: number
  coveragePercentage: number
  missingStories: string[]
  byDirectory: Record<
    string,
    {
      total: number
      withStories: number
      percentage: number
    }
  >
}

export interface StorySuggestion {
  name: string
  description: string
  template: StoryTemplateName
  reason: string
}

export const DEFAULT_CONFIG: StorybookMcpConfig = {
  framework: "shadcn",
  storyFilePattern: "**/*.stories.{ts,tsx}",
  componentPatterns: ["src/**/*.tsx", "!**/*.stories.tsx", "!**/*.test.tsx"],
  excludePatterns: ["**/node_modules/**", "**/dist/**", "**/.storybook/**"],
  libraries: [
    {
      name: "ui",
      path: "packages/ui",
      storyTitlePrefix: "UI",
    },
  ],
}
