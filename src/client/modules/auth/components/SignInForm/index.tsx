'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/client/shared/components/ui/Button'
import { CardDescription } from '@/client/shared/components/ui/Card/CardDescription'
import { CardTitle } from '@/client/shared/components/ui/Card/CardTitle'
import { Input } from '@/client/shared/components/ui/Form'

import { schemaSignIn, TypeSchemaSignIn } from './schema'

export default function SignInForm() {
  const t = useTranslations()
  const router = useRouter()
  const params = useParams()
  const [showPassword, setShowPassword] = useState(false)
  const locale = (params.locale as string) || 'en'
  const searchParams = useSearchParams()
  const emailFromQuery = searchParams.get('email') || ''

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset
  } = useForm<TypeSchemaSignIn>({
    resolver: zodResolver(schemaSignIn),
    defaultValues: {
      email: emailFromQuery,
      password: ''
    }
  })

  async function handleSignIn(data: TypeSchemaSignIn) {
    const { email, password } = data
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        // eslint-disable-next-line no-console
        console.error('Credenciais inválidas')
      } else {
        router.push(`/${locale}/dashboard`)
      }

      reset()
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <CardTitle className="text-2xl">{t('auth.signIn.title')}</CardTitle>
        <CardDescription className="mt-2">{t('auth.signIn.description')}</CardDescription>
      </div>

      <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">{t('auth.signIn.inputs.email')}</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="pl-10 h-11"
              {...register('email')}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">{t('auth.signIn.inputs.password')}</Label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4
            text-muted-foreground"
            />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="pl-10 pr-10 h-11"
              {...register('password')}
            />
            {/* TODO: Virar um componete reultilizavel */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="w-full">
          <Button type="submit" className="w-full h-11 mt-6" disabled={isSubmitting || !isValid}>
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                {t('auth.signIn.button.loading')}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {t('auth.signIn.button.submit')}
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
