'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function MissionSection() {
  const t = useTranslations('HomePage.mission')

  return (
    <section
      id="mission"
      className="py-20 md:py-24 relative"
      style={{ background: 'var(--hp-low)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(239,145,97,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="section-label">{t('sectionLabel')}</div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              lineHeight: '1.12',
              letterSpacing: '-0.02em',
              color: 'var(--hp-on-surface)',
            }}
          >
            {t('title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed max-w-3xl mx-auto"
            style={{ color: 'var(--hp-on-surface-variant)' }}
          >
            {t('body')}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
