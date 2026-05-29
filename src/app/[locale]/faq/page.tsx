import { setRequestLocale, getTranslations } from 'next-intl/server'
import { SiteChrome } from '@/components/home/SiteChrome'
import PageHeader from '@/components/home/PageHeader'
import FaqSection from '@/components/home/FaqSection'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'HomePage.pageHeaders.faq' })

  return (
    <SiteChrome>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <FaqSection />
    </SiteChrome>
  )
}
