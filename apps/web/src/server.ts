import type { Register } from "@tanstack/react-router"
import {
  createServerEntry as createCoreServerEntry,
  createStartHandler,
  defaultStreamHandler
} from "@tanstack/react-start/server"
import type { RequestHandler } from "@tanstack/react-start/server"

import { prepareDocumentResponse } from "./lib/document-response"

const startHandler = createStartHandler(defaultStreamHandler)

// Providing `RequestHandler` from `@tanstack/react-start/server` is required so that the output types don't import it from `@tanstack/start-server-core`
export type ServerEntry = { fetch: RequestHandler<Register> }

// Bind the shared request context and fallback error handling to React's Register.
export const createServerEntry: (entry: ServerEntry) => ServerEntry =
  createCoreServerEntry<Register>

/**
 * The document opts out of Cloudflare's edge transforms, which is what keeps
 * the edge from injecting the Bot Fight Mode script into every page.
 */
const fetch: RequestHandler<Register> = async (request, options) => {
  const response = await startHandler(request, options)
  return prepareDocumentResponse(response)
}

export default createServerEntry({ fetch })
