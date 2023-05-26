import {
  CreateGymUseCaseRequest,
  CreateGymUseCaseResponse,
} from '../../dtos/create-gym-dto'
import { GymsRepository } from '../../repositories/interface/interface-gyms-repository'

class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    name,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      name,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}

export { CreateGymUseCase }
