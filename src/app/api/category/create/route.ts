import { NextRequest } from 'next/server'

import { createController } from '@/server/controller/Category/CreateController'

export async function POST(request: NextRequest) {
  return createController(request)
}
