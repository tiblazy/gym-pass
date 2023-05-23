import { hash } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { app } from 'src/app'
import { prisma } from 'src/configs/prisma'
import { schemaRegisterMember } from 'src/validators/members/register-zod'

const registerMember = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username, email, password } = schemaRegisterMember.parse(request.body)

  const { mailer, totp } = app

  await prisma.member.create({
    data: {
      username,
      password: await hash(password, 6),
      email,
      updated_at: new Date(),
    },
  })

  const members = await prisma.member.create({
    data: { username, password, email, updated_at: new Date() },
  })

  mailer.sendMail({
    subject: 'test',
    to: email,
    text: `HELLO, ${username}, active your account ${totp
      .generateSecret(5)
      .ascii.toUpperCase()}`,
  })

  await prisma.member.findMany()

  return reply.send(members)
}

export { registerMember }
