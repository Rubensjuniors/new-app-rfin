'use client'
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/Drawer'
import { Sheet } from '../ui/Sheet'
import { SheetContent } from '../ui/Sheet/SheetContent'
import { SheetTrigger } from '../ui/Sheet/SheetTrigger'

export function SidebarWithDrawer({
  button,
  content
}: {
  button: React.ReactNode
  content: React.ReactNode
}) {
  return (
    <>
      {/* Mobile: Drawer */}
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger asChild>{button}</DrawerTrigger>
          <DrawerContent>{content}</DrawerContent>
        </Drawer>
      </div>

      {/* Desktop: Sheet */}
      <div className="hidden md:block">
        <Sheet>
          <SheetTrigger asChild>{button}</SheetTrigger>
          <SheetContent>{content}</SheetContent>
        </Sheet>
      </div>
    </>
  )
}
