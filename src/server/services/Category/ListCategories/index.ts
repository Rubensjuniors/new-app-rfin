import { PrismaCategoriesRepository } from '@/server/repositories/PrismaCategoriesRepository'

export class ListCategoriesService {
  constructor(private categoriesRepository: PrismaCategoriesRepository) {}

  async execute(userId: string) {
    const categories = await this.categoriesRepository.findAll(userId)
    return categories
  }
}
