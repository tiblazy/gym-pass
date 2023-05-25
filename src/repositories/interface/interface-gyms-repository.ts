import { Gym, Prisma } from '@prisma/client'

interface GymsRepository {
  findById(gymId: string): Promise<Gym | null>
  searchManyByQuery(query: string, page: number): Promise<Gym[]>

  create(gym: Prisma.GymCreateInput): Promise<Gym>
}

export { GymsRepository }
