import { Member, Prisma } from '@prisma/client'
import { prisma } from '../../configs/prisma'
import { MembersRepository } from '../interface/members-interface-repository'

class PrismaMembersRepository implements MembersRepository {
  async findByEmail(email: string): Promise<Member | null> {
    const member = await prisma.member.findUnique({
      where: { email },
    })

    return member
  }

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
