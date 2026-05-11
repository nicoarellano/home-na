import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

process.env.NEXT_OUTPUT_EXPORT = 'true'

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default withNextIntl(nextConfig)
