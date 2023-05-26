import { app } from '@/app'
import { prisma } from '@/configs/prisma'
import { createAndAuthenticate } from '@/factories/tests/make-create-and-authenticate-member'
import {
  memberStaticLocation,
  nearGymStaticLocation,
} from '@/utils/static-locations'
import request from 'supertest'

describe('Validate Check In (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate a check in', async () => {
    const { token } = await createAndAuthenticate(app, true)

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Create Near Gym',
        description: undefined,
        phone: undefined,
        latitude: nearGymStaticLocation.latitude,
        longitude: nearGymStaticLocation.longitude,
      })

    const gym = await prisma.gym.findFirst({
      where: { name: 'Create Near Gym' },
    })

    await request(app.server)
      .post(`/gyms/${gym!.id}/check-in`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: memberStaticLocation.latitude,
        longitude: memberStaticLocation.longitude,
      })

    const checkIn = await prisma.checkIn.findFirstOrThrow()

    const response = await request(app.server)
      .patch(`/check-in/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const { validated_at } = await prisma.checkIn.findUniqueOrThrow({
      where: { id: checkIn.id },
    })

    expect(response.statusCode).toEqual(200)
    expect(validated_at).toEqual(expect.any(Date))
  })
})
