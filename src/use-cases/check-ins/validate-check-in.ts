import dayjs from 'dayjs'
import {
  ValidateCheckInUseCaseRequest,
  ValidateCheckInUseCaseResponse,
} from '../../dtos/validate-check-in-dto'
import { CheckInsRepository } from '../../repositories/interface/interface-check-ins-repository'
import { ResourceNotFound } from '../errors/resource-not-found'
import { ValidateCheckInExpired } from '../errors/validate-check-in-expired'

class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFound('Check-in')
    }

    const distanceInMinutesFromCheckinCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckinCreation > 20) {
      throw new ValidateCheckInExpired()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}

export { ValidateCheckInUseCase }
