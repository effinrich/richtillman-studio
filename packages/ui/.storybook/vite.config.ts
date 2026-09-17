import path from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

const dirname = path.dirname(fileURLToPath(import.meta.url))

// Isolated Storybook Vite config — do not merge apps/web vite.config.ts
// (TanStack Start / Nitro / Vercel). Those plugins expect a single app entry.
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    alias: {
      [path.resolve(dirname, "../src/layout/canvas-background.tsx")]: path.resolve(
        dirname,
        "stubs/canvas-background.tsx",
      ),
    },
  },
  plugins: [tailwindcss(), viteReact()],
})
