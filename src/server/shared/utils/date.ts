export function getMonthDateRange(month?: number, year?: number) {
  if (!month || !year) return {}

  const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0))
  const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999))

  return { date: { startDate, endDate } }
}
