import { PrismaCategoriesRepository } from '@/server/repositories/PrismaCategoriesRepository'
import { ListCategoriesService } from '@/server/services/Category/ListCategories'

export function makeListCategoriesService() {
  const categoriesRepository = new PrismaCategoriesRepository()
  const listCategoriesService = new ListCategoriesService(categoriesRepository)
  return listCategoriesService
}
