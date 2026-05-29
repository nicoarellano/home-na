'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check, Cloud, Server, Hammer, GraduationCap, type LucideIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'

interface Solution {
  key: 'managedCloud' | 'selfManaged' | 'customDev' | 'training'
  icon: LucideIcon
  href: string
  external: boolean
}

const SOLUTIONS: Solution[] = [
  {
    key: 'managedCloud',
    icon: Cloud,
    href: '#contact',
    external: false,
  },
  {
    key: 'selfManaged',
    icon: Server,
    href: 'https://docs.collabdt.org/',
    external: true,
  },
  {
    key: 'customDev',
    icon: Hammer,
    href: '#contact',
    external: false,
  },
  {
    key: 'training',
    icon: GraduationCap,
    href: '#contact',
    external: false,
  },
]

export default function SolutionsSection() {
  const t = useTranslations('HomePage.solutions')

  return (
    <section
      id="solutions"
      className="py-20 md:py-24 relative"
      style={{ background: 'var(--hp-low)' }}
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
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--hp-on-surface-variant)' }}
            >
              {t('subtitle')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {SOLUTIONS.map((sol, idx) => {
              const Icon = sol.icon
              return (
                <motion.div
                  key={sol.key}
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
                      {t(`${sol.key}.tag`)}
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
                    {t(`${sol.key}.name`)}
                  </h3>
                  <p
                    className="font-display text-base mb-3"
                    style={{ color: 'var(--hp-primary-container)' }}
                  >
                    {t(`${sol.key}.headline`)}
                  </p>
                  <p
                    className="text-[0.95rem] leading-relaxed mb-5"
                    style={{ color: 'var(--hp-on-surface-variant)' }}
                  >
                    {t(`${sol.key}.body`)}
                  </p>

                  <ul className="space-y-2 mb-7 flex-grow">
                    {(['feature1', 'feature2', 'feature3', 'feature4'] as const).map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-[0.9rem]"
                        style={{ color: 'var(--hp-on-surface-variant)' }}
                      >
                        <Check
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: 'var(--hp-primary-container)' }}
                        />
                        <span>{t(`${sol.key}.${f}`)}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="self-start -ml-2 px-2 group"
                    asChild
                  >
                    <a
                      href={sol.href}
                      target={sol.external ? '_blank' : undefined}
                      rel={sol.external ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1 font-medium"
                      style={{ color: 'var(--hp-primary-container)' }}
                    >
                      {t(`${sol.key}.cta`)}
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
