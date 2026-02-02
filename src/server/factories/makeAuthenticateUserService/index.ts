import { PrismaUsersRepository } from '@/server/repositories/PrismaUsersRepository'
import { AuthenticateUserService } from '@/server/services/User/AuthenticateUserService'

export function makeAuthenticateUserService() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUserService = new AuthenticateUserService(usersRepository)

  return authenticateUserService
}
