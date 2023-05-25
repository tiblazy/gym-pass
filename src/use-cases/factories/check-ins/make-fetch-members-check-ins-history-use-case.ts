import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchMemberCheckInUseCase } from '@/use-cases/check-ins/fetch-members-check-ins-history'

const makeFetchMemberCheckInUseCase = () => {
  const checkInsRepository = new PrismaCheckInsRepository()

  const useCase = new FetchMemberCheckInUseCase(checkInsRepository)

  return useCase
}

export { makeFetchMemberCheckInUseCase }
