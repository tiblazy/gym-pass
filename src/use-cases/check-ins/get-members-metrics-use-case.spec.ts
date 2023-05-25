import { makeGym } from '@/factories/make-gym'
import { makeMember } from '@/factories/make-member'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryMembersRepository } from '@/repositories/in-memory/in-memory-members-repository'
import { GetMemberMetricsCheckInUseCase } from './get-members-metrics-use-case'

let checkInsRepository: InMemoryCheckInsRepository
let membersRepository: InMemoryMembersRepository

let sut: GetMemberMetricsCheckInUseCase

let fakerNearGym: any
let fakerMember: any

describe('Get Member Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    membersRepository = new InMemoryMembersRepository()

    sut = new GetMemberMetricsCheckInUseCase(checkInsRepository)

    fakerNearGym = makeGym()
    fakerMember = makeMember()

    await membersRepository.create(fakerMember)
  })

  it('should be able to count member metrics', async () => {
    for (let i = 1; i < 35; i++) {
      await checkInsRepository.create({
        gym_id: fakerNearGym.id,
        member_id: fakerMember.id,
      })
    }

    const count = await sut.execute({ memberId: fakerMember.id })

    expect(count).toEqual(34)
  })
})
