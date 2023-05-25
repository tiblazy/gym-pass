import { makeGym } from '@/factories/make-gym'
import { makeMember } from '@/factories/make-member'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryMembersRepository } from '@/repositories/in-memory/in-memory-members-repository'
import { FetchMemberCheckInUseCase } from './fetch-members-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let membersRepository: InMemoryMembersRepository

let sut: FetchMemberCheckInUseCase

let fakerNearGym: any
let fakerMember: any

describe('Fetch Member Check-in History Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    membersRepository = new InMemoryMembersRepository()

    sut = new FetchMemberCheckInUseCase(checkInsRepository)

    fakerNearGym = makeGym()
    fakerMember = makeMember()

    await membersRepository.create(fakerMember)
  })

  it('should be able to fetch member check in', async () => {
    for (let i = 1; i < 5; i++) {
      await checkInsRepository.create({
        gym_id: fakerNearGym.id,
        member_id: fakerMember.id,
      })
    }

    const { checkIns } = await sut.execute({ memberId: fakerMember.id })

    expect(checkIns.length).toEqual(4)
    expect(checkIns).toEqual([
      expect.objectContaining({ member_id: fakerMember.id }),
      expect.objectContaining({ member_id: fakerMember.id }),
      expect.objectContaining({ member_id: fakerMember.id }),
      expect.objectContaining({ member_id: fakerMember.id }),
    ])
  })

  it('should be able to paginate a fetch member check in', async () => {
    for (let i = 1; i < 35; i++) {
      await checkInsRepository.create({
        gym_id: fakerNearGym.id,
        member_id: fakerMember.id,
      })
    }

    const { checkIns } = await sut.execute({
      memberId: fakerMember.id,
      page: 4,
    })

    expect(checkIns.length).toEqual(4)
  })
})
