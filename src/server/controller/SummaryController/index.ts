import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import z from 'zod'

import { authOptions } from '@/server/libs/auth'
import { applySecurityHeaders } from '@/server/shared/middleware'

import { makeSummaryService } from '../../factories/makeSummaryService'

const querySchema = z.object({
  month: z.coerce.number().min(1).max(12).optional(),
  year: z.coerce.number().min(2000).optional()
})

export async function summaryController(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      const unauthorizedResponse = NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      return applySecurityHeaders(unauthorizedResponse)
    }

    const searchParams = Object.fromEntries(request.nextUrl.searchParams)
    const { month, year } = querySchema.parse(searchParams)

    const summaryService = makeSummaryService()
    const summary = await summaryService.execute(session.user.id, { month, year })

    const response = NextResponse.json(summary, { status: 200 })
    return applySecurityHeaders(response)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodErrorResponse = NextResponse.json(
        { error: 'Invalid query parameters', details: error.issues },
        { status: 400 }
      )
      return applySecurityHeaders(zodErrorResponse)
    }

    if (error instanceof Error) {
      const errorResponse = NextResponse.json({ error: error.message }, { status: 400 })
      return applySecurityHeaders(errorResponse)
    }

    const serverErrorResponse = NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    return applySecurityHeaders(serverErrorResponse)
  }
}
