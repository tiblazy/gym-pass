import { Member } from '@prisma/client'

interface RegisterMemberUseCaseRequestDTO {
  username: string
  password: string
  email: string
  avatar?: string
  totpKey: string
}

interface RegisterMemberUseCaseResponseDTO {
  member: Member
}

export { RegisterMemberUseCaseRequestDTO, RegisterMemberUseCaseResponseDTO }
