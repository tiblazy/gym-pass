import { GetMemberMetricsCheckInUseCaseRequest } from '../../dtos/get-member-metrics-dto'
import { CheckInsRepository } from '../../repositories/interface/interface-check-ins-repository'

class GetMemberMetricsCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    memberId,
  }: GetMemberMetricsCheckInUseCaseRequest): Promise<Number> {
    const count = await this.checkInsRepository.countMemberMetricsById(memberId)

    return count
  }
}

export { GetMemberMetricsCheckInUseCase }
