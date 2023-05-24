import { makeMember } from 'src/factories/make-member'
import { InMemoryMembersRepository } from 'src/repositories/in-memory/in-memory-members-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFound } from '../errors/resource-not-found'
import { UpdateMemberProfileUseCase } from './update-member-use-case'

let membersRepository: InMemoryMembersRepository
let sut: UpdateMemberProfileUseCase

let fakerMember: any

describe('Update Profile Use Case', () => {
  beforeEach(() => {
    membersRepository = new InMemoryMembersRepository()
    sut = new UpdateMemberProfileUseCase(membersRepository)

    fakerMember = makeMember()
  })

  it('should be able to update profile', async () => {
    const toUpdateProfile = await membersRepository.create(fakerMember)

    const { member } = await sut.execute({
      id: toUpdateProfile.id,
      data: {
        username: 'Updated',
      },
    })

    expect(member.username).toBe('Updated')
  })

  it('should not be able to a undefined update profile', async () => {
    await expect(() =>
      sut.execute({ id: 'fakerId', data: {} }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })

  // it('should not be able to update a different member', async () => {
  //   await expect(() => sut.execute({ id: 'fakerId' })).rejects.toBeInstanceOf(
  //     InvalidCredentials,
  //   )
  // })
})
