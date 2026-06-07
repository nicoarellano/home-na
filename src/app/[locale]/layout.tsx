import * as React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'

interface Props {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const tMetadata = await getTranslations({ locale, namespace: 'HomePage.metadata' })

  const ogLocale = locale === 'Fr' ? 'fr_CA' : locale === 'Es' ? 'es_ES' : 'en_CA'

  return {
    title: tMetadata('title'),
    description: tMetadata('description'),
    openGraph: {
      title: tMetadata('title'),
      description: tMetadata('description'),
      siteName: 'Collab Digital Twins',
      images: [`${basePath}/images/cdt-og_card.png`],
      type: 'website',
      locale: ogLocale,
    },
    twitter: {
      card: 'summary_large_image',
      title: tMetadata('title'),
      description: tMetadata('description'),
      images: [`${basePath}/images/cdt-og_card.png`],
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className='overflow-y-auto h-screen'>{children}</div>
    </NextIntlClientProvider>
  )
}
