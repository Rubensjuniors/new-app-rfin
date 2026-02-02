'use client'
import { createContext, useContext, useEffect, useState } from 'react'

import type { HiddenMoneyToggleContextType, HiddenMoneyToggleProviderProps } from './types'

const HiddenMoneyToggleContext = createContext<HiddenMoneyToggleContextType>(
  {} as HiddenMoneyToggleContextType
)

export function HiddenMoneyToggleProvider({ children }: HiddenMoneyToggleProviderProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  useEffect(() => {
    const storedValue = localStorage.getItem('hiddenMoney')
    if (storedValue) {
      setIsVisible(JSON.parse(storedValue))
    }
  }, [])

  function toggleVisibility() {
    const newValue = !isVisible
    localStorage.setItem('hiddenMoney', JSON.stringify(newValue))
    setIsVisible(newValue)
  }

  return (
    <HiddenMoneyToggleContext.Provider value={{ isVisible, toggleVisibility }}>
      {children}
    </HiddenMoneyToggleContext.Provider>
  )
}

export function useHiddenMoneyToggle() {
  const context = useContext(HiddenMoneyToggleContext)
  if (!context || context === undefined) {
    throw new Error('useHiddenMoneyToggle must be used within HiddenMoneyToggleProvider')
  }
  return context
}
