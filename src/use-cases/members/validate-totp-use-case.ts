import dayjs from 'dayjs'
import { env } from '../../configs/env'
import { ResourceNotFound } from '../errors/resource-not-found'
import { TotpAlreadyExpired } from '../errors/totp-already-expired'
import { MembersRepository } from '../../repositories/interface/interface-members-repository'
import {
  ValidateTotpUseCaseRequest,
  ValidateTotpUseCaseResponse,
} from '../../dtos/validate-totp'

class ValidateTotpUseCase {
  constructor(private membersRepository: MembersRepository) {
    Object.assign(this, membersRepository)
  }

  execute = async ({
    totpKey,
  }: ValidateTotpUseCaseRequest): Promise<ValidateTotpUseCaseResponse> => {
    const doesMemberTotpExists = await this.membersRepository.findByTotp(
      totpKey,
    )

    if (!doesMemberTotpExists) {
      throw new ResourceNotFound('Totp')
    }

    const distanceInMinutesFromTotpCreation = dayjs(new Date()).diff(
      doesMemberTotpExists.totp_created_at,
      'hours',
    )

    if (distanceInMinutesFromTotpCreation > 1) {
      const member = await this.membersRepository.validate(doesMemberTotpExists)

      if (env.NODE_ENV === 'production') {
        const { mailer } = app
        mailer.sendMail({
          subject: 'Welcome to gym-pass',
          to: member.email,
          text: `HELLO ${member.username}!!! Active your account ${member.totp_key}`,
        })
      }

      throw new TotpAlreadyExpired('validate member')
    }

    const member = await this.membersRepository.validate(
      doesMemberTotpExists,
      true,
    )

    return { member }
  }
}

export { ValidateTotpUseCase }
