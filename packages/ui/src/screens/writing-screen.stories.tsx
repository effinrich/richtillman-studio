import type { Meta, StoryObj } from "@storybook/react-vite"

import { SAMPLE_WRITING_ENTRIES } from "../fixtures"
import { WritingScreen } from "./writing-screen"

const meta: Meta<typeof WritingScreen> = {
  title: "Screens/Writing",
  component: WritingScreen,
  parameters: { layout: "fullscreen" }
}

export default meta
type Story = StoryObj<typeof WritingScreen>

export const Default: Story = {
  args: {
    entries: SAMPLE_WRITING_ENTRIES,
    measuredAt: "2026-11-09"
  }
}

export const Empty: Story = {
  args: {
    entries: [],
    measuredAt: "2026-11-09"
  }
}
