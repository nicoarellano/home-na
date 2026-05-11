'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

interface ContactSectionProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isSubmitting?: boolean
}

export default function ContactSection({ onSubmit, isSubmitting = false }: ContactSectionProps) {
  const t = useTranslations('HomePage.contact')

  return (
    <section
      id="contact"
      className="py-32 relative"
      style={{ background: 'var(--hp-low)' }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-5xl mx-auto"
        >
          <div className="mb-16 space-y-4">
            <div className="section-label">{t('title')}</div>
            <h2
              className="font-display font-bold"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                color: 'var(--hp-on-surface)',
              }}
            >
              {t('title')}
            </h2>
            <p
              className="text-lg max-w-xl"
              style={{ color: 'var(--hp-on-surface-variant)' }}
            >
              {t('description')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="tonal-card p-8 lg:col-span-2">
              <h3
                className="font-display font-bold mb-2"
                style={{ fontSize: '1.25rem', color: 'var(--hp-on-surface)' }}
              >
                {t('formTitle')}
              </h3>
              <p
                className="text-[0.9rem] mb-8"
                style={{ color: 'var(--hp-on-surface-variant)' }}
              >
                {t('formDescription')}
              </p>

              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="font-display text-xs font-semibold uppercase tracking-wider"
                      style={{ color: 'var(--hp-on-surface-variant)' }}
                    >
                      {t('firstName')}
                    </label>
                    <Input id="firstName" name="firstName" required className="hp-input" />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="font-display text-xs font-semibold uppercase tracking-wider"
                      style={{ color: 'var(--hp-on-surface-variant)' }}
                    >
                      {t('lastName')}
                    </label>
                    <Input id="lastName" name="lastName" required className="hp-input" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="font-display text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--hp-on-surface-variant)' }}
                  >
                    {t('email')}
                  </label>
                  <Input id="email" name="email" type="email" required className="hp-input" />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="organization"
                    className="font-display text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--hp-on-surface-variant)' }}
                  >
                    {t('organization')}
                  </label>
                  <Input id="organization" name="organization" className="hp-input" />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="font-display text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--hp-on-surface-variant)' }}
                  >
                    {t('message')}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="hp-input resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="btn-sovereign w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('sending') : t('sendButton')}
                </Button>

                <p
                  className="text-[0.9rem] text-center pt-1"
                  style={{ color: 'var(--hp-on-surface-variant)' }}
                >
                  {t('orEmail')}{' '}
                  <a
                    href="mailto:info@collabdt.org"
                    className="hover:underline"
                    style={{ color: 'var(--hp-primary-container)' }}
                  >
                    info@collabdt.org
                  </a>
                </p>
              </form>
            </div>

            <div className="space-y-5">
              <div className="tonal-card p-6">
                <h3
                  className="font-display font-bold mb-3"
                  style={{ fontSize: '1rem', color: 'var(--hp-on-surface)' }}
                >
                  {t('contactInfo')}
                </h3>
                <div className="space-y-1">
                  <p
                    className="text-xs uppercase tracking-wider"
                    style={{ color: 'var(--hp-on-surface-variant)' }}
                  >
                    {t('emailLabel')}
                  </p>
                  <a
                    href="mailto:info@collabdt.org"
                    className="font-medium text-sm hover:underline"
                    style={{ color: 'var(--hp-primary-container)' }}
                  >
                    info@collabdt.org
                  </a>
                </div>
              </div>

              <div className="tonal-card p-6">
                <h3
                  className="font-display font-bold mb-3"
                  style={{ fontSize: '1rem', color: 'var(--hp-on-surface)' }}
                >
                  {t('enterpriseTitle')}
                </h3>
                <p
                  className="text-[0.9rem] mb-4 leading-relaxed"
                  style={{ color: 'var(--hp-on-surface-variant)' }}
                >
                  {t('enterpriseDescription')}
                </p>
                <a
                  href="mailto:support@collabdt.org"
                  className="font-medium text-sm hover:underline"
                  style={{ color: 'var(--hp-primary-container)' }}
                >
                  {t('enterpriseLink')}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
