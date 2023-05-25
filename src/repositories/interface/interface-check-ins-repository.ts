import { CheckIn, Prisma } from '@prisma/client'

interface CheckInsRepository {
  findByMemberIdOnDate(memberId: string, date: Date): Promise<CheckIn | null>
  findManyByMemberId(memberId: string, page: number): Promise<CheckIn[]>
  countMemberMetricsById(memberId: string): Promise<Number>

  create(checkIn: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}

export { CheckInsRepository }
