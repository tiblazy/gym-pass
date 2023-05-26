import { app } from '@/app'
import { prisma } from '@/configs/prisma'
import request from 'supertest'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/members').send({
      username: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'johndoe123',
    })

    const member = await prisma.member.findFirstOrThrow()

    await request(app.server).post('/token').send({
      totp: member.totp_key,
    })

    const authResponse = await request(app.server).post('/authenticate').send({
      email: 'johndoe@gmail.com',
      password: 'johndoe123',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
