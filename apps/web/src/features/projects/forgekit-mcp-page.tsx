import { ForgekitMcpScreen } from "@richtillman/ui"
import type { NpmDownloadsModel } from "@richtillman/ui"

type ForgekitMcpPageProps = {
  npmDownloads: NpmDownloadsModel
}

export function ForgekitMcpPage({ npmDownloads }: ForgekitMcpPageProps) {
  return <ForgekitMcpScreen npmDownloads={npmDownloads} />
}
