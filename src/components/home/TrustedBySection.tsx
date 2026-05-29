'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

interface Partner {
  file: string
  name: string
  /** Render as an inline SVG so its text shapes can follow the theme. */
  inline?: boolean
}

/**
 * ReConstruct logo inlined so the centre text shapes use the theme's
 * on-surface colour (black in light, white in dark) while the orange
 * brackets stay fixed. An <img> can't have its inner fills themed.
 */
function ReconstructLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 304.14 304.04"
      width={64}
      height={64}
      className={className}
      style={{ color: 'var(--hp-on-surface)' }}
      role="img"
      aria-label="ReConstruct"
    >
      <g fill="currentColor">
        <path d="m.47,133.86h15.11c7.37,0,10.18,4.15,10.18,9.87,0,4.98-1.92,8.15-6.34,8.83v.1c4.62.42,6.08,3.38,6.08,8.31v3.17c0,1.92,0,4.36.47,5.14.26.42.47.78,1.09,1.14v.52h-10.28c-.93-1.92-.93-5.56-.93-7.06v-2.49c0-4.21-.83-5.3-3.17-5.3h-2.54v14.85H.47v-37.08Zm9.66,15.68h1.92c2.75,0,4.05-1.77,4.05-4.41,0-3.06-1.19-4.31-4.1-4.31h-1.87v8.72Z" />
        <path d="m30.27,133.86h21.96v7.89h-12.31v6.34h11.53v7.58h-11.53v7.37h12.77v7.89h-22.43v-37.08Z" />
        <path d="m71.03,145.13c0-4.21-.78-5.45-2.65-5.45-2.91,0-3.27,2.7-3.27,12.72s.36,12.72,3.27,12.72c2.34,0,2.91-2.08,2.91-9.09h9.35v2.75c0,10.39-6.02,12.88-12.25,12.88-10.85,0-13.24-5.4-13.24-19.26s3.22-19.27,13.24-19.27c8.72,0,12,4.57,12,11.74v2.34h-9.35v-2.08Z" />
        <path d="m96.26,133.14c9.87,0,13.24,5.4,13.24,19.27s-3.38,19.26-13.24,19.26-13.24-5.4-13.24-19.26,3.38-19.27,13.24-19.27Zm0,31.99c2.91,0,3.27-2.7,3.27-12.72s-.36-12.72-3.27-12.72-3.27,2.7-3.27,12.72.36,12.72,3.27,12.72Z" />
        <path d="m112.97,133.86h10.8l6.23,22.85h.1v-22.85h9.04v37.08h-10.59l-6.44-22.9h-.1v22.9h-9.04v-37.08Z" />
        <path d="m158.14,144.56v-.88c0-2.23-.88-4-2.75-4-2.08,0-3.01,1.61-3.01,3.27,0,7.32,15.79,3.74,15.79,17.29,0,7.89-4.62,11.42-13.14,11.42-8,0-12.46-2.75-12.46-10.44v-1.3h9.35v.88c0,3.17,1.3,4.31,3.17,4.31,2.02,0,3.12-1.56,3.12-3.58,0-7.32-15.16-3.69-15.16-16.82,0-7.53,4-11.58,12.15-11.58s12,3.48,12,11.42h-9.04Z" />
        <path d="m176.47,142.07h-7.27v-8.2h24.2v8.2h-7.27v28.87h-9.66v-28.87Z" />
        <path d="m195.58,133.86h15.11c7.37,0,10.18,4.15,10.18,9.87,0,4.98-1.92,8.15-6.34,8.83v.1c4.62.42,6.08,3.38,6.08,8.31v3.17c0,1.92,0,4.36.47,5.14.26.42.47.78,1.09,1.14v.52h-10.28c-.93-1.92-.93-5.56-.93-7.06v-2.49c0-4.21-.83-5.3-3.17-5.3h-2.54v14.85h-9.66v-37.08Zm9.66,15.68h1.92c2.75,0,4.05-1.77,4.05-4.41,0-3.06-1.19-4.31-4.1-4.31h-1.87v8.72Z" />
        <path d="m234.62,133.86v26.74c0,3.58,1.09,4.52,2.91,4.52s2.91-.93,2.91-4.52v-26.74h9.66v24.3c0,10.39-4.47,13.5-12.57,13.5s-12.57-3.12-12.57-13.5v-24.3h9.66Z" />
        <path d="m269.04,145.13c0-4.21-.78-5.45-2.65-5.45-2.91,0-3.27,2.7-3.27,12.72s.36,12.72,3.27,12.72c2.34,0,2.91-2.08,2.91-9.09h9.35v2.75c0,10.39-6.02,12.88-12.25,12.88-10.85,0-13.24-5.4-13.24-19.26s3.22-19.27,13.24-19.27c8.72,0,12,4.57,12,11.74v2.34h-9.35v-2.08Z" />
        <path d="m287,142.07h-7.27v-8.2h24.2v8.2h-7.27v28.87h-9.66v-28.87Z" />
      </g>
      <g fill="#f68922">
        <polygon points="151.91 14.01 135.85 0 0 0 0 117.16 27.34 117.16 27.34 27.34 136.16 27.34 151.91 14.01" />
        <polygon points="153.28 0 169.5 14.14 153.91 27.34 276.53 27.34 276.53 117.16 303.87 117.16 303.87 0 153.28 0" />
        <polygon points="133.85 290.12 149.69 276.71 27.61 276.71 27.61 186.88 .27 186.88 .27 304.04 149.81 304.04 133.85 290.12" />
        <polygon points="276.8 186.88 276.8 276.71 167.44 276.71 151.43 290.25 167.25 304.04 304.14 304.04 304.14 186.88 276.8 186.88" />
      </g>
    </svg>
  )
}

const PARTNERS: Partner[] = [
  { file: 'dnd-logo.png', name: 'Department of National Defence' },
  { file: 'NRC-IRAP-logo.png', name: 'National Research Council — IRAP' },
  { file: 'carleton-logo.png', name: 'Carleton University' },
  { file: 'envirocentre-logo.png', name: 'EnviroCentre' },
  { file: 'reconstruct-logo.svg', name: 'ReConstruct', inline: true },
  { file: 'recover-logo.png', name: 'Recover' },
  { file: 'safeandaffordable-logo.png', name: 'A Safe and Affordable Place Called Home' },
  { file: 'bsc-logo.png', name: 'buildingSMART Canada' },
]

function LogoItem({ partner }: { partner: Partner }) {
  return (
    <div className="group flex-shrink-0 flex flex-col items-center gap-3 px-6" style={{ minWidth: '224px' }}>
      <div className="flex items-center justify-center h-24 w-48 px-6 transition-all duration-300 group-hover:scale-105">
        {partner.inline ? (
          <ReconstructLogo className="max-h-16 w-auto object-contain saturate-50 opacity-90 transition-all duration-300 group-hover:saturate-100 group-hover:opacity-100" />
        ) : (
          <img
            src={`${BASE}/images/homepage/partners/${partner.file}`}
            alt={partner.name}
            className="max-h-16 w-auto object-contain saturate-50 opacity-90 transition-all duration-300 group-hover:saturate-100 group-hover:opacity-100"
            loading="lazy"
          />
        )}
      </div>
      <span
        className="text-xs font-medium text-center leading-tight max-w-[190px] opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
        style={{ color: 'var(--hp-on-surface-variant)' }}
      >
        {partner.name}
      </span>
    </div>
  )
}

export default function TrustedBySection() {
  const t = useTranslations('HomePage.trustedBy')
  const repeated = [...PARTNERS, ...PARTNERS, ...PARTNERS]

  return (
    <section
      className="py-16 md:py-20 relative overflow-hidden"
      style={{
        background: 'var(--hp-lowest)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="container mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="section-label justify-center">{t('heading')}</div>
        </motion.div>
      </div>

      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, var(--hp-lowest) 0%, transparent 100%)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(270deg, var(--hp-lowest) 0%, transparent 100%)' }}
        />
        <div className="flex marquee-left" style={{ width: 'max-content' }}>
          {repeated.map((partner, i) => (
            <LogoItem key={`${partner.file}-${i}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  )
}
