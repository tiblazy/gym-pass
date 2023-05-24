import {
  CheckInUseCaseRequest,
  CheckInUseCaseResponse,
} from '@/dtos/check-in-dto'
import { CheckInsRepository } from '@/repositories/interface/interface-check-ins-repository'

class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    memberId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
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
