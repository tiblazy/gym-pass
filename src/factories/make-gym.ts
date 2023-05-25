import { nearGymStaticLocation } from '@/utils/static-locations'
import { faker } from '@faker-js/faker'
import { Gym } from '@prisma/client'
import { randomUUID } from 'node:crypto'

const makeGym = (override: Partial<Gym> = {}) => {
  return {
    id: randomUUID(),
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
    phone: faker.phone.number(),
    latitude: nearGymStaticLocation.latitude,
    longitude: nearGymStaticLocation.longitude,
    ...override,
  }
}

export { makeGym }
