import { makeGym } from '../../factories/make-gym'
import { InMemoryGymsRepository } from '../../repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

let fakerGym: any

describe('Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)

    fakerGym = makeGym()
  })

  it('should be able to create a new gym', async () => {
    await sut.execute(fakerGym)

    expect(gymsRepository.gyms[0].id).toEqual(expect.any(String))
  })
})
