import { setRequestLocale } from 'next-intl/server'
import { SiteChrome } from '@/components/home/SiteChrome'
import DocsHeroSection from '@/components/home/DocsHeroSection'
import PlatformArchitectureEmbed from '@/components/home/PlatformArchitectureEmbed'
import FaqSection from '@/components/home/FaqSection'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <SiteChrome>
      <DocsHeroSection />
      <PlatformArchitectureEmbed />
      <FaqSection />
    </SiteChrome>
  )
}
