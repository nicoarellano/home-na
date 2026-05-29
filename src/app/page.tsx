import { routing } from '@/i18n/routing'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export default function RootIndex() {
  const target = `./${routing.defaultLocale}/`
  return (
    <>
      <meta httpEquiv='refresh' content={`0; url=${target}`} />
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
        <img
          src={`${BASE}/images/homepage/cdt-logo-stroke.svg`}
          alt='Collab Digital Twins'
          style={{ width: '72px', height: '72px' }}
        />
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
