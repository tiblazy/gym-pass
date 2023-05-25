import { CheckIn } from '@prisma/client'

interface CheckInUseCaseRequest {
  memberId: string
  gymId: string
  memberLatitude: number
  memberLongitude: number
}
interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export { CheckInUseCaseRequest, CheckInUseCaseResponse }
