import * as React from 'react'

import { cn } from '@/client/lib/utils'

export const CardTitle = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} data-slot="card-title" className={cn('leading-none font-semibold', className)} {...props} />
  }
)
CardTitle.displayName = 'CardTitle'
