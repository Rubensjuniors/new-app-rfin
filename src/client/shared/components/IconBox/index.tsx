import { cva, type VariantProps } from 'class-variance-authority'
import { type LucideIcon } from 'lucide-react'

import { cn } from '@/client/lib/utils'

import { IconComponent } from '../IconComponent'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/Tooltip'

const iconBoxVariants = cva('flex items-center justify-center rounded-xl shrink-0', {
  variants: {
    size: {
      sm: 'w-12 h-12 p-3',
      md: 'w-14 h-14 p-3',
      lg: 'w-16 h-16 p-4'
    }
  },
  defaultVariants: {
    size: 'sm'
  }
})

interface IconBoxProps extends VariantProps<typeof iconBoxVariants> {
  color?: string
  iconName?: LucideIcon | string
  className?: string
  name?: string
  iconSize?: number
}

export function IconBox({
  color = '#6366f1',
  iconName,
  size,
  className,
  iconSize,
  name,
  ...props
}: IconBoxProps) {
  const bgColor = `${color}20`

  const getIconSize = () => {
    if (iconSize) return iconSize

    switch (size) {
      case 'sm':
        return 18
      case 'md':
        return 24
      case 'lg':
        return 28
      default:
        return 24
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(iconBoxVariants({ size }), className)}
          style={{ backgroundColor: bgColor }}
          {...props}
        >
          <IconComponent iconName={iconName} color={color} size={getIconSize()} />
        </div>
      </TooltipTrigger>
      <TooltipContent
        className={cn('text-foreground mb-2', {
          hidden: !name
        })}
        style={{ backgroundColor: bgColor }}
      >
        {name}
      </TooltipContent>
    </Tooltip>
  )
}
