import { Link } from "@tanstack/react-router"
import { Github, Linkedin, Mail } from "lucide-react"
import { SECONDARY_NAV } from "#/features/layout/types"

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
        <div>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded border border-white/20 bg-zinc-900 font-mono text-xl font-bold text-gold">
              R
            </div>
            <div>
              <p className="text-sm font-bold text-white">Rich Tillman</p>
              <p className="text-xs uppercase tracking-widest text-white/30">
                Principal Frontend Engineer
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/40">
            Building the bridge between design systems and AI-native developer tooling.
          </p>
        </div>

        <div>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
            Explore
          </p>
          <ul className="space-y-2 text-sm text-white/60">
            {SECONDARY_NAV.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="transition-colors hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
            Connect
          </p>
          <div className="flex gap-4">
            <a
              href="mailto:hello@richtillman.dev"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-colors hover:border-gold/30 hover:text-gold"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/effinrich"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-colors hover:border-gold/30 hover:text-gold"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/richtillman"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-colors hover:border-gold/30 hover:text-gold"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-white/20 md:flex-row">
        <span>© {new Date().getFullYear()} Rich Tillman. All rights reserved.</span>
        <span className="font-mono uppercase tracking-[0.2em]">
          React 19 · TanStack Start · Tailwind v4
        </span>
      </div>
    </footer>
  )
}
