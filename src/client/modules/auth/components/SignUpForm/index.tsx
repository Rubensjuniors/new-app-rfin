'use client'

import { Label } from '@radix-ui/react-label'
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Button } from '@/client/shared/components/ui/Button'
import { CardDescription } from '@/client/shared/components/ui/Card/CardDescription'
import { CardTitle } from '@/client/shared/components/ui/Card/CardTitle'
import { Input } from '@/client/shared/components/ui/Form'

export default function SignUpForm() {
  const t = useTranslations()
  // TODO: Ir Para um context
  const [showPassword, setShowPassword] = useState(false)
  // TODO: tirar simulador de loading
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async(e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <div>
      <div className="mb-6">
        <CardTitle className="text-2xl">{t('auth.signUp.title')}</CardTitle>
        <CardDescription className="mt-2">{t('auth.signUp.description')}</CardDescription>
      </div>

      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t('auth.signUp.inputs.name')}</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder={t('auth.signUp.inputs.name')}
              className="pl-10 h-11"
              required
            />
          </div>
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
              required
            />
          </div>
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
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
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
              required
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

        <Button type="submit" className="w-full h-11 mt-6" disabled={isLoading}>
          {isLoading ? (
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
      </form>
    </div>
  )
}
