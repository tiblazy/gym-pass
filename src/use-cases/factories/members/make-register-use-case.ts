import { PrismaMembersRepository } from '../../../repositories/prisma/prisma-members-repository'
import { RegisterUseCase } from '../../members/register-use-case'

const makeRegisterMemberUseCase = () => {
  const membersRepository = new PrismaMembersRepository()

  const useCase = new RegisterUseCase(membersRepository)

  return useCase
}

export { makeRegisterMemberUseCase }
