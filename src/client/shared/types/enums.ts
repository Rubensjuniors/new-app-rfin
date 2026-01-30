import z from 'zod'

export enum PaymentCardType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  BOTH = 'BOTH'
}

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export const FilterQueryRouterEnum = z.enum(['ALL', 'INCOME', 'EXPENSE', 'FIXED', 'INSTALLMENTS'])
