import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { GetMemberMetricsCheckInUseCase } from '@/use-cases/check-ins/get-members-metrics-use-case'

const makeGetMemberMetricsCheckInUseCase = () => {
  const checkInsRepository = new PrismaCheckInsRepository()

  const useCase = new GetMemberMetricsCheckInUseCase(checkInsRepository)

  return useCase
}

export { makeGetMemberMetricsCheckInUseCase }
