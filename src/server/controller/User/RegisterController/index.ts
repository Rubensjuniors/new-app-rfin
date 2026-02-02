import { NextRequest, NextResponse } from 'next/server'

import { makeRegisterUserService } from '@/server/factories/makeRegisterUserService'
import { createUserSchema } from '@/server/shared/dtos/userSchema'

export async function RegisterController(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = createUserSchema.parse(body)

    const registerUserService = makeRegisterUserService()
    const user = await registerUserService.execute({ name, email, password })

    return NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
