import { CheckIn } from '@prisma/client'

interface CheckInUseCaseRequest {
  memberId: string
  gymId: string
}
interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export { CheckInUseCaseRequest, CheckInUseCaseResponse }
