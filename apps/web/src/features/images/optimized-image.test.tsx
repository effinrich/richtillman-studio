import { OptimizedImage } from "@richtillman/ui/composites/optimized-image.tsx"
import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

describe("optimized image", () => {
  it("offers AVIF and WebP variants with the PNG as the fallback", () => {
    const { container } = render(
      <OptimizedImage src="/images/projects/forgekit-mcp.png" alt="ForgeKit MCP screenshot" />
    )

    const picture = container.querySelector("picture")
    expect(picture).not.toBeNull()

    const sources = Array.from(picture?.querySelectorAll("source") ?? [])
    expect(sources.map((source) => source.getAttribute("type"))).toEqual([
      "image/avif",
      "image/webp"
    ])

    expect(sources[0]?.getAttribute("srcset")).toBe(
      "/images/projects/forgekit-mcp-640.avif 640w, /images/projects/forgekit-mcp.avif 1280w"
    )
    expect(sources[1]?.getAttribute("srcset")).toBe(
      "/images/projects/forgekit-mcp-640.webp 640w, /images/projects/forgekit-mcp.webp 1280w"
    )

    const image = picture?.querySelector("img")
    expect(image?.getAttribute("src")).toBe("/images/projects/forgekit-mcp.png")
    expect(image?.getAttribute("alt")).toBe("ForgeKit MCP screenshot")
  })

  it("keeps the image out of the box flow so the caller layout is unchanged", () => {
    const { container } = render(
      <OptimizedImage src="/images/projects/tokencast.png" alt="TokenCast screenshot" />
    )

    expect(container.querySelector("picture")?.getAttribute("class")).toContain("contents")
  })

  it("passes the sizes hint through to the sources", () => {
    const { container } = render(
      <OptimizedImage
        src="/images/projects/tokencast.png"
        alt="TokenCast screenshot"
        sizes="(min-width: 1024px) 405px, 100vw"
      />
    )

    const source = container.querySelector("source")
    expect(source?.getAttribute("sizes")).toBe("(min-width: 1024px) 405px, 100vw")
  })
})
