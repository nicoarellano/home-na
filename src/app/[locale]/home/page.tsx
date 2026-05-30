import { setRequestLocale } from 'next-intl/server'

interface Props {
  params: Promise<{ locale: string }>
}

/**
 * Defensive redirect: /[locale]/home -> /[locale] (the main page).
 * The homepage lives at the locale root, so /home should never be a real
 * destination — send anyone who lands there back to the main page.
 */
export default async function LocaleHomeRedirect({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  // Relative to /[locale]/home/ (trailingSlash), `../` resolves to /[locale]/
  return <meta httpEquiv="refresh" content="0; url=../" />
}
