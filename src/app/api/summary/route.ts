import { NextRequest } from 'next/server'

import { summaryController } from '@/server/controller/SummaryController'

export async function GET(request: NextRequest) {
  return summaryController(request)
}
