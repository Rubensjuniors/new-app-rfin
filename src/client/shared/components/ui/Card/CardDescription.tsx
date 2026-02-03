import * as React from 'react'

import { cn } from '@/client/lib/utils'

export const CardDescription = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} data-slot="card-description" className={cn('text-muted-foreground text-sm', className)} {...props} />
    )
  }
)

CardDescription.displayName = 'CardDescription'
