import { Home } from '@/components/home/Home'

export default function HomePage() {
  const assetsUrl = process.env.MINIO_BUCKET_URL || ''
  return <Home assetsUrl={assetsUrl} />
}
