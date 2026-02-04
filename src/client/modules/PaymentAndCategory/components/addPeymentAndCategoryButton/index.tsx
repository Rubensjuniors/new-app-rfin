import { Tags } from 'lucide-react'

import { SidebarWithDrawer } from '@/client/shared/components/sidebarWithDrawer'
import { Button } from '@/client/shared/components/ui/Button'
import { Tabs } from '@/client/shared/components/ui/Tabs'

import { CategoryForm } from '../CategoryForm'
import { PaymentForm } from '../PaymentForm'

export function AddPeymentAndCategoryButton() {
  return (
    <SidebarWithDrawer
      title="Adicionar Categoria ou Pagamento"
      button={
        <Button>
          <Tags />
          <span className="xl:inline hidden">Categorias e Pagamentos</span>
        </Button>
      }
    >
      <Tabs>
        <Tabs.List className="w-full">
          <Tabs.Trigger value="categories">Categorias</Tabs.Trigger>
          <Tabs.Trigger value="payments">Pagamentos</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="categories" className="mt-3">
          <CategoryForm />
        </Tabs.Content>
        <Tabs.Content value="payments" className="mt-3">
          <PaymentForm />
        </Tabs.Content>
      </Tabs>
    </SidebarWithDrawer>
  )
}
