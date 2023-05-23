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
      username: 'pqp',
      password: 'pqpq',
      email: 'pqp@pqp.com',
    })

    expect(membersRepository.members[0].id).toEqual(expect.any(String))
  })

  it('should not be able to register a same email twice', async () => {
    const prismaMembersRepository = new InMemoryMembersRepository()
    const registerUseCase = new RegisterUseCase(prismaMembersRepository)

    const member = {
      username: 'John Doe',
      email: 'johndoe@email.com',
      password: '123johnDoe',
    }

    await registerUseCase.execute(member)

    await expect(() => registerUseCase.execute(member)).rejects.toBeInstanceOf(
      MemberAlreadyExists,
    )
  })
})
