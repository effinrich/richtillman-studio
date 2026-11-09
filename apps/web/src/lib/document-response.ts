/**
 * Cloudflare's JavaScript Detections, the Bot Fight Mode script, is injected
 * into every HTML document the edge serves. Cloudflare documents that a
 * `no-transform` directive on the origin response stops the injection, so the
 * document opts out of edge transforms.
 *
 * `no-transform` also stops the edge compressing the document, so the
 * response declares the encoding it wants and the runtime compresses it once.
 * The edge then keeps that encoding for a client that accepts it and
 * decompresses it for a client that does not, which is what a browser, a
 * crawler and a plain `curl` each need.
 *
 * The body is never compressed here. The runtime compresses a response whose
 * headers declare an encoding, and compressing it as well would leave the
 * client with two layers to undo.
 *
 * The contact form's honeypot is the form's bot filter, so the edge script is
 * not what stands between a bot and the inbox.
 *
 * @see https://developers.cloudflare.com/cloudflare-challenges/challenge-types/javascript-detections/
 * @see https://developers.cloudflare.com/speed/optimization/content/compression/
 */

const NO_TRANSFORM = "no-transform"
const GZIP = "gzip"

/**
 * Adds `no-transform` to a `Cache-Control` value, keeping the directives that
 * are already there and never repeating the directive.
 */
export function addNoTransform(cacheControl: string | null | undefined): string {
  const directives = (cacheControl ?? "")
    .split(",")
    .map((directive) => directive.trim())
    .filter((directive) => directive.length > 0)
  const alreadyPresent = directives.some((directive) => directive.toLowerCase() === NO_TRANSFORM)
  if (!alreadyPresent) directives.push(NO_TRANSFORM)
  return directives.join(", ")
}

export function isHtmlDocument(response: Response): boolean {
  const contentType = response.headers.get("content-type")
  return contentType !== null && /^text\/html\b/i.test(contentType)
}

/**
 * Adds a value to a `Vary` header, keeping the values that are already there
 * and never repeating one. The document's encoding depends on what the client
 * accepts, so a cache has to key on that.
 */
export function addVary(vary: string | null | undefined, value: string): string {
  const values = (vary ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0)
  const alreadyPresent = values.some((entry) => entry.toLowerCase() === value.toLowerCase())
  if (!alreadyPresent) values.push(value)
  return values.join(", ")
}

/**
 * Prepares an HTML document for the edge: it opts out of edge transforms,
 * which is what keeps the edge from injecting the Bot Fight Mode script, and
 * it declares the encoding the document should be sent in.
 *
 * Anything that is not an HTML document is returned untouched.
 */
export function prepareDocumentResponse(response: Response): Response {
  if (!isHtmlDocument(response)) return response

  const headers = new Headers(response.headers)
  headers.set("cache-control", addNoTransform(headers.get("cache-control")))
  headers.set("vary", addVary(headers.get("vary"), "Accept-Encoding"))
  headers.set("content-encoding", GZIP)

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  })
}
