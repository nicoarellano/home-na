import * as React from 'react'
import type { Metadata } from 'next'
import '@/styles/globals.css'
import '@/styles/home.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://collabdigitaltwins.github.io'),
  icons: { icon: '/favicon.ico' },
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
