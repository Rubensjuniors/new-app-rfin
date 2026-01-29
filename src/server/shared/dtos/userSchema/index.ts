import z from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
})

export const userSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
  avatar: z.string().nullable(),
  createdAt: z.string()
})

export type IUser = z.infer<typeof userSchema>

export const authenticateUserSchema = z.object({
  email: z.email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres')
})

export const responseAuthenticateUserSchema = z.object({
  message: z.string()
})
