'use client'

import { motion } from 'framer-motion'
import { BookOpen, Github, Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'

const DOCS_URL = 'https://docs.collabdt.org/'
const GITHUB_ORG_URL = 'https://github.com/CollabDigitalTwins'
const MAILING_LIST_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScB12Qc7khiOk4a_E753jDccx6026AjO-_FINBKoZZZtkmqnA/viewform'

export default function DeveloperPlatformSection() {
  const t = useTranslations('HomePage.developers')

  return (
    <section
      id="developers"
      className="py-20 md:py-24 relative"
      style={{ background: 'var(--hp-surface)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(239,145,97,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto text-center space-y-10"
        >
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="section-label">{t('sectionLabel')}</div>
            </div>

            <h2
              className="font-display font-bold tracking-tight"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                lineHeight: '1.08',
                letterSpacing: '-0.02em',
                color: 'var(--hp-on-surface)',
              }}
            >
              {t('title')}
            </h2>

            <p
              className="text-lg leading-relaxed max-w-2xl mx-auto"
              style={{ color: 'var(--hp-on-surface-variant)' }}
            >
              {t('body')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="btn-sovereign px-7 w-full sm:w-auto" asChild>
              <a href={DOCS_URL} target="_blank" rel="noopener noreferrer">
                <BookOpen className="w-4 h-4 mr-2" />
                {t('docsLabel')}
              </a>
            </Button>
            <Button size="lg" className="btn-glass px-7 w-full sm:w-auto" asChild>
              <a href={GITHUB_ORG_URL} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                {t('githubLabel')}
              </a>
            </Button>
            <Button size="lg" className="btn-glass px-7 w-full sm:w-auto" asChild>
              <a href={MAILING_LIST_URL} target="_blank" rel="noopener noreferrer">
                <Mail className="w-4 h-4 mr-2" />
                {t('mailingLabel')}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
