import request from 'supertest'
import { app } from '../../../app'
import { createAndAuthenticate } from '../../../factories/tests/make-create-and-authenticate-member'

describe('Fetch members (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch members', async () => {
    const { token } = await createAndAuthenticate(app)

    const reponse = await request(app.server)
      .get('/members')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(reponse.statusCode).toEqual(200)
  })
})
