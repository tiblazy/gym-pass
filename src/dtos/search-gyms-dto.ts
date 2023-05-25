import { Gym } from '@prisma/client'

interface SearchGymsUseCaseRequest {
  query: string
  page?: number
}
interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export { SearchGymsUseCaseRequest, SearchGymsUseCaseResponse }
