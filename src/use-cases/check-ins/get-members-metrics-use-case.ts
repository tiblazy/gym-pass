import { GetMemberCheckInUseCaseRequest } from '@/dtos/get-member-check-in-dto'
import { CheckInsRepository } from '@/repositories/interface/interface-check-ins-repository'

class GetMemberCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ memberId }: GetMemberCheckInUseCaseRequest): Promise<Number> {
    const count = await this.checkInsRepository.countMemberMetricsById(memberId)

    return count
  }
}

export { GetMemberCheckInUseCase }
