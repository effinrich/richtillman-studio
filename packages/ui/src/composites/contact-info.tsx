import { Mail, MapPin } from "lucide-react"
import { Chip } from "../chip"
import { GlassPanel } from "../glass-panel"

export function ContactInfo() {
  return (
    <div className="contact-info-card space-y-6 lg:col-span-2">
      <GlassPanel className="rounded-2xl p-6">
        <div className="mb-4 flex items-center gap-3">
          <Mail className="h-5 w-5 text-gold" />
          <h3 className="font-bold text-white">Email</h3>
        </div>
        <a
          href="mailto:hello@richtillman.dev"
          className="text-white/60 transition-colors hover:text-gold"
        >
          hello@richtillman.dev
        </a>
      </GlassPanel>

      <GlassPanel className="rounded-2xl p-6">
        <div className="mb-4 flex items-center gap-3">
          <MapPin className="h-5 w-5 text-cyan" />
          <h3 className="font-bold text-white">Location</h3>
        </div>
        <p className="text-white/60">Remote · US Eastern Time</p>
      </GlassPanel>

      <GlassPanel className="rounded-2xl p-6">
        <div className="mb-2 flex items-center gap-2">
          <Chip variant="status" dot pulse>
            Available for new projects
          </Chip>
        </div>
        <p className="text-sm text-white/40">
          Typical engagement: 3-6 month contracts for design systems, monorepo architecture, or MCP
          tooling.
        </p>
      </GlassPanel>
    </div>
  )
}
