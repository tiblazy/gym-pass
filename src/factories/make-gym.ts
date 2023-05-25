import { nearGymStaticLocation } from '@/utils/static-locations'
import { faker } from '@faker-js/faker'
import { Gym } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime'
import { randomUUID } from 'node:crypto'

const makeGym = (override: Partial<Gym> = {}) => {
  return {
    id: randomUUID(),
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
    phone: faker.phone.number(),
    latitude: new Decimal(nearGymStaticLocation.latitude),
    longitude: new Decimal(nearGymStaticLocation.longitude),
    ...override,
  }
}

export { makeGym }
