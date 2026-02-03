import { useTranslations } from 'next-intl'

import { cn } from '@/client/lib/utils'
import { IconBox } from '@/client/shared/components/IconBox'
import { Card } from '@/client/shared/components/ui/Card'
import { useHiddenMoneyToggle } from '@/client/shared/contexts/HiddenMoneyToggleContext'
import { formatCurrency } from '@/client/shared/utils/currency'

interface SummaryCardProps {
  iconName: string
  title: string
  value: number
  className?: string
  color: string
}

export function SummaryCard({ iconName, title, value, className, color }: SummaryCardProps) {
  const t = useTranslations()
  const { isVisible } = useHiddenMoneyToggle()
  return (
    <Card className={cn('p-6 border-0 shadow-soft', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{t(title)}</p>
          <p className="text-xl sm:text-2xl font-bold mt-1" style={{ color }}>
            {isVisible ? formatCurrency(value) : '••••••••••'}
          </p>
        </div>

        <IconBox iconName={iconName} color={color}  />
      </div>
    </Card>
  )
}
