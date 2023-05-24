import { Member, Prisma } from '@prisma/client'

interface MembersRepository {
  findById(id: string): Promise<Member | null>
  findByEmail(email: string): Promise<Member | null>
  findByTotp(totpKey: string): Promise<Member | null>

  create(member: Prisma.MemberCreateInput): Promise<Member>
  validate(member: Prisma.MemberCreateInput, isValid?: boolean): Promise<Member>
  save(member: Prisma.MemberCreateInput): Promise<Member>
}

export { MembersRepository }
