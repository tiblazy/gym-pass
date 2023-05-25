import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymsUseCase } from '@/use-cases/gyms/search-gyms'

const makeSearchGymsUseCase = () => {
  const gymsRepository = new PrismaGymsRepository()

  const useCase = new SearchGymsUseCase(gymsRepository)

  return useCase
}

export { makeSearchGymsUseCase }
