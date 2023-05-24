import { hash } from 'bcryptjs'
import {
  RegisterMemberUseCaseRequestDTO,
  RegisterMemberUseCaseResponseDTO,
} from 'src/dtos/register-member-dto'
import { MembersRepository } from 'src/repositories/interface/interface-members-repository'
import { MemberAlreadyExists } from '../errors/member-already-exists'

class RegisterUseCase {
  constructor(private membersRepository: MembersRepository) {}

  execute = async ({
    username,
    password,
    avatar,
    email,
    totpKey,
  }: RegisterMemberUseCaseRequestDTO): Promise<RegisterMemberUseCaseResponseDTO> => {
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
