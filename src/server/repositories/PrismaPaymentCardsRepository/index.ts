import { PaymentCard, Prisma } from '@prisma/client'

import prisma from '@/server/libs/prisma'

import { IPaymentCardsRepository } from './types'

export class PrismaPaymentCardsRepository implements IPaymentCardsRepository {
  async findById(id: string): Promise<PaymentCard | null> {
    const paymentCard = await prisma.paymentCard.findUnique({
      where: {
        id
      }
    })

    return paymentCard
  }

  async findByAll(userId: string): Promise<PaymentCard[]> {
    const paymentCards = await prisma.paymentCard.findMany({
      where: {
        userId
      },
      orderBy: {
        name: 'asc'
      }
    })

    return paymentCards
  }

  async findByName(userId: string, name: string): Promise<PaymentCard | null> {
    const paymentCard = await prisma.paymentCard.findUnique({
      where: {
        userId_name: {
          userId,
          name
        }
      }
    })

    return paymentCard
  }

  async create(data: Prisma.PaymentCardCreateInput): Promise<PaymentCard> {
    const paymentCard = await prisma.paymentCard.create({
      data
    })

    return paymentCard
  }

  async update(id: string, userId: string, data: Prisma.PaymentCardUpdateInput): Promise<PaymentCard> {
    const paymentCard = await prisma.paymentCard.update({
      where: {
        id,
        userId
      },
      data
    })

    return paymentCard
  }

  async delete(id: string, userId: string): Promise<void> {
    await prisma.paymentCard.delete({
      where: {
        id,
        userId
      }
    })
  }
}
