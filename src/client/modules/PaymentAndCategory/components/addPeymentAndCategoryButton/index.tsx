import { Tags } from 'lucide-react'

import { SidebarWithDrawer } from '@/client/shared/components/sidebarWithDrawer'
import { Button } from '@/client/shared/components/ui/Button'
import { Tabs } from '@/client/shared/components/ui/Tabs'

import { CategoryForm } from '../CategoryForm'
import { ListCategories } from '../ListCategories'
import { PaymentForm } from '../PaymentForm'

export function AddPeymentAndCategoryButton() {
  return (
    <SidebarWithDrawer
      title="Categoria ou Cartões"
      button={
        <Button>
          <Tags />
          <span className="lg:inline hidden">Categorias e Cartões</span>
        </Button>
      }
    >
      <Tabs>
        <Tabs.List className="w-full">
          <Tabs.Trigger value="categories">Categorias</Tabs.Trigger>
          <Tabs.Trigger value="payments">Cartões</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          value="categories"
          className="mt-3 pb-4"
        >
          <CategoryForm />
          <ListCategories />
        </Tabs.Content>
        <Tabs.Content
          value="payments"
          className="mt-3 overflow-y-auto max-h-[50vh] pr-2 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <PaymentForm />
        </Tabs.Content>
      </Tabs>
    </SidebarWithDrawer>
  )
}
