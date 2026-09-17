import { defineConfig } from "vitest/config"
import path from "node:path"
import { fileURLToPath } from "node:url"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import { playwright } from "@vitest/browser-playwright"

const dirname = path.dirname(fileURLToPath(import.meta.url))

// Standalone Vitest config — no Nitro / TanStack Start plugins.
// Those break Vitest the same way the old Cloudflare plugin did.
export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    globals: false,
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["text", "json-summary"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.stories.{ts,tsx}", "src/**/*.test.{ts,tsx}", "src/routes/**"],
    },
    projects: [
      {
        extends: true,
        plugins: [tailwindcss(), viteReact()],
        test: {
          name: "unit",
          environment: "jsdom",
          include: ["src/**/*.{test,spec}.{ts,tsx}"],
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
})
