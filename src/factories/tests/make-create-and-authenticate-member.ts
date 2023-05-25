import { prisma } from '@/configs/prisma'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

const createAndAuthenticate = async (app: FastifyInstance) => {
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

  return token
}

export { createAndAuthenticate }
