import * as React from 'react'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import '@/styles/globals.css'
import '@/styles/home.css'

interface Props {
  children: React.ReactNode
}

export async function generateMetadata(): Promise<Metadata> {
  const tHero = await getTranslations('HomePage.hero')

  return {
    title: 'Collab Digital Twins',
    description: tHero('description'),
    openGraph: {
      title: 'Collab Digital Twins',
      description: tHero('description'),
      images: ['/images/cdt-logo-bg.png'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Collab Digital Twins',
      description: tHero('description'),
      images: ['/images/cdt-logo-bg.png'],
    },
  }
}

export default async function RootLayout({ children }: Props) {
  const messages = await getMessages()
  const locale = await getLocale()

  return (
    <html lang={locale.toLowerCase()}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className='overflow-y-auto h-screen'>{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
