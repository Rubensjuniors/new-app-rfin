import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { SidebarWithDrawer } from '@/client/shared/components/sidebarWithDrawer'
import { Button } from '@/client/shared/components/ui/Button'

export function AddTransactionButton() {
  const t = useTranslations()

  return (
    <SidebarWithDrawer
      button={
        <Button>
          <Plus className="h-4 w-4" />
          <span className="hidden xl:flex">{t('transactions.add_transaction')}</span>
        </Button>
      }
      content={<>ola</>}
    />
  )
}
