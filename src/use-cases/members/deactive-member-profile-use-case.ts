import { DeactiveMemberProfileUseCaseRequest } from '@/dtos/deactive-member-profile-dto'
import { MembersRepository } from '@/repositories/interface/interface-members-repository'
import { ResourceNotFound } from '../errors/resource-not-found'

class DeactiveMemberProfileUseCase {
  constructor(private membersRepository: MembersRepository) {}

  async execute({ id }: DeactiveMemberProfileUseCaseRequest) {
    const member = await this.membersRepository.findById(id)

    if (!member) {
      throw new ResourceNotFound('Member')
    }

    Object.assign(member, { is_active: false })

    await this.membersRepository.save(member)

    return member
  }
}

export { DeactiveMemberProfileUseCase }
