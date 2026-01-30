import { Link, Outlet } from '@tanstack/react-router'
import { Suspense } from 'react'

import { cn } from '@/lib/utils'
import { Card } from '@/shared/components/Card'

export function FormCard() {
  return (
    <Card className="border-border/50 shadow-xl bg-card/80 backdrop-blur-sm px-4 gap-4">
      <Card.Header className="bg-muted w-full flex items-center p-2 rounded-md">
        <Link to="/sign-in" className="flex-1 text-center">
          {({ isActive }) => (
            <div
              className={cn('w-full p-1 rounded-sm text-muted-foreground', {
                'bg-background shadow-sm text-foreground font-medium': isActive
              })}
            >
              Entrar
            </div>
          )}
        </Link>
        <Link to="/sign-up" className="flex-1  text-center">
          {({ isActive }) => (
            <div
              className={cn('w-full p-1 rounded-sm text-muted-foreground', {
                'bg-background shadow-sm text-foreground font-medium': isActive
              })}
            >
              Criar Conta
            </div>
          )}
        </Link>
      </Card.Header>
      <Card.Content className="p-0">
        {/* TODO: Colocar Loading default */}
        <Suspense fallback={<>Loading...</>}>
          <Outlet />
        </Suspense>
      </Card.Content>
    </Card>
  )
}
