import { PrismaMembersRepository } from '../../../repositories/prisma/prisma-members-repository'
import { SessionAuthenticateUseCase } from '../../sessions/authenticate'

const makeSessionAuthenticateUseCase = () => {
  const membersRepository = new PrismaMembersRepository()

  const useCase = new SessionAuthenticateUseCase(membersRepository)

  return useCase
}

export { makeSessionAuthenticateUseCase }
