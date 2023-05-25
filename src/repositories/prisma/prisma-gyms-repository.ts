import { prisma } from '@/configs/prisma'
import { Gym, Prisma } from '@prisma/client'
import {
  FindManyNearbyParams,
  GymsRepository,
} from '../interface/interface-gyms-repository'

class PrismaGymsRepository implements GymsRepository {
  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({ where: { id } })

    return gym
  }

  async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms 
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude)  - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }

  async searchManyByQuery(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: { name: { contains: query } },
      take: 10,
      skip: (page - 1) * 10,
    })

    return gyms
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({ data })

    return gym
  }
}

export { PrismaGymsRepository }
