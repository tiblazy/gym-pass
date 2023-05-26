import {
  GetMemberProfileUseCaseRequest,
  GetMemberProfileUseCaseResponse,
} from '../../dtos/get-member-profile-dto'
import { MembersRepository } from '../../repositories/interface/interface-members-repository'
import { ResourceNotFound } from '../errors/resource-not-found'

class GetMemberProfileUseCase {
  constructor(private membersRepository: MembersRepository) {}

  async execute({
    id,
  }: GetMemberProfileUseCaseRequest): Promise<GetMemberProfileUseCaseResponse> {
    const member = await this.membersRepository.findById(id)

    if (!member) {
      throw new ResourceNotFound('Member')
    }

    return { member }
  }
}

export { GetMemberProfileUseCase }
