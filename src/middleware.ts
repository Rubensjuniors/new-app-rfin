import { type NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuth = !!token
  const isAuthPage =
    request.nextUrl.pathname.startsWith('/auth/sign-in') ||
    request.nextUrl.pathname.startsWith('/auth/sign-up')

  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (!isAuth && !isAuthPage) {
    let from = request.nextUrl.pathname
    if (request.nextUrl.search) {
      from += request.nextUrl.search
    }

    return NextResponse.redirect(
      new URL(`/auth/sign-in?callbackUrl=${encodeURIComponent(from)}`, request.url)
    )
  }
}

// Protege TODAS as rotas exceto as públicas
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - auth (auth pages)
     * - api (all API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!auth|api|_next/static|_next/image|favicon.ico|public).*)'
  ]
}
