import { Category, Prisma } from '@prisma/client'

export interface ICategoriesRepository {
  findById(id: string): Promise<Category | null>
  findAll(userId: string): Promise<Category[]>
  findByName(userId: string, name: string): Promise<Category | null>
  create(data: Prisma.CategoryUncheckedCreateInput): Promise<Category>
  update(id: string, userId: string, data: Prisma.CategoryUpdateInput): Promise<Category>
  delete(id: string, userId: string): Promise<void>
}
