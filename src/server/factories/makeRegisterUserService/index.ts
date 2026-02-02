import { PrismaUsersRepository } from '@/server/repositories/PrismaUsersRepository'
import { RegisterUserService } from '@/server/services/User/RegisterUserService'

export function makeRegisterUserService() {
  const usersRepository = new PrismaUsersRepository()
  const registerUserService = new RegisterUserService(usersRepository)

  return registerUserService
}
