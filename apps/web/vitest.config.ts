import { fileURLToPath } from "node:url"

import tailwindcss from "@tailwindcss/vite"
import viteReact from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

// Standalone Vitest config — no Cloudflare / TanStack Start plugins.
// `cloudflare:workers` only resolves inside the Worker runtime, so it is
// aliased to a test double that records the statements the code issues.
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    alias: [
      {
        find: "cloudflare:workers",
        replacement: fileURLToPath(new URL("./test/cloudflare-workers.ts", import.meta.url))
      }
    ]
  },
  plugins: [tailwindcss(), viteReact()],
  test: {
    globals: false,
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["text", "json-summary"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.stories.{ts,tsx}", "src/**/*.test.{ts,tsx}", "src/routes/**"]
    }
  }
})
