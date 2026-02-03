'use client'
import { useTranslations } from 'next-intl'

import { cn } from '@/client/lib/utils'
import { Button } from '@/client/shared/components/ui/Button'

import { quickFiltersOptions } from '../../constants'
import { useTransaction } from '../../context/transactionContext'

export function QuickFilters() {
  const t = useTranslations()
  const { currentQuickFilter, handleChangeQuickFilter } = useTransaction()

  return (
    <div className="flex gap-2 self-start overflow-x-auto whitespace-nowrap w-full max-w-full scrollbar-hide">
      {quickFiltersOptions.map((filter) => (
        <Button
          key={filter.value}
          variant={currentQuickFilter === filter.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleChangeQuickFilter(filter.value)}
          className={cn('gap-2 shrink-0', currentQuickFilter !== filter.value && 'text-muted-foreground')}
        >
          <filter.icon className="h-4 w-4" />
          {t(`quick_filters.${filter.value.toLowerCase()}`)}
        </Button>
      ))}
    </div>
  )
}
