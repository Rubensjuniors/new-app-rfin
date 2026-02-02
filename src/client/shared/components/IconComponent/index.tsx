import { icons, type LucideIcon, Tags } from 'lucide-react'
import * as React from 'react'

const getIconComponent = (iconName?: string | LucideIcon) => {
  if (!iconName) return Tags

  if (typeof iconName === 'string') {
    const IconFromString = icons[iconName as keyof typeof icons]
    return IconFromString || Tags
  }

  return iconName
}

export interface IconComponentProps extends Omit<React.ComponentProps<LucideIcon>, 'ref'> {
  iconName?: string | LucideIcon
}

export const IconComponent = ({ iconName, ...props }: IconComponentProps) => {
  const Icon = getIconComponent(iconName)
  return <Icon {...props} />
}
