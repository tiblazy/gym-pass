import {
  SearchGymsUseCaseRequest,
  SearchGymsUseCaseResponse,
} from '@/dtos/search-gyms-dto'
import { GymsRepository } from '@/repositories/interface/interface-gyms-repository'

class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page = 1,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    console.log(query)
    const gyms = await this.gymsRepository.searchManyByQuery(query, page)

    return { gyms }
  }
}

export { SearchGymsUseCase }
