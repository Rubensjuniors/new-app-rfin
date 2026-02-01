import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import { NextAuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import prisma from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

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
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.emailVerified = user.emailVerified
        token.image = user.image
        token.createdAt = user.createdAt
        token.updatedAt = user.updatedAt
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name
        session.user.emailVerified = token.emailVerified
        session.user.image = token.image
        session.user.createdAt = token.createdAt as Date
        session.user.updatedAt = token.updatedAt as Date
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Se a URL já contém um locale válido, use-a
      if (url.startsWith('/')) {
        // URL relativa
        const segments = url.split('/').filter(Boolean)
        const firstSegment = segments[0]

        // Se já tem locale, redireciona para dashboard
        if (firstSegment === 'en' || firstSegment === 'pt-br') {
          return `${baseUrl}/${firstSegment}/dashboard`
        }

        // Caso contrário, adiciona locale padrão
        return `${baseUrl}/en/dashboard`
      }

      // URL absoluta - verifica se é do mesmo domínio
      if (url.startsWith(baseUrl)) {
        const path = url.replace(baseUrl, '')
        const segments = path.split('/').filter(Boolean)
        const firstSegment = segments[0]

        if (firstSegment === 'en' || firstSegment === 'pt-br') {
          return `${baseUrl}/${firstSegment}/dashboard`
        }

        return `${baseUrl}/en/dashboard`
      }

      // Fallback para dashboard com locale padrão
      return `${baseUrl}/en/dashboard`
    }
  },
  pages: {
    signIn: '/auth/sign-in'
  }
}
