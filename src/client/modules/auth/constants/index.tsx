import { Goal, List, TrendingUp, Wallet } from 'lucide-react'

export const featuresCardItems = [
  {
    icon: <Wallet className="h-6 w-6" />,
    title: 'auth.layout.features.feature1.title',
    description: 'auth.layout.features.feature1.description'
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'auth.layout.features.feature4.title',
    description: 'auth.layout.features.feature4.description'
  },
  {
    icon: <List className="h-6 w-6" />,
    title: 'auth.layout.features.feature2.title',
    description: 'auth.layout.features.feature2.description'
  },
  {
    icon: <Goal className="h-6 w-6" />,
    title: 'auth.layout.features.feature3.title',
    description: 'auth.layout.features.feature3.description'
  }
]

export enum AuthTabs {
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up'
}
