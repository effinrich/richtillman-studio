// Fails the build when the client JavaScript grows past the budget.
//
// The budget is the total gzip size of every JavaScript file the browser can
// be asked to download from the built client. It is the number that decides
// how long the site takes to become usable on a slow connection.
import { gzipSync } from "node:zlib"
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"

const BUDGET_BYTES = 160 * 1024

const ASSET_DIR = join(process.cwd(), "dist", "client", "assets")

function clientScripts(directory) {
  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".js"))
    .map((entry) => join(directory, entry.name))
}

let assets
try {
  assets = clientScripts(ASSET_DIR)
} catch {
  console.error(`No client assets at ${ASSET_DIR}. Build the app first.`)
  process.exit(1)
}

const files = assets.map((path) => ({
  name: path.split(/[\\/]/).pop(),
  gzip: gzipSync(readFileSync(path)).length
}))

const total = files.reduce((sum, file) => sum + file.gzip, 0)
const largest = [...files].sort((a, b) => b.gzip - a.gzip).slice(0, 5)

console.log("Client JavaScript, gzip:")
for (const file of largest) {
  console.log(`  ${(file.gzip / 1024).toFixed(1).padStart(7)} KiB  ${file.name}`)
}
console.log(
  `  ${(total / 1024).toFixed(1).padStart(7)} KiB  total across ${files.length} files`
)
console.log(`Budget: ${(BUDGET_BYTES / 1024).toFixed(0)} KiB`)

if (total > BUDGET_BYTES) {
  console.error(
    `\nOver budget by ${((total - BUDGET_BYTES) / 1024).toFixed(1)} KiB. ` +
      `Split the route that owns the code, or raise the budget deliberately.`
  )
  process.exit(1)
}

console.log(`\nUnder budget by ${((BUDGET_BYTES - total) / 1024).toFixed(1)} KiB.`)
