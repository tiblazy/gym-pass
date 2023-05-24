import { Member } from '@prisma/client'

interface GetMemberProfileUseCaseRequest {
  id: string
}

interface GetMemberProfileUseCaseResponse {
  member: Member
}

export { GetMemberProfileUseCaseRequest, GetMemberProfileUseCaseResponse }
