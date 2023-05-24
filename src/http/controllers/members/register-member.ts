import { FastifyReply, FastifyRequest } from 'fastify'
import { app } from 'src/app'
import { totp } from 'src/configs/totp'
import { MemberAlreadyExists } from 'src/use-cases/errors/member-already-exists'
import { makeRegisterMemberUseCase } from 'src/use-cases/factories/make-register-use-case'
import { schemaRegisterMember } from 'src/validators/members/register-zod'

const registerMember = async (request: FastifyRequest, reply: FastifyReply) => {
  const { mailer } = app

  const { username, email, password } = schemaRegisterMember.parse(request.body)
  const totpKey = totp()

  try {
    const useCase = makeRegisterMemberUseCase()

    await useCase.execute({
      username,
      email,
      password,
      totpKey,
    })

    mailer.sendMail({
      subject: 'Welcome to gym-pass',
      to: email,
      text: `HELLO ${username}!!! Active your account ${totpKey}`,
    })
  } catch (error) {
    if (error instanceof MemberAlreadyExists) {
      return reply.status(409).send({ message: error.message })
    }
  }

  return reply.status(200).send()
}

export { registerMember }
