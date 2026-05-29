'use client'

import { useState } from 'react'
import { toast } from 'sonner'

/**
 * Shared contact-form submission logic, used by both the homepage
 * "request a demo" section and the dedicated /contact page.
 */
export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      organization: formData.get('organization') as string,
      message: formData.get('message') as string,
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      toast.error('Contact form is not configured', {
        description: 'Please email us directly at info@collabdt.org',
      })
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Contact Form: Message from ${data.firstName} ${data.lastName}`,
          from_name: `${data.firstName} ${data.lastName}`,
          replyto: data.email,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          organization: data.organization || '(not provided)',
          message: data.message,
        }),
      })

      const result = await response.json().catch(() => ({ success: false }))
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to send message')
      }

      toast.success('Message Sent!', {
        description: 'Thank you for reaching out. We will get back to you soon.',
      })

      form.reset()
    } catch (error) {
      toast.error('Failed to send message', {
        description: 'Please try again later or email us directly at info@collabdt.org',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return { handleSubmit, isSubmitting }
}
