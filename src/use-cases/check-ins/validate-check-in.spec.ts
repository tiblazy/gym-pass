import { makeCheckIn } from '../../factories/make-check-in'
import { InMemoryCheckInsRepository } from '../../repositories/in-memory/in-memory-check-ins-repository'
import { ResourceNotFound } from '../errors/resource-not-found'
import { ValidateCheckInExpired } from '../errors/validate-check-in-expired'
import { ValidateCheckInUseCase } from './validate-check-in'

let checkInsRepository: InMemoryCheckInsRepository

let sut: ValidateCheckInUseCase

let fakerCheckIn: any

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    vi.useFakeTimers()

    checkInsRepository = new InMemoryCheckInsRepository()

    sut = new ValidateCheckInUseCase(checkInsRepository)

    fakerCheckIn = makeCheckIn()
  })

  it('should be able to check-in', async () => {
    await checkInsRepository.create(fakerCheckIn)

    const { checkIn } = await sut.execute({ checkInId: fakerCheckIn.id })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.checkIns[0].validated_at).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to inexistent check-in', async () => {
    await expect(() =>
      sut.execute({ checkInId: 'fakerCheckInId' }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })

  it('should be able to check-in', async () => {
    await checkInsRepository.create(fakerCheckIn)

    const minutesInMs = 1000 * 60

    vi.advanceTimersByTime(minutesInMs * 21)

    await expect(() =>
      sut.execute({ checkInId: fakerCheckIn.id }),
    ).rejects.toBeInstanceOf(ValidateCheckInExpired)
  })
})
