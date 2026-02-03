import { forwardRef } from 'react'

import { Label } from '@/client/shared/components/ui/Form'

interface ColorPickerProps {
  label?: string
  value?: string
  onChange?: (color: string) => void
  id?: string
  className?: string
}

export const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(
  ({ label, value, onChange, id, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <Label htmlFor={id}>{label}</Label>}
        <div className="flex items-center gap-3">
          <input
            id={id}
            type="color"
            ref={ref}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={`h-10 w-20 rounded border border-input bg-background cursor-pointer ${className}`}
            {...props}
          />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: value }} />
            <span className="font-mono">{value}</span>
          </div>
        </div>
      </div>
    )
  }
)

ColorPicker.displayName = 'ColorPicker'
