import { makeMember } from 'src/factories/make-member'
import { InMemoryMembersRepository } from 'src/repositories/in-memory/in-memory-members-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InvalidCredentials } from '../errors/invalid-credentials'
import { SessionAuthenticateUseCase } from './session-authenticate'

let membersRepository: InMemoryMembersRepository
let sut: SessionAuthenticateUseCase

let fakerMember: any

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    membersRepository = new InMemoryMembersRepository()
    sut = new SessionAuthenticateUseCase(membersRepository)

    fakerMember = makeMember()
  })

  it('should be able to authenticate a member', async () => {
    await membersRepository.create(fakerMember)

    const { member } = await sut.execute({
      email: fakerMember.email,
      password: fakerMember.password,
    })

    expect(member.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate a member', async () => {
    await expect(() =>
      sut.execute({
        email: fakerMember.email,
        password: fakerMember.password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentials)
  })

  // it('should not be able to authenticate a member inactive', async () => {
  //   await expect(() =>
  //     sut.execute({
  //       email: fakerMember.email,
  //       password: fakerMember.password,
  //     }),
  //   ).rejects.toBeInstanceOf(InvalidCredentials)
  // })
})
