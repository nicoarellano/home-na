'use client'

import { motion } from 'framer-motion'
import { Globe2, Code2, MapPin, CircleDollarSign, ShieldCheck, type LucideIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface TrustChip {
  key: 'openStandards' | 'agpl' | 'sovereignHosted' | 'costRecovery' | 'boardGoverned'
  icon: LucideIcon
}

const CHIPS: TrustChip[] = [
  { key: 'openStandards', icon: Globe2 },
  { key: 'agpl', icon: Code2 },
  { key: 'sovereignHosted', icon: MapPin },
  { key: 'costRecovery', icon: CircleDollarSign },
  { key: 'boardGoverned', icon: ShieldCheck },
]

export default function TrustBandSection() {
  const t = useTranslations('HomePage.trustBand')

  return (
    <section
      className="py-20 md:py-24 relative overflow-hidden"
      style={{ background: 'var(--hp-lowest)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(239,145,97,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-12 space-y-4"
          >
            <div className="section-label justify-center">{t('heading')}</div>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--hp-on-surface-variant)' }}>
              {t('subheading')}
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-5">
            {CHIPS.map(({ key, icon: Icon }, idx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.06 * idx }}
                className="tonal-card p-7 flex flex-col w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(239, 145, 97, 0.1)' }}
                >
                  <Icon className="w-6 h-6" style={{ color: 'var(--hp-primary-container)' }} />
                </div>
                <h3
                  className="font-display font-bold mb-2"
                  style={{
                    fontSize: '1.15rem',
                    lineHeight: '1.3',
                    letterSpacing: '-0.01em',
                    color: 'var(--hp-on-surface)',
                  }}
                >
                  {t(`${key}.label`)}
                </h3>
                <p
                  className="text-[0.95rem] leading-relaxed"
                  style={{ color: 'var(--hp-on-surface-variant)' }}
                >
                  {t(`${key}.body`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
