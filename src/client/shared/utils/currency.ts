export const formatCurrency = (value: number, locale = 'pt-BR') => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
