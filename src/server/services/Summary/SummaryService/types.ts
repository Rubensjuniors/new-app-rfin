export interface SummaryServiceRequest {
  month?: number
  year?: number
}

export interface SummaryServiceResponse {
  totalIncome: number
  totalExpense: number
  balance: number
  totalTransactions: number
  totalPaid: number
  totalPending: number
  categories: {
    id: string
    name: string
    color: string | null
    icon: string | null
    total: number
    transactions: number
  }[]
  recentTransactions: {
    id: string
    name: string
    amount: number
    date: Date
    type: 'INCOME' | 'EXPENSE'
    isPaid: boolean
    category: {
      id: string
      name: string
      color: string | null
      icon: string | null
    } | null
    paymentCard: {
      id: string
      name: string
      bank: string
    } | null
  }[]
}
