const TICKER_ITEMS = [
  "Next.js",
  "TanStack Start",
  "React Native",
  "Expo",
  "Storybook 10+",
  "Chromatic",
  "Nx",
  "Turborepo",
  "Chakra UI",
  "shadcn/ui",
  "Tamagui",
  "Radix UI",
  "Figma MCP",
]

export function TechTicker() {
  const row = (
    <div className="flex items-center gap-12 px-6">
      {TICKER_ITEMS.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center gap-12">
          <span>{item}</span>
          {index < TICKER_ITEMS.length - 1 ? <span className="text-white/10">/</span> : null}
        </span>
      ))}
    </div>
  )

  return (
    <div className="pointer-events-none relative z-10 w-full overflow-hidden border-t border-white/5 bg-black/50 py-4 backdrop-blur-sm">
      <div className="animate-ticker flex whitespace-nowrap font-mono text-xs uppercase tracking-widest text-white/30">
        {row}
        {row}
      </div>
    </div>
  )
}
