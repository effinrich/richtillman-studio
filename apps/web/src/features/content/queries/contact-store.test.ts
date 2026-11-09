import { beforeEach, describe, expect, it } from "vitest"

import {
  bindings,
  recordedStatements,
  resetCloudflareStub,
  restoreCloudflareStub
} from "../../../../test/cloudflare-workers"
import { ContactStoreUnavailableError, saveContactMessage } from "./contact-store"

const message = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  projectType: "Full-time role",
  message: "I have a role for you."
}

describe("saveContactMessage", () => {
  beforeEach(() => {
    resetCloudflareStub()
    restoreCloudflareStub()
  })

  it("inserts the message into contact_messages", async () => {
    await saveContactMessage(message)

    expect(recordedStatements).toHaveLength(1)
    expect(recordedStatements[0]?.query).toContain("insert into contact_messages")
    expect(recordedStatements[0]?.values).toEqual([
      "Ada Lovelace",
      "ada@example.com",
      "Analytical Engines",
      "Full-time role",
      "I have a role for you."
    ])
  })

  it("stores a missing company as null", async () => {
    await saveContactMessage({ ...message, company: undefined })

    expect(recordedStatements[0]?.values[2]).toBeNull()
  })

  it("refuses by name when the database binding is missing", async () => {
    bindings.DB = undefined

    await expect(saveContactMessage(message)).rejects.toBeInstanceOf(ContactStoreUnavailableError)
    await expect(saveContactMessage(message)).rejects.toThrow(/no D1 binding/i)
    expect(recordedStatements).toHaveLength(0)
  })
})
