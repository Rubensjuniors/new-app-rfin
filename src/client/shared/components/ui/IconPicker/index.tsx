import * as Icons from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import { forwardRef, useMemo } from 'react'

import { Label } from '@/client/shared/components/ui/Form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/client/shared/components/ui/Form/Select/select'

interface IconPickerProps {
  label?: string
  value?: string
  onChange?: (icon: string) => void
  id?: string
}

const COMMON_ICONS = [
  'Briefcase',
  'ShoppingBag',
  'ShoppingCart',
  'Utensils',
  'Coffee',
  'Car',
  'Plane',
  'Bike',
  'Train',
  'Ship',
  'Home',
  'Heart',
  'Activity',
  'Gamepad2',
  'Music',
  'Film',
  'Tv',
  'Video',
  'Book',
  'BookOpen',
  'GraduationCap',
  'Gift',
  'Wallet',
  'DollarSign',
  'CreditCard',
  'TrendingUp',
  'TrendingDown',
  'PieChart',
  'BarChart',
  'Phone',
  'Mail',
  'MessageCircle',
  'Smartphone',
  'Laptop',
  'Monitor',
  'Tablet',
  'Watch',
  'Headphones',
  'Camera',
  'Image',
  'Star',
  'Calendar',
  'Tag',
  'Package',
  'Bell',
  'Sun',
  'Moon',
  'CloudRain',
  'Umbrella',
  'Droplet',
  'Flame',
  'Leaf',
  'Tree',
  'Flower',
  'Zap',
  'Award',
  'Target',
  'Flag',
  'Globe',
  'MapPin',
  'Smile',
  'ThumbsUp',
  'Bookmark'
]

export const IconPicker = forwardRef<HTMLButtonElement, IconPickerProps>(
  ({ label, value, onChange, id, ...props }, ref) => {
    const availableIcons = useMemo(() => {
      try {
        return COMMON_ICONS.map((iconName) => {
          const IconComponent = Icons[iconName as keyof typeof Icons] as LucideIcon
          return {
            name: iconName,
            component: IconComponent
          }
        }).filter((icon) => icon.component)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Erro ao carregar ícones:', error)
        return []
      }
    }, [])

    const selectedIcon = availableIcons.find((icon) => icon.name === value)

    return (
      <div className="space-y-2">
        {label && <Label htmlFor={id}>{label}</Label>}
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger ref={ref} id={id} {...props}>
            <SelectValue placeholder="Selecione um ícone">
              {selectedIcon && (
                <div className="flex items-center gap-2">
                  <selectedIcon.component className="h-4 w-4" />
                  <span>{selectedIcon.name}</span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-75">
            {availableIcons.length > 0 ? (
              availableIcons.map((icon) => {
                const IconComponent = icon.component
                return (
                  <SelectItem key={icon.name} value={icon.name}>
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4" />
                      {icon.name}
                    </div>
                  </SelectItem>
                )
              })
            ) : (
              <div className="p-2 text-sm text-muted-foreground">Nenhum ícone encontrado</div>
            )}
          </SelectContent>
        </Select>
      </div>
    )
  }
)

IconPicker.displayName = 'IconPicker'
