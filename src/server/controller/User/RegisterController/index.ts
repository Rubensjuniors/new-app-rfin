import { NextRequest, NextResponse } from 'next/server'

import { makeRegisterUserService } from '@/server/factories/makeRegisterUserService'
import { createUserSchema } from '@/server/shared/dtos/userSchema'
import { applySecurityHeaders, rateLimitByIp } from '@/server/shared/middleware'

export async function RegisterController(request: NextRequest) {
  // Rate limiting
  const rateLimitResponse = await rateLimitByIp(request, 'register')
  if (rateLimitResponse) {
    return applySecurityHeaders(rateLimitResponse)
  }

  try {
    const body = await request.json()
    const { name, email, password } = createUserSchema.parse(body)

    const registerUserService = makeRegisterUserService()
    const user = await registerUserService.execute({ name, email, password })

    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      },
      { status: 201 }
    )

    return applySecurityHeaders(response)
  } catch (error) {
    if (error instanceof Error) {
      const errorResponse = NextResponse.json({ error: error.message }, { status: 400 })
      return applySecurityHeaders(errorResponse)
    }

    const serverErrorResponse = NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    return applySecurityHeaders(serverErrorResponse)
  }
}
