import * as SheetPrimitive from '@radix-ui/react-dialog'
import * as React from 'react'

import { cn } from '@/client/lib/utils'

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentProps<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <SheetPrimitive.Overlay
      ref={ref}
      data-slot="sheet-overlay"
      className={cn(
        [
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'fixed inset-0 z-50 bg-black/50'
        ].join(' '),
        className
      )}
      {...props}
    />
  )
})

SheetOverlay.displayName = 'SheetOverlay'

export { SheetOverlay }
