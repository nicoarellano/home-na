import { cookies } from 'next/headers'
import { defaultLocale, locales, type Locale } from './config'

const COOKIE_NAME = 'NEXT_LOCALE'

export async function getUserLocale(): Promise<Locale> {
  const store = await cookies()
  const value = store.get(COOKIE_NAME)?.value
  if (value && (locales as readonly string[]).includes(value)) {
    return value as Locale
  }
  return defaultLocale
}
