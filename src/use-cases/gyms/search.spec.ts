import { makeGym } from '@/factories/make-gym'
import { makeMember } from '@/factories/make-member'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { InMemoryMembersRepository } from '@/repositories/in-memory/in-memory-members-repository'
import { SearchGymsUseCase } from './search'

let gymsRepository: InMemoryGymsRepository
let membersRepository: InMemoryMembersRepository

let sut: SearchGymsUseCase

let fakerNearGym: any
let fakerSearchGym: any
let fakerMember: any

describe('Search Gym Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    membersRepository = new InMemoryMembersRepository()

    sut = new SearchGymsUseCase(gymsRepository)

    fakerNearGym = makeGym()
    fakerSearchGym = makeGym({ name: 'fakerSearch' })
    fakerMember = makeMember()

    await membersRepository.create(fakerMember)
  })

  it('should be able to search a gym', async () => {
    for (let i = 1; i < 10; i++) {
      await gymsRepository.create(fakerNearGym)
      if (i > 3) {
        await gymsRepository.create(fakerSearchGym)
      }
    }

    const { gyms } = await sut.execute({ query: 'fakerSearch' })

    expect(gyms.length).toEqual(6)
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i < 45; i++) {
      await gymsRepository.create(fakerNearGym)
      if (i > 13 && i < 25) {
        await gymsRepository.create(fakerSearchGym)
      }
    }

    const { gyms } = await sut.execute({ query: 'fakerSearch', page: 2 })

    expect(gyms).toEqual([expect.objectContaining({ name: 'fakerSearch' })])
  })
})
