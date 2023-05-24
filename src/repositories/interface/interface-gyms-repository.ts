import { Gym, Prisma } from '@prisma/client'

interface GymsRepository {
  findById(gymId: string): Promise<Gym | null>

  create(checkIn: Prisma.GymCreateInput): Promise<Gym>
}

export { GymsRepository }
