import * as React from 'react'

import { cn } from '@/client/lib/utils'

export const CardFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-footer"
        className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
        {...props}
      />
    )
  }
)

CardFooter.displayName = 'CardFooter'
