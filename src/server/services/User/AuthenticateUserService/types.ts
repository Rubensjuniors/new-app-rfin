import { User } from '@prisma/client'

export type AuthenticateUserServiceRequest = Pick<User, 'email' | 'password'>

export type AuthenticateUserServiceResponse = Omit<User, 'password'>
