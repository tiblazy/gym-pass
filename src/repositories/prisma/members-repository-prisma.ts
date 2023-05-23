import { Prisma } from '@prisma/client'
import { prisma } from '../../configs/prisma'

class PrismaMembersRepository {
  constructor() {}

  async create({ username, password, email }: Prisma.MemberCreateInput) {
    const member = await prisma.member.create({
      data: {
        username,
        password,
        email,
      },
    })

    return member
  }
}

export { PrismaMembersRepository }
