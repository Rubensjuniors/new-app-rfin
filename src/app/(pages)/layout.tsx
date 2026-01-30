import '../../client/shared/assets/styles/globals.css'

import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'

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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={dmSans.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
