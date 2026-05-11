'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'

export default function ContributorsSection() {
  const tContributors = useTranslations('HomePage.contributors')

  return (
    <section
      id="contributors"
      className="py-32 relative"
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
              <div className="section-label">Get Involved</div>
            </div>

            <h2
              className="font-display font-bold tracking-tight"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
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
              {tContributors('description')}
            </p>
          </div>

          <Button size="lg" className="btn-sovereign px-10" asChild>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScB12Qc7khiOk4a_E753jDccx6026AjO-_FINBKoZZZtkmqnA/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail className="w-4 h-4 mr-2" />
              {tContributors('mailingButton')}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
