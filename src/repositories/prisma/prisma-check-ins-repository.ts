import { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { prisma } from '../../configs/prisma'
import { CheckInsRepository } from '../interface/interface-check-ins-repository'

class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({ where: { id } })

    return checkIn
  }

  async findByMemberIdOnDate(
    memberId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        member_id: memberId,
        created_at: { gte: startOfTheDay.toDate(), lte: endOfTheDay.toDate() },
      },
    })

    return checkIn
  }

  async findManyByMemberId(memberId: string, page: number): Promise<CheckIn[]> {
    const checkIns = await prisma.checkIn.findMany({
      where: { member_id: memberId },
      take: 10,
      skip: (page - 1) * 10,
    })

    return checkIns
  }

  async countMemberMetricsById(memberId: string): Promise<Number> {
    const count = await prisma.checkIn.count({
      where: { member_id: memberId },
    })

    return count
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({ data })

    return checkIn
  }

  async save(data: CheckIn): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.update({
      where: { id: data.id },
      data,
    })

    return checkIn
  }
}

export { PrismaCheckInsRepository }
