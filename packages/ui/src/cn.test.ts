import { describe, expect, it } from "vitest"
import { cn } from "./cn"

describe("cn", () => {
  it("merges class names and resolves Tailwind conflicts", () => {
    expect(cn("px-2", "px-4", "text-sm")).toBe("px-4 text-sm")
  })

  it("handles conditional classes", () => {
    const showHidden = false
    expect(cn("base", showHidden && "hidden", "active")).toBe("base active")
  })
})
