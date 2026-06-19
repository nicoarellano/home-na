'use client'

import { useEffect, useState } from 'react'
import { Github } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/Button'

const GH_URL = 'https://github.com/CollabDigitalTwins/core'
/** Open-source release — July 1, 2026 (local time). */
const RELEASE_DATE = new Date(2026, 6, 1)

function daysUntilRelease(): number {
  return Math.ceil((RELEASE_DATE.getTime() - new Date().getTime()) / 86_400_000)
}

/**
 * Small, low-key release countdown shown as a tertiary hero action. Before the
 * open-source release it shows the days remaining; once released it becomes a
 * GitHub button linking to the public repository.
 */
export default function HeroReleaseCountdown() {
  const t = useTranslations('HomePage.githubRelease')
  const [mounted, setMounted] = useState(false)
  const [days, setDays] = useState(0)
  const [released, setReleased] = useState(false)

  // Compute on the client only to avoid an SSR/hydration mismatch.
  useEffect(() => {
    setMounted(true)
    const remaining = daysUntilRelease()
    setDays(Math.max(0, remaining))
    setReleased(remaining <= 0)
  }, [])

  // Render nothing until the countdown is known (keeps SSR markup stable).
  if (!mounted) return null

  if (released) {
    return (
      <Button size="lg" className="btn-glass text-base px-8 w-full sm:w-auto" asChild>
        <a href={GH_URL} target="_blank" rel="noopener noreferrer">
          <Github className="w-4 h-4 mr-2" />
          {t('viewOnGithub')}
        </a>
      </Button>
    )
  }

  return (
    <div
      className="inline-flex items-center justify-center sm:justify-start gap-2 h-10 px-5 rounded-md text-sm font-medium w-full sm:w-auto"
      style={{
        color: 'var(--hp-on-surface-variant)',
        border: '1px solid var(--hp-outline-variant)',
      }}
      title={t('githubAria')}
    >
      <Github className="w-4 h-4" style={{ opacity: 0.6 }} aria-hidden />
      <span>{t('heroCountdown', { days })}</span>
    </div>
  )
}
