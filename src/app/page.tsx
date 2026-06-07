import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { CdtLogoReveal } from '@/components/ui/CdtLogoReveal'
import { DelayedRedirect } from '@/components/ui/DelayedRedirect'

// Keep the splash up long enough for the logo reveal (~1.6s) to finish and for
// the target locale route to lazy-load before navigating.
const REVEAL_MS = 1000
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export async function generateMetadata(): Promise<Metadata> {
  const tMetadata = await getTranslations({ locale: routing.defaultLocale, namespace: 'HomePage.metadata' })

  return {
    title: tMetadata('title'),
    description: tMetadata('description'),
    openGraph: {
      title: tMetadata('title'),
      description: tMetadata('description'),
      siteName: 'Collab Digital Twins',
      images: [`${basePath}/images/cdt-og_card.png`],
      type: 'website',
      locale: 'en_CA',
    },
    twitter: {
      card: 'summary_large_image',
      title: tMetadata('title'),
      description: tMetadata('description'),
      images: [`${basePath}/images/cdt-og_card.png`],
    },
  }
}

export default function RootIndex() {
  const target = `./${routing.defaultLocale}/`
  return (
    <>
      {/* No-JS fallback. meta refresh only honours integer seconds, so this is
          rounded up to 2s; the JS path below redirects precisely at REVEAL_MS. */}
      <meta httpEquiv='refresh' content={`2; url=${target}`} />
      <DelayedRedirect href={target} delayMs={REVEAL_MS} />
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--hp-lowest)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
        }}
      >
        <CdtLogoReveal size={72} />
        <p
          className='font-display tracking-wide lowercase'
          style={{
            fontSize: '1.25rem',
            color: 'var(--hp-on-surface)',
            margin: 0,
          }}
        >
          <span style={{ color: 'var(--hp-primary-container)' }}>collab</span>digitaltwins
        </p>
      </div>
    </>
  )
}
