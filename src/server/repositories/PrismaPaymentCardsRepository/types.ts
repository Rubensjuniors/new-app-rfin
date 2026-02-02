import { PaymentCard, Prisma } from '@prisma/client'

export interface IPaymentCardsRepository {
  findById(id: string): Promise<PaymentCard | null>
  findByAll(userId: string): Promise<PaymentCard[]>
  findByName(userId: string, name: string): Promise<PaymentCard | null>
  create(data: Prisma.PaymentCardCreateInput): Promise<PaymentCard>
  update(id: string, userId: string, data: Prisma.PaymentCardUpdateInput): Promise<PaymentCard>
  delete(id: string, userId: string): Promise<void>
}
