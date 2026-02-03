import * as React from 'react'

import { cn } from '@/client/lib/utils'

export const CardHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-header"
        className={cn(
          [
            '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6',
            'has-data-[slot=card-action]:grid-cols-[1fr_auto]',
            '[.border-b]:pb-6'
          ].join(' '),
          className
        )}
        {...props}
      />
    )
  }
)

CardHeader.displayName = 'CardHeader'
