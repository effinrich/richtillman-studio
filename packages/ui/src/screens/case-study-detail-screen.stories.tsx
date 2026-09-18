import type { Meta, StoryObj } from "@storybook/react-vite"
import { CaseStudyDetailScreen } from "./case-study-detail-screen"
import { SAMPLE_CASE_STUDIES } from "../fixtures"

const meta: Meta<typeof CaseStudyDetailScreen> = {
  title: "Screens/CaseStudyDetail",
  component: CaseStudyDetailScreen,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof CaseStudyDetailScreen>

export const Default: Story = {
  args: {
    caseStudy: SAMPLE_CASE_STUDIES[0]!,
    sections: [{ label: "Overview", body: SAMPLE_CASE_STUDIES[0]!.summary }],
    related: [],
  },
}
