import { app } from '@/app'
import request from 'supertest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new member', async () => {
    const response = await request(app.server).post('/members').send({
      username: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'johndoe123',
    })

    expect(response.statusCode).toEqual(201)
    expect(response.body.message).toEqual(
      'A token will be send to confirm your email in a few minutes.',
    )
  })
})
