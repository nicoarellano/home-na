'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Microscope, Building2, Code2, GraduationCap, MoreHorizontal, type LucideIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

type AudienceKey = 'researcher' | 'partner' | 'developer' | 'educator' | 'other'

interface AudienceChip {
  key: AudienceKey
  labelKey: string
  icon: LucideIcon
}

const AUDIENCES: AudienceChip[] = [
  { key: 'researcher', labelKey: 'audienceResearcher', icon: Microscope },
  { key: 'partner', labelKey: 'audiencePartner', icon: Building2 },
  { key: 'developer', labelKey: 'audienceDeveloper', icon: Code2 },
  { key: 'educator', labelKey: 'audienceEducator', icon: GraduationCap },
  { key: 'other', labelKey: 'audienceOther', icon: MoreHorizontal },
]

interface ContactSectionProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isSubmitting?: boolean
}

export default function ContactSection({ onSubmit, isSubmitting = false }: ContactSectionProps) {
  const t = useTranslations('HomePage.contact')
  const [audience, setAudience] = useState<AudienceKey>('researcher')

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
          className="max-w-4xl mx-auto"
        >
          <div className="mb-12 space-y-5 max-w-2xl">
            <div className="section-label">{t('sectionLabel')}</div>
            <h2
              className="font-display font-bold"
              style={{
                fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                color: 'var(--hp-on-surface)',
              }}
            >
              {t('title')}
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--hp-on-surface-variant)' }}
            >
              {t('description')}
            </p>
          </div>

          <div className="tonal-card p-8 md:p-10">
            <div className="space-y-3 mb-8">
              <p
                className="font-display text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--hp-on-surface-variant)' }}
              >
                {t('audienceLabel')}
              </p>
              <div className="flex flex-wrap gap-2">
                {AUDIENCES.map((a) => {
                  const Icon = a.icon
                  const selected = audience === a.key
                  return (
                    <button
                      key={a.key}
                      type="button"
                      onClick={() => setAudience(a.key)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                      style={{
                        background: selected
                          ? 'var(--hp-primary-container)'
                          : 'var(--hp-lowest)',
                        color: selected
                          ? 'var(--hp-on-primary-ctr)'
                          : 'var(--hp-on-surface-variant)',
                        border: selected
                          ? '1px solid var(--hp-primary-container)'
                          : '1px solid rgba(84, 67, 59, 0.15)',
                      }}
                      aria-pressed={selected}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {t(a.labelKey as Parameters<typeof t>[0])}
                    </button>
                  )
                })}
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              <input type="hidden" name="audience" value={audience} />

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

              <div className="grid sm:grid-cols-2 gap-4">
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
                  href={`mailto:${t('infoEmail')}`}
                  className="hover:underline"
                  style={{ color: 'var(--hp-primary-container)' }}
                >
                  {t('infoEmail')}
                </a>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
