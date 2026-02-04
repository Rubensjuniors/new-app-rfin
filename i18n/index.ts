import { getRequestConfig } from 'next-intl/server'

import { defaultLocale, locales } from './config'

export default getRequestConfig(async (request) => {
  const requestLocale = await request.requestLocale
  const isValidLocale = requestLocale && locales.includes(requestLocale as string)
  const locale = isValidLocale ? requestLocale : defaultLocale

  return {
    locale: locale as string,
    messages: (await import(`./locales/${locale}.json`)).default,
    timeZone: 'America/Sao_Paulo'
  }
})
