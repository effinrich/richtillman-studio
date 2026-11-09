import { Mail, MapPin } from "lucide-react"

import { Chip } from "../chip"
import { CONTACT_EMAIL, CONTACT_ENGAGEMENT_OPTIONS } from "../contact-copy"
import { GlassPanel } from "../glass-panel"

export function ContactInfo() {
  return (
    <div className="contact-info-card space-y-6 lg:col-span-2">
      <GlassPanel className="rounded-2xl p-6">
        <div className="mb-4 flex items-center gap-3">
          <Mail className="h-5 w-5 text-gold" aria-hidden />
          <h2 className="font-bold text-white">Email</h2>
        </div>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-white/60 transition-colors hover:text-gold"
        >
          {CONTACT_EMAIL}
        </a>
      </GlassPanel>

      <GlassPanel className="rounded-2xl p-6">
        <div className="mb-4 flex items-center gap-3">
          <MapPin className="h-5 w-5 text-cyan" aria-hidden />
          <h2 className="font-bold text-white">Location</h2>
        </div>
        <p className="text-white/60">Remote · US Eastern Time</p>
      </GlassPanel>

      <GlassPanel className="rounded-2xl p-6">
        <div className="mb-2 flex items-center gap-2">
          <Chip variant="status" dot pulse>
            Available for new work
          </Chip>
        </div>
        <p className="text-sm text-white/50">{CONTACT_ENGAGEMENT_OPTIONS}</p>
      </GlassPanel>
    </div>
  )
}
