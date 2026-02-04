import { NextRequest } from 'next/server'

import { summaryController } from '@/server/controller/SummaryController'

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return summaryController(request)
}
