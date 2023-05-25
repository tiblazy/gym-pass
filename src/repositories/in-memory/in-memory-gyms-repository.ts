import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
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

  async searchManyByQuery(query: string, page: number) {
    return this.gyms
      .filter((gym) => gym.name.includes(query))
      .slice((page - 1) * 10, page * 10)
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.gyms.push(gym)

    return gym
  }
}

export { InMemoryGymsRepository }
