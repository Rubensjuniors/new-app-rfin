import * as React from 'react'

import { cn } from '@/client/lib/utils'

const DrawerFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} data-slot="drawer-footer" className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
    )
  }
)
DrawerFooter.displayName = 'DrawerFooter'

export { DrawerFooter }
