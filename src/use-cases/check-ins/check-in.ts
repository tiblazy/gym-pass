import {
  CheckInUseCaseRequest,
  CheckInUseCaseResponse,
} from '@/dtos/check-in-dto'
import { CheckInsRepository } from '@/repositories/interface/interface-check-ins-repository'
import { GymsRepository } from '@/repositories/interface/interface-gyms-repository'
import { ResourceNotFound } from '../errors/resource-not-found'

class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    memberId,
    gymId,
    memberLatitude,
    memberLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFound('Gym')
    }

    const checkInOnSameDate =
      await this.checkInsRepository.findByMemberIdOnDate(memberId, new Date())

    if (checkInOnSameDate) {
      throw new Error('ERROW')
    }

    const checkIn = await this.checkInsRepository.create({
      member_id: memberId,
      gym_id: gymId,
    })

    return { checkIn }
  }
}

export { CheckInUseCase }
