import { Member } from '@prisma/client'

interface SessionAuthenticateUseCaseRequest {
  email: string
  password: string
}

interface SessionAuthenticateUseCaseResponse {
  member: Member
}

export { SessionAuthenticateUseCaseRequest, SessionAuthenticateUseCaseResponse }
