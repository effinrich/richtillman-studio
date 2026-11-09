import { describe, expect, it } from "vitest"

import {
  addNoTransform,
  addVary,
  isHtmlDocument,
  prepareDocumentResponse
} from "./document-response"

const DOCUMENT = "<!doctype html><html><body><h1>Rich Tillman</h1></body></html>"

function documentResponse(headers: Record<string, string> = {}): Response {
  return new Response(DOCUMENT, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8", ...headers }
  })
}

describe("addNoTransform", () => {
  it("adds the directive to a response with no cache control", () => {
    expect(addNoTransform(null)).toBe("no-transform")
  })

  it("keeps the directives that are already there", () => {
    expect(addNoTransform("public, max-age=0")).toBe("public, max-age=0, no-transform")
  })

  it("does not repeat a directive that is already there", () => {
    expect(addNoTransform("no-transform")).toBe("no-transform")
    expect(addNoTransform("public, no-transform")).toBe("public, no-transform")
  })

  it("recognises the directive whatever its case", () => {
    expect(addNoTransform("No-Transform")).toBe("No-Transform")
  })
})

describe("addVary", () => {
  it("adds the value to a response with no vary header", () => {
    expect(addVary(null, "Accept-Encoding")).toBe("Accept-Encoding")
  })

  it("keeps the values that are already there", () => {
    expect(addVary("Origin", "Accept-Encoding")).toBe("Origin, Accept-Encoding")
  })

  it("does not repeat a value that is already there", () => {
    expect(addVary("accept-encoding", "Accept-Encoding")).toBe("accept-encoding")
  })
})

describe("isHtmlDocument", () => {
  it("accepts an HTML document", () => {
    expect(isHtmlDocument(documentResponse())).toBe(true)
  })

  it("rejects a response that is not a document", () => {
    expect(
      isHtmlDocument(new Response("{}", { headers: { "content-type": "application/json" } }))
    ).toBe(false)
  })

  it("rejects a response with no content type", () => {
    expect(isHtmlDocument(new Response("{}"))).toBe(false)
  })
})

describe("prepareDocumentResponse", () => {
  it("opts the document out of edge transforms", () => {
    const response = prepareDocumentResponse(documentResponse())
    expect(response.headers.get("cache-control")).toBe("no-transform")
  })

  it("keeps the cache control directives the document already had", () => {
    const response = prepareDocumentResponse(
      documentResponse({ "cache-control": "public, max-age=0" })
    )
    expect(response.headers.get("cache-control")).toBe("public, max-age=0, no-transform")
  })

  it("keys a cache on what the client accepts", () => {
    const response = prepareDocumentResponse(documentResponse())
    expect(response.headers.get("vary")).toBe("Accept-Encoding")
  })

  it("declares the encoding the document is sent in", () => {
    const response = prepareDocumentResponse(documentResponse())
    expect(response.headers.get("content-encoding")).toBe("gzip")
  })

  it("leaves the body for the runtime to compress", async () => {
    const response = prepareDocumentResponse(documentResponse())
    await expect(response.text()).resolves.toBe(DOCUMENT)
  })

  it("leaves a response that is not a document alone", () => {
    const original = new Response("{}", { headers: { "content-type": "application/json" } })
    expect(prepareDocumentResponse(original)).toBe(original)
  })

  it("keeps the status of the document", () => {
    const response = prepareDocumentResponse(
      new Response(DOCUMENT, {
        status: 404,
        headers: { "content-type": "text/html; charset=utf-8" }
      })
    )
    expect(response.status).toBe(404)
  })
})
