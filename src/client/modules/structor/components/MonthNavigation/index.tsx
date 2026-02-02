'use client'
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/client/lib/utils'
import { Button } from '@/client/shared/components/ui/Button'
import { Popover, PopoverContent, PopoverTrigger } from '@/client/shared/components/ui/Popover'
import { formatMonth, months } from '@/client/shared/utils/date'

import { useMonthNavigation } from '../../context/MonthNavigationContext'

export function MonthNavigation() {
  const t = useTranslations()
  const {
    handleMonthSelect,
    isSelected,
    isToday,
    openPopoverMonth,
    selectedYear,
    setOpenPopoverMonth,
    setSelectedYear,
    currentMonthAndYear
  } = useMonthNavigation()

  return (
    <Popover open={openPopoverMonth} onOpenChange={setOpenPopoverMonth}>
      <PopoverTrigger asChild>
        <Button type="button" variant="ghost" className="h-9 gap-2 px-3">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold capitalize">{formatMonth(currentMonthAndYear)}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-70 p-3" align="center">
        <div className="flex items-center justify-between mb-3 pb-2 border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedYear((y) => y - 1)}
            className="h-7 w-7"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-semibold">{selectedYear}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedYear((y) => y + 1)}
            className="h-7 w-7"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => handleMonthSelect(index)}
              className={cn(
                'py-2 px-2 rounded-md text-sm transition-all',
                'hover:bg-primary/10 hover:text-primary',
                isSelected(index) &&
                  'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground font-medium',
                isToday(index) && !isSelected(index) && 'text-primary font-medium'
              )}
            >
              {t(`months.${month}`).slice(0, 3)}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
