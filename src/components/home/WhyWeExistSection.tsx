'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function WhyWeExistSection() {
  const tWhy = useTranslations('HomePage.why')

  return (
    <section className="py-32 relative" style={{ background: 'var(--hp-lowest)' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(239,145,97,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="section-label">{tWhy('sectionLabel')}</div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold"
            style={{
              fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)',
              lineHeight: '1.15',
              letterSpacing: '-0.02em',
              color: 'var(--hp-on-surface)',
            }}
          >
            {tWhy('title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed"
            style={{ color: 'var(--hp-on-surface-variant)' }}
          >
            {tWhy('body')}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
