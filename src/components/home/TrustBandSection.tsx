'use client'

import { Globe2, Code2, MapPin, CircleDollarSign, ShieldCheck, type LucideIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { useMarquee } from '@/hooks/useMarquee'

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
  const trackRef = useMarquee({ baseSpeed: 45, direction: 'left' })
  const repeated = [...CHIPS, ...CHIPS, ...CHIPS]

  return (
    <section
      className="py-16 md:py-20 relative overflow-hidden"
      style={{
        background: 'var(--hp-lowest)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, var(--hp-lowest) 0%, transparent 100%)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(270deg, var(--hp-lowest) 0%, transparent 100%)' }}
        />
        <div
          ref={trackRef}
          className="flex items-center select-none"
          style={{ width: 'max-content', cursor: 'grab', touchAction: 'pan-y' }}
        >
          {repeated.map(({ key, icon: Icon }, i) => (
            <div
              key={`${key}-${i}`}
              className="inline-flex items-center gap-3 text-base font-medium flex-shrink-0 px-7"
              style={{ color: 'var(--hp-on-surface)' }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(239, 145, 97, 0.1)' }}
              >
                <Icon className="w-5 h-5" style={{ color: 'var(--hp-primary-container)' }} />
              </div>
              <span className="whitespace-nowrap">{t(key)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
