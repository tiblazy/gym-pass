import { PrismaMembersRepository } from '@/repositories/prisma/prisma-members-repository'
import { UpdateMemberProfileUseCase } from '@/use-cases/members/update-use-case'

const makeUpdateMemberProfileUseCase = () => {
  const membersRepository = new PrismaMembersRepository()

  const useCase = new UpdateMemberProfileUseCase(membersRepository)

  return useCase
}

export { makeUpdateMemberProfileUseCase }
