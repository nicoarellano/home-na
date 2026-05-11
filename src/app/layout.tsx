import * as React from 'react'
import '@/styles/globals.css'
import '@/styles/home.css'

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
