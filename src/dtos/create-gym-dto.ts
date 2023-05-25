import { Gym } from '@prisma/client'

interface CreateGymUseCaseRequest {
  name: string
  description?: string | null
  phone?: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export { CreateGymUseCaseRequest, CreateGymUseCaseResponse }
