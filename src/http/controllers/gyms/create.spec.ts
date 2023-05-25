import { app } from '@/app'
import { createAndAuthenticate } from '@/factories/tests/make-create-and-authenticate-member'
import { nearGymStaticLocation } from '@/utils/static-locations'
import request from 'supertest'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new gym', async () => {
    const { token } = await createAndAuthenticate(app)

    const response = await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Create Near Gym',
        description: undefined,
        phone: undefined,
        latitude: nearGymStaticLocation.latitude,
        longitude: nearGymStaticLocation.longitude,
      })

    expect(response.statusCode).toEqual(201)
  })
})
