import { Gym } from '@prisma/client'

interface FetchNearbyGymsUseCaseRequest {
  memberLatitude: number
  memberLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export { FetchNearbyGymsUseCaseRequest, FetchNearbyGymsUseCaseResponse }
