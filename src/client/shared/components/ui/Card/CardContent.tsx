import * as React from 'react'

import { cn } from '@/client/lib/utils'

export const CardContent = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} data-slot="card-content" className={cn('px-6', className)} {...props} />
  }
)
CardContent.displayName = 'CardContent'
