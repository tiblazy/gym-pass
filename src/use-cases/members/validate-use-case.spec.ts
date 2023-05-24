import { InMemoryMembersRepository } from 'src/repositories/in-memory/in-memory-members-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { TotpAlreadyExpired } from '../errors/totp-already-expired'
import { ValidateUseCase } from './validate-use-case'

let membersRepository: InMemoryMembersRepository
let sut: ValidateUseCase

describe('Validate Use Case', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    membersRepository = new InMemoryMembersRepository()
    sut = new ValidateUseCase(membersRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate a totp', async () => {
    await membersRepository.create({
      username: 'john doe',
      password: 'john_doe*',
      email: 'johndoe@gmail.com',
      totp_key: 'AA5A',
    })

    const member = await sut.execute('AA5A')

    expect(member.is_active).toEqual(true)
  })

  it('should not be able to validate a expire totp', async () => {
    await membersRepository.create({
      username: 'john doe',
      password: 'john_doe*',
      email: 'johndoe@gmail.com',
      totp_key: 'AA5A',
    })

    vi.setSystemTime(new Date(2023, 8, 12, 8, 0, 0))

    await expect(() => sut.execute('AA5A')).rejects.toBeInstanceOf(
      TotpAlreadyExpired,
    )
  })
})
