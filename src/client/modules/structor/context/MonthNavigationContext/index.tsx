'use client'

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'

export type MonthYear = {
  month: number
  year: number
}

type MonthNavigationContextType = {
  openPopoverMonth: boolean
  setOpenPopoverMonth: Dispatch<SetStateAction<boolean>>
  currentMonthAndYear: MonthYear
  setCurrentMonthAndYear: Dispatch<SetStateAction<MonthYear>>
  isCurrentMonth: () => boolean
  handleMonthSelect: (monthIndex: number) => void
  selectedYear: number
  setSelectedYear: Dispatch<SetStateAction<number>>
  isSelected: (monthIndex: number) => boolean
  isToday: (monthIndex: number) => boolean
}

const MonthNavigationContext = createContext<MonthNavigationContextType>({} as MonthNavigationContextType)

type MonthNavigationProviderProps = {
  children: ReactNode
}

export function MonthNavigationProvider({ children }: MonthNavigationProviderProps) {
  const now = new Date()
  const [openPopoverMonth, setOpenPopoverMonth] = useState(false)
  const [currentMonthAndYear, setCurrentMonthAndYear] = useState<MonthYear>({
    month: now.getMonth() + 1,
    year: now.getFullYear()
  })
  const [selectedYear, setSelectedYear] = useState(currentMonthAndYear.year)

  const isCurrentMonth = () => {
    const now = new Date()
    return currentMonthAndYear.month === now.getMonth() && currentMonthAndYear.year === now.getFullYear()
  }

  const handleMonthSelect = (monthIndex: number) => {
    setCurrentMonthAndYear({ month: monthIndex + 1, year: selectedYear })

    setOpenPopoverMonth(false)
  }

  const isSelected = (monthIndex: number) => {
    return currentMonthAndYear.month === monthIndex + 1 && currentMonthAndYear.year === selectedYear
  }

  const isToday = (monthIndex: number) => {
    const now = new Date()

    return now.getMonth() + 1 === monthIndex + 1 && now.getFullYear() === selectedYear
  }

  // eslint-disable-next-line no-console
  useEffect(() => console.log({ currentMonth: currentMonthAndYear }), [currentMonthAndYear])

  return (
    <MonthNavigationContext.Provider
      value={{
        openPopoverMonth,
        currentMonthAndYear,
        selectedYear,
        setCurrentMonthAndYear,
        isCurrentMonth,
        setOpenPopoverMonth,
        handleMonthSelect,
        setSelectedYear,
        isSelected,
        isToday
      }}
    >
      {children}
    </MonthNavigationContext.Provider>
  )
}

export function useMonthNavigation() {
  const context = useContext(MonthNavigationContext)

  if (!context) {
    throw new Error('useMonthNavigation must be used within MonthNavigationProvider')
  }

  return context
}
