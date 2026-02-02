'use client'
import { HiddenMoneyButton } from '@/client/shared/components/HiddenValue/HiddenMoneyButton'

import { MonthNavigation } from '../MonthNavigation'
import { Profile } from '../Profile'
import { SidebarTrigger } from '../Sidebar/SidebarTrigger'

export function Header() {
  return (
    <header className="bg-sidebar flex items-center justify-between py-4 min-w-0 w-full border-b px-4">
      <SidebarTrigger />
      <div className="flex items-center justify-end w-full max-w-6xl gap-2">
        <MonthNavigation />
        <HiddenMoneyButton />
        <Profile />
      </div>
    </header>
  )
}
