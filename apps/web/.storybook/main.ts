import type { StorybookConfig } from "@storybook/tanstack-react"
import path from "node:path"
import { fileURLToPath } from "node:url"

const dirname = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(ts|tsx)",
    "../../../packages/ui/src/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/tanstack-react",
    options: {
      builder: {
        viteConfigPath: ".storybook/vite.config.ts",
      },
    },
  },
  viteFinal: async (cfg) => {
    cfg.resolve = cfg.resolve ?? {}
    const srcPath = path.resolve(dirname, "../src")
    const canvasStubPath = path.resolve(dirname, "./stubs/canvas-background.tsx")
    cfg.resolve.alias = [
      { find: "#/features/layout/canvas-background", replacement: canvasStubPath },
      { find: "#", replacement: srcPath },
    ]
    return cfg
  },
}

export default config
