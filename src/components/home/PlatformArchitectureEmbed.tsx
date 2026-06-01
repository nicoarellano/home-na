'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

/**
 * Standalone, embed-mode architecture diagram published from the docs site
 * (Docusaurus `static/` folder → served without docs chrome). Single source
 * of truth — the homepage iframes it rather than duplicating the diagram.
 *
 * The embed reads a `?theme=` query param so it can follow the site theme.
 */
const ARCH_EMBED_URL = 'https://docs.collabdt.org/embed/architecture/'
const ARCH_DOCS_URL = 'https://docs.collabdt.org/docs/architecture/overview'
const ARCH_EMBED_ORIGIN = 'https://docs.collabdt.org'

/** Track the site's light/dark state (the `.dark` class on <html>). */
function useSiteTheme(): 'light' | 'dark' {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  useEffect(() => {
    const read = () =>
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
    read()
    const obs = new MutationObserver(read)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])
  return theme
}

export default function PlatformArchitectureEmbed() {
  const t = useTranslations('HomePage.architecture')
  const theme = useSiteTheme()
  const [loaded, setLoaded] = useState(false)
  const [height, setHeight] = useState<number | null>(null)
  const frameRef = useRef<HTMLIFrameElement>(null)

  // The embed posts its content height so the iframe can size itself exactly
  // (no letterboxing / inner scrollbars). Falls back to a 16:9 box until the
  // first message arrives.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== ARCH_EMBED_ORIGIN) return
      const data = e.data as { type?: string; height?: number }
      if (data?.type === 'cdt-arch-height' && typeof data.height === 'number') {
        setHeight(Math.max(320, Math.round(data.height)))
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  // Changing the key forces a reload when the theme flips so the embed
  // re-reads its `?theme=` param.
  const src = `${ARCH_EMBED_URL}?theme=${theme}`

  return (
    <section id="architecture" className="py-20 md:py-24 relative" style={{ background: 'var(--hp-low)' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-10 max-w-3xl lg:max-w-4xl space-y-4"
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
            <p className="text-lg leading-relaxed" style={{ color: 'var(--hp-on-surface-variant)' }}>
              {t('subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl overflow-hidden"
            style={{
              border: '1px solid var(--hp-outline-variant)',
              boxShadow: '0 10px 40px -24px rgba(0,0,0,0.5)',
            }}
          >
            {/* Header bar — links out to the full architecture docs */}
            <a
              href={ARCH_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-5 py-3.5 transition-colors"
              style={{ background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-outline-variant)' }}
            >
              <span className="flex gap-1.5" aria-hidden>
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--hp-outline-variant)' }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--hp-outline-variant)' }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--hp-outline-variant)' }} />
              </span>
              <span
                className="flex-1 font-semibold text-[0.95rem]"
                style={{ color: 'var(--hp-on-surface)', letterSpacing: '-0.01em' }}
              >
                {t('cta')}
              </span>
              <ArrowUpRight
                className="w-[18px] h-[18px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: 'var(--hp-primary-container)' }}
              />
            </a>

            {/* The diagram itself — auto-sized from the embed's height message,
                with a 16:9 fallback until it arrives. */}
            <div
              className="relative w-full"
              style={{
                height: height ? `${height}px` : undefined,
                aspectRatio: height ? undefined : '16 / 9',
                background: 'var(--hp-lowest)',
                transition: 'height 0.3s ease',
              }}
            >
              {!loaded && (
                <div
                  className="absolute inset-0 flex items-center justify-center text-sm animate-pulse"
                  style={{ color: 'var(--hp-on-surface-variant)' }}
                >
                  {t('sectionLabel')}…
                </div>
              )}
              <iframe
                key={theme}
                ref={frameRef}
                src={src}
                title={t('sectionLabel')}
                onLoad={() => setLoaded(true)}
                loading="lazy"
                className="absolute inset-0 w-full h-full"
                style={{ border: 'none' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
