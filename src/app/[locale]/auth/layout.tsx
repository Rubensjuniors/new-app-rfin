import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { FeatureCard } from '@/client/modules/auth/components/FeatureCard'
import { featuresCardItems } from '@/client/modules/auth/constants'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations()
  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-accent/10 to-background" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />

        <div className="z-10 flex flex-col justify-center px-12 xl:px-20 mx-auto">
          <div className="mb-12">
            <Image src="/icons/logo.svg" alt="rfin" width={48} height={48} className="h-12 w-auto" />
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold text-foreground mb-6 leading-tight">
            {t('auth.layout.title')}
            <br />
            <span className="text-primary">{t('auth.layout.titleHighlight')}</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-12 max-w-md">{t('auth.layout.description')}</p>

          <div className="grid grid-cols-2 gap-6 max-w-lg">
            {featuresCardItems.map((item) => (
              <FeatureCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <div>
              <Image src="public/icons/logo.svg" alt="rfin" width={10} height={10} className="mx-auto mb-4" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">{t('auth.layout.mobile.title')}</h2>
            <p className="text-muted-foreground mt-2">{t('auth.layout.mobile.description')}</p>
          </div>
          v<div>{children}</div>
          <p className="text-center text-sm text-muted-foreground mt-6">{t('general.copyright')}</p>
        </div>
      </div>
    </div>
  )
}
