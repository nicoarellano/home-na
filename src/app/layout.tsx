import * as React from 'react'
import type { Metadata } from 'next'
// @ts-ignore
import '@/styles/globals.css'
// @ts-ignore
import '@/styles/home.css'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const metadata: Metadata = {
  metadataBase: new URL('https://collabdt.org'),
  icons: { icon: `${basePath}/favicon.ico` },
}

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en' className='dark'>
      <body>{children}</body>
    </html>
  )
}
