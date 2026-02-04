'use client'
import { Category } from '@prisma/client'
import { useEffect, useState } from 'react'

import { CategoryAndPaymentCard } from '../CategoryAndPaymentCard'

export function ListCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async() => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/category/list', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch categories')
        }

        const data = await response.json()
        setCategories(data)
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Error fetching categories'
        console.error('Error fetching categories:', error)
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (isLoading) {
    return <div>Loading categories...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="space-y-3 mt-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-sm text-muted-foreground">
          Categorias existentes ({categories.length})
        </h4>
        {/* <span className="text-xs text-muted-foreground">Total: {formatCurrency(totalExpenses)}</span> */}
      </div>

      <div className="space-y-3 overflow-y-auto max-h-[47.8vh] pr-2 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8">
        {categories.map((category) => (
          <CategoryAndPaymentCard
            key={category.id}
            name={category.name}
            id={category.id}
            color={category?.color}
            icon={category?.icon}
            onEditCategory={() => {}}
            onDeleteCategory={() => {}}
          />
        ))}
      </div>
    </div>
  )
}
