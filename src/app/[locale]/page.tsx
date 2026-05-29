import { setRequestLocale } from 'next-intl/server'
import { SiteChrome } from '@/components/home/SiteChrome'
import { HomeBody } from '@/components/home/HomeBody'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const assetsUrl = process.env.NEXT_PUBLIC_MINIO_BUCKET_URL || ''
  return (
    <SiteChrome>
      <HomeBody assetsUrl={assetsUrl} />
    </SiteChrome>
  )
}
