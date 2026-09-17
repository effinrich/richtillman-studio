import { CheckCircle } from "lucide-react"

export function ContactSuccess() {
  return (
    <div className="success-banner mb-8 flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-6 py-4">
      <CheckCircle className="h-5 w-5 text-green-400" />
      <p className="text-sm text-green-300">
        Message sent! I&apos;ll get back to you within 48 hours.
      </p>
    </div>
  )
}
