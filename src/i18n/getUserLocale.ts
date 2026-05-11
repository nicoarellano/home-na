import { defaultLocale, locales, type Locale } from './config'

const COOKIE_NAME = 'NEXT_LOCALE'

export async function getUserLocale(): Promise<Locale> {
  // Under `output: 'export'` (GitHub Pages), server-side rendering happens
  // at build time, so per-user cookies aren't available — fall back to the
  // default locale and skip `cookies()` so routes stay statically prerenderable.
  if (process.env.NEXT_OUTPUT_EXPORT === 'true') {
    return defaultLocale
  }

  const { cookies } = await import('next/headers')
  const store = await cookies()
  const value = store.get(COOKIE_NAME)?.value
  if (value && (locales as readonly string[]).includes(value)) {
    return value as Locale
  }
  return defaultLocale
}
