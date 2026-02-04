import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'

import { makeListCategoriesService } from '@/server/factories/makeListCategoriesService'
import { authOptions } from '@/server/libs/auth'
import { applySecurityHeaders } from '@/server/shared/middleware'

export async function listCategoriesController() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      const unauthorizedResponse = NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      return applySecurityHeaders(unauthorizedResponse)
    }

    const categories = await makeListCategoriesService().execute(session.user.id)

    const response = NextResponse.json(categories, { status: 200 })
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
