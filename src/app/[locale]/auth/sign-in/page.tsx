import { useTranslations } from 'next-intl'

import { Card } from '@/client/shared/components/ui/Card'
import { Tabs } from '@/client/shared/components/ui/Tabs'

export default function SignInPage() {
  const t = useTranslations()
  return (
    <div>
      <Card className="border-border/50 shadow-xl bg-card/80 backdrop-blur-sm px-4 gap-4">
        <Tabs defaultValue="sign-in" className="w-full flex items-center flex-col">
          <Tabs.List className="w-full">
            <Tabs.Trigger value="sign-in">{t('general.signIn')}</Tabs.Trigger>
            <Tabs.Trigger value="sign-up">{t('general.signUp')}</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="sign-in">
            {/* Sign In Form Component */}
            <div>Sign In Form Goes Here</div>
          </Tabs.Content>

          <Tabs.Content value="sign-up">
            {/* Sign Up Form Component */}
            <div>Sign Up Form Goes Here</div>
          </Tabs.Content>
        </Tabs>
      </Card>
    </div>
  )
}
