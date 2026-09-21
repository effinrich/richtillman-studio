import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { BrandMark } from "./brand-mark";

const meta: Meta<typeof BrandMark> = {
  title: "Primitives/BrandMark",
  component: BrandMark,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof BrandMark>;

export const Default: Story = {
  args: { className: "h-16 w-16 text-white" },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector("svg")).toBeInTheDocument();
  },
};

export const Tile: Story = {
  args: { className: "h-16 w-16 text-white", tile: true },
};

export const Standalone: Story = {
  args: {
    className: "h-16 w-16 text-white",
    "aria-hidden": false,
    "aria-label": "Rich Tillman Studio",
    role: "img",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("img", { name: "Rich Tillman Studio" })).toBeInTheDocument();
  },
};
