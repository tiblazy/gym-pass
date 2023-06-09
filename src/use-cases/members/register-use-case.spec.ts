import { makeMember } from '../../factories/make-member'
import { InMemoryMembersRepository } from '../../repositories/in-memory/in-memory-members-repository'
import { MemberAlreadyExists } from '../errors/member-already-exists'
import { RegisterUseCase } from './register-use-case'

let membersRepository: InMemoryMembersRepository
let sut: RegisterUseCase

let fakerMember: any

describe('Register Use Case', () => {
  beforeEach(() => {
    membersRepository = new InMemoryMembersRepository()
    sut = new RegisterUseCase(membersRepository)

    fakerMember = makeMember()
  })

  it('should be able to register a new member', async () => {
    await sut.execute(fakerMember)

    expect(membersRepository.members[0].id).toEqual(expect.any(String))
  })

  it('should not be able to register a same email twice', async () => {
    await sut.execute(fakerMember)

    await expect(() => sut.execute(fakerMember)).rejects.toBeInstanceOf(
      MemberAlreadyExists,
    )
  })
})
