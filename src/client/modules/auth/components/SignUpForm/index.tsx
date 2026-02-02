'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { Lock, Mail, User } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { Input } from '@/client/shared/components/ui/Form'

import { AuthTabs } from '../../constants'
import { useHiddenPassword } from '../../context/HiddenPasswordContext'
import { HiddenPassword } from '../HiddenPassword'
import { SignUpFormHeader } from './header'
import { schemaSignUp, TypeSchemaSignUp } from './schema'
import { SubmitButton } from './submitButton'

export default function SignUpForm() {
  const t = useTranslations()
  const { showPassword } = useHiddenPassword()
  const router = useRouter()
  const params = useParams()
  const locale = (params.locale as string) || 'en'

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
    reset
  } = useForm<TypeSchemaSignUp>({
    resolver: zodResolver(schemaSignUp),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  async function handleSignUp(data: TypeSchemaSignUp) {
    const { name, email, password } = data
    try {
      await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      })

      router.push(`/${locale}/auth/login?tab=${AuthTabs.SIGN_IN}&email=${email}`)
      reset()
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  return (
    <div>
      <SignUpFormHeader />

      <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t('auth.signUp.inputs.name')}</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder={t('auth.signUp.inputs.name')}
              className="pl-10 h-11"
              {...register('name')}
            />
          </div>
          {errors.name && <p className="text-xs text-destructive">{t(errors.name.message!)}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-email">{t('auth.signUp.inputs.email')}</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="signup-email"
              type="email"
              placeholder="seu@email.com"
              className="pl-10 h-11"
              {...register('email')}
            />
          </div>
          {errors.email && <p className="text-xs text-destructive">{t(errors.email.message!)}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-password">{t('auth.signUp.inputs.password')}</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="pl-10 pr-10 h-11"
              {...register('password')}
            />
            <HiddenPassword />
          </div>
          {errors.password && <p className="text-xs text-destructive">{t(errors.password.message!)}</p>}
          <p className="text-xs text-muted-foreground">{t('auth.signUp.password_warning')}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">{t('auth.signUp.inputs.confirmPassword')}</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirm-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="pl-10 pr-10 h-11"
              {...register('confirmPassword')}
            />

            <HiddenPassword />
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{t(errors.confirmPassword.message!)}</p>
          )}
        </div>

        <SubmitButton isSubmitting={isSubmitting} isValid={isValid} />
      </form>
    </div>
  )
}
