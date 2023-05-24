import { makeMember } from 'src/factories/make-member'
import { InMemoryMembersRepository } from 'src/repositories/in-memory/in-memory-members-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InvalidCredentials } from '../errors/invalid-credentials'
import { ResourceNotFound } from '../errors/resource-not-found'
import { DesactiveMemberProfileUseCase } from './desactive-member-profile-use-case'

let membersRepository: InMemoryMembersRepository
let sut: DesactiveMemberProfileUseCase

let fakerMember: any

describe('Desactive Profile Use Case', () => {
  beforeEach(() => {
    membersRepository = new InMemoryMembersRepository()
    sut = new DesactiveMemberProfileUseCase(membersRepository)

    fakerMember = makeMember()
  })

  it('should be able to desactive profile', async () => {
    const toDesactiveProfile = await membersRepository.create(fakerMember)

    await sut.execute({
      id: toDesactiveProfile.id,
    })

    console.log(toDesactiveProfile)
    expect(toDesactiveProfile.is_active).toBe(false)
  })

  it('should not be able to a undefined desactive profile', async () => {
    await expect(() => sut.execute({ id: 'fakerId' })).rejects.toBeInstanceOf(
      ResourceNotFound,
    )
  })

  // it('should not be able to desactive a alraedy desactived profile', async () => {
  //   await expect(() => sut.execute({ id: 'fakerId' })).rejects.toBeInstanceOf(
  //     InvalidCredentials,
  //   )
  // })
})
