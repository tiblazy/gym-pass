import { FastifyReply, FastifyRequest } from 'fastify'
import { app } from 'src/app'
import { registerUseCase } from 'src/use-cases/member/register-use-case'
import { schemaRegisterMember } from 'src/validators/members/register-zod'

const registerMember = async (request: FastifyRequest, reply: FastifyReply) => {
  const { mailer, totp } = app

  try {
    const { username, email, password } = schemaRegisterMember.parse(
      request.body,
    )

    await registerUseCase({ username, email, password })

    mailer.sendMail({
      subject: 'Welcome to gym-pass',
      to: email,
      text: `HELLO ${username}!!! Active your account ${totp
        .generateSecret(5)
        .ascii.toUpperCase()}`,
    })

    return reply.send()
  } catch (error) {
    return reply.status(409).send()
  }
}

export { registerMember }
