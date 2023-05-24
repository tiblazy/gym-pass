import { InMemoryMembersRepository } from 'src/repositories/in-memory/in-memory-members-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { MemberAlreadyExists } from '../errors/member-already-exists'
import { RegisterUseCase } from './register-use-case'

let membersRepository: InMemoryMembersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    membersRepository = new InMemoryMembersRepository()
    sut = new RegisterUseCase(membersRepository)
  })

  it('should be able to register a new member', async () => {
    const { member } = await sut.execute({
      username: 'john doe',
      password: 'john_doe*',
      email: 'johndoe@gmail.com',
      totpKey: 'TOTPK',
    })

    expect(membersRepository.members[0].id).toEqual(expect.any(String))
  })

  it('should not be able to register a same email twice', async () => {
    await sut.execute({
      username: 'John Doe',
      email: 'johndoe@email.com',
      password: '123johnDoe',
      totpKey: 'TOTPK',
    })

    await expect(() =>
      sut.execute({
        username: 'John Doe',
        email: 'johndoe@email.com',
        password: '123johnDoe',
        totpKey: 'TOTPK',
      }),
    ).rejects.toBeInstanceOf(MemberAlreadyExists)
  })
})
