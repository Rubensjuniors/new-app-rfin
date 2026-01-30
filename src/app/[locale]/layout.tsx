import '../../client/shared/assets/styles/globals.css'

import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ReactNode } from 'react'

import { Providers } from '@/client/providers'

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic']
})

export const metadata: Metadata = {
  title: 'RFin',
  description:
    'rfin - Controle financeiro pessoal simples e eficiente. Organize suas finanças mensais sem burocracia.',
  authors: [{ name: 'rfin' }],
  openGraph: {
    title: 'rfin - Controle Financeiro Pessoal',
    description:
      'Organize suas finanças mensais de forma simples, sem burocracia e com grande facilidade de uso.',
    type: 'website'
  }
}

interface RootLayoutProps {
  children: ReactNode
  params: Promise<{
    locale: string
  }>
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/static/app-perfect-match/images/hotmart-logo-icon.svg" type="image/svg+xml" />
      </head>
      <body className={dmSans.variable}>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
