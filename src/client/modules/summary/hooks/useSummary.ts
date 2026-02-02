import { useEffect, useState } from 'react'

import { useMonthNavigation } from '../../structor/context/MonthNavigationContext'

export interface SummaryData {
  income: number
  expense: number
  total: number
}

export function useSummary() {
  const { currentMonthAndYear } = useMonthNavigation()
  const [data, setData] = useState<SummaryData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSummary = async() => {
      try {
        setIsLoading(true)
        setError(null)

        const params = new URLSearchParams({
          month: currentMonthAndYear.month.toString(),
          year: currentMonthAndYear.year.toString()
        })

        const response = await fetch(`/api/summary?${params.toString()}`)

        if (!response.ok) {
          throw new Error('Failed to fetch summary')
        }

        const summaryData = await response.json()
        setData(summaryData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSummary()
  }, [currentMonthAndYear.month, currentMonthAndYear.year])

  return {
    data,
    isLoading,
    error
  }
}
