'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { cn } from '@/client/lib/utils'
import { HiddenMoneyButton } from '@/client/shared/components/HiddenValue/HiddenMoneyButton'
import { Button } from '@/client/shared/components/ui/Button'
import { ButtonToggleTheme } from '@/client/shared/components/ui/ButtonToggleTheme'

import { ItemsSideBarMenu } from '../../constants/sidebarMenu'
import { useSidebar } from '../../context/SideBarContext'
import { Profile } from '../Profile'
import { Sidebar } from '../Sidebar'

export function AppSidebarMenu() {
  const { setOpenMobile } = useSidebar()
  const t = useTranslations()
  const pathname = usePathname()

  const locale = pathname.split('/')[1]
  const pathnameWithoutLocale = pathname.replace(/^\/(pt-br|en)/, '')

  return (
    <Sidebar>
      <Sidebar.SidebarHeader className="flex items-center md:flex-col lg:flex-row flex-row justify-between p-4 gap-4">
        <Link href="/dashboard">
          <div className="w-10 h-10">
            <img src="/icons/logo.svg" alt="Logo" />
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <ButtonToggleTheme />
          <HiddenMoneyButton hideOnMobile={false} />
          <Profile hideOnMobile={false} />
        </div>
      </Sidebar.SidebarHeader>
      <Sidebar.SidebarContent className="p-2">
        <nav className="flex flex-col gap-2">
          {ItemsSideBarMenu.map((item) => {
            const isActive = pathnameWithoutLocale === item.route
            return (
              <Link href={`/${locale}${item.route}`} key={item.name} onClick={() => setOpenMobile(false)}>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-center lg:justify-start hover:bg-primary/20 hover:text-primary',
                    'transition-colors duration-200 rounded flex items-center',
                    'gap-2 p-6',
                    {
                      'bg-primary/10 text-primary': isActive
                    }
                  )}
                >
                  {item.icon}
                  <span className="md:hidden lg:inline-block">{t(item.name)}</span>
                </Button>
              </Link>
            )
          })}
        </nav>
      </Sidebar.SidebarContent>
    </Sidebar>
  )
}
