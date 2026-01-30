import type { PaymentCardType, TransactionType } from './enums'

type BaseCategoryAndPaymentCard = {
  id: string
  name: string
  icon: string
  color: string
}

export type Category = BaseCategoryAndPaymentCard

export type PaymentCard = BaseCategoryAndPaymentCard & {
  bank: string
  type: PaymentCardType
}

export interface Installment {
  id: string
  InstallmentNumber: number
  amount: number
  date: string
  isPaid: boolean
}

export interface Transaction {
  id: string
  name: string
  amount: number
  date: string
  type: TransactionType
  isFixed: boolean
  isPaid: boolean
  paymentCard?: PaymentCard
  category?: Category
  installments?: Installment[]
}
