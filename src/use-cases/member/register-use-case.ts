import { hash } from 'bcryptjs'
import {
  RegisterMemberRequestDTO,
  RegisterMemberResponseDTO,
} from 'src/dtos/register-member-dto'
import { MembersRepository } from 'src/repositories/interface/interface-members-repository'
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
    totpKey,
  }: RegisterMemberRequestDTO): Promise<RegisterMemberResponseDTO> => {
    const doesMemberEmailAlreadyExists =
      await this.membersRepository.findByEmail(email)

    if (doesMemberEmailAlreadyExists) {
      throw new MemberAlreadyExists()
    }

    const member = await this.membersRepository.create({
      username,
      password: await hash(password, 6),
      avatar,
      email,
      totp_key: totpKey,
    })

    return { member }
  }
}

export { RegisterUseCase }
