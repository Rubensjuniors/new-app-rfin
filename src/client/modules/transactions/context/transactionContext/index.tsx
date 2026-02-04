'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createContext, type ReactNode, useCallback, useContext, useState } from 'react'

import { QuickFilterType } from '../../constants'

type TransactionContextType = {
  // handleEdit: (id: string) => void
  // handleDelete: (id: string) => Promise<void>
  // handleTogglePaid: (id: string) => Promise<void>
  isDeleteLoading: boolean
  isTogglePaidLoading: boolean
  currentQuickFilter: QuickFilterType
  handleChangeQuickFilter: (value: QuickFilterType) => void
}

const TransactionContext = createContext<TransactionContextType>({} as TransactionContextType)

type TransactionProviderProps = {
  children: ReactNode
}

export function TransactionProvider({ children }: TransactionProviderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const filterFromUrl = (searchParams.get('quickFilter') as QuickFilterType) || QuickFilterType.ALL

  const [currentQuickFilter, setCurrentQuickFilter] = useState<QuickFilterType>(filterFromUrl)

  const handleChangeQuickFilter = useCallback(
    (value: QuickFilterType) => {
      setCurrentQuickFilter(value)

      const params = new URLSearchParams(searchParams.toString())

      if (value === QuickFilterType.ALL) {
        params.delete('quickFilter')
      } else {
        params.set('quickFilter', value)
      }

      const query = params.toString()
      router.push(query ? `${pathname}?${query}` : pathname)
    },
    [pathname, router, searchParams]
  )

  // const handleEdit = (id: string) => {
  //   // TODO: Implementar lógica de edição
  //   // eslint-disable-next-line no-console
  //   console.log('Editar transação:', id)
  // }

  // const handleDelete = async (id: string) => {
  //   // await deleteTransaction(id)
  // }

  // const handleTogglePaid = async (id: string) => {
  //   // await togglePaidTransaction(id)
  // }

  return (
    <TransactionContext.Provider
      value={{
        // handleEdit,
        // handleDelete,
        // handleTogglePaid,
        isDeleteLoading: false,
        isTogglePaidLoading: false,
        currentQuickFilter,
        handleChangeQuickFilter
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransaction() {
  const context = useContext(TransactionContext)

  if (!context) {
    throw new Error('useTransaction must be used within TransactionProvider')
  }

  return context
}
