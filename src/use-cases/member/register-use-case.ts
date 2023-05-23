import { hash } from 'bcryptjs'
import { RegisterMemberDTO } from 'src/dtos/register-member-dto'
import { PrismaMembersRepository } from 'src/repositories/prisma/members-repository-prisma'
import { prisma } from '../../configs/prisma'

const registerUseCase = async ({
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

  const prismaMembersRepository = new PrismaMembersRepository()

  prismaMembersRepository.create({
    username,
    password: await hash(password, 6),
    avatar,
    email,
  })
}

export { registerUseCase }
