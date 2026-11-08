import { CONTACT_AVAILABILITY, CONTACT_ENGAGEMENT_OPTIONS, ENQUIRY_TYPES } from "@richtillman/ui"
import { describe, expect, it } from "vitest"

import { FAQ_ITEMS } from "#/features/content/seed-data"

const EMPLOYMENT_ROLE = /principal|staff|leadership|full-time/i

function faqAnswer(questionFragment: string): string {
  return (
    FAQ_ITEMS.find((item) => item.question.toLowerCase().includes(questionFragment))?.answer ?? ""
  )
}

describe("availability copy", () => {
  it("leads with the roles being hired for", () => {
    expect(CONTACT_AVAILABILITY).toMatch(EMPLOYMENT_ROLE)
  })

  it("keeps contract work available without making it the headline", () => {
    expect(CONTACT_AVAILABILITY).not.toMatch(/contract/i)
    expect(CONTACT_ENGAGEMENT_OPTIONS).toMatch(/contract|advisory|fractional/i)
  })

  it("answers the availability question with role types, not contract terms", () => {
    expect(faqAnswer("current availability")).toMatch(EMPLOYMENT_ROLE)
  })

  it("separates fractional work from contract-only work", () => {
    expect(faqAnswer("fractional or part-time")).toMatch(/full-time/i)
  })

  it("offers an employment option in the contact form", () => {
    expect(ENQUIRY_TYPES.some((type) => /full-time|role/i.test(type))).toBe(true)
    expect(ENQUIRY_TYPES.indexOf("Full-time role")).toBe(0)
  })
})
