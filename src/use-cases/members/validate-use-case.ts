import { Member } from '@prisma/client'
import dayjs from 'dayjs'
import { MembersRepository } from 'src/repositories/interface/interface-members-repository'
import { ResourceNotFound } from '../errors/resource-not-found'
import { TotpAlreadyExpired } from '../errors/totp-already-expired'

class ValidateUseCase {
  constructor(private membersRepository: MembersRepository) {
    Object.assign(this, membersRepository)
  }

  execute = async (totpKey: string): Promise<Member> => {
    const doesMemberTotpAlreadyExpired =
      await this.membersRepository.findByTotp(totpKey)

    if (!doesMemberTotpAlreadyExpired) {
      throw new ResourceNotFound('Totp')
    }

    const distanceInMinutesFromTotpCreation = dayjs(new Date()).diff(
      doesMemberTotpAlreadyExpired.totp_created_at,
      'hours',
    )

    if (distanceInMinutesFromTotpCreation > 1) {
      await this.membersRepository.validate(doesMemberTotpAlreadyExpired)

      throw new TotpAlreadyExpired('validate member')
    }

    const member = await this.membersRepository.validate(
      doesMemberTotpAlreadyExpired,
      true,
    )

    return member
  }
}

export { ValidateUseCase }
