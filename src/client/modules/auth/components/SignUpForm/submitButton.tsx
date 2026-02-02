import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/client/shared/components/ui/Button'

export function SubmitButton({ isSubmitting, isValid }: { isSubmitting: boolean; isValid: boolean }) {
  const t = useTranslations()
  return (
    <Button type="submit" className="w-full h-11 mt-6" disabled={isSubmitting || !isValid}>
      {isSubmitting ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          {t('auth.signUp.button.loading')}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {t('auth.signUp.button.submit')}
          <ArrowRight className="h-4 w-4" />
        </div>
      )}
    </Button>
  )
}
