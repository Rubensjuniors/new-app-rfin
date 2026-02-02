'use client'
import { createContext, useContext, useState } from 'react'

import type { HiddenPasswordContextType, HiddenPasswordProviderProps } from './types'

const HiddenPasswordContext = createContext<HiddenPasswordContextType>({} as HiddenPasswordContextType)

export function HiddenPasswordProvider({ children }: HiddenPasswordProviderProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev)
  }

  return (
    <HiddenPasswordContext.Provider value={{ showPassword, togglePasswordVisibility }}>
      {children}
    </HiddenPasswordContext.Provider>
  )
}

export function useHiddenPassword() {
  const context = useContext(HiddenPasswordContext)
  if (context === undefined) {
    throw new Error('useHiddenPassword must be used within a HiddenPasswordProvider')
  }
  return context
}
