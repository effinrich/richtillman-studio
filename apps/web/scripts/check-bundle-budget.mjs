// Fails the build when the client JavaScript the home route loads grows past
// the budget.
//
// The metric comes from the Vite manifest, so it is the browser's own module
// graph: the home route chunk plus everything it imports statically. Lazily
// imported route chunks are not counted, because a visitor who never opens
// those routes never downloads them.
import { gzipSync } from "node:zlib"
import { readFileSync } from "node:fs"

import { homeRouteFiles, readClientManifest } from "./client-graph.mjs"

const BUDGET_BYTES = 160 * 1024

const manifest = readClientManifest()
const files = homeRouteFiles(manifest)

const measured = files.map((file) => ({
  name: file.file,
  gzip: gzipSync(readFileSync(file.path)).length
}))

const total = measured.reduce((sum, file) => sum + file.gzip, 0)

console.log("Client JavaScript the home route loads, gzip:")
for (const file of measured.sort((a, b) => b.gzip - a.gzip)) {
  console.log(`  ${(file.gzip / 1024).toFixed(1).padStart(7)} KiB  ${file.name}`)
}
console.log(`  ${(total / 1024).toFixed(1).padStart(7)} KiB  total across ${measured.length} files`)
console.log(`Budget: ${(BUDGET_BYTES / 1024).toFixed(0)} KiB`)

if (total > BUDGET_BYTES) {
  console.error(
    `\nOver budget by ${((total - BUDGET_BYTES) / 1024).toFixed(1)} KiB. ` +
      `Split the route that owns the code, or raise the budget deliberately.`
  )
  process.exit(1)
}

console.log(`\nUnder budget by ${((BUDGET_BYTES - total) / 1024).toFixed(1)} KiB.`)
