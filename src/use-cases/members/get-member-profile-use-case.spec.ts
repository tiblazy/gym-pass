import { makeMember } from 'src/factories/make-member'
import { InMemoryMembersRepository } from 'src/repositories/in-memory/in-memory-members-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFound } from '../errors/resource-not-found'
import { GetMemberProfileUseCase } from './get-member-profile-use-case'

let membersRepository: InMemoryMembersRepository
let sut: GetMemberProfileUseCase

let fakerMember: any

describe('Get Profile Use Case', () => {
  beforeEach(() => {
    membersRepository = new InMemoryMembersRepository()
    sut = new GetMemberProfileUseCase(membersRepository)

    fakerMember = makeMember()
  })

  it('should be able to get profile', async () => {
    const toGetMemberProfile = await membersRepository.create(fakerMember)

    const { member } = await sut.execute({ id: toGetMemberProfile.id })

    expect(member.username).toBe(toGetMemberProfile.username)
  })

  it('should not be able to a undefined get profile', async () => {
    await expect(() => sut.execute({ id: 'fakerId' })).rejects.toBeInstanceOf(
      ResourceNotFound,
    )
  })
})
