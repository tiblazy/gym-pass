import { FastifyReply, FastifyRequest } from 'fastify'
import { env } from 'process'
import { app } from '../../../app'
import { totp } from '../../../configs/totp'
import { MemberAlreadyExists } from '../../../use-cases/errors/member-already-exists'
import { makeRegisterMemberUseCase } from '../../../use-cases/factories/members/make-register-use-case'
import { schemaRegister } from '../../../validators/members/register-zod'

const register = async (request: FastifyRequest, reply: FastifyReply) => {
  const { mailer } = app

  const { username, email, password } = schemaRegister.parse(request.body)
  const totpKey = totp()

  try {
    const useCase = makeRegisterMemberUseCase()

    const { member } = await useCase.execute({
      username,
      email,
      password,
      totpKey,
    })

    if (env.NODE_ENV === 'production') {
      mailer.sendMail({
        subject: 'Welcome to gym-pass',
        to: email,
        text: `HELLO ${username}!!! Active your account ${member.totp_key}`,
      })
    }
  } catch (error) {
    if (error instanceof MemberAlreadyExists) {
      return reply.status(409).send({ message: error.message })
    }
  }

  return reply.status(201).send({
    message: 'A token will be send to confirm your email in a few minutes.',
  })
}

export { register }
