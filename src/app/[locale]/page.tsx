import { setRequestLocale } from 'next-intl/server'
import { Home } from '@/components/home/Home'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const assetsUrl = process.env.MINIO_BUCKET_URL || ''
  return <Home assetsUrl={assetsUrl} />
}
