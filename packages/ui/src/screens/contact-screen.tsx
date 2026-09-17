import { useState } from "react"
import { ContactForm } from "../composites/contact-form"
import { ContactInfo } from "../composites/contact-info"
import { ContactSuccess } from "../composites/contact-success"
import { PortfolioLayout } from "../layout/portfolio-layout"
import type { ContactSubmitHandler } from "../models"
import { SectionHeader } from "../section-header"

type ContactScreenProps = {
  onSubmit: ContactSubmitHandler
}

export function ContactScreen({ onSubmit }: ContactScreenProps) {
  const [submitted, setSubmitted] = useState(false)

  return (
    <PortfolioLayout activeItem="contact">
      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24">
        <SectionHeader
          eyebrow="Contact"
          title={
            <>
              Let&apos;s build <span className="neon-text">something</span>
            </>
          }
          description="Available for senior contract engagements, design system builds, and AI-native tooling projects."
        />

        {submitted ? <ContactSuccess /> : null}

        <div className="grid gap-12 lg:grid-cols-5">
          <ContactForm onSubmit={onSubmit} onSubmitted={() => setSubmitted(true)} />
          <ContactInfo />
        </div>
      </main>
    </PortfolioLayout>
  )
}
