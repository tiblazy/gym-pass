import {
  UpdateMemberProfileUseCaseRequest,
  UpdateMemberProfileUseCaseResponse,
} from '@/dtos/update-member-profile-dto'
import { MembersRepository } from '@/repositories/interface/interface-members-repository'
import { cloudinaryUpload } from '@/utils/cloudinary'
import { hash } from 'bcryptjs'
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

    if (data.avatar === undefined || data.avatar === null) {
      data.avatar = member.avatar
    } else if (data.avatar) {
      const { public_id, url } = await cloudinaryUpload(data.avatar, member)
      data.avatar = public_id
    }

    // temporary
    if (data.username === undefined || data.username === null) {
      data.username = member.username
    }
    if (data.email === undefined || data.email === null) {
      data.email = member.email
    }
    if (data.password === undefined || data.password === null) {
      data.password = member.password
    }

    Object.assign(member, {
      ...data,
      password: await hash(data.password, 6),
      updated_at: new Date(),
    })

    await this.membersRepository.save(member)

    return { member }
  }
}

export { UpdateMemberProfileUseCase }
