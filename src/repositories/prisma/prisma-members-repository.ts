import { prisma } from '@/configs/prisma'
import { Member, Prisma } from '@prisma/client'
import { totp } from 'src/configs/totp'
import { MembersRepository } from '../interface/interface-members-repository'

class PrismaMembersRepository implements MembersRepository {
  async findById(id: string): Promise<Member | null> {
    const member = await prisma.member.findUnique({ where: { id } })

    return member
  }

  async findByEmail(email: string): Promise<Member | null> {
    const member = await prisma.member.findUnique({
      where: { email },
    })

    return member
  }

  async findByTotp(totpKey: string): Promise<Member | null> {
    const member = await prisma.member.findUnique({
      where: { totp_key: totpKey },
    })

    return member
  }

  async create({
    username,
    password,
    email,
    totp_key,
  }: Prisma.MemberCreateInput) {
    const member = await prisma.member.create({
      data: {
        username,
        password,
        email,
        totp_key: totp(),
      },
    })

    return member
  }

  async validate(
    { totp_created_at }: Prisma.MemberCreateInput,
    isValid: boolean = false,
  ) {
    if (isValid) {
      return await prisma.member.update({
        where: { totp_created_at },
        data: {
          is_active: true,
        },
      })
    }

    return await prisma.member.update({
      where: { totp_created_at },
      data: {
        totp_created_at: new Date(),
        totp_key: totp(),
      },
    })
  }

  async save(data: Prisma.MemberCreateInput) {
    const member = await prisma.member.update({
      where: {
        id: data.id,
      },
      data,
    })

    return member
  }
}

export { PrismaMembersRepository }
