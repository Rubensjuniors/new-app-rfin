import { Header } from '@/client/modules/structor/components/Header'
import { AppSidebarMenu } from '@/client/modules/structor/components/SidebarMenu'
import { MonthNavigationProvider } from '@/client/modules/structor/context/MonthNavigationContext'
import { SidebarProvider } from '@/client/modules/structor/context/SideBarContext'
import { TransactionProvider } from '@/client/modules/transactions/context/transactionContext'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <MonthNavigationProvider>
        <TransactionProvider>
          <AppSidebarMenu />

          <main className="pb-6 w-full overflow-x-hidden">
            <Header />

            <div className="min-w-0 max-w-6xl mx-auto overflow-x-hidden px-4">{children}</div>
          </main>
        </TransactionProvider>
      </MonthNavigationProvider>
    </SidebarProvider>
  )
}
