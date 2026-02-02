import { ITransactionsRepository } from '@/server/repositories/PrismaTransactionsRepository/types'
import { getMonthDateRange } from '@/server/shared/utils/date'

import { SummaryFilters, SummaryResponse } from '../../SummaryServices/types'

export class SummaryServices {
  constructor(private transactionRepository: ITransactionsRepository) {}

  async execute(userId: string, filters: SummaryFilters): Promise<SummaryResponse> {
    const { month, year } = filters

    const { date } = getMonthDateRange(month, year)

    const transactions = await this.transactionRepository.findByAll(userId, {
      startDate: date?.startDate,
      endDate: date?.endDate
    })

    const income = transactions.filter((t) => t.type === 'INCOME').reduce((sum, t) => sum + t.amount, 0)

    const expense = transactions.filter((t) => t.type === 'EXPENSE').reduce((sum, t) => sum + t.amount, 0)

    return {
      income,
      expense,
      total: income - expense
    }
  }
}
