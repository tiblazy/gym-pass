import { hash } from 'bcryptjs'
import { RegisterMemberDTO } from 'src/dtos/register-member-dto'
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
  }: RegisterMemberDTO) => {
    const user = await this.membersRepository.findByEmail(email)

    if (user) {
      throw new MemberAlreadyExists()
    }

    this.membersRepository.create({
      username,
      password: await hash(password, 6),
      avatar,
      email,
    })
  }
}

export { RegisterUseCase }
