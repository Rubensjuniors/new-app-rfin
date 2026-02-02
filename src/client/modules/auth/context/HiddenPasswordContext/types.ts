import type { ReactNode } from 'react'

export interface HiddenPasswordContextType {
  showPassword: boolean
  togglePasswordVisibility: () => void
}

export interface HiddenPasswordProviderProps {
  children: ReactNode
}
