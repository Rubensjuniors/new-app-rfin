import { Installment, Prisma } from '@prisma/client'

export interface IInstallmentsRepository {
  findById(id: string): Promise<Installment | null>
  findByAll(userId: string): Promise<Installment[]>
  findByTransactionId(transactionId: string, userId: string): Promise<Installment[]>
  create(data: Prisma.InstallmentCreateInput): Promise<Installment>
  update(id: string, userId: string, data: Prisma.InstallmentUpdateInput): Promise<Installment>
  delete(id: string, userId: string): Promise<void>
}
