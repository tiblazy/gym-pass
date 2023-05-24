import { faker } from '@faker-js/faker'
import { Member } from '@prisma/client'

const makeMember = (override: Partial<Member> = {}) => {
  return {
    username: faker.lorem.word(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    totpKey: 'TOTPK',
    ...override,
  }
}

export { makeMember }
