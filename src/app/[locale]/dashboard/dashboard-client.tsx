'use client'

import { useParams } from 'next/navigation'
import { signOut } from 'next-auth/react'

import { Button } from '@/client/shared/components/ui/Button'

export function DashboardClient() {
  const params = useParams()
  const locale = (params.locale as string) || 'en'

  const handleSignOut = () => {
    signOut({ callbackUrl: `/${locale}/auth/login` })
  }

  return (
    <div className="mt-4">
      <Button onClick={handleSignOut}>Sair</Button>
    </div>
  )
}
