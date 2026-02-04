'use client'
import { cn } from '@/client/lib/utils'

import { Drawer, DrawerContent, DrawerTrigger } from '../ui/Drawer'
import { Sheet } from '../ui/Sheet'
import { SheetContent } from '../ui/Sheet/SheetContent'
import { SheetTrigger } from '../ui/Sheet/SheetTrigger'

export function SidebarWithDrawer({
  button,
  children,
  title,
  className
}: {
  button: React.ReactNode
  children: React.ReactNode
  title: string
  className?: string
}) {
  return (
    <>
      {/* Mobile: Drawer */}
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger asChild>{button}</DrawerTrigger>
          <DrawerContent className={cn('p-4', className)}>
            <Drawer.Title>{title}</Drawer.Title>
            {children}
          </DrawerContent>
        </Drawer>
      </div>

      {/* Desktop: Sheet */}
      <div className="hidden md:block">
        <Sheet>
          <SheetTrigger asChild>{button}</SheetTrigger>
          <SheetContent size="md" className={cn('p-4', className)}>
            <Sheet.Title>{title}</Sheet.Title>
            {children}
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
