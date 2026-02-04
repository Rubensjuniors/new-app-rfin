import { PrismaCategoriesRepository } from '@/server/repositories/PrismaCategoriesRepository'
import { PrismaUsersRepository } from '@/server/repositories/PrismaUsersRepository'
import { CreateCategoryService } from '@/server/services/Category/Create'

export async function makeCreateCategoryService() {
  const usersRepository = new PrismaUsersRepository()
  const categoriesRepository = new PrismaCategoriesRepository()

  const createCategoryService = new CreateCategoryService(categoriesRepository, usersRepository)
  return createCategoryService
}
