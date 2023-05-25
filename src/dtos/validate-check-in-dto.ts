import { CheckIn } from '@prisma/client'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export { ValidateCheckInUseCaseRequest, ValidateCheckInUseCaseResponse }
