import { hash } from 'bcryptjs'
import {
  RegisterMemberRequestDTO,
  RegisterMemberResponseDTO,
} from 'src/dtos/register-member-dto'
import { MembersRepository } from 'src/repositories/interface/members-interface-repository'
import { MemberAlreadyExists } from '../errors/member-already-exists'

class RegisterUseCase {
  constructor(private membersRepository: MembersRepository) {
    Object.assign(this, membersRepository)
  }

  execute = async ({
    username,
    password,
    avatar,
    email,
  }: RegisterMemberRequestDTO): Promise<RegisterMemberResponseDTO> => {
    const doesEmailAlreadyExists = await this.membersRepository.findByEmail(
      email,
    )

    if (doesEmailAlreadyExists) {
      throw new MemberAlreadyExists()
    }

    const member = await this.membersRepository.create({
      username,
      password: await hash(password, 6),
      avatar,
      email,
    })

    return { member }
  }
}

export { RegisterUseCase }
