import { setRequestLocale, getTranslations } from 'next-intl/server'
import { SiteChrome } from '@/components/home/SiteChrome'
import PageHeader from '@/components/home/PageHeader'
import TeamSection from '@/components/home/TeamSection'
import RecognitionSection from '@/components/home/RecognitionSection'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function TeamPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'HomePage.pageHeaders.team' })

  return (
    <SiteChrome>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <TeamSection />
      <RecognitionSection />
    </SiteChrome>
  )
}
