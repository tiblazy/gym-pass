import request from 'supertest'
import { app } from '../../../app'
import { createAndAuthenticate } from '../../../factories/tests/make-create-and-authenticate-member'

describe('Deactive profile member (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to deactive a member profile', async () => {
    const { token } = await createAndAuthenticate(app)

    const profileResponse = await request(app.server)
      .patch('/me-deactive')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toBe(204)
  })
})
