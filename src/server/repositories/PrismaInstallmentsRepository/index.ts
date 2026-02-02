import { Installment, Prisma } from '@prisma/client'

import prisma from '@/server/libs/prisma'

import { IInstallmentsRepository } from './types'

export class PrismaInstallmentsRepository implements IInstallmentsRepository {
  async findById(id: string): Promise<Installment | null> {
    const installment = await prisma.installment.findUnique({
      where: {
        id
      },
      include: {
        transaction: {
          include: {
            category: true,
            paymentCard: true
          }
        }
      }
    })

    return installment
  }

  async findByAll(userId: string): Promise<Installment[]> {
    const installments = await prisma.installment.findMany({
      where: {
        userId
      },
      include: {
        transaction: {
          include: {
            category: true,
            paymentCard: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    })

    return installments
  }

  async findByTransactionId(transactionId: string, userId: string): Promise<Installment[]> {
    const installments = await prisma.installment.findMany({
      where: {
        transactionId,
        userId
      },
      orderBy: {
        InstallmentNumber: 'asc'
      }
    })

    return installments
  }

  async create(data: Prisma.InstallmentCreateInput): Promise<Installment> {
    const installment = await prisma.installment.create({
      data,
      include: {
        transaction: {
          include: {
            category: true,
            paymentCard: true
          }
        }
      }
    })

    return installment
  }

  async update(id: string, userId: string, data: Prisma.InstallmentUpdateInput): Promise<Installment> {
    const installment = await prisma.installment.update({
      where: {
        id,
        userId
      },
      data,
      include: {
        transaction: {
          include: {
            category: true,
            paymentCard: true
          }
        }
      }
    })

    return installment
  }

  async delete(id: string, userId: string): Promise<void> {
    await prisma.installment.delete({
      where: {
        id,
        userId
      }
    })
  }
}
