import { createServerFn } from "@tanstack/react-start"

import { getNpmDownloads } from "#/features/content/npm-downloads"

export const getNpmDownloadsSnapshot = createServerFn({ method: "GET" }).handler(async () => {
  return getNpmDownloads()
})
