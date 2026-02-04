'use client'
import { useEffect, useState } from 'react'

interface Category {
  id: string
  name: string
}

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
    <>
      {categories.map((category) => (
        <pre key={category.id}>{category.name}</pre>
      ))}
    </>
  )
}
