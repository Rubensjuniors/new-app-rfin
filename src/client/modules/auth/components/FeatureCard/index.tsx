import { useTranslations } from 'next-intl'

export const FeatureCard = ({
  icon,
  title,
  description
}: {
  icon: React.ReactNode
  title: string
  description: string
}) => {
  const t = useTranslations()
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{t(title)}</h3>
        <p className="text-sm text-muted-foreground">{t(description)}</p>
      </div>
    </div>
  )
}
