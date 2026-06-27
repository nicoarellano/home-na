import { setRequestLocale } from 'next-intl/server'
import { SiteChrome } from '@/components/home/SiteChrome'
import { ContactBody } from '@/components/home/ContactBody'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <SiteChrome>
      <ContactBody />
    </SiteChrome>
  )
}
