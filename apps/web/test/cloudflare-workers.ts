/**
 * A stand-in for the `cloudflare:workers` module, which only resolves inside
 * the Worker runtime. Vitest runs in Node, so the D1 binding is faked here
 * and the real insert is asserted against the recorded statement.
 */

export type RecordedStatement = {
  query: string
  values: unknown[]
}

export const recordedStatements: RecordedStatement[] = []

export function resetCloudflareStub(): void {
  recordedStatements.length = 0
}

function createFakeDatabase() {
  return {
    prepare(query: string) {
      const values: unknown[] = []

      const statement = {
        bind(...bound: unknown[]) {
          values.push(...bound)
          return statement
        },
        async first() {
          recordedStatements.push({ query, values: [...values] })
          return { id: 1 }
        },
        async run() {
          recordedStatements.push({ query, values: [...values] })
          return { success: true }
        },
        async all() {
          recordedStatements.push({ query, values: [...values] })
          return { results: [] }
        }
      }

      return statement
    }
  }
}

/**
 * The bindings the Worker would expose. A test sets `DB` to undefined to
 * exercise the path where the binding is missing.
 */
export const bindings: { DB?: unknown } = { DB: createFakeDatabase() }

export const env = bindings

export function restoreCloudflareStub(): void {
  bindings.DB = createFakeDatabase()
}
