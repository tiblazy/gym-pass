import { makeCheckIn } from '@/factories/make-check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

let fakerCheckIn: any

describe('Check-in Use Case', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)

    fakerCheckIn = makeCheckIn()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    await checkInsRepository.create(fakerCheckIn)

    const { checkIn } = await sut.execute({
      gymId: 'fakerId',
      memberId: 'fakerId',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 8, 12, 8, 0, 0))

    await sut.execute({
      gymId: 'fakerId',
      memberId: 'fakerId',
    })

    await expect(() =>
      sut.execute({
        gymId: 'fakerId',
        memberId: 'fakerId',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in different days', async () => {
    vi.setSystemTime(new Date(2023, 8, 12, 8, 0, 0))

    await sut.execute({
      gymId: 'fakerId',
      memberId: 'fakerId',
    })

    vi.setSystemTime(new Date(2023, 8, 14, 8, 0, 0))

    await sut.execute({
      gymId: 'fakerId',
      memberId: 'fakerId',
    })

    expect(checkInsRepository.checkIns.length).toEqual(2)
  })
})
