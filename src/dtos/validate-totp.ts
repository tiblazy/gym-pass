import { Member } from '@prisma/client'

interface ValidateTotpUseCaseRequest {
  totpKey: string
}

interface ValidateTotpUseCaseResponse {
  member: Member
}

export { ValidateTotpUseCaseRequest, ValidateTotpUseCaseResponse }
