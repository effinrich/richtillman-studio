import type { WritingEntry } from "./types"

/**
 * Measured from the dev.to public API on 2026-11-09.
 * Endpoint: https://dev.to/api/articles?username=effinrich&per_page=50
 *
 * Refresh with `bun run writing:sync` from apps/web. The dev.to list endpoint
 * carries metadata only, so this is an index of posts, not a copy of them.
 */
export const WRITING_MEASURED_AT = "2026-11-09"

export const WRITING_ENTRIES: WritingEntry[] = [
  {
    id: 5001125,
    title: "Prose Does Not Bind Agents: Four Safeguards That Fail the Build",
    description:
      "Four safeguards that fail a build when coding agents break them, from a 30-day case study on one repository, with every figure reproducible.",
    url: "https://dev.to/effinrich/prose-does-not-bind-agents-four-safeguards-that-fail-the-build-34b1",
    publishedAt: "2026-11-09",
    readingTimeMinutes: 35,
    tags: ["ai", "testing", "devops", "github"],
    reactions: 0,
    comments: 0,
    coverImage:
      "https://media2.dev.to/dynamic/image/width=1200,height=627,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2F0j6x9ssdx51tgubpppe8.png",
    aiDisclosure: "some_ai"
  },
  {
    id: 4998315,
    title: "Design Tokens as a Compile-Time Contract: Figma Variables to a Typed TypeScript API",
    description:
      "Five rules for making a design token a compile-time contract in a pnpm and Nx monorepo, with the commands to reproduce it.",
    url: "https://dev.to/effinrich/design-tokens-as-a-compile-time-contract-figma-variables-to-a-typed-typescript-api-1fnn",
    publishedAt: "2026-11-08",
    readingTimeMinutes: 23,
    tags: ["typescript", "nx", "figma", "designtokens"],
    reactions: 0,
    comments: 0,
    coverImage:
      "https://media2.dev.to/dynamic/image/width=1200,height=627,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fqxqaf23lzw7j66iz9w3k.png",
    aiDisclosure: "some_ai"
  }
]
