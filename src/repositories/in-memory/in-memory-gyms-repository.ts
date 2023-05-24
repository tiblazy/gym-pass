import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../interface/interface-gyms-repository'

class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async findById(data: string): Promise<Gym | null> {
    const gym = this.gyms.find(({ id }) => id === data)

    if (!gym) {
      return null
    }

    return gym
  }

  async create(checkIn: Prisma.GymCreateInput): Promise<Gym> {
    throw new Error('Method not implemented.')
  }
}

export { InMemoryGymsRepository }
