import { app } from '@/app'
import { prisma } from '@/configs/prisma'
import request from 'supertest'

describe('Update profile member (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update a member profile', async () => {
    await request(app.server).post('/members').send({
      username: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'johndoe123',
    })

    const member = await prisma.member.findFirst()

    await request(app.server).post('/token').send({
      totp: member?.totp_key,
    })

    const authResponse = await request(app.server)
      .post('/authenticate')
      .send({ email: 'johndoe@gmail.com', password: 'johndoe123' })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .patch('/me')
      .set('Authorization', `Bearer ${token}`)
      .send({
        avatar: 'link-image',
      })

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.member).toEqual(
      expect.objectContaining({ avatar: 'link-image' }),
    )
  })
})
