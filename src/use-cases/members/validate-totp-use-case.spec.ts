import { makeMember } from '@/factories/make-member'
import { InMemoryMembersRepository } from '@/repositories/in-memory/in-memory-members-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { TotpAlreadyExpired } from '../errors/totp-already-expired'
import { ValidateTotpUseCase } from './validate-totp-use-case'

let membersRepository: InMemoryMembersRepository
let sut: ValidateTotpUseCase

let fakerMember: any

describe('Validate Use Case', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    membersRepository = new InMemoryMembersRepository()
    sut = new ValidateTotpUseCase(membersRepository)

    fakerMember = makeMember()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate a totp', async () => {
    const toValidate = await membersRepository.create(fakerMember)

    const { member } = await sut.execute({ totpKey: toValidate.totp_key })

    expect(member.is_active).toEqual(true)
  })

  it('should not be able to validate a expire totp', async () => {
    const toInvalidate = await membersRepository.create(fakerMember)

    vi.setSystemTime(new Date(2023, 8, 12, 8, 0, 0))

    await expect(() =>
      sut.execute({ totpKey: toInvalidate.totp_key }),
    ).rejects.toBeInstanceOf(TotpAlreadyExpired)
  })
})
