'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, X, ArrowUpRight, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/Button'
import { CdtIcon } from '@/components/ui/CdtIcon'

const GH_URL = 'https://github.com/CollabDigitalTwins/core'
/** Open-source release — July 1, 2026 (local time). Until then the repo is
 * private, so the GitHub button shows a countdown dialog instead of linking. */
const RELEASE_DATE = new Date(2026, 6, 1)

function daysUntilRelease(): number {
  const ms = RELEASE_DATE.getTime() - new Date().getTime()
  return Math.ceil(ms / 86_400_000)
}

export default function GithubReleaseButton({
  className,
  label,
  size,
}: {
  className?: string
  label?: string
  size?: 'sm' | 'lg'
}) {
  const t = useTranslations('HomePage.githubRelease')
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [days, setDays] = useState(0)
  const [released, setReleased] = useState(false)

  // Compute the countdown on the client only — avoids an SSR/hydration mismatch
  // from `new Date()` differing between server and browser.
  useEffect(() => {
    setMounted(true)
    const remaining = daysUntilRelease()
    setDays(Math.max(0, remaining))
    setReleased(remaining <= 0)
  }, [])

  // Close on Escape and lock body scroll while the dialog is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  return (
    <>
      <Button
        variant="ghost"
        size={size}
        onClick={() => setOpen(true)}
        aria-label={t('githubAria')}
        className={
          label
            ? `transition-colors ${className ?? ''}`
            : `p-2 rounded-lg transition-colors ${className ?? ''}`
        }
        style={label ? undefined : { color: 'var(--hp-on-surface-variant)' }}
      >
        <Github className="w-4 h-4" />
        {label && <span>{label}</span>}
      </Button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
                  onClick={() => setOpen(false)}
                  aria-hidden
                />

                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="gh-release-title"
                  initial={{ scale: 0.92, opacity: 0, y: 12 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 8 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                  className="relative w-full max-w-md rounded-2xl overflow-hidden text-center px-8 py-12"
                  style={{
                    background:
                      'linear-gradient(140deg, #2a1150 0%, #5a2570 35%, #8f3a50 68%, #b4532e 100%)',
                    boxShadow: '0 30px 80px -20px rgba(0,0,0,0.65)',
                  }}
                >
                  {/* Soft glow accent over the gradient */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 60%)',
                    }}
                    aria-hidden
                  />

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label={t('close')}
                    className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors text-white/70 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="relative">
                    <CdtIcon className="w-16 h-16 mx-auto mb-6 text-white" monochromatic />

                    {released ? (
                      <>
                        <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.35em] text-white/80 mb-4">
                          <Sparkles className="w-4 h-4" aria-hidden />
                          {t('released')}
                        </div>
                        <p
                          id="gh-release-title"
                          className="font-display font-bold text-white mb-7"
                          style={{ fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', lineHeight: 1.2 }}
                        >
                          {t('releasedMessage')}
                        </p>
                        <a
                          href={GH_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-semibold bg-white text-[#2a1150] transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                        >
                          <Github className="w-4 h-4" aria-hidden />
                          {t('viewOnGithub')}
                          <ArrowUpRight className="w-4 h-4" aria-hidden />
                        </a>
                      </>
                    ) : (
                      <>
                        <div className="text-xs font-bold uppercase tracking-[0.35em] text-white/70 mb-4">
                          {t('soon')}
                        </div>
                        <div className="flex items-baseline justify-center gap-2.5 mb-3">
                          <span
                            className="font-display font-bold text-white"
                            style={{ fontSize: 'clamp(3rem, 12vw, 4.5rem)', lineHeight: 1 }}
                          >
                            {days}
                          </span>
                          <span className="font-display font-semibold text-white/80 text-xl">
                            {t('daysUnit', { days })}
                          </span>
                        </div>
                        <p
                          id="gh-release-title"
                          className="text-white/90 text-base leading-relaxed max-w-xs mx-auto"
                        >
                          {t('releaseLine')}
                        </p>
                      </>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  )
}
