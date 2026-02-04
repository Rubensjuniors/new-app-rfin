import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { makeCreateCategoryService } from '@/server/factories/makeCreateCategoryService'
import { authOptions } from '@/server/libs/auth'
import { createCategorySchema } from '@/server/shared/dtos/categorySchema'
import { applySecurityHeaders, rateLimitByIp } from '@/server/shared/middleware'

export async function createController(request: NextRequest) {
  const rateLimitResponse = await rateLimitByIp(request, 'create-category')
  if (rateLimitResponse) {
    return applySecurityHeaders(rateLimitResponse)
  }

  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      const unauthorizedResponse = NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      return applySecurityHeaders(unauthorizedResponse)
    }

    const body = await request.json()
    const { name, color, icon } = createCategorySchema.parse(body)

    const createCategoryService = await makeCreateCategoryService()
    const { category } = await createCategoryService.execute({
      userId: session.user.id,
      name,
      color: color ? color : null,
      icon: icon ? icon : null
    })

    const response = NextResponse.json(
      {
        category
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
