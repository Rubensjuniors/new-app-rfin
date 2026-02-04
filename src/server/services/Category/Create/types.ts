import { Category } from '@prisma/client'

export type CreateCategoryServiceRequest = Omit<Category, 'id'>

export interface CreateCategoryServiceResponse {
  category: Category
}
