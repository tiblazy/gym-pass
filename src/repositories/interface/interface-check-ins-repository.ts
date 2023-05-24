import { CheckIn, Prisma } from '@prisma/client'

interface CheckInsRepository {
  findByMemberIdOnDate(memberId: string, date: Date): Promise<CheckIn | null>

  create(checkIn: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}

export { CheckInsRepository }
