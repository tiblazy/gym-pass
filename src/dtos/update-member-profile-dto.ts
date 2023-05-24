import { Member } from '@prisma/client'

interface UpdateMemberProfileUseCaseRequest {
  id: string
  data: Partial<Member>
}

interface UpdateMemberProfileUseCaseResponse {
  member: Member
}

export { UpdateMemberProfileUseCaseRequest, UpdateMemberProfileUseCaseResponse }
