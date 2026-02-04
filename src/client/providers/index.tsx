'use client'

import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'

import { HiddenMoneyToggleProvider } from '../shared/contexts/HiddenMoneyToggleContext'

type Props = {
  children?: React.ReactNode
  messages: Record<string, string | Record<string, unknown>>
  locale: string
}

export const Providers = ({ children, messages, locale }: Props) => {
  return (
    <SessionProvider>
      <NextIntlClientProvider messages={messages} locale={locale} timeZone="America/Sao_Paulo">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="rfin-ui-theme"
          disableTransitionOnChange
        >
          <HiddenMoneyToggleProvider>{children}</HiddenMoneyToggleProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    </SessionProvider>
  )
}
