import { PrismaTransactionsRepository } from '@/server/repositories/PrismaTransactionsRepository'
import { SummaryServices } from '@/server/services/SummaryServices'

export function makeSummaryService() {
  const transactionsRepository = new PrismaTransactionsRepository()
  const summaryService = new SummaryServices(transactionsRepository)

  return summaryService
}
