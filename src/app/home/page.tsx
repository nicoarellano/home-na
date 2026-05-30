import { routing } from '@/i18n/routing'

/**
 * Defensive redirect: bare /home (no locale prefix) -> the main page of the
 * default locale. Mirrors the root index redirect in src/app/page.tsx.
 */
export default function HomeRedirect() {
  // Relative to /home/ (trailingSlash), `../En/` resolves to /En/
  const target = `../${routing.defaultLocale}/`
  return <meta httpEquiv="refresh" content={`0; url=${target}`} />
}
