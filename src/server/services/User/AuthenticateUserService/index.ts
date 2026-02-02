import { compare } from 'bcryptjs'

import { IUsersRepository } from '@/server/repositories/PrismaUsersRepository/types'

import { AuthenticateUserServiceRequest, AuthenticateUserServiceResponse } from './types'

export class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    password
  }: AuthenticateUserServiceRequest): Promise<AuthenticateUserServiceResponse | null> {
    if (!password) {
      return null
    }

    const user = await this.usersRepository.findByEmail(email)

    if (!user || !user.password) {
      return null
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }
}
