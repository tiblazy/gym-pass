import { PrismaMembersRepository } from '@/repositories/prisma/prisma-members-repository'
import { InvalidCredentials } from '@/use-cases/errors/invalid-credentials'
import { SessionAuthenticateUseCase } from '@/use-cases/sessions/session-authenticate'
import { schemaSessionAuthenticate } from '@/validators/sessions/authenticate-zod'
import { FastifyReply, FastifyRequest } from 'fastify'

const sessionAuthenticate = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { email, password } = schemaSessionAuthenticate.parse(request.body)

  try {
    const membersRepository = new PrismaMembersRepository()
    const sessionAuthenticateUseCase = new SessionAuthenticateUseCase(
      membersRepository,
    )

    await sessionAuthenticateUseCase.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredentials) {
      return reply.status(400).send({ message: error.message })
    }
  }

  return reply.status(200).send()
}

export { sessionAuthenticate }
