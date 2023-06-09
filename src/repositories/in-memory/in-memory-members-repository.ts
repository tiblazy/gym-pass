import { Member, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { MembersRepository } from '../interface/interface-members-repository'

class InMemoryMembersRepository implements MembersRepository {
  public members: Member[] = []

  async findById(data: string): Promise<Member | null> {
    const member = this.members.find(({ id }) => id === data)

    if (!member) {
      return null
    }

    return member
  }

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

  async validate(member: Member, isValid: boolean = false) {
    const memberIndex = this.members.findIndex(({ id }) => id === member.id)

    if (memberIndex >= 0 && isValid) {
      this.members[memberIndex].is_active = true
    } else if (memberIndex > 0 && !isValid) {
      this.members[memberIndex].totp_created_at = new Date()
      this.members[memberIndex].totp_key = 'TOTPT'
    }

    return member
  }

  async save(member: Member) {
    const memberIndex = this.members.findIndex(({ id }) => id === member.id)

    if (memberIndex > 0) {
      this.members[memberIndex] = member
    }

    return member
  }
}

export { InMemoryMembersRepository }
