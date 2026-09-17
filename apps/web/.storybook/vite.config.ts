import { defineConfig } from "vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// Isolated Storybook Vite config — do not merge apps/web vite.config.ts
// (TanStack Start / Nitro). Those plugins expect a single app entry.
export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [tailwindcss(), viteReact()],
})
