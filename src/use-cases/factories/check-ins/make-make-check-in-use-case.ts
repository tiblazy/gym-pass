import { PrismaCheckInsRepository } from '../../../repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '../../../repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../../check-ins/check-in'

const makeCheckInUseCase = () => {
  const checkInRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()

  const useCase = new CheckInUseCase(checkInRepository, gymsRepository)

  return useCase
}

export { makeCheckInUseCase }
