export const FILE_EXTENSIONS = {
  COMPONENT: [".tsx", ".jsx"],
  STORY: [".stories.tsx", ".stories.ts", ".stories.jsx", ".stories.js"],
  TEST: [".test.tsx", ".test.ts", ".spec.tsx", ".spec.ts"],
} as const

export const NON_COMPONENT_FILES = [
  "index.ts",
  "index.tsx",
  "index.js",
  "index.jsx",
  "cn.ts",
  "cn.tsx",
  "utils.ts",
  "utils.tsx",
  "types.ts",
  "types.tsx",
] as const

export const DIRECTORIES = {
  COMPONENTS: "src",
  STORIES: "src",
} as const

export const STORY_SEARCH_PATHS = [
  DIRECTORIES.COMPONENTS,
  DIRECTORIES.STORIES,
] as const

export const THRESHOLDS = {
  SIMPLE_MAX_PROPS: 5,
  MEDIUM_MAX_PROPS: 10,
} as const

export const STORY_TEMPLATES = [
  "basic",
  "with-controls",
  "with-variants",
  "interactive",
  "form",
] as const

export const TEMPLATE_DESCRIPTIONS: Record<
  (typeof STORY_TEMPLATES)[number],
  string
> = {
  basic: "Default export plus a Default story",
  "with-controls": "ArgTypes wired so Chromatic and the addon panel stay useful",
  "with-variants": "One story per CVA / size / visual variant",
  interactive: "play() coverage for clicks and keyboard",
  form: "Field, Label, and native Select stories",
}

export const TOOL_NAMES = {
  LIST_COMPONENTS: "list_components",
  ANALYZE_COMPONENT: "analyze_component",
  GENERATE_STORY: "generate_story",
  UPDATE_STORY: "update_story",
  VALIDATE_STORY: "validate_story",
  GET_STORY_TEMPLATE: "get_story_template",
  LIST_TEMPLATES: "list_templates",
  GET_COMPONENT_COVERAGE: "get_component_coverage",
  SUGGEST_STORIES: "suggest_stories",
} as const
