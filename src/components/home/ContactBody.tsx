'use client'

import ContactSection from './ContactSection'
import { useContactForm } from './useContactForm'

export function ContactBody() {
  const { handleSubmit, isSubmitting } = useContactForm()
  return <ContactSection onSubmit={handleSubmit} isSubmitting={isSubmitting} />
}
