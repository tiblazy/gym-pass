import { faker } from '@faker-js/faker'
import { CheckIn } from '@prisma/client'
import { randomUUID } from 'node:crypto'

const makeCheckIn = (override: Partial<CheckIn> = {}) => {
  return {
    id: randomUUID(),
    member_id: faker.string.uuid(),
    gym_id: faker.string.uuid(),
    validated_at: override.validated_at
      ? new Date(override.validated_at)
      : new Date(),
    created_at: new Date(),
    ...override,
  }
}

export { makeCheckIn }
