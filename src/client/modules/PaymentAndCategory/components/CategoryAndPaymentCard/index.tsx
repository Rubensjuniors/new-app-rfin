import { Pencil, Trash2 } from 'lucide-react'

import { IconBox } from '@/client/shared/components/IconBox'
import { Button } from '@/client/shared/components/ui/Button'
import { Card } from '@/client/shared/components/ui/Card'

interface CategoryAndPaymentCardProps {
  name: string
  id: string
  color: string | null
  icon: string | null
  onEditCategory: (id: string) => void
  onDeleteCategory: (id: string) => void
}

export function CategoryAndPaymentCard({
  name,
  id,
  color,
  icon,
  onEditCategory,
  onDeleteCategory
}: CategoryAndPaymentCardProps) {
  return (
    <Card className="p-2 flex flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <IconBox color={color || '#6366f1'} iconName={icon || 'Folder'} size="sm" />

        <h4 className="font-medium">{name}</h4>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEditCategory(id)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={() => onDeleteCategory(id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
