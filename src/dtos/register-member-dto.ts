import { Member } from '@prisma/client'

interface RegisterMemberRequestDTO {
  username: string
  password: string
  email: string
  avatar?: string
}

interface RegisterMemberResponseDTO {
  member: Member
}

export { RegisterMemberRequestDTO, RegisterMemberResponseDTO }
