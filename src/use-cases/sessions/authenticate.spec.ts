import { hash } from 'bcryptjs'
import { makeMember } from '../../factories/make-member'
import { InMemoryMembersRepository } from '../../repositories/in-memory/in-memory-members-repository'
import { InvalidCredentials } from '../errors/invalid-credentials'
import { SessionAuthenticateUseCase } from './authenticate'

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
    await membersRepository.create({
      ...fakerMember,
      password: await hash(fakerMember.password, 6),
    })

    const { member } = await sut.execute({
      email: fakerMember.email,
      password: '123123',
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
})
