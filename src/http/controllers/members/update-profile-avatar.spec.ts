import request from 'supertest'
import { app } from '../../../app'
import { createAndAuthenticate } from '../../../factories/tests/make-create-and-authenticate-member'

describe('Update profile member avatar (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update a member profile avatar', async () => {
    const { token } = await createAndAuthenticate(app)

    const profileResponse = await request(app.server)
      .patch('/avatar')
      .set('Authorization', `Bearer ${token}`)
      .attach('avatar', './uploads/test_avatar.jpg')

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.member.avatar).toEqual(expect.any(String))
  })
})
