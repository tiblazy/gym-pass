import { PrismaMembersRepository } from '@/repositories/prisma/prisma-members-repository'
import { GetMemberProfileUseCase } from '@/use-cases/members/get-profile-use-case'

const makeGetMemberProfileUseCase = () => {
  const membersRepository = new PrismaMembersRepository()

  const useCase = new GetMemberProfileUseCase(membersRepository)

  return useCase
}

export { makeGetMemberProfileUseCase }
