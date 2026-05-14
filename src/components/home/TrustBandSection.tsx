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
      className="py-16 md:py-20 relative"
      style={{
        background: 'var(--hp-lowest)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-14"
        >
          {CHIPS.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="inline-flex items-center gap-3 text-base font-medium"
              style={{ color: 'var(--hp-on-surface)' }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(239, 145, 97, 0.1)' }}
              >
                <Icon className="w-5 h-5" style={{ color: 'var(--hp-primary-container)' }} />
              </div>
              <span>{t(key)}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
