import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '@/use-cases/check-ins/check-in'

const makeCheckInUseCaseCheckInUseCase = () => {
  const checkInRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()

  const useCase = new CheckInUseCase(checkInRepository, gymsRepository)

  return useCase
}

export { makeCheckInUseCaseCheckInUseCase }
