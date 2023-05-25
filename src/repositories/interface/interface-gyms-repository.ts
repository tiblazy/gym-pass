import { Gym, Prisma } from '@prisma/client'

interface GymsRepository {
  findById(gymId: string): Promise<Gym | null>

  create(gym: Prisma.GymCreateInput): Promise<Gym>
}

export { GymsRepository }
