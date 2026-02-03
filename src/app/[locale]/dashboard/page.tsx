import { Summary } from '@/client/modules/summary'
import { QuickFilters } from '@/client/modules/transactions/components/quickFilters'

export default async function Home() {
  return (
    <main className="container mx-auto p-4 space-y-6">
      <Summary />

      <div className="space-y-6">
        <div className="flex items-end md:items-center flex-col md:flex-row md:justify-between gap-4">
          <QuickFilters />
          {/* <AddTransactionSheet /> */}
        </div>
        {/* <TransactionList /> */}
      </div>
    </main>
  )
}
