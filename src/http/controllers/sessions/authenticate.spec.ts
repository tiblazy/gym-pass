import request from 'supertest'
import { app } from '../../../app'
import { prisma } from '../../../configs/prisma'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate a member', async () => {
    await request(app.server).post('/members').send({
      username: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'johndoe123',
    })

    const member = await prisma.member.findFirst()

    await request(app.server).post('/token').send({
      totp: member?.totp_key,
    })

    const response = await request(app.server).post('/authenticate').send({
      email: 'johndoe@gmail.com',
      password: 'johndoe123',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
})
