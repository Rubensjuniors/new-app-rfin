import { NextRequest, NextResponse } from 'next/server'

import { devRateLimit, loginRateLimit, registerRateLimit } from '@/server/libs/ratelimit'

/**
 * Extrai IP do cliente
 */
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')

  if (forwarded) return forwarded.split(',')[0].trim()
  if (realIp) return realIp.trim()

  return 'unknown'
}

/**
 * Aplica rate limiting por IP
 */
export async function rateLimitByIp(
  request: NextRequest,
  type: 'login' | 'register'
): Promise<NextResponse | null> {
  const ip = getClientIp(request)
  const identifier = `${type}:${ip}`

  const limiter = type === 'login' ? loginRateLimit : registerRateLimit

  // Se tem Redis configurado, usa Upstash
  if (limiter) {
    const { success, limit, remaining, reset } = await limiter.limit(identifier)

    if (!success) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000)

      return NextResponse.json(
        {
          error:
            type === 'login'
              ? 'Muitas tentativas de login. Tente novamente em alguns minutos.'
              : 'Muitas tentativas de registro. Tente novamente mais tarde.'
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfter),
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': String(remaining),
            'X-RateLimit-Reset': new Date(reset).toISOString()
          }
        }
      )
    }
  } else {
    // Fallback para desenvolvimento sem Redis
    const limits = { login: { max: 5, window: 900000 }, register: { max: 3, window: 3600000 } }
    const config = limits[type]

    const allowed = devRateLimit(identifier, config.max, config.window)

    if (!allowed) {
      return NextResponse.json({ error: 'Muitas tentativas. Por favor, aguarde.' }, { status: 429 })
    }
  }

  return null
}

/**
 * Aplica rate limiting por email
 */
export async function rateLimitByEmail(email: string): Promise<boolean> {
  if (!loginRateLimit) {
    // Fallback dev
    return devRateLimit(`email:${email}`, 5, 900000)
  }

  const { success } = await loginRateLimit.limit(`email:${email}`)
  return success
}

/**
 * Reseta rate limit após login bem-sucedido
 * Com Upstash sliding window, não é necessário reset manual
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function resetRateLimit(_email: string): Promise<void> {
  // Upstash sliding window se auto-gerencia
  // Não precisa de reset explícito
}
