import { useState } from "react"
import { GlassPanel } from "../glass-panel"
import type { ColorToken } from "../models"

type TokenSwatchProps = {
  token: ColorToken
}

export function TokenSwatch({ token }: TokenSwatchProps) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(token.value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <GlassPanel className="overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={() => {
          void copy()
        }}
        className="group flex w-full cursor-pointer flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-inset"
        aria-label={`Copy ${token.name} token ${token.value}`}
      >
        <span
          className="block h-20 w-full border-b border-white/10"
          style={{ background: token.value }}
          aria-hidden
        />
        <span className="flex flex-col gap-1 p-4">
          <span className="font-mono text-sm text-white">{token.name}</span>
          <span className="font-mono text-[11px] text-white/40">
            {copied ? "Copied" : token.value}
          </span>
          <span className="mt-1 text-xs leading-relaxed text-white/50">{token.usage}</span>
        </span>
      </button>
    </GlassPanel>
  )
}
