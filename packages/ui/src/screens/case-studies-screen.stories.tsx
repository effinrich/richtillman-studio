import type { Meta, StoryObj } from "@storybook/react-vite"
import { ButtonAnchor, CaseStudiesScreen } from "@richtillman/ui"
import { SAMPLE_CASE_STUDIES } from "../fixtures"

const meta: Meta<typeof CaseStudiesScreen> = {
  title: "Screens/CaseStudies",
  component: CaseStudiesScreen,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof CaseStudiesScreen>

export const Default: Story = {
  args: {
    caseStudies: SAMPLE_CASE_STUDIES,
    renderCta: (study) => (
      <ButtonAnchor href={study.href} variant="ghost">
        Read case study
      </ButtonAnchor>
    ),
  },
}
