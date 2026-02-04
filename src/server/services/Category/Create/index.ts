import { ICategoriesRepository } from '@/server/repositories/PrismaCategoriesRepository/types'
import { IUsersRepository } from '@/server/repositories/PrismaUsersRepository/types'

import { CreateCategoryServiceRequest, CreateCategoryServiceResponse } from './types'

export class CreateCategoryService {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    userId,
    name,
    color,
    icon
  }: CreateCategoryServiceRequest): Promise<CreateCategoryServiceResponse> {
    const checkUser = await this.usersRepository.findById(userId)

    if (!checkUser) {
      throw new Error('User not found.')
    }

    const checkCategoryName = await this.categoriesRepository.findByName(userId, name)

    if (checkCategoryName) {
      throw new Error('Category name already exists.')
    }

    const category = await this.categoriesRepository.create({ color, icon, name, userId })

    return { category }
  }
}
