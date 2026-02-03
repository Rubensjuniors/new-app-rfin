import { AddPeymentAndCategoryButton } from '@/client/modules/PaymentAndCategory/components/addPeymentAndCategoryButton'
import { Summary } from '@/client/modules/summary'
import { AddTransactionButton } from '@/client/modules/transactions/components/addTransactionButton'
import { QuickFilters } from '@/client/modules/transactions/components/quickFilters'

export default async function Home() {
  return (
    <div className="space-y-6">
      <Summary />

      <div className="space-y-6">
        <div className="flex items-end lg:items-center flex-col lg:flex-row lg:justify-between gap-4">
          <QuickFilters />
          <div className="flex gap-2 items-center">
            <AddPeymentAndCategoryButton />
            <AddTransactionButton />
          </div>
        </div>
        {/* <TransactionList /> */}
      </div>
    </div>
  )
}
