import request from 'supertest'
import { app } from '../../../app'
import { prisma } from '../../../configs/prisma'

describe('Validate member Totp(e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a member profile', async () => {
    await request(app.server).post('/members').send({
      username: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'johndoe123',
    })

    const member = await prisma.member.findFirst()

    const validateResponse = await request(app.server).post('/token').send({
      totp: member?.totp_key,
    })

    expect(validateResponse.statusCode).toEqual(200)
    expect(validateResponse.body).toEqual({
      welcome: `${member?.username} membership validate, welcome.`,
    })
  })
})
