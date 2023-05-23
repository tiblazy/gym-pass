import { FastifyReply, FastifyRequest } from 'fastify'
import { app } from 'src/app'
import { PrismaMembersRepository } from 'src/repositories/prisma/members-repository-prisma'
import { MemberAlreadyExists } from 'src/use-cases/errors/member-already-exists'
import { RegisterUseCase } from 'src/use-cases/member/register-use-case'
import { schemaRegisterMember } from 'src/validators/members/register-zod'

const registerMember = async (request: FastifyRequest, reply: FastifyReply) => {
  const { mailer, totp } = app

  try {
    const membersRepository = new PrismaMembersRepository()
    const registerUseCase = new RegisterUseCase(membersRepository)

    const { username, email, password } = schemaRegisterMember.parse(
      request.body,
    )

    await registerUseCase.execute({ username, email, password })

    mailer.sendMail({
      subject: 'Welcome to gym-pass',
      to: email,
      text: `HELLO ${username}!!! Active your account ${totp
        .generateSecret(5)
        .ascii.toUpperCase()}`,
    })
  } catch (error) {
    if (error instanceof MemberAlreadyExists) {
      return reply.status(409).send({ message: error.message })
    }

    return reply.status(500).send()
  }

  return reply.status(201).send()
}

export { registerMember }
