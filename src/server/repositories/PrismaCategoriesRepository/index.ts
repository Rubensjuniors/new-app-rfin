import { Category, Prisma } from '@prisma/client'

import prisma from '@/server/libs/prisma'

import { ICategoriesRepository } from './types'

export class PrismaCategoriesRepository implements ICategoriesRepository {
  async findById(id: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: {
        id
      }
    })

    return category
  }

  async findAll(userId: string): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      where: {
        userId
      },
      orderBy: {
        name: 'asc'
      }
    })

    return categories
  }

  async findByName(userId: string, name: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: {
        userId_name: {
          userId,
          name
        }
      }
    })

    return category
  }

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    const category = await prisma.category.create({
      data
    })

    return category
  }

  async update(id: string, userId: string, data: Prisma.CategoryUpdateInput): Promise<Category> {
    const category = await prisma.category.update({
      where: {
        id,
        userId
      },
      data
    })

    return category
  }

  async delete(id: string, userId: string): Promise<void> {
    await prisma.category.delete({
      where: {
        id,
        userId
      }
    })
  }
}
