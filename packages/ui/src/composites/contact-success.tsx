import { CheckCircle } from "lucide-react";

export function ContactSuccess() {
  return (
    <div className="success-banner mb-8 flex items-center gap-3 rounded-xl border border-success/30 bg-success/10 px-6 py-4">
      <CheckCircle className="h-5 w-5 text-success" aria-hidden />
      <p className="text-sm text-success-foreground">
        Message sent! I&apos;ll get back to you within 48 hours.
      </p>
    </div>
  );
}
