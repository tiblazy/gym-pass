import { app } from '@/app'
import { createAndAuthenticate } from '@/factories/tests/make-create-and-authenticate-member'
import request from 'supertest'

describe('Get profile member (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a member profile', async () => {
    const { token } = await createAndAuthenticate(app)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.member).toEqual(
      expect.objectContaining({ email: 'johndoe@gmail.com' }),
    )
  })
})
