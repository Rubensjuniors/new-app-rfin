import { NextRequest } from 'next/server'

import { RegisterController } from '@/server/controller/User/RegisterController'

export async function POST(request: NextRequest) {
  return RegisterController(request)
}
