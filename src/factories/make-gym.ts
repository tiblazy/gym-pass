import { faker } from '@faker-js/faker'
import { Gym } from '@prisma/client'
import { nearGymStaticLocation } from '../utils/static-locations'

const makeGym = (override: Partial<Gym> = {}, id: number = 1) => {
  return {
    id,
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
    phone: faker.phone.number(),
    latitude: nearGymStaticLocation.latitude,
    longitude: nearGymStaticLocation.longitude,
    ...override,
  }
}

export { makeGym }
