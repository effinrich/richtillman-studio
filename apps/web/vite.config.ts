import { copyFileSync, existsSync, rmSync } from "node:fs"
import { join } from "node:path"

import { cloudflare } from "@cloudflare/vite-plugin"
import tailwindcss from "@tailwindcss/vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"

/**
 * The bundle budget and the content guard read the Vite manifest, but the
 * client output directory is published as static assets. The manifest is a
 * build record rather than site content, so it is moved next to the client
 * directory instead of being served.
 */
function keepManifestOutOfThePublishedAssets(): Plugin {
  let clientOutDir = ""

  return {
    name: "keep-manifest-out-of-the-published-assets",
    configResolved(config) {
      if (config.build.rollupOptions?.platform === "browser") clientOutDir = config.build.outDir
    },
    closeBundle() {
      if (!clientOutDir) return

      const source = join(clientOutDir, ".vite", "manifest.json")
      if (!existsSync(source)) return

      copyFileSync(source, join(clientOutDir, "..", "client-manifest.json"))
      rmSync(join(clientOutDir, ".vite"), { recursive: true, force: true })
    }
  }
}

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  build: { manifest: true },
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    devtools(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    keepManifestOutOfThePublishedAssets()
  ]
})

export default config
