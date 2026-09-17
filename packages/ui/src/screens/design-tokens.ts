import type { ColorToken, TypeSpecimen } from "../models"

export const BRAND_TOKENS: ColorToken[] = [
  {
    name: "gold",
    cssVar: "--color-gold",
    value: "#ffd700",
    usage: "Primary CTA, eyebrows, availability, focus ring",
  },
  {
    name: "cyan",
    cssVar: "--color-cyan",
    value: "#00f0ff",
    usage: "Secondary accent, stack highlights, neon text",
  },
  {
    name: "magenta",
    cssVar: "--color-magenta",
    value: "#ff007f",
    usage: "Tertiary accent, third stop on neon-text",
  },
]

export const SURFACE_TOKENS: ColorToken[] = [
  {
    name: "black",
    cssVar: "bg-black",
    value: "#000000",
    usage: "Page background (OLED)",
  },
  {
    name: "glass",
    cssVar: "--color-glass",
    value: "rgba(20, 20, 20, 0.4)",
    usage: "Panels, nav, chips — with 16px blur",
  },
  {
    name: "border-glass",
    cssVar: "--color-border-glass",
    value: "rgba(255, 255, 255, 0.08)",
    usage: "Hairline borders on glass surfaces",
  },
  {
    name: "white",
    cssVar: "text-white",
    value: "#ffffff",
    usage: "Primary text, headings",
  },
]

export const TYPE_SPECIMENS: TypeSpecimen[] = [
  {
    role: "Hero",
    sample: "Building the bridge.",
    spec: "Inter 800 · 48–96px · tracking-tighter",
    className: "text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl",
  },
  {
    role: "Section",
    sample: "Frontend & AI-native tooling.",
    spec: "Inter 700 · 48–72px · tracking-tighter",
    className: "text-5xl font-bold tracking-tighter md:text-7xl",
  },
  {
    role: "Body",
    sample:
      "I architect enterprise-scale React platforms, Nx monorepos, and the design systems that keep design, product, and engineering shipping in lockstep.",
    spec: "Inter 400 · 18–20px · leading-relaxed · white/60",
    className: "max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl",
  },
  {
    role: "Eyebrow",
    sample: "Selected Work",
    spec: "JetBrains Mono · 12px · uppercase · tracking 0.3em · gold",
    className: "font-mono text-xs uppercase tracking-[0.3em] text-gold",
  },
  {
    role: "Metric",
    sample: "6,200+",
    spec: "Inter 700 · 30–48px · tracking-tight",
    className: "text-4xl font-bold tracking-tight md:text-5xl",
  },
]
