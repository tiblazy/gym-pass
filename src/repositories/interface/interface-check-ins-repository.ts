import { CheckIn, Prisma } from '@prisma/client'

interface CheckInsRepository {
  findByMemberIdOnDate(memberId: string, date: Date): Promise<CheckIn | null>
  findManyByMemberId(memberId: string, page: number): Promise<CheckIn[]>

  create(checkIn: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}

export { CheckInsRepository }
