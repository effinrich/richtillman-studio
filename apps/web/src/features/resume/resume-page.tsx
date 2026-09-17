import { ResumeScreen } from "@richtillman/ui"
import { getResumeSections } from "#/features/content/queries"

export function ResumePage() {
  return <ResumeScreen resume={getResumeSections()} />
}
