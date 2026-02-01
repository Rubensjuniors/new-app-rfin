import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string | null
      emailVerified: Date | null
      image: string | null
      createdAt: Date
      updatedAt: Date
    } & DefaultSession['user']
  }

  interface User {
    id: string
    email: string
    name: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date
    updatedAt: Date
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
    name: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date
    updatedAt: Date
  }
}
