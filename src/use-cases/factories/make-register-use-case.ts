import { PrismaMembersRepository } from '@/repositories/prisma/prisma-members-repository'
import { RegisterUseCase } from '../members/register-use-case'

const makeRegisterMemberUseCase = () => {
  const membersRepository = new PrismaMembersRepository()
  const registerUseCase = new RegisterUseCase(membersRepository)

  return registerUseCase
}

export { makeRegisterMemberUseCase }
