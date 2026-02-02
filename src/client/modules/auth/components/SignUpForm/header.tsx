import { useTranslations } from 'next-intl'

import { CardDescription } from '@/client/shared/components/ui/Card/CardDescription'
import { CardTitle } from '@/client/shared/components/ui/Card/CardTitle'

export function SignUpFormHeader() {
  const t = useTranslations()

  return (
    <div className="mb-6">
      <CardTitle className="text-2xl">{t('auth.signUp.title')}</CardTitle>
      <CardDescription className="mt-2">{t('auth.signUp.description')}</CardDescription>
    </div>
  )
}
