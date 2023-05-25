import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '@/use-cases/gyms/create-gym'

const makeCreateGymUseCase = () => {
  const gymsRepository = new PrismaGymsRepository()

  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}

export { makeCreateGymUseCase }
