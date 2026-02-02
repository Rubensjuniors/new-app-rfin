import z from 'zod'

export const schemaSignUp = z
  .object({
    name: z.string().min(2, 'auth.signUp.inputs.error.name.error'),
    email: z.string().email('auth.signUp.inputs.error.email.error'),
    password: z.string().min(8, 'auth.signUp.inputs.error.password.error'),
    confirmPassword: z.string().min(8, 'auth.signUp.inputs.error.confirmPassword.error')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'auth.signUp.inputs.confirmPassword.mismatch',
    path: ['confirmPassword']
  })

export type TypeSchemaSignUp = z.infer<typeof schemaSignUp>
