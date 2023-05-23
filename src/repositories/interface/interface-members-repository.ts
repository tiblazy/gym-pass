import { Member, Prisma } from '@prisma/client'

interface MembersRepository {
  findByEmail(email: string): Promise<Member | null>

  create(member: Prisma.MemberCreateInput): Promise<Member>
}

export { MembersRepository }
