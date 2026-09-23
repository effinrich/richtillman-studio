import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const uiSrc = path.resolve(dirname, "../src");
const portfolioLayout = path.resolve(uiSrc, "layout/portfolio-layout.tsx");

const stubCanvasBackground = (): Plugin => ({
  name: "storybook-stub-canvas-background",
  enforce: "pre",
  resolveId(source, importer) {
    if (source === "./canvas-background" && importer === portfolioLayout) {
      return path.resolve(dirname, "stubs/canvas-background.tsx");
    }
    return undefined;
  },
});

// Isolated Storybook Vite config — do not merge apps/web vite.config.ts
// (TanStack Start / Cloudflare Worker). Those plugins expect a single app entry.
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    alias: [
      {
        find: "@richtillman/ui/styles.css",
        replacement: path.resolve(uiSrc, "styles/app.css"),
      },
      {
        find: "@richtillman/ui",
        replacement: path.resolve(uiSrc, "index.ts"),
      },
    ],
  },
  plugins: [stubCanvasBackground(), tailwindcss(), viteReact()],
});
