import { totp } from '@/configs/totp'
import { MemberAlreadyExists } from '@/use-cases/errors/member-already-exists'
import { makeRegisterMemberUseCase } from '@/use-cases/factories/members/make-register-use-case'
import { schemaRegisterMember } from '@/validators/members/register-zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { app } from 'src/app'

const registerMember = async (request: FastifyRequest, reply: FastifyReply) => {
  const { mailer } = app

  const { username, email, password } = schemaRegisterMember.parse(request.body)
  const totpKey = totp()

  try {
    const useCase = makeRegisterMemberUseCase()

    const { member } = await useCase.execute({
      username,
      email,
      password,
      totpKey,
    })

    mailer.sendMail({
      subject: 'Welcome to gym-pass',
      to: email,
      text: `HELLO ${username}!!! Active your account ${member.totp_key}`,
    })
  } catch (error) {
    if (error instanceof MemberAlreadyExists) {
      return reply.status(409).send({ message: error.message })
    }
  }

  return reply.status(201).send({
    message: 'A token will be send to confirm your email in a few minutes.',
  })
}

export { registerMember }
