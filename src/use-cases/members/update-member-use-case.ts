import {
  UpdateMemberProfileUseCaseRequest,
  UpdateMemberProfileUseCaseResponse,
} from '@/dtos/update-member-profile-dto'
import { MembersRepository } from '@/repositories/interface/interface-members-repository'
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

    // temporary
    if (data.avatar === undefined || data.avatar === null) {
      data.avatar = member.avatar
    }

    if (data.username === undefined || data.username === null) {
      data.username = member.username
    }

    if (data.email === undefined || data.email === null) {
      data.email = member.email
    }

    if (data.password === undefined || data.password === null) {
      data.password = member.password
    }

    Object.assign(member, data)

    await this.membersRepository.save(member)

    return { member }
  }
}

export { UpdateMemberProfileUseCase }
