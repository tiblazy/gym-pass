import { hash } from 'bcryptjs'
import { RegisterMemberDTO } from 'src/dtos/register-member-dto'
import { MembersRepository } from 'src/repositories/interface/members-interface-repository'
import { prisma } from '../../configs/prisma'

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
    const user = await prisma.member.findUnique({
      where: {
        email,
      },
    })

    if (user) {
      throw new Error('User already exists')
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
