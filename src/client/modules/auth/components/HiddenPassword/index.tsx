import { Eye, EyeOff } from 'lucide-react'

import { Button } from '@/client/shared/components/ui/Button'

import { useHiddenPassword } from '../../context/HiddenPasswordContext'

export function HiddenPassword() {
  const { showPassword, togglePasswordVisibility } = useHiddenPassword()

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={togglePasswordVisibility}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
    >
      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </Button>
  )
}
