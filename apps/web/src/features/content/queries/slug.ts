// The slug is the only input the route loaders send to a server function. It
// is validated rather than cast, so a malformed request fails at the boundary
// instead of turning into an undefined lookup.
export const slugValidator = {
  types: { input: "" as string, output: "" as string },
  parse: (input: unknown) => {
    if (typeof input !== "string" || input.length === 0) {
      throw new Error("A route slug is required")
    }

    return input
  }
}
