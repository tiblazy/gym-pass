import { PrismaMembersRepository } from '@/repositories/prisma/prisma-members-repository'
import { DeactiveMemberProfileUseCase } from '@/use-cases/members/deactive-member-profile-use-case'

const makeDeactiveMemberProfileUseCase = () => {
  const membersRepository = new PrismaMembersRepository()

  const useCase = new DeactiveMemberProfileUseCase(membersRepository)

  return useCase
}

export { makeDeactiveMemberProfileUseCase }
