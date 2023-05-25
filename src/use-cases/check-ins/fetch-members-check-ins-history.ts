import {
  FetchMemberCheckInUseCaseRequest,
  FetchMemberCheckInUseCaseResponse,
} from '@/dtos/fetch-members-check-ins-history-dto'
import { CheckInsRepository } from '@/repositories/interface/interface-check-ins-repository'

class FetchMemberCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    memberId,
    page = 1,
  }: FetchMemberCheckInUseCaseRequest): Promise<FetchMemberCheckInUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByMemberId(
      memberId,
      page,
    )

    return { checkIns }
  }
}

export { FetchMemberCheckInUseCase }
