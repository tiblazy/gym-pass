import {
  UpdateMemberProfileUseCaseRequest,
  UpdateMemberProfileUseCaseResponse,
} from 'src/dtos/update-member-profile-dto'
import { MembersRepository } from 'src/repositories/interface/interface-members-repository'
import { ResourceNotFound } from '../errors/resource-not-found'

class UpdateMemberProfileUseCase {
  constructor(private membersRepository: MembersRepository) {}

  async execute({
    id,
    data,
  }: UpdateMemberProfileUseCaseRequest): Promise<UpdateMemberProfileUseCaseResponse> {
    const member = await this.membersRepository.findById(id)

    if (!member) {
      throw new ResourceNotFound('Member')
    }

    Object.assign(member, data)

    await this.membersRepository.save(member)

    return { member }
  }
}

export { UpdateMemberProfileUseCase }
