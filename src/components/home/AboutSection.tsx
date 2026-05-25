'use client'

import { motion } from 'framer-motion'
import {
  Globe,
  Users,
  Eye,
  Lightbulb,
  Network,
  Monitor,
  Unlock,
  ShieldCheck,
  CircleDollarSign,
  Layers,
  type LucideIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

interface ValueCard {
  icon: LucideIcon
  title: string
  description: string
}

function ValueCardItem({ value }: { value: ValueCard }) {
  return (
    <div className="tonal-card p-6 flex-shrink-0" style={{ width: '340px' }}>
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(239, 145, 97, 0.1)' }}
        >
          <value.icon className="w-5 h-5" style={{ color: 'var(--hp-primary-container)' }} />
        </div>
        <div className="space-y-2 min-w-0">
          <h3
            className="font-display font-bold"
            style={{ fontSize: '1rem', lineHeight: '1.3', color: 'var(--hp-on-surface)' }}
          >
            {value.title}
          </h3>
          <p
            className="text-[0.9rem] leading-relaxed"
            style={{ color: 'var(--hp-on-surface-variant)' }}
          >
            {value.description}
          </p>
        </div>
      </div>
    </div>
  )
}

function MarqueeRow({ items, direction }: { items: ValueCard[]; direction: 'left' | 'right' }) {
  const repeated = [...items, ...items, ...items]

  return (
    <>
      <div className="hidden sm:block overflow-hidden relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, var(--hp-low) 0%, transparent 100%)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(270deg, var(--hp-low) 0%, transparent 100%)' }}
        />

        <div
          className={`flex gap-5 ${direction === 'left' ? 'marquee-left' : 'marquee-right'}`}
          style={{ width: 'max-content' }}
        >
          {repeated.map((value, i) => (
            <ValueCardItem key={`${value.title}-${i}`} value={value} />
          ))}
        </div>
      </div>

      <div
        className="sm:hidden overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden"
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehaviorX: 'contain',
          scrollbarWidth: 'none',
        }}
      >
        <div className="flex gap-5 px-6 pb-2" style={{ width: 'max-content' }}>
          {items.map((value, i) => (
            <ValueCardItem key={`${value.title}-${i}`} value={value} />
          ))}
        </div>
      </div>
    </>
  )
}

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

export default function AboutSection() {
  const tWhy = useTranslations('HomePage.whyCdt')
  const tValues = useTranslations('HomePage.values')

  const coreValues: ValueCard[] = [
    {
      icon: Globe,
      title: tValues('openStandards.title'),
      description: tValues('openStandards.description'),
    },
    {
      icon: Users,
      title: tValues('communityDriven.title'),
      description: tValues('communityDriven.description'),
    },
    {
      icon: Eye,
      title: tValues('transparent.title'),
      description: tValues('transparent.description'),
    },
    {
      icon: Lightbulb,
      title: tValues('imagination.title'),
      description: tValues('imagination.description'),
    },
    {
      icon: Network,
      title: tValues('multidisciplinary.title'),
      description: tValues('multidisciplinary.description'),
    },
    {
      icon: Monitor,
      title: tValues('accessible.title'),
      description: tValues('accessible.description'),
    },
  ]

  return (
    <>
      <section id="whyCdt" className="py-32 relative" style={{ background: 'var(--hp-surface)' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl lg:max-w-4xl space-y-4"
            >
              <div className="section-label">{tWhy('sectionLabel')}</div>
              <h2
                className="font-display font-bold"
                style={{
                  fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)',
                  lineHeight: '1.1',
                  letterSpacing: '-0.02em',
                  color: 'var(--hp-on-surface)',
                }}
              >
                {tWhy('title')}
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {PILLARS.map(({ key, icon: Icon }, idx) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.08 * idx }}
                  className="tonal-card p-7"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(239, 145, 97, 0.1)' }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: 'var(--hp-primary-container)' }}
                      />
                    </div>
                    <div className="space-y-2 min-w-0">
                      <h3
                        className="font-display font-bold"
                        style={{
                          fontSize: '1.15rem',
                          lineHeight: '1.3',
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
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-24 relative overflow-hidden"
        style={{ background: 'var(--hp-low)' }}
      >
        <div className="container mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="section-label">{tValues('title')}</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <MarqueeRow items={coreValues} direction="left" />
        </motion.div>
      </section>
    </>
  )
}
