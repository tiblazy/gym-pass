import request from 'supertest'
import { app } from '../../../app'
import { createAndAuthenticate } from '../../../factories/tests/make-create-and-authenticate-member'

describe('Update profile member (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update a member profile', async () => {
    const { token } = await createAndAuthenticate(app)

    const profileResponse = await request(app.server)
      .patch('/me')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'new_user',
      })

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.member).toEqual(
      expect.objectContaining({ username: 'new_user' }),
    )
  })
})
