// The client module graph, read from the Vite manifest.
//
// The manifest is the build's own record of which source module ended up in
// which chunk, and which chunks a chunk imports statically. That is exactly
// the set of files the browser downloads on a first page view, so it is what
// the bundle budget and the content guard are both measured against.
import { readFileSync } from "node:fs"
import { join } from "node:path"

const CLIENT_DIR = join(process.cwd(), "dist", "client")
const MANIFEST_PATH = join(CLIENT_DIR, ".vite", "manifest.json")

// The home route, as the TanStack Start plugin splits it. The lookup tolerates
// a change to the query suffix, but not a route that moves or disappears.
const HOME_ROUTE_PREFIX = "src/routes/index.tsx"

export function readClientManifest() {
  let manifest

  try {
    manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"))
  } catch {
    console.error(`No client manifest at ${MANIFEST_PATH}. Build the app first.`)
    process.exit(1)
  }

  return manifest
}

export function findHomeRouteKey(manifest) {
  const homeKeys = Object.keys(manifest).filter(
    (key) => key === HOME_ROUTE_PREFIX || key.startsWith(`${HOME_ROUTE_PREFIX}?`)
  )

  if (homeKeys.length === 0) {
    console.error(
      `The client manifest has no chunk for ${HOME_ROUTE_PREFIX}. ` +
        `The home route bundle cannot be measured, so the check fails.`
    )
    process.exit(1)
  }

  if (homeKeys.length > 1) {
    console.error(
      `The client manifest has ${homeKeys.length} chunks for ${HOME_ROUTE_PREFIX} ` +
        `(${homeKeys.join(", ")}). The home route bundle cannot be measured, so the check fails.`
    )
    process.exit(1)
  }

  return homeKeys[0]
}

/** The files the browser downloads for the home route, transitively. */
export function homeRouteFiles(manifest) {
  const visited = new Set()
  const queue = [findHomeRouteKey(manifest)]

  while (queue.length > 0) {
    const key = queue.pop()
    if (visited.has(key)) continue
    visited.add(key)

    const node = manifest[key]
    if (!node) continue

    for (const dependency of node.imports ?? []) {
      if (!visited.has(dependency)) queue.push(dependency)
    }
  }

  const files = []
  const seenFiles = new Set()

  for (const key of visited) {
    const node = manifest[key]
    if (!node?.file) continue
    if (seenFiles.has(node.file)) continue
    seenFiles.add(node.file)

    files.push({ key, file: node.file, path: join(CLIENT_DIR, node.file) })
  }

  if (files.length === 0) {
    console.error("The home route closure is empty. The check cannot be measured, so it fails.")
    process.exit(1)
  }

  return files
}
