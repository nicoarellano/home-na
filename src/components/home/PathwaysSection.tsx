'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Rocket, Server, Hammer, GraduationCap, type LucideIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'

interface Pathway {
  key: 'useFree' | 'selfHost' | 'buildWithUs' | 'learnTeach'
  icon: LucideIcon
  href: string
  external: boolean
}

const PATHWAYS: Pathway[] = [
  {
    key: 'useFree',
    icon: Rocket,
    href: 'https://app.collabdt.org/cdt',
    external: true,
  },
  {
    key: 'selfHost',
    icon: Server,
    href: 'https://docs.collabdt.org/',
    external: true,
  },
  {
    key: 'buildWithUs',
    icon: Hammer,
    href: '#contact',
    external: false,
  },
  {
    key: 'learnTeach',
    icon: GraduationCap,
    href: '#contact',
    external: false,
  },
]

export default function PathwaysSection() {
  const t = useTranslations('HomePage.pathways')

  return (
    <section
      id="pathways"
      className="py-32 relative"
      style={{ background: 'var(--hp-surface)' }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
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
                fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                color: 'var(--hp-on-surface)',
              }}
            >
              {t('title')}
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--hp-on-surface-variant)' }}
            >
              {t('subtitle')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {PATHWAYS.map((path, idx) => {
              const Icon = path.icon
              return (
                <motion.div
                  key={path.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.08 * idx }}
                  className="tonal-card p-7 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(239, 145, 97, 0.1)' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: 'var(--hp-primary-container)' }} />
                    </div>
                    <span
                      className="text-[0.65rem] font-bold uppercase tracking-[0.2em]"
                      style={{ color: 'var(--hp-on-surface-variant)' }}
                    >
                      {t(`${path.key}.tag`)}
                    </span>
                  </div>

                  <h3
                    className="font-display font-bold mb-2"
                    style={{
                      fontSize: '1.35rem',
                      lineHeight: '1.2',
                      letterSpacing: '-0.01em',
                      color: 'var(--hp-on-surface)',
                    }}
                  >
                    {t(`${path.key}.name`)}
                  </h3>
                  <p
                    className="font-display text-base mb-3"
                    style={{ color: 'var(--hp-primary-container)' }}
                  >
                    {t(`${path.key}.headline`)}
                  </p>
                  <p
                    className="text-[0.95rem] leading-relaxed mb-7 flex-grow"
                    style={{ color: 'var(--hp-on-surface-variant)' }}
                  >
                    {t(`${path.key}.body`)}
                  </p>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="self-start -ml-2 px-2 group"
                    asChild
                  >
                    <a
                      href={path.href}
                      target={path.external ? '_blank' : undefined}
                      rel={path.external ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1 font-medium"
                      style={{ color: 'var(--hp-primary-container)' }}
                    >
                      {t(`${path.key}.cta`)}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
