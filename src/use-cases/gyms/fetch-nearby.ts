import {
  FetchNearbyGymsUseCaseRequest,
  FetchNearbyGymsUseCaseResponse,
} from '@/dtos/fetch-nearby-gyms-dto'
import { GymsRepository } from '@/repositories/interface/interface-gyms-repository'

class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    memberLatitude,
    memberLongitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: memberLatitude,
      longitude: memberLongitude,
    })

    return { gyms }
  }
}

export { FetchNearbyGymsUseCase }
