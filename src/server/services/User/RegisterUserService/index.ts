import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { IUsersRepository } from '@/server/repositories/PrismaUsersRepository/types'

import { RegisterUserServiceRequest } from './types'

export class RegisterUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: RegisterUserServiceRequest): Promise<User> {
    if (!password) {
      throw new Error('Password is required')
    }

    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new Error('Email already in use')
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    return user
  }
}
