import z from 'zod'

export const createCategorySchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  color: z.string().optional(),
  icon: z.string().optional()
})

export const categorySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  color: z.string().nullable(),
  icon: z.string().nullable(),
  userId: z.uuid()
})

export type ICategory = z.infer<typeof categorySchema>

export const updateCategorySchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').optional(),
  color: z.string().optional(),
  icon: z.string().optional()
})
