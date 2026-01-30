import type { MonthYear } from '@/modules/structor/context/MonthNavigationContext'

export const formatDate = (dateStr: string, locale = 'pt-BR') => {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short'
  }).format(new Date(dateStr))
}
export const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
]

export const formatMonth = (date: Date | MonthYear) => {
  if (date instanceof Date) {
    return new Intl.DateTimeFormat('pt-BR', {
      month: 'long',
      year: 'numeric'
    }).format(date)
  } else {
    const formattedDate = new Date(date.year, date.month - 1, 1)

    const formatted = new Intl.DateTimeFormat('pt-BR', {
      month: 'long',
      year: 'numeric'
    }).format(formattedDate)

    return formatted.charAt(0).toUpperCase() + formatted.slice(1)
  }
}
