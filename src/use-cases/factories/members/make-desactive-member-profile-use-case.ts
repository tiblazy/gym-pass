import { PrismaMembersRepository } from '@/repositories/prisma/prisma-members-repository'
import { DesactiveMemberProfileUseCase } from '@/use-cases/members/desactive-member-profile-use-case'

const makeDesactiveMemberProfileUseCase = () => {
  const membersRepository = new PrismaMembersRepository()

  const useCase = new DesactiveMemberProfileUseCase(membersRepository)

  return useCase
}

export { makeDesactiveMemberProfileUseCase }
