import { PrismaGymsRepository } from '../../../repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '../../gyms/fetch-nearby'

const makeFetchNearbyGymsUseCase = () => {
  const gymsRepository = new PrismaGymsRepository()

  const useCase = new FetchNearbyGymsUseCase(gymsRepository)

  return useCase
}

export { makeFetchNearbyGymsUseCase }
