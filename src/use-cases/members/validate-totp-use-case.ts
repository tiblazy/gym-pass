import dayjs from 'dayjs'
import {
  ValidateTotpUseCaseRequest,
  ValidateTotpUseCaseResponse,
} from 'src/dtos/validate-totp'
import { MembersRepository } from 'src/repositories/interface/interface-members-repository'
import { ResourceNotFound } from '../errors/resource-not-found'
import { TotpAlreadyExpired } from '../errors/totp-already-expired'

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
      await this.membersRepository.validate(doesMemberTotpExists)

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
