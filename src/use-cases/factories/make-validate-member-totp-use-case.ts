import { PrismaMembersRepository } from 'src/repositories/prisma/prisma-members-repository'
import { ValidateTotpUseCase } from '../members/validate-totp-use-case'

const makeValidateMemberTotpUseCase = () => {
  const membersRepository = new PrismaMembersRepository()
  const validateTotpUseCase = new ValidateTotpUseCase(membersRepository)

  return validateTotpUseCase
}

export { makeValidateMemberTotpUseCase }
