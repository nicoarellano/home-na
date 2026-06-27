'use client'

import { motion } from 'framer-motion'
import {
  Unlock,
  ShieldCheck,
  CircleDollarSign,
  Layers,
  type LucideIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Pillar {
  key: 'noLockIn' | 'dataSovereignty' | 'costRecovery' | 'multidisciplinary'
  icon: LucideIcon
}

const PILLARS: Pillar[] = [
  { key: 'noLockIn', icon: Unlock },
  { key: 'dataSovereignty', icon: ShieldCheck },
  { key: 'costRecovery', icon: CircleDollarSign },
  { key: 'multidisciplinary', icon: Layers },
]

interface WhyCdtSectionProps {
  background?: string
}

export default function WhyCdtSection({
  background = 'var(--hp-surface)',
}: WhyCdtSectionProps) {
  const tWhy = useTranslations('HomePage.whyCdt')

  return (
    <section id="whyCdt" className="py-20 md:py-24 relative" style={{ background }}>
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-14 max-w-3xl lg:max-w-4xl space-y-4"
          >
            <div className="section-label">{tWhy('sectionLabel')}</div>
            <h2
              className="font-display font-bold"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                lineHeight: '1.08',
                letterSpacing: '-0.02em',
                color: 'var(--hp-on-surface)',
              }}
            >
              {tWhy('title')}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-x-10 lg:gap-x-16">
            {PILLARS.map(({ key, icon: Icon }, idx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.06 * idx }}
                className="flex gap-4 py-6 border-t"
                style={{ borderColor: 'var(--hp-outline-variant)' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(239, 145, 97, 0.1)' }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: 'var(--hp-primary-container)' }}
                  />
                </div>
                <div className="space-y-1.5">
                  <h3
                    className="font-display font-bold"
                    style={{
                      fontSize: '1.1rem',
                      lineHeight: '1.3',
                      letterSpacing: '-0.01em',
                      color: 'var(--hp-on-surface)',
                    }}
                  >
                    {tWhy(`${key}.title`)}
                  </h3>
                  <p
                    className="text-[0.95rem] leading-relaxed"
                    style={{ color: 'var(--hp-on-surface-variant)' }}
                  >
                    {tWhy(`${key}.body`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
