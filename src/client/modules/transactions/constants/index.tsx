import { CreditCard, List, Pin, TrendingDown, TrendingUp } from 'lucide-react'

export enum QuickFilterType {
  ALL = 'ALL',
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  FIXED = 'FIXED',
  INSTALLMENTS = 'INSTALLMENTS'
}

export const quickFiltersOptions = [
  { value: QuickFilterType.ALL, icon: List },
  { value: QuickFilterType.INCOME, icon: TrendingUp },
  { value: QuickFilterType.EXPENSE, icon: TrendingDown },
  { value: QuickFilterType.FIXED, icon: Pin },
  { value: QuickFilterType.INSTALLMENTS, icon: CreditCard }
]
