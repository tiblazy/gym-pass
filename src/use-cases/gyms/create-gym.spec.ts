import { makeGym } from '@/factories/make-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

let fakerGym: any

describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)

    fakerGym = makeGym()
  })

  it('should be able to register a new member', async () => {
    await sut.execute(fakerGym)

    expect(gymsRepository.gyms[0].id).toEqual(expect.any(String))
  })
})
