'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface FaqItem {
  question: string
  answer: string
}

export default function FaqSection() {
  const t = useTranslations('HomePage.faq')
  const items = t.raw('items') as FaqItem[]
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-20 md:py-24 relative" style={{ background: 'var(--hp-low)' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto space-y-3">
          {items.map((item, idx) => {
            const isOpen = open === idx
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: 0.04 * idx }}
                className="tonal-card overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 text-left p-5 md:p-6"
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-display font-semibold"
                    style={{
                      fontSize: '1.05rem',
                      lineHeight: '1.3',
                      color: 'var(--hp-on-surface)',
                    }}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    className="w-5 h-5 flex-shrink-0 transition-transform duration-300"
                    style={{
                      color: 'var(--hp-primary-container)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p
                    className="px-5 md:px-6 pb-5 md:pb-6 text-[0.95rem] leading-relaxed"
                    style={{ color: 'var(--hp-on-surface-variant)' }}
                  >
                    {item.answer}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
