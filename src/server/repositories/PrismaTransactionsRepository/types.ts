import { Prisma, Transaction } from '@prisma/client'

export interface TransactionFilters {
  startDate?: Date
  endDate?: Date
  type?: 'INCOME' | 'EXPENSE'
  isFixed?: boolean
}

export interface ITransactionsRepository {
  findById(id: string): Promise<Transaction | null>
  findByAll(userId: string, filters: TransactionFilters): Promise<Transaction[]>
  create(data: Prisma.TransactionCreateInput): Promise<Transaction>
  update(id: string, userId: string, data: Prisma.TransactionUpdateInput): Promise<Transaction>
  delete(id: string, userId: string): Promise<void>
}
