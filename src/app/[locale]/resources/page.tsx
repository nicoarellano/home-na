import { setRequestLocale, getTranslations } from 'next-intl/server'
import { SiteChrome } from '@/components/home/SiteChrome'
import PageHeader from '@/components/home/PageHeader'
import PrinciplesSection from '@/components/home/PrinciplesSection'
import TrustBandSection from '@/components/home/TrustBandSection'
import PlatformArchitectureEmbed from '@/components/home/PlatformArchitectureEmbed'
import DeveloperPlatformSection from '@/components/home/DeveloperPlatformSection'
import FaqSection from '@/components/home/FaqSection'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'HomePage.pageHeaders.resources' })

  return (
    <SiteChrome>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <DeveloperPlatformSection />
      <PlatformArchitectureEmbed />
      <PrinciplesSection />
      <TrustBandSection />
      {/* <FaqSection /> */}
    </SiteChrome>
  )
}
