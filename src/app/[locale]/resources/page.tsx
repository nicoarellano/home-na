import { setRequestLocale } from 'next-intl/server'

interface Props {
  params: Promise<{ locale: string }>
}

/**
 * The Resources page has been retired: its Documentation and FAQ sections now
 * live at the end of the home page, and the platform-architecture embed is
 * archived (kept in the repo, no longer rendered). Redirect any old
 * /resources links back to the home page.
 *
 * Relative to /[locale]/resources/ (trailingSlash), `../` resolves to /[locale]/.
 */
export default async function ResourcesRedirect({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <meta httpEquiv="refresh" content="0; url=../" />
}
