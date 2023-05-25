import { CheckIn, Prisma } from '@prisma/client'

interface CheckInsRepository {
  findById(checkInId: string): Promise<CheckIn | null>
  findByMemberIdOnDate(memberId: string, date: Date): Promise<CheckIn | null>
  findManyByMemberId(memberId: string, page: number): Promise<CheckIn[]>
  countMemberMetricsById(memberId: string): Promise<Number>

  create(checkIn: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  save(checkIn: CheckIn): Promise<CheckIn>
}

export { CheckInsRepository }
