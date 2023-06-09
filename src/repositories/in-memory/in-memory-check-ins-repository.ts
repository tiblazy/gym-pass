import { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { randomUUID } from 'node:crypto'
import { CheckInsRepository } from '../interface/interface-check-ins-repository'

class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = []

  async findById(checkInId: string): Promise<CheckIn | null> {
    const checkIn = this.checkIns.find(({ id }) => id === checkInId)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async findByMemberIdOnDate(memberId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkOnSameDate = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDay =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.member_id === memberId && isOnSameDay
    })

    if (!checkOnSameDate) {
      return null
    }

    return checkOnSameDate
  }

  async findManyByMemberId(memberId: string, page: number = 1) {
    return this.checkIns
      .filter(({ member_id }) => member_id === memberId)
      .slice((page - 1) * 10, page * 10)
  }

  async countMemberMetricsById(memberId: string) {
    return this.checkIns.filter(({ member_id }) => member_id === memberId)
      .length
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: data.id ?? randomUUID(),
      member_id: data.member_id ?? null,
      gymId: data.gymId ?? null,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.checkIns.push(checkIn)

    return checkIn
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.checkIns.findIndex(({ id }) => id === checkIn.id)

    if (checkInIndex >= 0) {
      Object.assign(checkInIndex, checkIn)
    }

    return checkIn
  }
}

export { InMemoryCheckInsRepository }
