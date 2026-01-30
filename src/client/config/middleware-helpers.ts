import { NextRequest } from 'next/server'

import { defaultLocale, locales } from '../../../i18n/config'
import { browserLocaleMapping, publicRoutes } from './locale'

export function isPublicRoute(pathname: string): boolean {
  const pathWithoutLocale = pathname.replace(/^\/(en|pt-br)/, '')
  return publicRoutes.some((route) => pathWithoutLocale.startsWith(route))
}

export function getPathnameSegments(pathname: string): string[] {
  return pathname.split('/').filter(Boolean)
}

export function determineBrowserLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')
  let determinedLocale = defaultLocale

  if (acceptLanguage) {
    const browserLocale = acceptLanguage.split(',')[0].trim().toLowerCase()

    if (browserLocaleMapping[browserLocale]) {
      determinedLocale = browserLocaleMapping[browserLocale]
    } else {
      const localeKey = Object.keys(browserLocaleMapping).find((key) => browserLocale.startsWith(key))
      if (localeKey) {
        determinedLocale = browserLocaleMapping[localeKey]
      }
    }
  }

  return determinedLocale
}

export function getFallbackLocale(request: NextRequest): string {
  const savedLocale = request.cookies.get('NEXT_LOCALE')
  return savedLocale && locales.includes(savedLocale.value) ? savedLocale.value : defaultLocale
}
