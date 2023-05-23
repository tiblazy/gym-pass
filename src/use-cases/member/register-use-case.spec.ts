import { compare } from 'bcryptjs'
import { PrismaMembersRepository } from 'src/repositories/prisma/members-repository-prisma'
import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register-use-case'

describe('Register Use Case', () => {
  it('should be able to register a new member', async () => {
    const prismaMembersRepository = new PrismaMembersRepository()
    const registerUseCase = new RegisterUseCase(prismaMembersRepository)

    const { member } = await registerUseCase.execute({
      username: 'John Doe',
      email: 'johndoe@email.com',
      password: '123johnDoe',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123johnDoe',
      member.password,
    )

    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })
})
