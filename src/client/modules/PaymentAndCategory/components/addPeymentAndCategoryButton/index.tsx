import { Tags } from 'lucide-react'

import { SidebarWithDrawer } from '@/client/shared/components/sidebarWithDrawer'
import { Button } from '@/client/shared/components/ui/Button'

export function AddPeymentAndCategoryButton() {
  return (
    <SidebarWithDrawer
      button={
        <Button>
          <Tags />
          <span className="hidden sm:flex">Categorias e Pagamentos</span>
        </Button>
      }
      content={<>ola</>}
    />
  )
}
