'use client'

import { motion } from 'framer-motion'
import { Mail, Github, BookOpen } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'

const GITHUB_ORG_URL = 'https://github.com/CollabDigitalTwins'
const MAILING_LIST_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScB12Qc7khiOk4a_E753jDccx6026AjO-_FINBKoZZZtkmqnA/viewform'
const DOCS_URL = 'https://docs.collabdt.org/'

export default function ContributorsSection() {
  const tContributors = useTranslations('HomePage.contributors')

  return (
    <section
      id="contributors"
      className="py-32 relative"
      style={{ background: 'var(--hp-low)' }}
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
              <div className="section-label">{tContributors('sectionLabel')}</div>
            </div>

            <h2
              className="font-display font-bold tracking-tight"
              style={{
                fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                color: 'var(--hp-on-surface)',
              }}
            >
              {tContributors('title')}
            </h2>

            <p
              className="text-lg leading-relaxed max-w-2xl mx-auto"
              style={{ color: 'var(--hp-on-surface-variant)' }}
            >
              {tContributors('body')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="btn-sovereign px-7 w-full sm:w-auto" asChild>
              <a href={GITHUB_ORG_URL} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                {tContributors('githubLabel')}
              </a>
            </Button>
            <Button size="lg" className="btn-glass px-7 w-full sm:w-auto" asChild>
              <a href={MAILING_LIST_URL} target="_blank" rel="noopener noreferrer">
                <Mail className="w-4 h-4 mr-2" />
                {tContributors('mailingLabel')}
              </a>
            </Button>
            <Button size="lg" className="btn-glass px-7 w-full sm:w-auto" asChild>
              <a href={DOCS_URL} target="_blank" rel="noopener noreferrer">
                <BookOpen className="w-4 h-4 mr-2" />
                {tContributors('docsLabel')}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
