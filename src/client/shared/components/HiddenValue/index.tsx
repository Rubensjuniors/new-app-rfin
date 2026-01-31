import { cn } from '@/client/lib/utils'

import { useHiddenMoneyToggle } from '../../contexts/HiddenMoneyToggleContext'
import { formatCurrency } from '../../utils/currency'

export function HiddenMoney({ value, classNames }: { value: number; classNames?: string }) {
  const { isVisible } = useHiddenMoneyToggle()

  return (
    <p className={cn(classNames, `${isVisible ? '' : 'text-muted-foreground'}`)}>
      {isVisible ? formatCurrency(value) : '••••••••••'}
    </p>
  )
}
