import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import createMiddleware from 'next-intl/middleware'

import { defaultLocale, locales } from '../i18n/config'
import { localeMapping } from './client/config/locale'
import {
  determineBrowserLocale,
  getFallbackLocale,
  getPathnameSegments,
  isPublicRoute
} from './client/config/middleware-helpers'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
})

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathnameSegments = getPathnameSegments(pathname)
  const firstSegment = pathnameSegments[0]

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  const isPublic = isPublicRoute(pathname)

  if (!token && !isPublic && locales.includes(firstSegment)) {
    return NextResponse.redirect(new URL(`/${firstSegment}/auth/sign-in`, request.url))
  }

  if (token && isPublic && locales.includes(firstSegment)) {
    return NextResponse.redirect(new URL(`/${firstSegment}/dashboard`, request.url))
  }

  if (locales.includes(firstSegment) && pathnameSegments.length === 1) {
    return NextResponse.redirect(new URL(`/${firstSegment}/dashboard`, request.url))
  }

  if (locales.includes(firstSegment)) {
    return intlMiddleware(request)
  }

  if (localeMapping[firstSegment]) {
    const newPathname = pathname.replace(`/${firstSegment}`, `/${localeMapping[firstSegment]}`)

    return NextResponse.redirect(new URL(newPathname, request.url))
  }

  const localePattern = /^\/([a-z]{2}(?:-[a-z]{2})?)$/
  const match = pathname.match(localePattern)

  if (match && !locales.includes(match[1])) {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url))
  }

  if (!locales.includes(firstSegment) && pathnameSegments.length > 1) {
    const remainingPath = pathnameSegments.slice(1).join('/')

    return NextResponse.redirect(new URL(`/${defaultLocale}/${remainingPath}`, request.url))
  }

  if (!pathname || pathname === '/') {
    const determinedLocale = determineBrowserLocale(request)
    return NextResponse.redirect(new URL(`/${determinedLocale}${pathname}`, request.url))
  }

  const fallbackLocale = getFallbackLocale(request)
  return NextResponse.redirect(new URL(`/${fallbackLocale}${pathname}`, request.url))
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
