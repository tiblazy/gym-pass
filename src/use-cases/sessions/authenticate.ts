import { compare } from 'bcryptjs'
import {
  SessionAuthenticateUseCaseRequest,
  SessionAuthenticateUseCaseResponse,
} from '../../dtos/authenticate-dto'
import { MembersRepository } from '../../repositories/interface/interface-members-repository'
import { InvalidCredentials } from '../errors/invalid-credentials'

class SessionAuthenticateUseCase {
  constructor(private membersRepository: MembersRepository) {}

  async execute({
    email,
    password,
  }: SessionAuthenticateUseCaseRequest): Promise<SessionAuthenticateUseCaseResponse> {
    const member = await this.membersRepository.findByEmail(email)

    if (!member) {
      throw new InvalidCredentials()
    }

    const doesPasswordMatches = compare(password, member.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentials()
    }

    return { member }
  }
}

export { SessionAuthenticateUseCase }
