import { app } from '@/app'
import { prisma } from '@/configs/prisma'
import { createAndAuthenticate } from '@/factories/tests/make-create-and-authenticate-member'
import {
  memberStaticLocation,
  nearGymStaticLocation,
} from '@/utils/static-locations'
import request from 'supertest'

describe('Create Check In (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new check in', async () => {
    const { token } = await createAndAuthenticate(app)

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

    const gym = await prisma.gym.findFirstOrThrow({
      where: { name: 'Create Near Gym' },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-in`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: memberStaticLocation.latitude,
        longitude: memberStaticLocation.longitude,
      })

    expect(response.statusCode).toEqual(201)
  })
})
