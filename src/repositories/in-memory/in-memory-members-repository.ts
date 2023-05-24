import { Member, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { MembersRepository } from '../interface/interface-members-repository'

class InMemoryMembersRepository implements MembersRepository {
  public members: Member[] = []

  async findByEmail(data: string) {
    const member = this.members.find(({ email }) => email === data)

    if (!member) {
      return null
    }

    return member
  }

  async findByTotp(data: string) {
    const member = this.members.find(({ totp_key }) => totp_key === data)

    if (!member) {
      return null
    }

    return member
  }

  async create({
    email,
    password,
    username,
    avatar,
    totp_key,
  }: Prisma.MemberCreateInput) {
    const member = {
      id: randomUUID(),
      username,
      email,
      password,
      avatar: avatar ?? null,
      created_at: new Date(),
      updated_at: new Date(),
      totp_created_at: new Date(),
      totp_key: 'TOTPK',
      is_active: false,
    }

    this.members.push(member)

    return member
  }

  async validate(member: Prisma.MemberCreateInput, isValid: boolean = false) {
    const memberIndex = this.members.findIndex(({ id }) => id === member.id)

    if (memberIndex >= 0 && isValid) {
      this.members[memberIndex].is_active = true
    } else if (memberIndex > 0 && !isValid) {
      this.members[memberIndex].totp_created_at = new Date()
      this.members[memberIndex].totp_key = 'TOTPT'
    }

    return member
  }
}

export { InMemoryMembersRepository }
