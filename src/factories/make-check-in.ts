import { faker } from '@faker-js/faker'
import { CheckIn } from '@prisma/client'

const makeCheckIn = (override: Partial<CheckIn> = {}) => {
  return {
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
