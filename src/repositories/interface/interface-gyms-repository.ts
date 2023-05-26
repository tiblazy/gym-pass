import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

interface GymsRepository {
  findById(gymId: number): Promise<Gym | null>
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
  searchManyByQuery(query: string, page: number): Promise<Gym[]>

  create(gym: Prisma.GymCreateInput): Promise<Gym>
}

export { GymsRepository }
