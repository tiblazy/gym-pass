import { PrismaMembersRepository } from '../../../repositories/prisma/prisma-members-repository'
import { ValidateTotpUseCase } from '../../members/validate-totp-use-case'

const makeValidateMemberTotpUseCase = () => {
  const membersRepository = new PrismaMembersRepository()

  const useCase = new ValidateTotpUseCase(membersRepository)

  return useCase
}

export { makeValidateMemberTotpUseCase }
