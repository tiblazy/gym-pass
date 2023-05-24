import { DesactiveMemberProfileUseCaseRequest } from '@/dtos/desactive-member-profile-dto'
import { MembersRepository } from '@/repositories/interface/interface-members-repository'
import { ResourceNotFound } from '../errors/resource-not-found'

class DesactiveMemberProfileUseCase {
  constructor(private membersRepository: MembersRepository) {}

  async execute({ id }: DesactiveMemberProfileUseCaseRequest): Promise<void> {
    const member = await this.membersRepository.findById(id)

    if (!member) {
      throw new ResourceNotFound('Member')
    }

    member.is_active = false

    await this.membersRepository.save(member)
  }
}

export { DesactiveMemberProfileUseCase }
