import type { NpmDownloadsModel } from "./models"

/**
 * The ForgeKit MCP line the portfolio features: the Figma-to-React pair.
 * Downloads for these two are reported separately from the portfolio total.
 */
export const FEATURED_MCP_PACKAGES = ["forgekit-figma-mcp", "forgekit-storybook-mcp"] as const

/**
 * Every package published to npm under the ForgeKit and @effinrich names.
 * The portfolio total is the sum across all of them.
 */
export const PUBLISHED_PACKAGES = [
  "forgekit-figma-mcp",
  "forgekit-storybook-mcp",
  "forgekit-radix-mcp",
  "@effinrich/figma-drift",
  "@effinrich/nx-storybook",
  "@effinrich/ui"
] as const

/**
 * Last measured counts from the npm downloads API, 12 months ending
 * 2026-11-07. Used as the fallback when the API cannot be reached.
 */
export const NPM_DOWNLOADS_SEED: NpmDownloadsModel = {
  measuredAt: "2026-11-07",
  live: false,
  packages: [
    { name: "forgekit-figma-mcp", downloads: 330 },
    { name: "forgekit-storybook-mcp", downloads: 7675 },
    { name: "forgekit-radix-mcp", downloads: 367 },
    { name: "@effinrich/figma-drift", downloads: 292 },
    { name: "@effinrich/nx-storybook", downloads: 256 },
    { name: "@effinrich/ui", downloads: 488 }
  ]
}

export function sumDownloads(model: NpmDownloadsModel, names?: readonly string[]): number {
  const wanted = names ? new Set(names) : null

  return model.packages.reduce((total, entry) => {
    if (wanted && !wanted.has(entry.name)) return total
    return total + entry.downloads
  }, 0)
}
