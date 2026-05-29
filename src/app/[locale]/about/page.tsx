import { setRequestLocale, getTranslations } from 'next-intl/server'
import { SiteChrome } from '@/components/home/SiteChrome'
import PageHeader from '@/components/home/PageHeader'
import AboutSection from '@/components/home/AboutSection'
import SolutionsSection from '@/components/home/SolutionsSection'
import DeveloperPlatformSection from '@/components/home/DeveloperPlatformSection'

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
      <SolutionsSection />
      <DeveloperPlatformSection />
    </SiteChrome>
  )
}
