'use client'

import { useMemo } from 'react'

import { Skeleton } from '@/client/shared/components/ui/Skeleton'

import { SummaryCard } from './components/summaryCard'
import { useSummary } from './hooks/useSummary'

export function Summary() {
  const { data, isLoading } = useSummary()

  const summaryCards = useMemo(
    () => [
      {
        iconName: 'TrendingUp',
        title: 'summary.income',
        value: data?.income ?? 0,
        color: '#2fc06f'
      },
      {
        iconName: 'TrendingDown',
        title: 'summary.expense',
        value: data?.expense ?? 0,
        color: '#e65858'
      },
      {
        iconName: 'Wallet',
        title: 'summary.total',
        value: data?.total ?? 0,
        color: '#2fc06f'
      }
    ],
    [data]
  )

  return (
    <div className="flex items-center flex-wrap gap-4">
      {isLoading &&
        summaryCards.map((card) => <Skeleton key={card.title} className="flex-1 h-26 rounded-xl" />)}
      {!isLoading &&
        summaryCards.map((card) => <SummaryCard key={card.title} {...card} className="flex-1" />)}
    </div>
  )
}
