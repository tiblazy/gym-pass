import { app } from '@/app'
import { createAndAuthenticate } from '@/factories/tests/make-create-and-authenticate-member'
import {
  farGymStaticLocation,
  memberStaticLocation,
  nearGymStaticLocation,
} from '@/utils/static-locations'
import request from 'supertest'

describe('Fetch Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch nearby gyms', async () => {
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

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Create Far Gym',
        latitude: farGymStaticLocation.latitude,
        longitude: farGymStaticLocation.longitude,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .set('Authorization', `Bearer ${token}`)
      .query({
        latitude: memberStaticLocation.latitude,
        longitude: memberStaticLocation.longitude,
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ name: 'Create Near Gym' }),
    ])
  })
})
