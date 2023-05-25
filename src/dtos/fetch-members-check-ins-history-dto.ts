import { CheckIn } from '@prisma/client'

interface FetchMemberCheckInUseCaseRequest {
  memberId: string
  page?: number
}

interface FetchMemberCheckInUseCaseResponse {
  checkIns: CheckIn[]
}

export { FetchMemberCheckInUseCaseRequest, FetchMemberCheckInUseCaseResponse }
