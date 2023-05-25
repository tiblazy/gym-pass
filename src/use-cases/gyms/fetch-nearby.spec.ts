import { makeGym } from '@/factories/make-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { memberStaticLocation } from '@/utils/static-locations'
import { FetchNearbyGymsUseCase } from './fetch-nearby'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

let fakerGym: any

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)

    fakerGym = makeGym()
  })

  it('should be able to fetch nearby gyms', async () => {
    for (let i = 1; i < 20; i++) {
      await gymsRepository.create(fakerGym)
    }

    const { gyms } = await sut.execute({
      memberLatitude: memberStaticLocation.latitude,
      memberLongitude: memberStaticLocation.longitude,
    })

    expect(gyms).toHaveLength(19)
  })
})
