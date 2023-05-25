import { makeCheckIn } from '@/factories/make-check-in'
import { makeGym } from '@/factories/make-gym'
import { makeMember } from '@/factories/make-member'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { InMemoryMembersRepository } from '@/repositories/in-memory/in-memory-members-repository'
import {
  farGymStaticLocation,
  memberStaticLocation,
} from '@/utils/static-locations'
import { Decimal } from '@prisma/client/runtime'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let membersRepository: InMemoryMembersRepository

let sut: CheckInUseCase

let fakerCheckIn: any
let fakerNearGym: any
let fakerFarGym: any
let fakerMember: any

describe('Check-in Use Case', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    membersRepository = new InMemoryMembersRepository()

    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    fakerCheckIn = makeCheckIn()
    fakerNearGym = makeGym()
    fakerFarGym = makeGym()
    fakerMember = makeMember()

    gymsRepository.gyms.push(fakerNearGym)
    gymsRepository.gyms.push(fakerFarGym)
    membersRepository.members.push(fakerMember)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    await checkInsRepository.create(fakerCheckIn)

    const { checkIn } = await sut.execute({
      gymId: fakerNearGym.id,
      memberId: fakerMember.id,
      memberLatitude: memberStaticLocation.latitude,
      memberLongitude: memberStaticLocation.longitude,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 8, 12, 8, 0, 0))

    await sut.execute({
      gymId: fakerNearGym.id,
      memberId: 'fakerStaticId',
      memberLatitude: memberStaticLocation.latitude,
      memberLongitude: memberStaticLocation.longitude,
    })

    await expect(() =>
      sut.execute({
        gymId: fakerNearGym.id,
        memberId: 'fakerStaticId',
        memberLatitude: memberStaticLocation.latitude,
        memberLongitude: memberStaticLocation.longitude,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in different days', async () => {
    vi.setSystemTime(new Date(2023, 8, 12, 8, 0, 0))

    await sut.execute({
      gymId: fakerNearGym.id,
      memberId: 'fakerStaticId',
      memberLatitude: memberStaticLocation.latitude,
      memberLongitude: memberStaticLocation.longitude,
    })

    vi.setSystemTime(new Date(2023, 8, 13, 8, 0, 0))

    await sut.execute({
      gymId: fakerNearGym.id,
      memberId: 'fakerStaticId',
      memberLatitude: memberStaticLocation.latitude,
      memberLongitude: memberStaticLocation.longitude,
    })

    expect(checkInsRepository.checkIns.length).toEqual(2)
  })

  it('should not be able to check in on distant gym', async () => {
    fakerFarGym.latitude = new Decimal(farGymStaticLocation.latitude)
    fakerFarGym.longitude = new Decimal(farGymStaticLocation.longitude)

    await expect(() =>
      sut.execute({
        gymId: fakerFarGym.id,
        memberId: fakerMember.id,
        memberLatitude: memberStaticLocation.latitude,
        memberLongitude: memberStaticLocation.longitude,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
