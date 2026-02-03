'use client'
import { useParams } from 'next/dist/client/components/navigation'
import { signOut, useSession } from 'next-auth/react'

import { cn } from '@/client/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/client/shared/components/ui/Avatar'
import { Dropdown } from '@/client/shared/components/ui/Dropdown'
import { Skeleton } from '@/client/shared/components/ui/Skeleton'
import { Text } from '@/client/shared/components/ui/Text'

export function Profile({ hideOnMobile }: { hideOnMobile?: boolean }) {
  const { data: session, status } = useSession()
  const isLoading = status === 'loading'
  const params = useParams()
  const locale = (params.locale as string) || 'en'

  const profile = () => {
    if (isLoading && !session) {
      return <Skeleton className="rounded-full w-8 h-8" />
    }

    return (
      <Avatar>
        {session?.user?.image && <AvatarImage src={session?.user?.image} alt={session?.user?.name ?? ''} />}
        <AvatarFallback>{session?.user?.name?.charAt(2)}</AvatarFallback>
      </Avatar>
    )
  }

  return (
    <Dropdown>
      <Dropdown.Trigger
        className={cn('outline-none cursor-pointer', {
          'hidden sm:block': hideOnMobile,
          'sm:hidden': !hideOnMobile
        })}
      >
        {profile()}
      </Dropdown.Trigger>
      <Dropdown.Content className="w-70 md:w-80 mr-4 md:mr-10 mt-8" align="start">
        <div className="p-2 flex items-center gap-3">
          {profile()}
          <div>
            {!session?.user?.name && !session?.user?.email ? (
              <>
                <Skeleton className="w-40 h-4" />
                <Skeleton className="w-30 h-4 mt-1" />
              </>
            ) : (
              <>
                <Text weight="bold" as="p">
                  {session?.user?.name}
                </Text>
                <Text size="xs" className="text-muted-foreground" as="span">
                  {session?.user?.email}
                </Text>
              </>
            )}
          </div>
        </div>
        <Dropdown.Separator />
        <Dropdown.Item
          className="focus:bg-destructive/10 text-destructive hover:bg-destructive/10 cursor-pointer justify-center"
          onClick={() => signOut({ callbackUrl: `/${locale}/auth/login` })}
        >
          Sair
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  )
}
