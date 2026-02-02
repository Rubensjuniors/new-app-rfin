import { NextRequest, NextResponse } from 'next/server'

export function securityHeaders(request: NextRequest, response: NextResponse): NextResponse {
  // Content Security Policy (CSP)
  response.headers.set(
    'Content-Security-Policy',
    [
      'default-src \'self\'',
      'script-src \'self\' \'unsafe-eval\' \'unsafe-inline\'',
      'style-src \'self\' \'unsafe-inline\'',
      'img-src \'self\' data: https:',
      'font-src \'self\' data:',
      'connect-src \'self\' https:',
      'frame-ancestors \'self\''
    ].join('; ')
  )

  // Proteção contra clickjacking
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')

  // Proteção contra MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // Proteção XSS (legacy, mas ainda útil para browsers antigos)
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // HSTS - Force HTTPS (apenas em produção)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  }

  // Controle de referrer
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Permissions Policy (Feature Policy)
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()')

  // Remove headers que expõem informações do servidor
  response.headers.delete('X-Powered-By')

  return response
}

export function applySecurityHeaders(response: NextResponse): NextResponse {
  return securityHeaders({} as NextRequest, response)
}
