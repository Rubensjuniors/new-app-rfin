'use client'
import { ArrowLeftToLine, ArrowRightToLine } from 'lucide-react'

import { cn } from '@/client/lib/utils'
import { Button } from '@/client/shared/components/ui/Button'

import { useSidebar } from '../../context/SideBarContext'

type SidebarTriggerProps = React.ComponentProps<typeof Button>

export function SidebarTrigger({ className, onClick, ...props }: SidebarTriggerProps) {
  const { toggleSidebar, open } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <span>{open ? <ArrowLeftToLine /> : <ArrowRightToLine />}</span>
    </Button>
  )
}
