'use client'

import { motion } from 'framer-motion'
import {
  Layers,
  Network,
  Plug,
  Server,
  Wrench,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Capability {
  key: 'bridge' | 'interop' | 'extend' | 'deploy' | 'customize' | 'train'
  icon: LucideIcon
}

const CAPABILITIES: Capability[] = [
  { key: 'bridge', icon: Layers },
  { key: 'interop', icon: Network },
  { key: 'extend', icon: Plug },
  { key: 'deploy', icon: Server },
  { key: 'customize', icon: Wrench },
  { key: 'train', icon: GraduationCap },
]

export default function CapabilitiesSection() {
  const t = useTranslations('HomePage.capabilities')

  return (
    <section
      id="capabilities"
      className="py-20 md:py-24 relative"
      style={{ background: 'var(--hp-surface)' }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-14 max-w-3xl lg:max-w-4xl space-y-4"
          >
            <div className="section-label">{t('sectionLabel')}</div>
            <h2
              className="font-display font-bold"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                lineHeight: '1.08',
                letterSpacing: '-0.02em',
                color: 'var(--hp-on-surface)',
              }}
            >
              {t('title')}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAPABILITIES.map(({ key, icon: Icon }, idx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.06 * idx }}
                className="tonal-card p-6 flex flex-col"
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-5"
                  style={{ background: 'rgba(239, 145, 97, 0.1)' }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: 'var(--hp-primary-container)' }}
                  />
                </div>
                <h3
                  className="font-display font-bold mb-2"
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.3',
                    letterSpacing: '-0.01em',
                    color: 'var(--hp-on-surface)',
                  }}
                >
                  {t(`${key}.title`)}
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
