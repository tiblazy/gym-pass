import { makeMember } from '../../factories/make-member'
import { InMemoryMembersRepository } from '../../repositories/in-memory/in-memory-members-repository'
import { ResourceNotFound } from '../errors/resource-not-found'
import { DeactiveMemberProfileUseCase } from './deactive-profile-use-case'

let membersRepository: InMemoryMembersRepository
let sut: DeactiveMemberProfileUseCase

let fakerMember: any

describe('Deactive Profile Use Case', () => {
  beforeEach(() => {
    membersRepository = new InMemoryMembersRepository()
    sut = new DeactiveMemberProfileUseCase(membersRepository)

    fakerMember = makeMember()
  })

  it('should be able to deactive profile', async () => {
    const toDeactiveProfile = await membersRepository.create(fakerMember)

    await sut.execute({
      id: toDeactiveProfile.id,
    })

    expect(toDeactiveProfile.is_active).toBe(false)
  })

  it('should not be able to a undefined deactive profile', async () => {
    await expect(() => sut.execute({ id: 'fakerId' })).rejects.toBeInstanceOf(
      ResourceNotFound,
    )
  })
})
