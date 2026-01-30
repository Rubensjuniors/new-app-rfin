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

  // Handle root path
  if (!pathname || pathname === '/') {
    const determinedLocale = determineBrowserLocale(request)
    return NextResponse.redirect(new URL(`/${determinedLocale}/dashboard`, request.url))
  }

  // Handle locale mapping (pt -> pt-br)
  if (localeMapping[firstSegment]) {
    const newPathname = pathname.replace(`/${firstSegment}`, `/${localeMapping[firstSegment]}`)
    return NextResponse.redirect(new URL(newPathname, request.url))
  }

  // Handle invalid locales
  const localePattern = /^\/([a-z]{2}(?:-[a-z]{2})?)$/
  const match = pathname.match(localePattern)
  if (match && !locales.includes(match[1])) {
    return NextResponse.redirect(new URL(`/${defaultLocale}/dashboard`, request.url))
  }

  // Handle paths without locale
  if (!locales.includes(firstSegment)) {
    if (pathnameSegments.length > 0) {
      const remainingPath = pathnameSegments.join('/')
      return NextResponse.redirect(new URL(`/${defaultLocale}/${remainingPath}`, request.url))
    }
    const fallbackLocale = getFallbackLocale(request)
    return NextResponse.redirect(new URL(`/${fallbackLocale}/dashboard`, request.url))
  }

  // From here, we know the first segment is a valid locale
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  const isPublic = isPublicRoute(pathname)

  // Redirect to sign-in if not authenticated and trying to access protected route
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL(`/${firstSegment}/auth/sign-in`, request.url))
  }

  // Redirect to dashboard if authenticated and trying to access auth pages
  if (token && isPublic) {
    return NextResponse.redirect(new URL(`/${firstSegment}/dashboard`, request.url))
  }

  // Redirect locale-only paths to dashboard
  if (pathnameSegments.length === 1) {
    const destination = token ? `/${firstSegment}/dashboard` : `/${firstSegment}/auth/sign-in`
    return NextResponse.redirect(new URL(destination, request.url))
  }

  // Process with intl middleware for valid locale paths
  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
