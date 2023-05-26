import { PrismaGymsRepository } from '../../../repositories/prisma/prisma-gyms-repository'
import { SearchGymsUseCase } from '../../gyms/search'

const makeSearchGymsUseCase = () => {
  const gymsRepository = new PrismaGymsRepository()

  const useCase = new SearchGymsUseCase(gymsRepository)

  return useCase
}

export { makeSearchGymsUseCase }
