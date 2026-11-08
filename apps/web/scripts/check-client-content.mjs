// Fails the build when the home route ships seed content it does not render.
//
// The seed content is the full corpus of projects, articles, case studies and
// resume copy. The server keeps all of it as the fallback when Supabase is
// not configured, but a browser only ever needs the collection the route it
// is on renders. This check reads the built client bundle and fails if the
// home route's download carries any of it.
import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

import { homeRouteFiles, readClientManifest } from "./client-graph.mjs"

// Short strings are ignored on purpose. A label like "React Native" can
// appear in unrelated code, and a match on one of those would be noise
// rather than evidence that a collection shipped.
const MIN_STRING_LENGTH = 24

const SEED_DIR = join(process.cwd(), "src", "features", "content", "seed")

const manifest = readClientManifest()
const files = homeRouteFiles(manifest)

const bundle = files.map((file) => readFileSync(file.path, "utf8")).join("\n")

const offenders = []

for (const name of readdirSync(SEED_DIR).filter((entry) => entry.endsWith(".ts"))) {
  const source = readFileSync(join(SEED_DIR, name), "utf8")
  const strings = [...source.matchAll(/"([^"]{12,400})"/g)].map((match) => match[1])
  const distinctive = strings.filter((value) => value.length >= MIN_STRING_LENGTH)

  if (distinctive.length === 0) {
    if (strings.length > 0) {
      console.error(
        `The seed collection ${name} has content but no string long enough to detect ` +
          `it in the bundle, so the check cannot verify it and fails.`
      )
      process.exit(1)
    }

    continue
  }

  const shipped = distinctive.filter((value) => bundle.includes(value))
  if (shipped.length > 0) {
    offenders.push(`${name} ships ${shipped.length} of ${distinctive.length} strings`)
  }
}

if (offenders.length > 0) {
  console.error("\nThe home route ships seed content it does not render:")
  for (const offender of offenders) console.error(`  ${offender}`)
  console.error(
    "\nMove the collection behind the content layer, or let the route that renders it " +
      "fetch it there."
  )
  process.exit(1)
}

console.log(`The home route ships no seed content across ${files.length} client files.`)
