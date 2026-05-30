import { setRequestLocale, getTranslations } from 'next-intl/server'
import { SiteChrome } from '@/components/home/SiteChrome'
import PageHeader from '@/components/home/PageHeader'
import AboutSection from '@/components/home/AboutSection'
import MissionSection from '@/components/home/MissionSection'
import TeamSection from '@/components/home/TeamSection'
import RecognitionSection from '@/components/home/RecognitionSection'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'HomePage.pageHeaders.about' })

  return (
    <SiteChrome>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <AboutSection />
      <MissionSection />
      <TeamSection />
      <RecognitionSection />
    </SiteChrome>
  )
}
