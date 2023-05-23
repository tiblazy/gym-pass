import { Member, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { MembersRepository } from '../interface/interface-members-repository'

class InMemoryMembersRepository implements MembersRepository {
  public members: Member[] = []

  async findByEmail(email: string): Promise<Member | null> {
    const member = this.members.find((member) => member.email === email)

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
      is_active: false,
      validate_totp: new Date(),
    }

    this.members.push(member)

    return member
  }
}

export { InMemoryMembersRepository }
