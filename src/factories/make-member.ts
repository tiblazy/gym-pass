import { faker } from '@faker-js/faker'
import { Member } from '@prisma/client'
import { randomUUID } from 'node:crypto'

const makeMember = (override: Partial<Member> = {}) => {
  return {
    id: randomUUID(),
    username: faker.lorem.word(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    totpKey: 'TOTPK',
    ...override,
  }
}

export { makeMember }
