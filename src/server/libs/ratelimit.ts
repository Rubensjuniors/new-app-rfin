import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

/**
 * Configuração do Redis para Rate Limiting
 * Em desenvolvimento, usa cache em memória para não consumir Redis
 * Em produção, usa Upstash Redis
 */
const redis =
  process.env.NODE_ENV === 'production' &&
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN
      })
    : undefined

/**
 * Rate Limiter para Login
 * 5 tentativas em 15 minutos
 */
export const loginRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '15 m'),
      analytics: true,
      prefix: 'ratelimit:login'
    })
  : null

/**
 * Rate Limiter para Registro
 * 3 tentativas em 1 hora
 */
export const registerRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, '1 h'),
      analytics: true,
      prefix: 'ratelimit:register'
    })
  : null

/**
 * Rate Limiter para APIs Gerais
 * 100 requisições em 1 minuto
 */
export const apiRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, '1 m'),
      analytics: true,
      prefix: 'ratelimit:api'
    })
  : null

/**
 * Fallback em desenvolvimento (in-memory)
 * Apenas para não quebrar em dev sem Redis configurado
 */
const devCache = new Map<string, { count: number; resetAt: number }>()

export function devRateLimit(identifier: string, limit: number, windowMs: number): boolean {
  if (redis) return true // Se tem Redis, não usa fallback

  const now = Date.now()
  const record = devCache.get(identifier)

  if (!record || now > record.resetAt) {
    devCache.set(identifier, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count++
  return true
}
