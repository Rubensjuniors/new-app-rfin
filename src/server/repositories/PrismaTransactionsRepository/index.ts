import { Prisma, Transaction } from '@prisma/client'

import prisma from '@/server/libs/prisma'

import { ITransactionsRepository, TransactionFilters } from './types'

export class PrismaTransactionsRepository implements ITransactionsRepository {
  async findById(id: string): Promise<Transaction | null> {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id
      },
      include: {
        category: true,
        paymentCard: true,
        installments: true
      }
    })

    return transaction
  }

  async findByAll(userId: string, filters: TransactionFilters): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: filters.startDate,
          lte: filters.endDate
        },
        type: filters.type,
        isFixed: filters.isFixed
      },
      include: {
        category: true,
        paymentCard: true,
        installments: true
      },
      orderBy: {
        date: 'desc'
      }
    })

    return transactions
  }

  async create(data: Prisma.TransactionCreateInput): Promise<Transaction> {
    const transaction = await prisma.transaction.create({
      data,
      include: {
        category: true,
        paymentCard: true,
        installments: true
      }
    })

    return transaction
  }

  async update(id: string, userId: string, data: Prisma.TransactionUpdateInput): Promise<Transaction> {
    const transaction = await prisma.transaction.update({
      where: {
        id,
        userId
      },
      data,
      include: {
        category: true,
        paymentCard: true,
        installments: true
      }
    })

    return transaction
  }

  async delete(id: string, userId: string): Promise<void> {
    await prisma.transaction.delete({
      where: {
        id,
        userId
      }
    })
  }
}
