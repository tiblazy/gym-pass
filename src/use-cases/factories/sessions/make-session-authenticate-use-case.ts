import { PrismaMembersRepository } from '@/repositories/prisma/prisma-members-repository'
import { SessionAuthenticateUseCase } from '@/use-cases/sessions/session-authenticate'

const makeSessionAuthenticateUseCase = () => {
  const membersRepository = new PrismaMembersRepository()

  const useCase = new SessionAuthenticateUseCase(membersRepository)

  return useCase
}

export { makeSessionAuthenticateUseCase }
