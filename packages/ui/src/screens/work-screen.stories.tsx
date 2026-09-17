import type { Meta, StoryObj } from "@storybook/tanstack-react"
import { ButtonAnchor } from "../button"
import { SAMPLE_PROJECTS } from "../fixtures"
import { WorkScreen } from "./work-screen"

const meta: Meta<typeof WorkScreen> = {
  title: "Screens/Work",
  component: WorkScreen,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof WorkScreen>

export const Default: Story = {
  args: {
    projects: SAMPLE_PROJECTS,
    discussCta: (
      <ButtonAnchor href="/contact" variant="outline">
        Discuss a project
      </ButtonAnchor>
    ),
  },
}
