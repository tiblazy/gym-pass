import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '@/use-cases/check-ins/validate-check-in'

const makeValidateCheckInUseCase = () => {
  const checkInsRepository = new PrismaCheckInsRepository()

  const useCase = new ValidateCheckInUseCase(checkInsRepository)

  return useCase
}

export { makeValidateCheckInUseCase }
