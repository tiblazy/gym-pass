import {
  CheckInUseCaseRequest,
  CheckInUseCaseResponse,
} from '@/dtos/check-in-dto'
import { CheckInsRepository } from '@/repositories/interface/interface-check-ins-repository'
import { GymsRepository } from '@/repositories/interface/interface-gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { MaxDistanceCoordinate } from '../errors/max-distance-coordinate'
import { MaxNumberOfCheckIns } from '../errors/max-number-of-check-ins'
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

    const distance = getDistanceBetweenCoordinates(
      { latitude: memberLatitude, longitude: memberLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceCoordinate()
    }

    const checkInOnSameDate =
      await this.checkInsRepository.findByMemberIdOnDate(memberId, new Date())

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckIns()
    }

    const checkIn = await this.checkInsRepository.create({
      member_id: memberId,
      gym_id: gymId,
    })

    return { checkIn }
  }
}

export { CheckInUseCase }
