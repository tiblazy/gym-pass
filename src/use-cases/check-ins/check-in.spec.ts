import { makeCheckIn } from '@/factories/make-check-in'
import { makeGym } from '@/factories/make-gym'
import { makeMember } from '@/factories/make-member'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { InMemoryMembersRepository } from '@/repositories/in-memory/in-memory-members-repository'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let membersRepository: InMemoryMembersRepository

let sut: CheckInUseCase

let fakerCheckIn: any
let fakerGym: any
let fakerMember: any

describe('Check-in Use Case', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    membersRepository = new InMemoryMembersRepository()

    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    fakerCheckIn = makeCheckIn()
    fakerGym = makeGym()
    fakerMember = makeMember()

    gymsRepository.gyms.push(fakerGym)
    membersRepository.members.push(fakerMember)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    await checkInsRepository.create(fakerCheckIn)

    const { checkIn } = await sut.execute({
      gymId: fakerGym.id,
      memberId: fakerMember.id,
      memberLatitude: 0,
      memberLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 8, 12, 8, 0, 0))

    await sut.execute({
      gymId: fakerGym.id,
      memberId: 'fakerStaticId',
      memberLatitude: 0,
      memberLongitude: 0,
    })

    await expect(() =>
      sut.execute({
        gymId: fakerGym.id,
        memberId: 'fakerStaticId',
        memberLatitude: 0,
        memberLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in different days', async () => {
    vi.setSystemTime(new Date(2023, 8, 12, 8, 0, 0))

    await sut.execute({
      gymId: fakerGym.id,
      memberId: fakerMember.id,
      memberLatitude: 0,
      memberLongitude: 0,
    })

    vi.setSystemTime(new Date(2023, 8, 14, 8, 0, 0))

    await sut.execute({
      gymId: fakerGym.id,
      memberId: fakerMember.id,
      memberLatitude: 0,
      memberLongitude: 0,
    })

    expect(checkInsRepository.checkIns.length).toEqual(2)
  })
})
