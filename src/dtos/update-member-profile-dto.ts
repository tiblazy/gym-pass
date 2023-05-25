import { Member } from '@prisma/client'

interface DataRequest {
  username?: string
  password?: string
  email?: string
  avatar?: any
}

interface UpdateMemberProfileUseCaseRequest {
  id: string
  data: DataRequest
}

interface UpdateMemberProfileUseCaseResponse {
  member: Member
}

export { UpdateMemberProfileUseCaseRequest, UpdateMemberProfileUseCaseResponse }
